import type * as I from './interface';

import {Generations} from './index';
import {ABILITY_DATA, ITEM_DATA, MOVE_DATA, SPECIES_DATA} from './royal-sword-data';
import {toID} from '../util';

class RoyalSwordData<T extends {readonly id: I.ID}> {
  private readonly base: Iterable<T> & {get(id: I.ID): T | undefined};
  private readonly patches: ReadonlyMap<I.ID, T>;

  constructor(
    base: Iterable<T> & {get(id: I.ID): T | undefined},
    patches: readonly T[],
  ) {
    this.base = base;
    this.patches = new Map(patches.map(entry => [entry.id, Object.freeze(entry)]));
  }

  get(id: I.ID) {
    return this.patches.get(id) || this.base.get(id);
  }

  *[Symbol.iterator]() {
    for (const entry of this.base) yield this.patches.get(entry.id) || entry;
    for (const entry of this.patches.values()) {
      if (!this.base.get(entry.id)) yield entry;
    }
  }
}

function speciesData(base: I.Species): I.Specie[] {
  const forms = new Map<I.ID, I.SpeciesName[]>();
  for (const [name, parent] of SPECIES_DATA) {
    if (!parent) continue;
    const id = toID(parent);
    const list = forms.get(id) || [];
    list.push(name as I.SpeciesName);
    forms.set(id, list);
  }

  return SPECIES_DATA.map(([name, parent, stats, types, weightkg, abilities, gender, nfe]) => {
    const id = toID(name);
    const original = base.get(id);
    const otherFormes = [...new Set([...(original?.otherFormes || []), ...(forms.get(id) || [])])];
    const [hp, atk, def, spa, spd, spe] = stats;
    return {
      ...original,
      kind: 'Species',
      id,
      name: (original?.name || name) as I.SpeciesName,
      baseSpecies: (parent || original?.baseSpecies) as I.SpeciesName | undefined,
      types: [...types],
      baseStats: Object.freeze({hp, atk, def, spa, spd, spe}),
      weightkg,
      gender: gender || undefined,
      nfe,
      abilities: Object.freeze({
        0: (abilities[0] || '') as I.AbilityName | '',
        1: abilities[1] as I.AbilityName | undefined,
        H: abilities[2] as I.AbilityName | undefined,
      }),
      ...(otherFormes.length ? {otherFormes} : {}),
    };
  });
}

function moveData(base: I.Moves): I.Move[] {
  return MOVE_DATA.flatMap(row => {
    const [name, type, category, power, accuracy, pp, priority, usable, status, stat] = row;
    const id = toID(name);
    const original = base.get(id);
    if (!original && !usable) return [];
    return [{
      ...original,
      kind: 'Move',
      id,
      name: (original?.name || name) as I.MoveName,
      flags: original?.flags || {},
      type,
      category,
      basePower: power,
      accuracy: accuracy > 100 ? true : accuracy,
      pp,
      priority,
      ...(status !== null && {statusChance: status}),
      ...(stat !== null && {statChance: stat}),
    }];
  });
}

class RoyalSwordGeneration implements I.Generation {
  readonly num = 8;
  readonly game = 'royal-sword';
  readonly abilities: I.Abilities;
  readonly items: I.Items;
  readonly moves: I.Moves;
  readonly species: I.Species;
  readonly types: I.Types;
  readonly natures: I.Natures;

  constructor(base: I.Generation) {
    this.abilities = new RoyalSwordData<I.Ability>(base.abilities, ABILITY_DATA.map(name => ({
      kind: 'Ability', id: toID(name), name: name as I.AbilityName,
    })));
    this.items = new RoyalSwordData<I.Item>(base.items, ITEM_DATA.map(([name, megaStone]) => {
      const id = toID(name);
      return {
        ...base.items.get(id),
        kind: 'Item',
        id,
        name: name as I.ItemName,
        ...(megaStone && {megaStone: Object.freeze(megaStone)}),
      };
    }));
    this.moves = new RoyalSwordData(base.moves, moveData(base.moves));
    this.species = new RoyalSwordData(base.species, speciesData(base.species));
    this.types = base.types;
    this.natures = base.natures;
  }
}

const royalSword = new RoyalSwordGeneration(Generations.get(8));

/** Battle data for the Royal Sword profile. */
export const RoyalSwordGenerations: I.Generations = Object.freeze({
  get(gen: I.GenerationNum) {
    return gen === 8 ? royalSword : Generations.get(gen);
  },
});
