import type {Atom, AtomDictionary, ClassName, ClassNameAliasesSchema} from './QuantumTypes';

export const CLASS_NAME_DELIMITER=/\s+/;

export function resolveAliases(className: ClassName, aliases: ClassNameAliasesSchema) {
  const classNames = className.split(CLASS_NAME_DELIMITER);
  for (let i = 0; i < classNames.length; ++i) {
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
