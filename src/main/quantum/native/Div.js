import React from 'react';
import {AbstractQuantumNode} from './AbstractQuantumNode';
import {createTouchableOpacityPlugableRenderer} from './plugable-renderers-creators/createTouchableOpacityPlugableRenderer';
import {createViewPlugableRenderer} from './plugable-renderers-creators/createViewPlugableRenderer';
import {createScrollViewPlugableRenderer} from './plugable-renderers-creators/createScrollViewPlugableRenderer';


export class Div extends React.Component {

  static plugins = [
    createScrollViewPlugableRenderer(),
    createTouchableOpacityPlugableRenderer(),
    createViewPlugableRenderer()
  ];

  static addPlugin(plugin) {
    Div.plugins.unshift(plugin);
  }

  render() {
    return <AbstractQuantumNode plugins={Div.plugins} {...this.props}/>;
  }
}
