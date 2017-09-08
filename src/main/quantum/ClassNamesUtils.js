import type {Atom, AtomDictionary, ClassName, ClassNameAliasesSchema} from './QuantumTypes';
import isEmpty from 'virtual-lodash/isEmpty';
import isObjectLike from 'virtual-lodash/isObjectLike';
import isString from 'virtual-lodash/isString';
import trim from 'virtual-lodash/trim';

export const CLASS_NAME_DELIMITER=/\s+/;

export function splitClassNames(className: ClassName): ClassName[] {
  if (className::isString() && className::trim()) {
    return className.split(CLASS_NAME_DELIMITER);
  }
}

export function resolveAliases(classNames: ClassName[], aliases: ClassNameAliasesSchema = []) {
  for (let i = classNames.length; i >= 0; --i) {
    if (classNames[i] in aliases) {
      classNames.splice(i, 1, ...aliases[classNames[i]]);
    }
  }
  return classNames;
}

export function parseClassName(classNames: ClassName[], atomDictionary: AtomDictionary): Atom[] {
  return classNames.map(className => {
    if (className in atomDictionary) {
      return atomDictionary[className];
    } else {
      throw new Error(`Unknown class name ${className}`);
    }
  });
}
