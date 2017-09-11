import React from 'react';
import {Text} from 'react-native';
import {filterAtomsByGroups, isEqualAtoms} from '../../AtomUtils';
import {AtomGroups} from '../../AtomGroups';
import {createStyle} from './../createStyle';

export function createTextPlugableRenderer() {
  let cachedAtoms;
  let cachedStyles;

  return (host) => {
    const {props, context, atoms} = host;

    if (!cachedAtoms || (cachedAtoms && !isEqualAtoms(cachedAtoms, atoms))) {
      cachedStyles = createStyle(filterAtomsByGroups(atoms, [AtomGroups.TEXT]), context.quantum.styleSheet, host);
      cachedAtoms = atoms;
    }

    return <Text {...props} style={cachedStyles}/>
  };
}
