//@flow
import type {Atom, AtomDictionary, AtomGroup, ClassName, CssProperty, NativeStyleSheet} from './quantum/types';
import type {ReactElement} from 'react-native/flow/react';



function filterAtomsByProperty(atoms: Atom[], property: CssProperty): Atom[] {}

function filterHeritableAtoms(atoms: Atom[]): Atom[] {}

function filterAtomsByGroups(atoms: Atom[], groups: AtomGroup[]): Atom[] {
  return atoms::filter(atom => {
    for (const group of groups) {
      if (!atom.groups::includes(group)) {
        return false;
        break;
      }
    }
    return true;
  });
}

function createClassName(atoms: Atom[]): ClassName {
  let className = '';
  for (const atom of atoms) {
    className += atom.name;
  }
  return className;
}

function createStyleSheet(atomDictionary: AtomDictionary): NativeStyleSheet {
  const scalarStyles = {};
  for (const name in atomDictionary) {
    const atom = atomDictionary[name];
    if (atom.scalar) {
      scalarStyles[name] = {[atom.property]: atom.getValue()};
    }
  }
  return StyleSheet.create(scalarStyles);
}

const CLASS_NAME_DELIMITER=/\s+/;

function parseClassName(className: ClassName, atomDictionary: AtomDictionary): Atom[] {
  const atoms = className.split(CLASS_NAME_DELIMITER);
  for (let i = 0; i < atoms.length; ++i) {
    if (atoms[i] in atomDictionary) {
      atoms[i] = atomDictionary[atoms[i]];
    } else {
      throw new Error(`Unknown class name ${atoms[i]}`);
    }
  }
  return atoms;
}

function concatAtoms(inheritedAtoms: Atom[], atoms: Atom[]) {
  return atoms.unshift(...inheritedAtoms);
}

function createStyle(
  atoms: Atom[],
  styleSheet: NativeStyleSheet,
  element: ReactElement
) {
  const style = [];
  for (const atom of atoms) {
    if (atom.name in styleSheet) {
      // Scalar atoms are cached in StyleSheet.
      style.push(styleSheet[atom.name]);
    } else {
      // Compute atom value on the fly.
      style.push({[atom.property]: atom.getValue(atoms, element)});
    }
  }
  return style;
}

// TODO Ensure that array reuse works faster than allocating new array
// function parseClassName(className: ClassName, atomDictionary: AtomDictionary): Atom[] {
// 	const atoms = [];
// 	for (const name of className.split(CLASS_NAME_DELIMITER)) {
// 		if (name in atomDictionary) {
// 			atoms.push(atomDictionary[name]);
// 		} else {
// 		  throw new Error(`Unknown class name ${name}`);
// 		}
// 	}
// 	return atoms;
// }