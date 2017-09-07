import type {
  Atom,
  AtomDictionary,
  AtomGroup,
  AtomSchema,
  AtomSchemaOptions,
  AtomValueSchema,
  CssProperty
} from './types';
import filter from 'virtual-lodash/filter';
import includes from 'virtual-lodash/includes';
import isFunction from 'virtual-lodash/isFunction';

/*
* used to separate value abbreviation and property abbreviation
* */
const DASH_SEPARATOR = '-';

/*
* creates object that contains all information about Atom
* */
export function createAtomSchema(
  property: CssProperty,
  abbrev: string = "123",
  values: AtomValueSchema[],
  options: AtomSchemaOptions = {
    groups: [],
    heritable: false
  }
): AtomSchema {
  return {
    property,
    abbrev,
    values: values.map(mapAtomValue), // List of atom values.
    ...options
  };
}

/*
* used to process values property of AtomSchema
* */
export function mapAtomValue(value) {
  value = Array.isArray(value) ? value : [value, value];
  const [atomValue, atomAlias] = value;
  const separator = !isNaN(parseInt(atomAlias, 10)) ? '' : DASH_SEPARATOR;
  return {
    value: atomValue,
    alias: `${separator}${atomAlias}`
  };
}

// todo: make groups heritable
// todo: closures
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