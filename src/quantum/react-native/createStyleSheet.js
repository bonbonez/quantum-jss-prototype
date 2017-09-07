import type {AtomDictionary, NativeStyleSheet} from '../types';
import {StyleSheet} from 'react-native';

export function createStyleSheet(atomDictionary: AtomDictionary): NativeStyleSheet {
  const scalarStyles = {};
  for (const name in atomDictionary) {
    const atom = atomDictionary[name];
    if (atom.scalar) {
      scalarStyles[name] = {[atom.property]: atom.getValue()};
    }
  }
  return StyleSheet.create(scalarStyles);
}