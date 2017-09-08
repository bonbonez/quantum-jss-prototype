import React from 'react';
import {AbstractQuantumNode} from './AbstractQuantumNode';
import {textPlugableRenderer} from './plugable-renderers/textPlugableRenderer';

export class Span extends React.Component {
  static plugins = [
    textPlugableRenderer
  ];

  static addPlugin(plugin) {
    Span.plugins.unshift(plugin);
  }

  render() {
    return <AbstractQuantumNode plugins={Span.plugins} {...this.props}/>
  }
}
