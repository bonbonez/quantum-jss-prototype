import type {ClassName, ClassNameAlias, ClassNameAliases} from './types';
import {CLASS_NAME_DELIMITER} from '../MobileQuantumContext';

export function createClassNameAlias(classNames: ClassName): ClassNameAlias {
  return classNames.split(CLASS_NAME_DELIMITER)
}

export function createAliases(aliases): ClassNameAliases {
  const result = {};
  for (const alias in aliases) {
    result[alias] = createClassNameAlias(aliases[alias]);
  }
  return result;
}

export const ALIASES_SCHEMA = {
  'btn': 'h50 fxd-r jc-c ai-c w100p bdr5 fz-m',
  'btn--w': 'bgc-w c-b',
  'btn--fb': 'bgc-fb c-w',

  'input': 'w100p pt15 ta-l fz-m c-b'
};