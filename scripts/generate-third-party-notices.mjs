import fs from "node:fs";
import path from "node:path";
import process from "node:process";
import {fileURLToPath} from "node:url";

const scriptDirectory = path.dirname(fileURLToPath(import.meta.url));
const repositoryRoot = path.resolve(scriptDirectory, "..");
const outputPath = path.join(repositoryRoot, "THIRD_PARTY_NOTICES.md");
const checkOnly = process.argv.includes("--check");

const scopes = [
  {id: "root", directory: repositoryRoot},
  {id: "calc", directory: path.join(repositoryRoot, "calc")},
  {id: "import", directory: path.join(repositoryRoot, "import")},
];

function readJson(filePath) {
  return JSON.parse(fs.readFileSync(filePath, "utf8"));
}

function compareStrings(left, right) {
  if (left < right) return -1;
  if (left > right) return 1;
  return 0;
}

function normalizeLicenseValue(value) {
  if (typeof value === "string" && value.trim()) return value.trim().replace(/\s+/g, " ");
  if (value && typeof value === "object" && typeof value.type === "string") {
    return normalizeLicenseValue(value.type);
  }
  return "";
}

function declaredLicense(packageMetadata, lockEntry, identity) {
  let value = normalizeLicenseValue(packageMetadata?.license);
  if (!value && Array.isArray(packageMetadata?.licenses)) {
    const alternatives = packageMetadata.licenses
      .map(normalizeLicenseValue)
      .filter(Boolean);
    if (alternatives.length) value = alternatives.join(" OR ");
  }
  if (!value) value = normalizeLicenseValue(lockEntry.license);
  if (!value) {
    throw new Error(`No declared license metadata for locked package ${identity}`);
  }
  return value;
}

function packageNameFromLockPath(lockPath) {
  const marker = "node_modules/";
  return lockPath.slice(lockPath.lastIndexOf(marker) + marker.length);
}

function installedPackageMetadata(scope, lockPath, lockEntry) {
  const packageJsonPath = path.join(
    scope.directory,
    ...lockPath.split("/"),
    "package.json"
  );
  if (!fs.existsSync(packageJsonPath)) return null;

  const metadata = readJson(packageJsonPath);
  if (metadata.version !== lockEntry.version) {
    throw new Error(
      `${scope.id}: installed ${metadata.name}@${metadata.version} does not match ` +
      `the lockfile version ${lockEntry.version} at ${lockPath}`
    );
  }
  return metadata;
}

function licenseFiles(packageDirectory) {
  if (!fs.existsSync(packageDirectory)) return [];
  return fs.readdirSync(packageDirectory, {withFileTypes: true})
    .filter(entry => entry.isFile() && /^(licen[cs]e|copying|notice)(\.|$)/i.test(entry.name))
    .map(entry => entry.name)
    .sort(compareStrings);
}

