import type {Atom, AtomDictionary, AtomSchema, ClassName, ClassNameAliases, NativeStyleSheet} from './quantum/types';
import type {ReactElement} from 'react-native/flow/react';

import React from 'react';
import {StyleSheet} from 'react-native';
import isFunction from 'virtual-lodash/isFunction';
import {QuantumContext} from './QuantumContext';
import {ATOMS_SCHEMAS} from './quantum/atoms-schemas';
import {AtomGroupName} from './quantum/variables';
import {filterAtomsByGroups} from './quantum/utils';
import {ALIASES_SCHEMA, createAliases} from './quantum/aliases';

export const CLASS_NAME_DELIMITER=/\s+/;

function createAtomDictionary(schemas: AtomSchema[]): AtomDictionary {
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

function createStyleSheet(atomDictionary: AtomDictionary): NativeStyleSheet {
  const scalarStyles = {};
  for (const name in atomDictionary) {
    const atom = atomDictionary[name];
    if (atom.scalar) {
      scalarStyles[name] = {[atom.property]: atom.getValue()};
    }
  }
  return StyleSheet.create(scalarStyles);
}

export function resolveAliases(className: ClassName, aliases: ClassNameAliases) {
  console.info(aliases)
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

export function createStyle(
  atoms: Atom[],
  styleSheet: NativeStyleSheet,
  element: ReactElement
) {
  const style = [];
  for (const atom of atoms) {
    if (atom.name in styleSheet) {
      // Scalar atoms are cached in StyleSheet.
      style.push(styleSheet[atom.name]);
    } else {
      // Compute atom value on the fly.
      style.push({[atom.property]: atom.getValue(atoms, element)});
    }
  }
  style.push(element.props.style);
  return style;
}

const atomDictionary = createAtomDictionary(ATOMS_SCHEMAS);
const styleSheet = createStyleSheet(atomDictionary);
const classNamesAliases = createAliases(ALIASES_SCHEMA);

export function filterAtomsByViewGroup(atoms: Atom[]) {
  return filterAtomsByGroups(atoms, [AtomGroupName.VIEW]);
}

export function MobileQuantumContext({children}) {
  return (
    <QuantumContext atomDictionary={atomDictionary}
                    styleSheet={styleSheet}
                    classNamesAliases={classNamesAliases}>
      {children}
    </QuantumContext>
  );
}