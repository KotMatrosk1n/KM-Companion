#!/usr/bin/env node
import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {createRequire} from "node:module";
import {fileURLToPath, pathToFileURL} from "node:url";

const require = createRequire(import.meta.url);
const schemaDirectory = path.resolve(path.dirname(fileURLToPath(import.meta.url)), "../docs/schemas/mod-submission-v1");
const categories = ["pokemon", "moves", "abilities", "items", "trainers", "encounters", "item-locations", "rules"];
const fileLimit = 64 * 1024 * 1024;
const own = (value, key) => Object.prototype.hasOwnProperty.call(value, key);
const escapePointer = key => String(key).replace(/~/g, "~0").replace(/\//g, "~1");

function inspectValues(value, visit) {
  const seen = new WeakSet();
  let count = 0;
  function walk(node, pointer, depth) {
    if (++count > 2000000 || depth > 60) throw new Error("Data is too deeply nested or contains too many values.");
    if (typeof node === "number" && !Number.isFinite(node)) throw new Error(`${pointer}: numbers must be finite.`);
    visit(node, pointer);
    if (!node || typeof node !== "object") return;
    if (seen.has(node)) throw new Error(`${pointer}: recursive values and shared YAML object aliases are unsupported. Copy the record instead.`);
    seen.add(node);
    for (const key of Object.keys(node)) {
      if (["__proto__", "prototype", "constructor"].includes(key)) throw new Error(`${pointer}: unsupported key ${key}.`);
      walk(node[key], `${pointer}/${escapePointer(key)}`, depth + 1);
    }
  }
  walk(value, "", 0);
}

export function validateSubmission(directory) {
  const errors = [], gaps = [], review = [], counts = {}, documents = {}, filenames = {};
  const add = (list, file, pointer, message) => list.push({file,field:pointer || "/",message});
  const report = () => ({valid:errors.length === 0,ready:errors.length === 0 && gaps.length === 0,errors,gaps,review,counts});
  let Ajv, yaml;
  try { Ajv = require("ajv"); yaml = require("js-yaml"); }
  catch { throw new Error("Install the author tool dependencies from the KM Companion repository with npm ci --ignore-scripts."); }
  const root = fs.realpathSync(directory);
  if (!fs.statSync(root).isDirectory()) throw new Error("Choose the extracted submission folder, not a ZIP or a single file.");
  const ajv = new Ajv({allErrors:true,jsonPointers:true,ownProperties:true});
  const schemaFiles = fs.readdirSync(schemaDirectory).filter(name => name.endsWith(".schema.json"));
  for (const file of schemaFiles) ajv.addSchema(JSON.parse(fs.readFileSync(path.join(schemaDirectory,file),"utf8")));
  let totalBytes = 0;
  for (const name of ["mod",...categories]) {
    const candidates = ["yaml","yml","json"].map(ext => `${name}.${ext}`).filter(file => fs.existsSync(path.join(root,file)));
    if (candidates.length !== 1) {
      add(errors,`${name}.yaml`,"",candidates.length ? `Keep one format per category. Found ${candidates.join(", ")}.` : "Missing file. Copy it from the starter and declare its coverage.");
      continue;
    }
    const file = candidates[0]; filenames[name] = file;
    try {
      const realFile = fs.realpathSync(path.join(root,file));
      if (!realFile.startsWith(root + path.sep)) throw new Error("The file must stay inside the submission folder.");
      const size = fs.statSync(realFile).size; totalBytes += size;
      if (size > fileLimit || totalBytes > 4 * fileLimit) throw new Error("Keep each file within 64 MiB and the package within 256 MiB. Discuss larger submissions before sending them.");
      const text = fs.readFileSync(realFile,"utf8").replace(/^\uFEFF/, "");
      if (file.endsWith(".json")) JSON.parse(text);
      const data = yaml.load(text,{filename:file,schema:yaml.JSON_SCHEMA,json:false,maxDepth:60,maxTotalMergeKeys:0});
      inspectValues(data,() => {});
      const schema = JSON.parse(fs.readFileSync(path.join(schemaDirectory,`${name}.schema.json`),"utf8"));
      const validate = ajv.getSchema(schema.$id);
      if (!validate(data)) {
        for (const issue of validate.errors.filter(error => error.keyword !== "if").slice(0,30)) {
          const field = issue.dataPath + (issue.keyword === "additionalProperties" ? "/" + escapePointer(issue.params.additionalProperty) : "");
          add(errors,file,field,issue.message + (issue.keyword === "required" ? ` (${issue.params.missingProperty})` : ""));
        }
      } else documents[name] = data;
    } catch (error) {
      const where = error.mark ? ` at line ${error.mark.line + 1}, column ${error.mark.column + 1}` : "";
      add(errors,file,"",(error.reason || error.message) + where);
    }
  }
  // Structural errors are reported before semantic checks so authors can fix the file shape first.
  if (errors.length || !documents.mod) return report();
  const mod = documents.mod;
  const catalogs = {}, removedNames = {};
  function catalog(name, records, file, pointer = "/records") {
    const map = new Map();
    records.forEach((record,index) => {
      if (map.has(record.id)) add(errors,file,`${pointer}/${index}/id`,`Duplicate ID ${record.id}.`);
      map.set(record.id,record);
    });
    catalogs[name] = map;
  }
  catalog("sources",mod.sources,filenames.mod,"/sources");
  catalog("locations",mod.locations,filenames.mod,"/locations");
  for (const name of categories) {
    const data = documents[name];
    catalog(name,data.records,filenames[name]); counts[name] = {coverage:data.coverage,records:data.records.length};
    removedNames[name] = new Set(data.records.filter(record => record.action === "remove").map(record => record.base.toLowerCase()));
    if (data.coverage === "unavailable") add(gaps,filenames[name],"/coverage","Information is unavailable. Supply the records or confirm that this category is unchanged.");
  }
  const checkId = (kind, id, file, pointer) => {
    if (id == null) return;
    const record = catalogs[kind]?.get(id);
    if (!record || record.action === "remove") add(errors,file,pointer,`Unknown or removed ${kind} ID ${id}.`);
  };
  const checkRef = (kind, value, file, pointer, removal = false) => {
    if (typeof value !== "string") return;
    if (value.startsWith("@")) {
      if (removal && catalogs[kind]?.has(value.slice(1))) return;
      checkId(kind,value.slice(1),file,pointer);
    } else if (!removal && removedNames[kind]?.has(value.toLowerCase())) {
      add(errors,file,pointer,`${value} is removed by this submission and cannot be used here.`);
    }
  };
  function checkReferences(node, file, pointer = "") {
    if (!node || typeof node !== "object") return;
    for (const [key,value] of Object.entries(node)) {
      const p = `${pointer}/${escapePointer(key)}`;
      if (key === "extra") continue;
      const entityFields = {species:"pokemon",baseSpecies:"pokemon",requiredPokemon:"pokemon",ability:"abilities",item:"items",move:"moves"};
      if (entityFields[key]) checkRef(entityFields[key],value,file,p);
      if (["primary","secondary","hidden"].includes(key) && pointer.endsWith("/abilities")) checkRef("abilities",value,file,p);
      if (["moves","removedMoves","requiredItems"].includes(key) && Array.isArray(value)) value.forEach((v,i) => checkRef(key === "requiredItems" ? "items" : "moves",v,file,`${p}/${i}`,key === "removedMoves"));
      if (key === "name" && /\/(maxMove|zMove)$/.test(pointer)) checkRef("moves",value,file,p);
      if (key === "locationId" || key === "parentId") checkId("locations",value,file,p);
      if (key === "trainerId") checkId("trainers",value,file,p);
      if (["ruleIds","sourceIds","locationIds"].includes(key) && Array.isArray(value)) value.forEach((v,i) => checkId(key === "ruleIds" ? "rules" : key === "sourceIds" ? "sources" : "locations",v,file,`${p}/${i}`));
      // Extra data and rule parameters are preserved for human review; only declared reference keys are checked.
      checkReferences(value,file,p);
    }
  }
  for (const [name,data] of Object.entries(documents)) {
    const file = filenames[name]; checkReferences(data,file);
    inspectValues(data,(value,pointer) => {
      if (value === null) add(gaps,file,pointer,"Unknown value. Supply a known value or explain its absence explicitly before readiness review.");
      if (pointer.endsWith("/unknowns") && Array.isArray(value) && value.length) add(gaps,file,pointer,"Resolve or discuss the listed uncertainties before readiness review.");
    });
  }
  const finishedLocations = new Set();
  mod.locations.forEach((location,index) => {
    const seen = new Set(); let current = location.id;
    while (current && catalogs.locations.has(current) && !finishedLocations.has(current)) {
      if (seen.has(current)) { add(errors,filenames.mod,`/locations/${index}/parentId`,"Location parents form a cycle."); break; }
      seen.add(current); current = catalogs.locations.get(current).parentId;
    }
    seen.forEach(id => finishedLocations.add(id));
  });
  for (const name of categories) {
    const seenBases = new Set();
    documents[name].records.forEach((record,index) => {
      const file = filenames[name], p = `/records/${index}`;
      if (record.base?.startsWith("@")) add(errors,file,p+"/base","Use the original base game identity here. Local references do not define an inheritance chain.");
      if (record.base) {
        const base = record.base.toLowerCase();
        if (seenBases.has(base)) add(errors,file,p+"/base","This base record already has an action in this file. Combine the changes into one record.");
        seenBases.add(base);
      }
      if (record.action === "remove") return;
      if (["abilities","moves","items","rules"].includes(name)) add(review,file,p,"New or changed behavior needs integration review. A valid submission does not implement it in the app.");
      if (name === "pokemon" && record.action === "add") {
        const required = mod.project.baseGeneration === 1 ? ["hp","atk","def","spc","spe"] : ["hp","atk","def","spa","spd","spe"];
        for (const stat of required) if (!own(record.baseStats || {},stat)) add(errors,file,p+"/baseStats",`Added species must provide ${stat}.`);
      }
      if (name === "trainers" && record.pokemon) {
        const declared = record.pokemon.some(pokemon => own(pokemon,"slot"));
        if (declared && record.pokemon.some((pokemon,i,all) => !Number.isInteger(pokemon.slot) || pokemon.slot > all.length || all.filter(other => other.slot === pokemon.slot).length !== 1)) add(errors,file,p+"/pokemon","Slots must be unique, complete, and consecutive from 1 through the team size.");
        record.pokemon.forEach((pokemon,i) => {
          const pp = p+`/pokemon/${i}`, legacy = mod.project.baseGeneration <= 2;
          if (legacy && own(pokemon,"ivs") || !legacy && (own(pokemon,"dvs") || own(pokemon,"statExperience"))) add(errors,file,pp,"Use DVs and statExperience for Generations 1 and 2, or IVs and EVs for later generations.");
          if (legacy && own(pokemon,"evs")) add(errors,file,pp+"/evs","Use statExperience for legacy effort values.");
          if (!own(pokemon,legacy?"dvs":"ivs")) add(gaps,file,pp,"Record the actual DVs or IVs; omitted values are not assumed perfect.");
          if (!own(pokemon,legacy?"statExperience":"evs")) add(gaps,file,pp,"Record the actual effort values, including explicit zeros when appropriate.");
          for (const field of [legacy?"dvs":"ivs",legacy?"statExperience":"evs"]) {
            const spread = pokemon[field];
            const required = legacy ? (field === "dvs" ? ["atk","def","spc","spe"] : ["hp","atk","def","spc","spe"]) : ["hp","atk","def","spa","spd","spe"];
            if (spread && typeof spread === "object") for (const stat of required) if (!own(spread,stat)) add(gaps,file,pp+`/${field}/${stat}`,"Supply every stat or use one number to give all stats the same value.");
          }
          const effort = pokemon.evs;
          const effortTotal = typeof effort === "number" ? effort * 6 : effort ? Object.values(effort).reduce((sum,value) => sum+(value || 0),0) : 0;
          if (effortTotal > 510) add(review,file,pp+"/evs","This spread exceeds the normal EV total. Document the changed limit in rules.yaml.");
          if (pokemon.level > 100 || pokemon.moves.length > 4) add(review,file,pp,"This team entry exceeds ordinary calculator limits and needs a documented rule and integration review.");
        });
        if (!["Single","Double"].includes(record.battleType) || record.pokemon.length > 6 || mod.project.baseGeneration < 3 && record.battleType === "Double") add(review,file,p,"This battle format or team size needs integration beyond the current trainer pack importer.");
      }
      if (name === "encounters" && record.slots) {
        const slotIds = new Set(); let total = 0;
        record.slots.forEach((slot,i) => {
          const sp = p+`/slots/${i}`;
          if (slotIds.has(slot.id)) add(errors,file,sp+"/id","Encounter slot IDs must be unique within a table."); slotIds.add(slot.id);
          if (slot.level && slot.level.min > slot.level.max) add(errors,file,sp+"/level","Minimum level exceeds maximum level.");
          if (record.rateMode === "percent") {
            if (typeof slot.rate !== "number") add(errors,file,sp+"/rate","Percent tables need a numeric rate for every slot."); else total += slot.rate;
            if (own(slot,"weight")) add(errors,file,sp+"/weight","Use rate, not weight, in a percent table.");
          } else if (record.rateMode === "weight") {
            if (typeof slot.weight !== "number") add(errors,file,sp+"/weight","Weighted tables need a numeric weight for every slot."); else total += slot.weight;
            if (own(slot,"rate")) add(errors,file,sp+"/rate","Use weight, not rate, in a weighted table.");
          } else if (own(slot,"rate") || own(slot,"weight")) add(errors,file,sp,"Static tables do not use rate or weight fields.");
          if (record.kind === "trade" && !slot.requiredPokemon) add(gaps,file,sp+"/requiredPokemon","Record the Pokémon the player must offer for this trade.");
        });
        if (record.kind === "random" && record.rateMode === "none") add(errors,file,p+"/rateMode","Random tables need percent or weight rates.");
        if (record.rateMode === "percent" && Math.abs(total-100) > 0.000001) add(errors,file,p+"/slots",`Rates total ${total}%. Supply the entire condition table so rates total 100%.`);
        if (record.rateMode === "weight" && total <= 0) add(errors,file,p+"/slots","Total encounter weight must be positive.");
      }
      if (record.multiHit && record.multiHit.min > record.multiHit.max) add(errors,file,p+"/multiHit","Minimum hit count exceeds maximum hit count.");
    });
  }
  if (mod.status !== "ready") add(gaps,filenames.mod,"/status","Submission is marked draft. Complete the checklist before marking it ready.");
  if (mod.permission.redistribution !== "allowed") add(gaps,filenames.mod,"/permission/redistribution","Redistribution permission needs review.");
  return report();
}

function main() {
  const args = process.argv.slice(2);
  if (args.includes("--help") || !args.length) {
    console.log("Usage: npm run validate:mod -- <submission folder> [--ready] [--json]\nChecks the nine YAML or JSON files without importing data or running a mod. --ready also rejects completeness gaps.");
    process.exitCode = args.includes("--help") ? 0 : 1; return;
  }
  const flags = args.filter(arg => arg.startsWith("--"));
  if (flags.some(arg => !["--ready","--json"].includes(arg)) || args.filter(arg => !arg.startsWith("--")).length !== 1) throw new Error("Supply one folder and only the supported --ready or --json flags. Use --help for details.");
  const result = validateSubmission(args.find(arg => !arg.startsWith("--")));
  if (args.includes("--json")) console.log(JSON.stringify(result,null,2));
  else {
    for (const [category,value] of Object.entries(result.counts)) console.log(`${category}: ${value.coverage}, ${value.records} records`);
    for (const [label,issues] of [["ERROR",result.errors],["INCOMPLETE",result.gaps],["REVIEW",result.review]]) {
      issues.slice(0,40).forEach(issue => console.log(`${label} ${issue.file} ${issue.field}: ${issue.message}`));
      if (issues.length > 40) console.log(`${issues.length-40} additional ${label} entries. Use --json for the full report.`);
    }
    console.log(result.valid ? result.ready ? "Format and completeness checks passed. Project facts, base game names, and runtime support still require review." : "Format checks passed. The submission has completeness gaps." : "Submission needs corrections.");
  }
  process.exitCode = !result.valid ? 1 : args.includes("--ready") && !result.ready ? 2 : 0;
}

if (process.argv[1] && pathToFileURL(path.resolve(process.argv[1])).href === import.meta.url) {
  try { main(); } catch (error) { console.error(`Submission check failed: ${error.message}`); process.exitCode = 1; }
}
