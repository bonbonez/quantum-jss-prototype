import type {ClassName} from '../quantum/QuantumTypes';
import React from 'react';
import {AtomDictionary, Aliases} from './styles';
import {QuantumContext} from '../quantum/native/QuantumContext';
import {resolveAliases} from '../quantum/AliasUtils';

function filterAliases(classNames: ClassName[]) {
  return resolveAliases(classNames, Aliases);
}

QuantumContext.addClassNameFilter(filterAliases);

export function MobileQuantumContext({children}) {
  return (
    <QuantumContext atomDictionary={AtomDictionary}>
      {children}
    </QuantumContext>
  );
}
