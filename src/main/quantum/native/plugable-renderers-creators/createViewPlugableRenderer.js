import React from 'react';
import {View} from 'react-native';
import {AtomGroups} from '../../AtomGroups';
import {createStyle} from './../createStyle';
import {filterAtomsByGroups, isEqualAtoms} from '../../AtomUtils';
import {wrapTextNodes} from '../AbstractQuantumNodeModel';

export function createViewPlugableRenderer() {
  let cachedStyles;
  let cachedAtoms;

  return (host) => {
    const {props, context, atoms} = host;

    if (!cachedAtoms || (cachedAtoms && !isEqualAtoms(cachedAtoms, atoms))) {
      cachedStyles = createStyle(filterAtomsByGroups(atoms, [AtomGroups.BOX_MODEL]), context.quantum.styleSheet, host);
      cachedAtoms = atoms;
    }

    const {children, ...rest} = props;
    return <View {...rest} style={cachedStyles} children={wrapTextNodes(children)}/>
  };
}
