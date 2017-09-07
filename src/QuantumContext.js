import React from 'react';
import {object} from 'prop-types';

export class QuantumContext extends React.Component {
  static propTypes = {
    atomDictionary: object,
    styleSheet: object
  };

  static childContextTypes = {
    atomDictionary: object,
    styleSheet: object
  };

  getChildContext() {
    const {atomDictionary, styleSheet} = this.props;
    return {atomDictionary, styleSheet};
  }

  render() {
    return this.props.children;
  }
}