import React from 'react';
import {Text} from 'react-native';
import {filterAtomsByGroups} from '../../AtomUtils';
import {AtomGroups} from '../../AtomGroups';
import {createStyle} from './../createStyle';

export function textPlugableRenderer(host) {
  const {props, context, atoms} = host;
  const textAtoms = filterAtomsByGroups(atoms, [AtomGroups.TEXT]);

  return <Text {...props} style={createStyle(textAtoms, context.quantum.styleSheet, host)}/>
}
