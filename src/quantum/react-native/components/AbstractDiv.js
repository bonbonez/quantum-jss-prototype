import React from 'react';
import {TouchableOpacity, View} from 'react-native';
import {array, object, string} from 'prop-types';
import {isFunction, without} from 'virtual-lodash';
import {createStyle} from '../createStyle';
import {parseClassName, resolveAliases} from '../../class-names';
import {filterAtomsByGroups, filterHeritableAtoms} from '../../atoms';
import {Span} from './Span';
import {AtomGroups} from '../../atom-groups';

function wrapTextNodes(child, key = null) {
  if (React.isValidElement(child)) {
    return child;
  }

  return <Span key={key}>{child}</Span>;
}

export class AbstractDiv extends React.Component {

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
    const {inheritedAtoms = []} = this.context;
    return {
      inheritedAtoms: inheritedAtoms.concat(filterHeritableAtoms(this.atoms))
    };
  }

  render() {
    const {View, children, onPress, ...props} = this.props;
    const processedChildren = Array.isArray(children) ? children.map(wrapTextNodes) : wrapTextNodes(children);
    const boxModelAtoms = filterAtomsByGroups(this.atoms, [AtomGroups.BOX_MODEL]);

    if (onPress::isFunction()) {
      const touchableOpacityAtoms = filterAtomsByGroups(boxModelAtoms, [AtomGroups.BORDER_BOX]);
      const restAtoms = boxModelAtoms::without(...touchableOpacityAtoms);

      return (
        <TouchableOpacity style={createStyle(touchableOpacityAtoms, this.context.styleSheet, this)}
                          onPress={onPress}>
          <View style={[createStyle(restAtoms, this.context.styleSheet, this), {flex: 1}]}
                children={processedChildren}/>
        </TouchableOpacity>
      );
    }

    return (
      <View {...props}
            style={createStyle(boxModelAtoms, this.context.styleSheet, this)}
            children={processedChildren}/>
    );
  }
}