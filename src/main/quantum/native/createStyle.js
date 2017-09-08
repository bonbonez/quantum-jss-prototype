//@flow
import type {Atom, NativeStyleSheet} from '../QuantumTypes';
import type {ReactElement} from 'react-native/flow/react';

export function createStyle(
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
  style.push(element.props.style);
  return style;
}
