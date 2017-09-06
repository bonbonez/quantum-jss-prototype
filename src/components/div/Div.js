import React from 'react';
import {Animated, Text, TouchableOpacity, View} from 'react-native';
import {string} from 'prop-types';
import {isFunction, isString} from 'virtual-lodash';
import {
  concatClassNames,
  filterClassNamesByExternalLayoutViewGroups,
  filterClassNamesByInternalLayoutViewGroups,
  filterClassNamesByTextGroup,
  filterClassNamesByViewGroup,
  filterHeritableClasses,
  parseClassNames
} from '../../stylesUtils';

const DEFAULT_ACTIVE_OPACITY = 0.8;

function DivChildren() {

}

function wrapChild(child, key = null, {className}) {
  if (!child) {
    return child;
  }
  // Text
  if (child::isString()) {
    child = <Text key={key} style={parseClassNames(className::filterClassNamesByTextGroup())}>{child}</Text>;
  }



  if (child.props.onPress::isFunction()) {
    console.info('className', className);
    console.info('external', className::filterClassNamesByExternalLayoutViewGroups());
    console.info('internal', className::filterClassNamesByInternalLayoutViewGroups());
    /*child = (
      <TouchableOpacity onPress={child.onPress}
                        activeOpacity={child.props.activeOpacity || DEFAULT_ACTIVE_OPACITY}
                        style={parseClassNames(className::filterClassNamesByExternalLayoutViewGroups())}>
        <Div {...child.props} className={['fx1', className::filterClassNamesByExternalLayoutViewGroups()]}/>
      </TouchableOpacity>
    );*/
  }

  return child;
}

class AbstractDiv extends React.Component {

  static contextTypes = {
    className: string
  };

  static childContextTypes = {
    className: string
  };

  getChildContext() {
    return {
      className: concatClassNames(this.context.className, this.props.className)::filterHeritableClasses()
    }
  }

  render() {
    const {View, children, className, onPress, ...props} = this.props;
    const processedChildren = Array.isArray(children) ? children.map(wrapChild) :  wrapChild(children);

    return do {
      if (onPress::isFunction()) {
        <TouchableOpacity style={parseExternal}
                          onPress={onPress}>
          <View style={parseNotExternal}
                children={processedChildren}
                {...props}/>
        </TouchableOpacity>
      } else {
        <View style={parseClassNames(concatClassNames(this.context.className, className)::filterClassNamesByViewGroup())}
              children={processedChildren}
              {...props}/>
      }
    };

  }
}

export function Div(props) {
  return <AbstractDiv {...props} View={View}/>
}

export function AnimatedDiv(props) {
  return <AbstractDiv {...props} View={Animated.View}/>
}