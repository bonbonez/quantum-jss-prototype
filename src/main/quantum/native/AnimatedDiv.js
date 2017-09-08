import React from 'react';
import {Animated} from 'react-native';
import {AbstractDiv} from './AbstractDiv';

export function Div(props) {
  return <AbstractDiv {...props} View={Animated.View}/>
}