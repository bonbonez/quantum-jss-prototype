import type {Atom, AtomDictionary, ClassName} from './QuantumTypes';
import isString from 'virtual-lodash/isString';
import trim from 'virtual-lodash/trim';

export const CLASS_NAME_DELIMITER=/\s+/;

export function isValidClassNamesProperty(classNames: string) {
  return classNames::isString() && classNames::trim();
}

export function splitClassNames(className: ClassName): ClassName[] {
  if (className::isString() && className::trim()) {
    return className.split(CLASS_NAME_DELIMITER);
  }
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
