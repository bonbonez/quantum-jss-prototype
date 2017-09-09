import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {AtomGroups} from '../../AtomGroups';
import {createStyle} from './../createStyle';
import {filterAtomsByGroups} from '../../AtomUtils';
import without from 'virtual-lodash/without';
import find from 'virtual-lodash/find';
import {wrapTextNodes} from './../DomUtils';

export function scrollViewPlugableRenderer(host) {
  const {props, context, atoms} = host;

  // TODO: use overflow-x/overflow-y
  // take names from NativeStyleProperty
  const overflowScrollAtom = atoms::find({property: 'overflow-x'});
  if (!overflowScrollAtom) {
    return null;
  }

  const newAtoms = atoms::without(overflowScrollAtom);
  const boxModelAtoms = filterAtomsByGroups(newAtoms, [AtomGroups.BOX_MODEL]);
  const scrollViewAtoms = filterAtomsByGroups(boxModelAtoms, [AtomGroups.BORDER_BOX]);
  const scrollViewContentContainerAtoms = boxModelAtoms::without(...scrollViewAtoms);

  const {children, ...rest} = props;
  return <ScrollView {...rest}
                     style={createStyle(scrollViewAtoms, context.quantum.styleSheet, host)}
                     contentContainerStyle={createStyle(scrollViewContentContainerAtoms, context.quantum.styleSheet, host)}
                     children={wrapTextNodes(children)}/>
}
