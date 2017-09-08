import React from 'react';
import {array, object} from 'prop-types';
import {filterAtomsByGroups, isEqualAtoms} from '../AtomUtils';
import {parseClassName, resolveAliases, splitClassNames} from '../ClassNamesUtils';
import {AtomGroups} from '../AtomGroups';

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
    let atoms;

    if (className) {
      atoms = parseClassName(resolveAliases(splitClassNames(className), quantum.classNamesAliases), quantum.atomDictionary);
    }

    if (inheritedAtoms) {
      if (atoms) {
        atoms.unshift(...inheritedAtoms);
      } else {
        atoms = inheritedAtoms;
      }
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
