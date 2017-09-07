import React from 'react';
import {Text} from 'react-native';
import {array, object} from 'prop-types';
import {AtomGroups} from '../../atom-groups';
import {filterAtomsByGroups} from '../../atoms';
import {createStyle} from '../createStyle';

export class Span extends React.Component{

  static contextTypes = {
    inheritedAtoms: array,
    styleSheet: object,
    atomDictionary: object
  };

  render() {
    const {inheritedAtoms, styleSheet} = this.context;
    return <Text {...this.props} style={createStyle(filterAtomsByGroups(inheritedAtoms, [AtomGroups.TEXT]), styleSheet, this)}/>
  }
}