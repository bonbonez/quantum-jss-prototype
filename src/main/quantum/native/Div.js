import React from 'react';
import {AbstractQuantumNode} from './AbstractQuantumNode';
import {touchableOpacityPlugableRenderer} from './plugable-renderers/touchableOpacityPlugableRenderer';
import {viewPlugableRenderer} from './plugable-renderers/viewPlugableRenderer';
import {scrollViewPlugableRenderer} from './plugable-renderers/scrollViewPlugableRenderer';


export class Div extends React.Component {

  static plugins = [
    scrollViewPlugableRenderer,
    touchableOpacityPlugableRenderer,
    viewPlugableRenderer
  ];

  static addPlugin(plugin) {
    Div.plugins.unshift(plugin);
  }

  render() {
    return <AbstractQuantumNode plugins={Div.plugins} {...this.props}/>;
  }
}
