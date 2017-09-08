import type {ClassName, ClassNameAlias, ClassNameAliasesSchema} from './QuantumTypes';
import {CLASS_NAME_DELIMITER} from './ClassNamesUtils';

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
