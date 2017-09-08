import type {
  Atom,
  AtomDictionary,
  AtomGroup,
  AtomSchema,
  AtomSchemaOptions,
  AtomValueSchema,
  CssProperty
} from './QuantumTypes';
import filter from 'virtual-lodash/filter';
import includes from 'virtual-lodash/includes';
import isFunction from 'virtual-lodash/isFunction';

export function createAtomSchemaList(atomsSchemas: AtomSchema[]) {
  const atomSchemaList = [];
  for (const atomSchema of atomsSchemas) {
    atomSchemaList.push(createAtomSchema(...atomSchema));
  }
  return atomSchemaList;
}

export function isEqualAtoms(atomsA: Atom[], atomsB: Atom[]): boolean {
  if (atomsA.length === atomsB.length) {
    aLabel: for (const aProp of atomsA) {
      for (const bProp of atomsB) {
        if (aProp.name === bProp.name) {
          continue aLabel;
        }
      }
      return false;
    }
  }
  return true;
}

/*
* creates object that contains all information about Atom
* */
export function createAtomSchema(
  property: CssProperty,
  abbrev: string,
  values: AtomValueSchema[],
  options: AtomSchemaOptions = {
    groups: [],
    heritable: false
  }
): AtomSchema {
  return {
    property,
    abbrev,
    values,
    ...options
  };
}

/*
* Filters atoms by given array of AtomGroup (e.g. TEXT, LAYOUT, etc.)
* */
export function filterAtomsByGroups(atoms: Atom[], groups: AtomGroup[]): Atom[] {
  const filterAtoms = atom => {
    for (const group of groups) {
      if (!atom.groups::includes(group)) {
        return false;
      }
    }
    return true;
  };
  return atoms::filter(filterAtoms);
}

/*
* Filters atoms that have heritable option set to true
* */
export function filterHeritableAtoms(atoms: Atom[]): Atom[] {
  const filterAtoms = atom => atom.heritable;
  return atoms::filter(filterAtoms);
}

/*
* creates object of AtomDictionary type
* */
export function createAtomDictionary(schemas: AtomSchema[]): AtomDictionary {
  const atomDictionary = {};
  for (const schema of schemas) {
    const {property, abbrev, values, groups, heritable} = schema;
    for (const {value, alias} of values) {
      const name = `${abbrev}${alias}`;
      const scalar = !value::isFunction();
      const atom: Atom = {
        name,
        property,
        scalar,
        groups,
        heritable,
        getValue: scalar ? () => value : value
      };
      atomDictionary[name] = atom;
    }
  }
  return atomDictionary;
}
