import type {ClassName, ClassNameAlias, ClassNameAliases} from './types';
import {CLASS_NAME_DELIMITER} from './class-names';

export function createClassNameAlias(classNames: ClassName): ClassNameAlias {
  return classNames.split(CLASS_NAME_DELIMITER)
}

export function createAliases(aliases): ClassNameAliases {
  const result = {};
  for (const alias in aliases) {
    result[alias] = createClassNameAlias(aliases[alias]);
  }
  return result;
}