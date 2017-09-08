import {parseClassName, resolveAliases, splitClassNames} from '../../main/quantum/ClassNamesUtils';
import {TestAliases} from '../mocks/TestAliases';
import {TestAtomsSchema} from '../mocks/TestAtomsSchema';
import {createAliases} from '../../main/quantum/AliasUtils';
import {createAtomDictionary} from '../../main/quantum/AtomUtils';

const testAliases = createAliases(TestAliases);
const testAtomDictionary = createAtomDictionary(TestAtomsSchema);

describe('splitClassNames', () => {
  it('splits non-empty string and converts it to an array of items of ClassName type', () => {
    expect(splitClassNames('foo bar')).toEqual(['foo', 'bar']);
  });

  it('returns undefined invalid arguments', () => {
    expect(splitClassNames('    ')).toBe(undefined);
    expect(splitClassNames(123)).toBe(undefined);
    expect(splitClassNames([])).toBe(undefined);
    expect(splitClassNames(null)).toBe(undefined);
  });
});

describe('resolveAliases', () => {
  it('replaces className aliases in array of classNames', () => {
    expect(resolveAliases(splitClassNames('btn fz-m'), testAliases)).toEqual(['px20', 'pv15', 'h50', 'fz-m']);
    expect(resolveAliases(splitClassNames('btn btn--w'), testAliases)).toEqual(['px20', 'pv15', 'h50', 'bgc-w', 'c-w']);
  });

  it('fails when passing no arguments', () => {
    expect(resolveAliases).toThrow();
  });

  it('returns classNames as they are if passing no aliases', () => {
    expect(resolveAliases(splitClassNames('fz1 fz2'))).toEqual(['fz1', 'fz2']);
  });
});


describe('parseClassName', () => {
  it('returns array of matched atoms from AtomDictionary', () => {
    expect(parseClassName(splitClassNames('fz-m fx1'), testAtomDictionary)).toEqual([testAtomDictionary['fz-m'], testAtomDictionary['fx1']]);
  });

  it('throws error if passing an unknown className', () => {
    expect(() => parseClassName(splitClassNames('fz-xxxxxl fx1'), testAtomDictionary)).toThrow();
  })
});
