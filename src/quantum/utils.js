import type {AtomGroup, AtomSchema, AtomSchemaOptions, AtomValueSchema, CssProperty} from './types';
import {AtomGroupName} from './variables';

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