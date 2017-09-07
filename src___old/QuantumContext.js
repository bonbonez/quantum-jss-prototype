import React from 'react';
import {object} from 'prop-types';

export class QuantumContext extends React.Component {
  static propTypes = {
    atomDictionary: object,
    styleSheet: object,
    classNamesAliases: object
  };

  static childContextTypes = {
    atomDictionary: object,
    styleSheet: object,
    classNamesAliases: object
  };

  getChildContext() {
    const {atomDictionary, styleSheet, classNamesAliases} = this.props;
    return {atomDictionary, styleSheet, classNamesAliases};
  }

  render() {
    return this.props.children;
  }
}