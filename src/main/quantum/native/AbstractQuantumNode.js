import React from 'react';
import {array, object} from 'prop-types';
import {filterAtomsByGroups, isEqualAtoms} from '../AtomUtils';
import {isValidClassNamesProperty, parseClassName, resolveAliases, splitClassNames} from '../ClassNamesUtils';
import {AtomGroups} from '../AtomGroups';
import {QuantumContext} from './QuantumContext';
import isFunction from 'virtual-lodash/isFunction';

export class AbstractQuantumNode extends React.Component {

  static contextTypes = {
    inheritedAtoms: array,
    quantum: object.isRequired
  };

  static childContextTypes = {
    inheritedAtoms: array
  };

  static propTypes = {
    plugins: array.isRequired
  };

  getChildContext() {
    return {
      inheritedAtoms: this.heritableAtoms
    };
  }

  atoms = null;
  heritableAtoms = null;

  componentWillMount() {
    this.cacheStyles(this.props.className, this.context.inheritedAtoms);
  }

  componentWillReceiveProps({className}, {inheritedAtoms}) {
    if (className !== this.props.className || !isEqualAtoms(inheritedAtoms, this.context.inheritedAtoms)) {
      this.cacheStyles(className, inheritedAtoms);
    }
  }

  cacheStyles(className, inheritedAtoms) {
    const {quantum} = this.context;
    let atoms = []; // need to make a default value so all plugableRenderers could have a non-null object

    if (isValidClassNamesProperty(className)) {
      let classNames = splitClassNames(className);
      for (const filter of QuantumContext.classNamesFilters) {
        classNames = filter(classNames);
      }
      atoms = parseClassName(classNames, quantum.atomDictionary);
    }

    if (inheritedAtoms) {
      atoms.unshift(...inheritedAtoms);
    }

    this.atoms = atoms;
    this.heritableAtoms = filterAtomsByGroups(this.atoms, [AtomGroups.HERITABLE]);
  }

  render() {
    let element = null;

    for (const plugin of this.props.plugins) {
      element = plugin(this, this.atoms);
      if (element) {
        break;
      }
    }

    return element;
  }
}
