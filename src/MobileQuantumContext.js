import type {
  Atom,
  AtomDictionary,
  AtomGroup,
  AtomSchema,
  ClassName,
  CssProperty,
  NativeStyleSheet
} from './quantum/types';
import type {ReactElement} from 'react-native/flow/react';

import React from 'react';
import {StyleSheet} from 'react-native';
import isFunction from 'virtual-lodash/isFunction';
import filter from 'virtual-lodash/filter';
import includes from 'virtual-lodash/includes';
import isArray from 'virtual-lodash/isArray';
import map from 'virtual-lodash/map';
import reduce from 'virtual-lodash/reduce';
import {QuantumContext} from './QuantumContext';
import {ATOMS_SCHEMAS} from './quantum/atoms-schemas';
import {AtomGroupName} from './quantum/variables';
import {Div} from './components/div/Div';

const CLASS_NAME_DELIMITER=/\s+/;

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

export function parseClassName(className: ClassName, atomDictionary: AtomDictionary): Atom[] {
  const atoms = className.split(CLASS_NAME_DELIMITER);
  for (let i = 0; i < atoms.length; ++i) {
    if (atoms[i] in atomDictionary) {
      atoms[i] = atomDictionary[atoms[i]];
    } else {
      throw new Error(`Unknown class name ${atoms[i]}`);
    }
  }
  return atoms;
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
  return style;
}

function concatClasses(...classes) {
  if (classes.length < 2) {
    return classes;
  }

  let result = [];
  for (let klass in classes) {

    result = [...result, ...klass]
  }
}

const atomDictionary = createAtomDictionary(ATOMS_SCHEMAS);
const styleSheet = createStyleSheet(atomDictionary);

export function filterAtomsByGroups(atoms: Atom[], groups: AtomGroup[], exceptGroups: AtomGroup[] = []): Atom[] {
  return atoms::filter(atom => {
    for (const exceptGroup of exceptGroups) {
      if (atom.groups::includes(exceptGroup)) {
        return false;
      }
    }
    for (const group of groups) {
      if (!atom.groups::includes(group)) {
        return false;
      }
    }
    return true;
  });
}

export function filterAtomsByViewGroup(atoms: Atom[]) {
  return filterAtomsByGroups(atoms, [AtomGroupName.VIEW]);
}

export function filterHeritableAtoms(atoms: Atom[]): Atom[] {
  return atoms::filter(atom => atom.heritable);
}

export function MobileQuantumContext(props) {
  return <QuantumContext {...props} atomDictionary={atomDictionary} styleSheet={styleSheet}/>
}