import type {ReactElement} from 'react-native/flow/react';
import React from 'react';
import {createStyleSheet} from './quantum/native/createStyleSheet';
import {createAliases} from './quantum/AliasUtils';
import {createAtomDictionary} from './quantum/AtomUtils';
import {AtomSchemas} from './grabr-css/AtomSchemas';
import {AliasesSchema} from './grabr-css/AliasesSchema';
import {QuantumContext} from './quantum/native/QuantumContext';

const atomDictionary = createAtomDictionary(AtomSchemas);
const styleSheet = createStyleSheet(atomDictionary);
const classNamesAliases = createAliases(AliasesSchema);

export function MobileQuantumContext({children}) {
  return (
    <QuantumContext atomDictionary={atomDictionary}
                    styleSheet={styleSheet}
                    classNamesAliases={classNamesAliases}>
      {children}
    </QuantumContext>
  );
}
