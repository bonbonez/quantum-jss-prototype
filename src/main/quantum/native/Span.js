import React from 'react';
import {Text} from 'react-native';
import {array, object} from 'prop-types';
import {filterAtomsByGroups, isEqualAtoms} from '../AtomUtils';
import {createStyle} from './createStyle';
import {parseClassName, resolveAliases, splitClassNames} from '../ClassNamesUtils';
import {AtomGroups as AtomGroup} from '../AtomGroups';

export class Span extends React.Component{

  static contextTypes = {
    inheritedAtoms: array,
    quantum: object
  };

  static childContextTypes = {
    inheritedAtoms: array
  };

  getChildContext() {
    return {
      inheritedAtoms: this.heritableAtoms
    }
  }

  atoms = null;
  heritableAtoms = null;
  styles = null;

  componentWillMount() {
    this.cacheStyles(this.props.className, this.context.inheritedAtoms);
  }

  componentWillReceiveProps({className}, {inheritedAtoms}) {
    if (className !== this.props.className || !isEqualAtoms(inheritedAtoms, this.context.inheritedAtoms)) {
      this.cacheStyles(className, inheritedAtoms);
    }
  }

  cacheStyles(className, inheritedAtoms) {
    const {quantum} = this.context;
    let atoms;

    if (className) {
      atoms = parseClassName(resolveAliases(splitClassNames(className), quantum.classNamesAliases), quantum.atomDictionary);
    }

    if (inheritedAtoms) {
      if (atoms) {
        atoms.unshift(...inheritedAtoms);
      } else {
        atoms = inheritedAtoms;
      }
    }

    this.atoms = atoms;
    this.heritableAtoms = filterAtomsByGroups(this.atoms, [AtomGroup.HERITABLE]);
    this.styles = createStyle(this.atoms, quantum.styleSheet, this);
  }

  render() {
    return <Text {...this.props} style={this.styles}/>
  }
}
