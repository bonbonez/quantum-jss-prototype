import type {Atom, ClassName} from '../../quantum/types';
import React from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {array, object, string} from 'prop-types';
import {isFunction, filter, isArray, isString} from 'virtual-lodash';
import {
  createStyle, filterAtomsByGroups, filterAtomsByViewGroup, filterHeritableAtoms,
  parseClassName
} from '../../MobileQuantumContext';
import {AtomGroupName} from '../../quantum/variables';

function wrapTextNodes(child, key = null) {
  if (!child) {
    return child;
  }

  if (child::isString()) {
    return <TextWrapper key={key}>{child}</TextWrapper>
  }

  return child;
}

function filterClassNames(className: ClassName | Array<ClassName>) {
  return className::isString() || className::isArray();
}

function filterAtoms(atomGroup: Atom[]) {
  return atomGroup::isArray();
}

function parseClassNames(...classNames: Array<ClassName | ClassName[]>) : Atom[] {
  classNames = classNames::filter(filterClassNames);
  let atoms = [];
  for (const className of classNames) {
    if (className::isString()) {
      atoms.push(...parseClassName(className, this.context.atomDictionary));
    } else if (className::isArray()) {
      for (const klassName of className) {
        atoms.push(...this::parseClassNames(klassName));
      }
    }
  }
  return atoms;
}

function createStyles(...atomsGroups: Array<Atom[]>) {
  atomsGroups = atomsGroups::filter(filterAtoms);
  let style = [];
  for (const atomGroup of atomsGroups) {
    style = [...style, ...createStyle(atomGroup, this.context.styleSheet)];
  }
  return style;
}

class TextWrapper extends React.Component{

  static contextTypes = {
    inheritedAtoms: array,
    styleSheet: object,
    atomDictionary: object
  };

  render() {
    return <Text {...this.props} style={this::createStyles(filterAtomsByGroups(this.context.inheritedAtoms, [AtomGroupName.TEXT]))}/>
  }
}

class AbstractDiv extends React.Component {

  static contextTypes = {
    inheritedAtoms: array,
    atomDictionary: object.isRequired,
    styleSheet: object.isRequired
  };

  static childContextTypes = {
    inheritedAtoms: array
  };

  getChildContext() {
    return {
      inheritedAtoms: filterHeritableAtoms(this.getViewAtoms())
    };
  }

  getViewAtoms() {
    const {inheritedAtoms = []} = this.context;
    const {className} = this.props;
    return [...inheritedAtoms, ...this::parseClassNames(className)];
  }

  render() {
    const {View, children, onPress, ...props} = this.props;
    const processedChildren = Array.isArray(children) ? children.map(wrapTextNodes) : wrapTextNodes(children);

    const viewAtoms = filterAtomsByViewGroup(this.getViewAtoms());

    if (onPress::isFunction()) {
      return (
        <TouchableOpacity {...props}
                          style={[this::createStyles(viewAtoms), this.props.style]}
                          onPress={onPress}
                          children={processedChildren}/>
      );
    }

    return (
      <View {...props}
            style={[this::createStyles(viewAtoms), this.props.style]}
            children={processedChildren}/>
    );
  }
}

export function Div(props) {
  return <AbstractDiv {...props} View={View}/>
}

export function AnimatedDiv(props) {
  return <AbstractDiv {...props} View={Animated.View}/>
}