function normalizeProjectUrl(value) {
  if (!value) return "";
  let url = typeof value === "string" ? value : value.url;
  if (!url || typeof url !== "string") return "";

  url = url.trim();
  if (url.startsWith("github:")) url = `https://github.com/${url.slice("github:".length)}`;
  if (/^[\w.-]+\/[\w.-]+$/.test(url)) url = `https://github.com/${url}`;
  url = url.replace(/^git\+/, "").replace(/^git:\/\/github\.com\//, "https://github.com/");
  url = url.replace(/\.git(#.*)?$/, "$1");
  return /^https?:\/\//.test(url) ? url : "";
}

function projectUrl(name, metadata) {
  return normalizeProjectUrl(metadata?.repository) ||
    normalizeProjectUrl(metadata?.homepage) ||
    `https://www.npmjs.com/package/${name}`;
}

function markdownTableCell(value) {
  return String(value)
    .replace(/\\/g, "\\\\")
    .replace(/\|/g, "\\|")
    .replace(/\r\n?|\n/g, " ");
}

function loadScopes() {
  return scopes.map(scope => {
    const manifest = readJson(path.join(scope.directory, "package.json"));
    const lock = readJson(path.join(scope.directory, "package-lock.json"));
    if (!lock.packages || typeof lock.packages !== "object") {
      throw new Error(`${scope.id}: package-lock.json has no packages inventory`);
    }
    return {...scope, manifest, lock};
  });
}

function collectLockedPackages(loadedScopes) {
  const packages = new Map();

  for (const scope of loadedScopes) {
    for (const [lockPath, lockEntry] of Object.entries(scope.lock.packages)) {
      if (!lockPath.includes("node_modules/")) continue;

      const name = packageNameFromLockPath(lockPath);
      const version = lockEntry.version;
      if (!version) throw new Error(`${scope.id}: ${lockPath} has no locked version`);
      const identity = `${name}@${version}`;
      const metadata = installedPackageMetadata(scope, lockPath, lockEntry);
      const license = declaredLicense(metadata, lockEntry, identity);
      const key = identity;
      const tag = `${scope.id}:${lockEntry.dev === true ? "dev" : "prod"}` +
        `${lockEntry.optional === true ? ":optional" : ""}`;

      if (!packages.has(key)) {
        packages.set(key, {name, version, license, tags: new Set()});
      } else if (packages.get(key).license !== license) {
        throw new Error(
          `Conflicting declared licenses for ${identity}: ` +
          `${packages.get(key).license} and ${license}`
        );
      }
      packages.get(key).tags.add(tag);
    }
  }

  return [...packages.values()].sort((left, right) =>
    compareStrings(left.name, right.name) || compareStrings(left.version, right.version)
  );
}

function collectDirectDependencies(loadedScopes) {
  const direct = [];

  for (const scope of loadedScopes) {
    for (const manifestField of ["dependencies", "devDependencies"]) {
      const requested = scope.manifest[manifestField] || {};
      for (const name of Object.keys(requested).sort(compareStrings)) {
        const lockPath = `node_modules/${name}`;
        const lockEntry = scope.lock.packages[lockPath];
        if (!lockEntry) throw new Error(`${scope.id}: direct dependency ${name} is not locked`);

        const packageDirectory = path.join(scope.directory, "node_modules", ...name.split("/"));
        const packageJsonPath = path.join(packageDirectory, "package.json");
        if (!fs.existsSync(packageJsonPath)) {
          throw new Error(`${scope.id}: direct dependency ${name} is not installed`);
        }
        const metadata = readJson(packageJsonPath);
        if (metadata.version !== lockEntry.version) {
          throw new Error(
            `${scope.id}: direct dependency ${name}@${metadata.version} does not match ` +
            `locked version ${lockEntry.version}`
          );
        }

        const identity = `${name}@${metadata.version}`;
        direct.push({
          scope: scope.id,
          kind: manifestField === "dependencies" ? "dependency" : "development dependency",
          name,
          requested: requested[name],
          version: metadata.version,
          license: declaredLicense(metadata, lockEntry, identity),
          url: projectUrl(name, metadata),
          licenseFiles: licenseFiles(packageDirectory),
        });
      }
    }
  }

  return direct.sort((left, right) =>
    compareStrings(left.scope, right.scope) ||
    compareStrings(left.kind, right.kind) ||
    compareStrings(left.name, right.name)
  );
}

function renderDirectTable(directDependencies) {
  const lines = [
    "| Tree | Manifest role | Direct project | Requested | Resolved | Declared license | Local license evidence |",
    "| --- | --- | --- | --- | --- | --- | --- |",
  ];

  for (const dependency of directDependencies) {
    const evidence = dependency.licenseFiles.length
      ? `package metadata; ${dependency.licenseFiles.map(file => `\`${file}\``).join(", ")}`
      : "package metadata";
    lines.push(
      `| ${markdownTableCell(dependency.scope)} ` +
      `| ${markdownTableCell(dependency.kind)} ` +
      `| [\`${markdownTableCell(dependency.name)}\`](${dependency.url}) ` +
      `| \`${markdownTableCell(dependency.requested)}\` ` +
      `| \`${markdownTableCell(dependency.version)}\` ` +
      `| \`${markdownTableCell(dependency.license)}\` ` +
      `| ${markdownTableCell(evidence)} |`
    );
  }
  return lines.join("\n");
}

function groupByLicense(lockedPackages) {
  const groups = new Map();
  for (const dependency of lockedPackages) {
    if (!groups.has(dependency.license)) groups.set(dependency.license, []);
    groups.get(dependency.license).push(dependency);
  }
  return [...groups.entries()].sort(([left], [right]) => compareStrings(left, right));
}

function renderLicenseSummary(groups) {
  const lines = [
    "| Declared package license or expression | Distinct package/version identities |",
    "| --- | ---: |",
  ];
  for (const [license, dependencies] of groups) {
    lines.push(`| \`${markdownTableCell(license)}\` | ${dependencies.length} |`);
  }
  return lines.join("\n");
}

function renderCompleteInventory(groups) {
  const sections = [];
  for (const [license, dependencies] of groups) {
    sections.push(`### ${license} (${dependencies.length})`, "");
    for (const dependency of dependencies) {
      const tags = [...dependency.tags].sort(compareStrings).join(", ");
      sections.push(`- \`${dependency.name}@${dependency.version}\` — ${tags}`);
    }
    sections.push("");
  }
  return sections.join("\n").trimEnd();
}

function renderNotice(loadedScopes) {
  const directDependencies = collectDirectDependencies(loadedScopes);
  const lockedPackages = collectLockedPackages(loadedScopes);
  const groups = groupByLicense(lockedPackages);
  const lockEntryCount = loadedScopes.reduce(
    (total, scope) => total + Object.keys(scope.lock.packages)
      .filter(lockPath => lockPath.includes("node_modules/"))
      .length,
    0
  );

  return `# Third-Party Notices

<!-- Generated by scripts/generate-third-party-notices.mjs. Do not edit by hand. -->

KM Companion depends on and bundles software maintained by other projects. This notice records the direct npm projects and the declared package license categories in the root, calculator engine, and save import dependency trees.

The combined calculator uses [GNU GPL version 3](LICENSE). The original Honko, contributor, and Matroskin MIT notices are preserved in [\`LICENSES/MIT-legacy.txt\`](LICENSES/MIT-legacy.txt). Separately licensed components retain their terms; see [\`LICENSING.md\`](LICENSING.md) for scope and compatibility.

Project links and declared package license values below are attribution and inventory data. They are not assertions that a package author, maintainer, or repository owner is the sole copyright holder. Each project and each incorporated file remains subject to its own license text and notices.

## Bundled Browser Libraries And Styles

| Bundled project | Version | License used by this distribution | Repository location | Evidence retained with the bundle |
| --- | --- | --- | --- | --- |
| [jQuery](https://jquery.com/) | 1.9.1 | MIT | \`src/js/vendor/jquery-1.9.1.min.js\` | The minified file retains its jQuery Foundation copyright and license header. |
| [Select2](https://github.com/select2/select2) | 3.4.5 | Apache-2.0 option from \`Apache-2.0 OR GPL-2.0-only\` | \`src/js/vendor/select2/\` | The JavaScript and CSS retain the distributed Igor Vaynberg copyright, version, and dual license header. |
| [normalize.css](https://github.com/necolas/normalize.css) | 3.0.2 | MIT | \`src/css/vendor/bootstrap.css\` | The legacy stylesheet retains the normalize.css version and MIT header. |
| [Legacy CSS derived from Bootstrap](https://github.com/twbs/bootstrap) | Exact upstream version not recorded | MIT | \`src/css/vendor/bootstrap.css\` | The repository history and Bootstrap component selectors identify the remainder of this legacy stylesheet; no exact release number is asserted here. |

## Direct NPM Projects

The resolved versions and license evidence come from the committed manifests and lockfiles plus each installed direct package's \`package.json\` and top level license/notice files. “Dependency” and “development dependency” reproduce the manifest classification; they do not make a claim about whether a bundler ultimately copies a package into a release artifact.

${renderDirectTable(directDependencies)}

## Locked NPM License Categories

The three npm lockfiles contain ${lockEntryCount} dependency locations and ${lockedPackages.length} distinct package/version identities. The summary and complete inventory below include every resolved lockfile identity, including optional packages retained for other operating systems. Consequently, this is intentionally broader than the set installed on any one machine or copied into any one binary.

License strings are reproduced from installed package metadata when available and from lockfile metadata otherwise. Compound expressions are preserved instead of being simplified to one license.

${renderLicenseSummary(groups)}

## Complete Locked NPM Package Inventory

Tags use \`root\`, \`calc\`, or \`import\` for the dependency tree; \`prod\` or \`dev\` reproduces the lockfile classification; and \`optional\` marks an optional lockfile entry.

${renderCompleteInventory(groups)}

## Other Distributed Notices

- Generated save import data has source revision and license notices in [\`import/THIRD_PARTY_NOTICES.md\`](import/THIRD_PARTY_NOTICES.md).
- The save importer's 127-byte Switch XOR constant uses PKHeX's GPLv3 terms; its pinned source and adaptation are identified in the same notice.
- The separate Windows installer retains its MIT code license and WiX MS-RL components. WiX is not linked into the calculator. See [\`LICENSING.md\`](LICENSING.md).
- Pokémon data, sprites, names, trademarks, artwork, ROM hack data, and other material outside npm are credited separately in [\`CREDITS.md\`](CREDITS.md); they are not relicensed by this file.
- Electron binary distributions include Electron's own \`LICENSE\` and \`LICENSES.chromium.html\`. The npm package's MIT declaration in this inventory is not a summary of every Chromium component license.
- This inventory is generated from package metadata and is not a substitute for reading the license and notice files distributed by each upstream project.
`;
}

const loadedScopes = loadScopes();
const rendered = renderNotice(loadedScopes).replace(/\r\n/g, "\n");

if (checkOnly) {
  if (!fs.existsSync(outputPath)) {
    console.error("THIRD_PARTY_NOTICES.md is missing; run npm run generate:third-party-notices");
    process.exitCode = 1;
  } else {
    const current = fs.readFileSync(outputPath, "utf8").replace(/\r\n/g, "\n");
    if (current !== rendered) {
      console.error("THIRD_PARTY_NOTICES.md is stale; run npm run generate:third-party-notices");
      process.exitCode = 1;
    } else {
      console.log("THIRD_PARTY_NOTICES.md is current.");
    }
  }
} else {
  fs.writeFileSync(outputPath, rendered, "utf8");
  console.log(`Wrote ${path.relative(repositoryRoot, outputPath)}.`);
}
