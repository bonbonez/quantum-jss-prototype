import React from 'react';
import {AbstractQuantumNode} from './AbstractQuantumNode';
import {createTextPlugableRenderer} from './plugable-renderers-creators/createTextPlugableRenderer';

export class Span extends React.Component {
  static plugins = [
    createTextPlugableRenderer()
  ];

  static addPlugin(plugin) {
    Span.plugins.unshift(plugin);
  }

  render() {
    return <AbstractQuantumNode plugins={Span.plugins} {...this.props}/>
  }
}
