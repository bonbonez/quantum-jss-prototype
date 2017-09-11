import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AtomGroups} from '../../AtomGroups';
import {createStyle} from './../createStyle';
import {filterAtomsByGroups, isEqualAtoms} from '../../AtomUtils';
import without from 'virtual-lodash/without';
import isFunction from 'virtual-lodash/isFunction';
import {wrapTextNodes} from '../AbstractQuantumNodeModel';

export function createTouchableOpacityPlugableRenderer() {

  let cachedAtoms;
  let cachedTouchableOpacityStyles;
  let cachedTouchableOpacityContentStyles;

  return (host) => {
    const {props, context, atoms} = host;

    if (!props.onPress::isFunction()) {
      return null;
    }

    if (!cachedAtoms || !isEqualAtoms(cachedAtoms, atoms)) {

      const boxModelAtoms = filterAtomsByGroups(atoms, [AtomGroups.BOX_MODEL]);
      const touchableOpacityAtoms = filterAtomsByGroups(boxModelAtoms, [AtomGroups.BORDER_BOX]);
      const touchableOpacityContentAtoms = boxModelAtoms::without(...touchableOpacityAtoms);

      cachedTouchableOpacityStyles = createStyle(touchableOpacityAtoms, context.quantum.styleSheet, host);
      cachedTouchableOpacityContentStyles = createStyle(touchableOpacityContentAtoms, context.quantum.styleSheet, host);
      cachedAtoms = atoms;
    }

    const {children, ...rest} = props;

    return (
      <TouchableOpacity style={cachedTouchableOpacityStyles}
                        {...rest}>
        <View style={[cachedTouchableOpacityContentStyles, {flex: 1}]}
              children={wrapTextNodes(children)}/>
      </TouchableOpacity>
    );
  };
}
