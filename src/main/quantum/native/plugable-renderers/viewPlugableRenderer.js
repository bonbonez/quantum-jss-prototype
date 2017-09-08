import React from 'react';
import {View} from 'react-native';
import {AtomGroups} from '../../AtomGroups';
import {createStyle} from './../createStyle';
import {filterAtomsByGroups} from '../../AtomUtils';
import {wrapTextNodes} from './../DomUtils';

export function viewPlugableRenderer(host) {
  const {props, context, atoms} = host;
  const styles = createStyle(filterAtomsByGroups(atoms, [AtomGroups.BOX_MODEL]), context.quantum.styleSheet, host);
  const {children, ...rest} = props;
  return <View {...rest} style={styles} children={wrapTextNodes(children)}/>
}
