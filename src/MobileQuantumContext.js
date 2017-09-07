import type {ReactElement} from 'react-native/flow/react';
import React from 'react';
import {createStyleSheet} from './quantum/react-native/createStyleSheet';
import {createAliases} from './quantum/aliases';
import {createAtomDictionary} from './quantum/atoms';
import {ATOMS_SCHEMAS} from './styles/atoms-schemas';
import {ALIASES_SCHEMA} from './styles/aliases-schema';
import {QuantumContext} from './quantum/react/QuantumContext';

const atomDictionary = createAtomDictionary(ATOMS_SCHEMAS);
const styleSheet = createStyleSheet(atomDictionary);
const classNamesAliases = createAliases(ALIASES_SCHEMA);

export function MobileQuantumContext({children}) {
  return (
    <QuantumContext atomDictionary={atomDictionary}
                    styleSheet={styleSheet}
                    classNamesAliases={classNamesAliases}>
      {children}
    </QuantumContext>
  );
}