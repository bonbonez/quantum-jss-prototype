import React from 'react';
import {Text} from 'react-native';
import {array, object} from 'prop-types';
import {createStyle} from '../../../MobileQuantumContext';
import {filterAtomsByGroups} from '../../utils';
import {AtomGroupName} from '../../variables';

export class Span extends React.Component{

  static contextTypes = {
    inheritedAtoms: array,
    styleSheet: object,
    atomDictionary: object
  };

  render() {
    const {inheritedAtoms, styleSheet} = this.context;
    return <Text {...this.props} style={createStyle(filterAtomsByGroups(inheritedAtoms, [AtomGroupName.TEXT]), styleSheet, this)}/>
  }
}