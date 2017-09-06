import {AtomGroupName} from './variables';

const DASH_SEPARATOR = '-';

type AtomSchema = {
  propertyName: string,
  propertyAbbreviation: string,
  propertyValues: [],
  propertyGroup: [],
  options: AtomSchemaOptions
};

type AtomSchemaOptions = {
  heritable: boolean
};

// todo: rename to AtomSchema everywhere
export function createAtomSchema(
  propertyName,
  propertyAbbreviation,
  propertyValues,
  propertyGroup = [AtomGroupName.VIEW],
  {heritable = false}: AtomSchemaOptions = {}
): AtomSchema {
  return {
    propertyName,
    propertyAbbreviation,
    propertyValues: propertyValues.map(mapAtomValue),
    propertyGroup,
    heritable
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

export function iterateAtomSchemas(atomsSchemas, callback) {
  atomsSchemas.forEach(atomSchema => {
    atomSchema.propertyValues.forEach(propertyValue => {
      callback(atomSchema, propertyValue);
    });
  });
};