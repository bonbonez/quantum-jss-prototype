import React from 'react';
import {ScrollView, TouchableOpacity, View} from 'react-native';
import {AtomGroups} from '../../AtomGroups';
import {createStyle} from './../createStyle';
import {filterAtomsByGroups, isEqualAtoms} from '../../AtomUtils';
import without from 'virtual-lodash/without';
import find from 'virtual-lodash/find';
import {wrapTextNodes} from '../AbstractQuantumNodeModel';

export function createScrollViewPlugableRenderer() {
  let cachedAtoms;
  let cachedScrollViewStyles;
  let cachedScrollViewContentContainerStyles;

  return (host) => {
    const {props, context, atoms} = host;

    // TODO: use overflow-x/overflow-y
    // take names from NativeStyleProperty
    const overflowScrollAtom = atoms::find({property: 'overflow-x'});
    if (!overflowScrollAtom) {
      return null;
    }

    if (!cachedAtoms || !isEqualAtoms(cachedAtoms, atoms)) {
      const newAtoms = atoms::without(overflowScrollAtom);
      const boxModelAtoms = filterAtomsByGroups(newAtoms, [AtomGroups.BOX_MODEL]);
      const scrollViewAtoms = filterAtomsByGroups(boxModelAtoms, [AtomGroups.BORDER_BOX]);
      const scrollViewContentContainerAtoms = boxModelAtoms::without(...scrollViewAtoms);
      cachedScrollViewStyles = createStyle(scrollViewAtoms, context.quantum.styleSheet, host);
      cachedScrollViewContentContainerStyles = createStyle(scrollViewContentContainerAtoms, context.quantum.styleSheet, host);
    }

    const {children, ...rest} = props;
    return <ScrollView {...rest}
                       style={cachedScrollViewStyles}
                       contentContainerStyle={cachedScrollViewContentContainerStyles}
                       children={wrapTextNodes(children)}/>
  };
}
