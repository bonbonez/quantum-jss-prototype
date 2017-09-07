import React from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {array, object, string} from 'prop-types';
import {isFunction, without} from 'virtual-lodash';
import {createStyle, filterAtomsByViewGroup, parseClassName, resolveAliases} from '../../MobileQuantumContext';
import {AtomGroupName} from '../../quantum/variables';
import {filterAtomsByGroups, filterHeritableAtoms} from '../../quantum/utils';
import {Span} from '../../quantum/react-native/components/Span';


function wrapTextNodes(child, key = null) {
  if (React.isValidElement(child)) {
    return child;
  }

  return <Span key={key}>{child}</Span>;
}

class AbstractDiv extends React.Component {

  static contextTypes = {
    inheritedAtoms: array,
    atomDictionary: object.isRequired,
    classNamesAliases: object.isRequired,
    styleSheet: object.isRequired
  };

  static childContextTypes = {
    inheritedAtoms: array
  };

  atoms = parseClassName(resolveAliases(this.props.className, this.context.classNamesAliases), this.context.atomDictionary);

  componentWillReceiveProps({className}) {
    if (className !== this.props.className) {
      this.atoms = parseClassName(resolveAliases(className), this.context.atomDictionary);
    }
  }

  getChildContext() {
    return {
      // todo: optimize
      inheritedAtoms: [...this.context.inheritedAtoms, filterHeritableAtoms(this.atoms)]
    };
  }

  render() {
    const {View, children, onPress, className, ...props} = this.props;
    const processedChildren = Array.isArray(children) ? children.map(wrapTextNodes) : wrapTextNodes(children);

   /* if (onPress::isFunction()) {
      //todo: rename atom groups
      //todo: remove virtual methods (createStyles, parseClassNames);
      const touchableOpacityAtoms = filterAtomsByGroups(this.atoms, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]);
      const restAtoms = touchableOpacityAtoms::without(...touchableOpacityAtoms);
      return (
        <TouchableOpacity style={createStyle(touchableOpacityAtoms, this.context.styleSheet, this)}
                          onPress={onPress}>
          <View style={[createStyle(restAtoms, this.context.styleSheet, this), {flex: 1}]}
                children={processedChildren}/>
        </TouchableOpacity>
      );
    }*/

    return (
      <View {...props}
            style={createStyle(this.atoms, this.context.styleSheet, this)}
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