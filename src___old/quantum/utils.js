import type {Atom, AtomGroup, AtomSchema, AtomSchemaOptions, AtomValueSchema, CssProperty} from './types';
import filter from 'virtual-lodash/filter';
import includes from 'virtual-lodash/includes';

const DASH_SEPARATOR = '-';

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
export function filterAtomsByGroups(atoms: Atom[], groups: AtomGroup[]): Atom[] {
  return atoms::filter(atom => {
    for (const group of groups) {
      if (!atom.groups::includes(group)) {
        return false;
      }
    }
    return true;
  });
}

export function filterHeritableAtoms(atoms: Atom[]): Atom[] {
  const filterAtoms = atom => atom.heritable;
  return atoms::filter(filterAtoms);
}