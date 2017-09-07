import React from 'react';
import {View} from 'react-native';
import {AbstractDiv} from './AbstractDiv';

export function Div(props) {
  return <AbstractDiv {...props} View={View}/>
}