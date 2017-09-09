import React from 'react';
import {object, shape} from 'prop-types';
import {createStyleSheet} from './createStyleSheet';

export class QuantumContext extends React.Component {
  static propTypes = {
    atomDictionary: object,
    styleSheet: object
  };

  static childContextTypes = {
    quantum: shape({
      atomDictionary: object,
      styleSheet: object
    })
  };

  static classNamesFilters = [];

  static addClassNameFilter(classNameFilter) {
    QuantumContext.classNamesFilters.push(classNameFilter);
  }

  styleSheet = createStyleSheet(this.props.atomDictionary);

  getChildContext() {
    const {atomDictionary} = this.props;
    return {
      quantum: {
        atomDictionary,
        styleSheet: this.styleSheet
      }
    };
  }

  render() {
    return this.props.children;
  }
}
