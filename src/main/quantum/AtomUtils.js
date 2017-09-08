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
import isArray from 'virtual-lodash/isArray';

export function isEqualAtoms(atomsA: Atom[], atomsB: Atom[]): boolean {
  if (!atomsA::isArray() || !atomsB::isArray()) {
    return null;
  }

  atomsACheck: for (let i = 0; i < atomsA.length; ++i) {
    for (let j = 0; j < atomsB.length; ++j) {
      if (atomsA[i].name === atomsB[j].name) {
        continue atomsACheck;
      }
    }
    return false;
  }

  atomsBCheck: for (let i = 0; i < atomsB.length; ++i) {
    for (let j = 0; j < atomsA.length; ++j) {
      if (atomsB[i].name === atomsA[j].name) {
        continue atomsBCheck;
      }
    }
    return false;
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
    groups: []
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
* creates object of AtomDictionary type
* */
export function createAtomDictionary(schemas: AtomSchema[]): AtomDictionary {
  const atomDictionary = {};
  for (const schema of schemas) {
    const {property, abbrev, values, groups} = schema;
    for (const {value, alias} of values) {
      const name = `${abbrev}${alias}`;
      const scalar = !value::isFunction();
      const atom: Atom = {
        name,
        property,
        scalar,
        groups,
        getValue: scalar ? () => value : value
      };
      atomDictionary[name] = atom;
    }
  }
  return atomDictionary;
}
