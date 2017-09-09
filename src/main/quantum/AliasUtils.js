import type {AtomName, ClassName} from './QuantumTypes';
import {CLASS_NAME_DELIMITER} from './ClassNamesUtils';

type ClassNameAlias = AtomName[];

type ClassNameAliasesSchema = {
  [name: string]: ClassNameAlias
}

export function createClassNameAlias(classNames: ClassName): ClassNameAlias {
  return classNames.split(CLASS_NAME_DELIMITER)
}

export function createAliases(aliases): ClassNameAliasesSchema {
  const result = {};
  for (const alias in aliases) {
    result[alias] = createClassNameAlias(aliases[alias]);
  }
  return result;
}

export function resolveAliases(classNames: ClassName[], aliases: ClassNameAliasesSchema) {
  for (let i = classNames.length; i >= 0; --i) {
    if (classNames[i] in aliases) {
      classNames.splice(i, 1, ...aliases[classNames[i]]);
    }
  }
  return classNames;
}
