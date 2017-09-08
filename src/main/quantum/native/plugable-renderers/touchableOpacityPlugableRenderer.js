import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {AtomGroups} from '../../AtomGroups';
import {createStyle} from './../createStyle';
import {filterAtomsByGroups} from '../../AtomUtils';
import without from 'virtual-lodash/without';
import isFunction from 'virtual-lodash/isFunction';
import {wrapTextNodes} from './../DomUtils';

export function touchableOpacityPlugableRenderer(host) {
  const {props, context, atoms} = host;

  if (!props.onPress::isFunction()) {
    return null;
  }

  const boxModelAtoms = filterAtomsByGroups(atoms, [AtomGroups.BOX_MODEL]);
  const touchableOpacityAtoms = filterAtomsByGroups(boxModelAtoms, [AtomGroups.BORDER_BOX]);
  const touchableOpacityContentAtoms = boxModelAtoms::without(...touchableOpacityAtoms);
  const {children, ...rest} = props;

  return (
    <TouchableOpacity style={createStyle(touchableOpacityAtoms, context.quantum.styleSheet, host)}
                      {...rest}>
      <View style={[createStyle(touchableOpacityContentAtoms, context.quantum.styleSheet, host), {flex: 1}]}
            children={wrapTextNodes(children)}/>
    </TouchableOpacity>
  );
}
