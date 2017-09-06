import React, { Component } from 'react';
import {
  AppRegistry,
  Text, View,
} from 'react-native';
import {parseClassNames} from './src/stylesUtils';
//import {Div} from './src/components/div/Div';

export default class HeritableStyles extends Component {
  render() {
    return (
      <View style={parseClassNames('fx1 bgc-bb')}>
        <Text style={parseClassNames('fz-m lh-t')} numberOfLines={2}>hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello hello </Text>
      </View>
    );

    /*return (
      <Div className="fx1 jc-c ai-c fz-m bgc-r">
        <Div className="fxg1 c-w bgc-bb">
          Hello

          <Div className="w100p h50 jc-c ai-c bgc-w c-bb"
               onPress={() => {require('react-native').Alert.alert('hey there')}}>
            Hey there
          </Div>
        </Div>
      </Div>
    );*/
  }
}

AppRegistry.registerComponent('HeritableStyles', () => HeritableStyles);
