//@flow
import {StyleSheet} from 'react-native';
import {filter, includes, isArray, isString, join, map, find, reject, split, isFunction} from 'virtual-lodash';
import isNil from 'lodash/isNil';
import {ATOMS_SCHEMAS} from './quantum/atoms-schemas'; // TODO: ATOM_SCHEMAS
import {ALIASES} from './quantum/aliases';
import {AtomGroupName} from './quantum/variables';
import {iterateAtomSchemas} from './quantum/utils';
import identity from 'lodash/identity';

const S_DELIMITER = /\s+/;

const appStyles = createAppStyles(ATOMS_SCHEMAS);
const classNameAtomDictionary = createClassNameAtomDictionary(ATOMS_SCHEMAS);
const appStyleSheet = createAppStyleSheet(appStyles);

export function parseClassNames(...args) {
  return quantumToJss(args::filter(identity));
}

export function lookupAtomPropertyValue(propertyName) {
  const atom = this::map(getAtomSchemaByClassName)::find({propertyName});
  return atom ? atom.propertyValue : null;
}

function classNameToArray() {
  return this::isString() ? this::split(S_DELIMITER) : this;
}

function classNameToString() {
  return this::isArray() ? this : this::join(' ');
}

function quantumToJss(
  classNames: string | number| Array | Object,
  styles: Object = appStyleSheet,
  aliases: Object = ALIASES
) {
  if (classNames::isString()) {
    return parseStylesString(classNames, styles, aliases);
  }
  if (classNames::isArray()) {
    return classNames::map(className => quantumToJss(className, styles));
  }
  return classNames;
}

function parseStylesString(
  classNames: string,
  styles: Object,
  aliases: Object = {}
) {
  Object.keys(aliases).forEach(alias => classNames = classNames.replace(alias, aliases[alias]));

  return classNames::classNameToArray()::map(className => {
    const atomValue = getAtomValueByClassName(className);
    const {propertyName} = getAtomSchemaByClassName(className);
    if (atomValue::isFunction()) {
      console.info(atomValue(classNames::classNameToArray()));
    }
    return atomValue::isFunction() ? {[propertyName]: atomValue(classNames::classNameToArray())} : styles[className];
  })::filter(identity);
}

function createAppStyles(atomsSchemas) {
  const appStyles = {};
  iterateAtomSchemas(atomsSchemas, ({propertyName, propertyAbbreviation}, {value, alias}) => {
    appStyles[`${propertyAbbreviation}${alias}`] = {[propertyName]: value};
  });
  return appStyles;
}

function createClassNameAtomDictionary(atomsSchemas) {
  const classNameAtomDictionary = {};
  iterateAtomSchemas(atomsSchemas, (atomSchema, {value, alias}) => {
    classNameAtomDictionary[`${atomSchema.propertyAbbreviation}${alias}`] = {...atomSchema, propertyValue: value};
  });
  return classNameAtomDictionary;
}

function createAppStyleSheet(atoms) {
  let nativeStyles = {};
  let functionStyles = {};
  for (const atom in atoms) {
    if (getAtomValueByClassName(atom)::isFunction()) {
      functionStyles[atom] = atoms[atom];
    } else {
      nativeStyles[atom] = atoms[atom];
    }
  }
  return {
    ...StyleSheet.create(nativeStyles),
    ...functionStyles
  };
}

export function getAtomSchemaByClassName(className) {
  return classNameAtomDictionary[className];
}

export function getAtomValueByClassName(className) {
  return getAtomSchemaByClassName(className).propertyValue;
}

export function concatClassNames(...classNames) {
  return classNames::reject(isNil)::classNameToString();
}

export function filterClassNamesBy(callback: Function) {
  return this::classNameToArray()::filter(className => callback(getAtomSchemaByClassName(className)))::classNameToString();
}

export function filterHeritableClasses() {
  return this::filterClassNamesBy(atom => atom.heritable);
}

export function filterClassNamesByAtomGroups(atomGroups: []) {
  return this::filterClassNamesBy(({propertyGroup} = {}) => {
    for (const atomGroup of atomGroups) {
      if (!propertyGroup::includes(atomGroup)) {
        return false;
      }
    }
    return true;
  });
}

export function filterClassNamesByTextGroup() {
  return this::filterClassNamesByAtomGroups([AtomGroupName.TEXT]);
}

export function filterClassNamesByInputGroup() {
  return this::filterClassNamesByAtomGroups([AtomGroupName.INPUT]);
}

export function filterClassNamesByViewGroup() {
  return this::filterClassNamesByAtomGroups([AtomGroupName.VIEW]);
}

export function filterClassNamesByExternalLayoutViewGroups() {
  return this::filterClassNamesByAtomGroups([AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]);
}

export function filterClassNamesByInternalLayoutViewGroups() {
  return this::filterClassNamesBy(({propertyGroup} = {}) => {
    return propertyGroup::includes(AtomGroupName.VIEW) && !propertyGroup::includes(AtomGroupName.EXTERNAL_LAYOUT);
  });
}
