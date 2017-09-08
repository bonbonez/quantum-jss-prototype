import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {array, object} from 'prop-types';
import {isFunction, without} from 'virtual-lodash';
import {createStyle} from './createStyle';
import {parseClassName, resolveAliases} from '../ClassNamesUtils';
import {filterAtomsByGroups, filterHeritableAtoms, isEqualAtoms} from '../AtomUtils';
import {AtomGroups} from '../AtomGroups';
import {wrapTextNodes} from './DomUtils';

export class AbstractDiv extends React.Component {

  static contextTypes = {
    inheritedAtoms: array,
    quantum: object
  };

  static childContextTypes = {
    inheritedAtoms: array
  };

  getChildContext() {
    return {inheritedAtoms: this.heritableAtoms};
  }

  atoms = null;
  viewAtoms = null;
  heritableAtoms = null;
  touchableOpacityAtoms = null;
  touchableOpacityContentAtoms = null;
  viewStyles = null;
  touchableOpacityStyles = null;
  touchableOpacityContentStyles = null;

  componentWillMount() {
    const {className, onPress} = this.props;
    this.cacheStyles({className, onPress}, this.context.inheritedAtoms);
  }

  componentWillReceiveProps({className, onPress}, {inheritedAtoms}) {
    if (className !== this.props.className || !isEqualAtoms(inheritedAtoms, this.context.inheritedAtoms)) {
      this.cacheStyles({className, onPress}, inheritedAtoms);
    }
  }

  cacheStyles({className = '', onPress}, inheritedAtoms = []) {
    const {quantum} = this.context;
    const atoms = parseClassName(resolveAliases(className, quantum.classNamesAliases), quantum.atomDictionary);
    if (inheritedAtoms) {
      atoms.unshift(...inheritedAtoms);
    }


    this.atoms = atoms;
    this.viewAtoms = filterAtomsByGroups(this.atoms, [AtomGroups.BOX_MODEL]);
    this.heritableAtoms = filterHeritableAtoms(this.atoms);
    this.viewStyles = createStyle(this.viewAtoms, quantum.styleSheet, this);

    if (this.props.onPress::isFunction()) {
      this.touchableOpacityAtoms = filterAtomsByGroups(this.viewAtoms, [AtomGroups.BORDER_BOX]);
      this.touchableOpacityContentAtoms = this.viewAtoms::without(...this.touchableOpacityAtoms);
      this.touchableOpacityStyles = createStyle(this.touchableOpacityAtoms, quantum.styleSheet, this);
      this.touchableOpacityContentStyles = createStyle(this.touchableOpacityContentAtoms, quantum.styleSheet, this);
    }
  }

  // todo: tests
  render() {
    const {View, children, onPress, ...props} = this.props;
    const processedChildren = Array.isArray(children) ? children.map(wrapTextNodes) : wrapTextNodes(children);

    if (onPress::isFunction()) {
      return (
        <TouchableOpacity style={this.touchableOpacityStyles}
                          onPress={onPress}
                          {...props}>
          <View style={[this.touchableOpacityContentStyles, {flex: 1}]}
                children={processedChildren}/>
        </TouchableOpacity>
      );
    }

    return (
      <View {...props}
            style={this.viewStyles}
            children={processedChildren}/>
    );
  }
}
