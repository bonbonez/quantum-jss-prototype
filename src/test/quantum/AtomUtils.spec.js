import {createAtomDictionary, filterAtomsByGroups, isEqualAtoms} from '../../main/quantum/AtomUtils';
import {parseClassName, splitClassNames} from '../../main/quantum/ClassNamesUtils';
import {AtomGroups} from '../../main/quantum/AtomGroups';
import {TestAtomsSchema} from '../mocks/TestAtomsSchema';

const testAtomDictionary = createAtomDictionary(TestAtomsSchema);
const [fx1Atom, pt20Atom, fzmAtom, fzlAtom] = parseClassName(splitClassNames('fx1 pt20 fz-m fz-l'), testAtomDictionary);

describe('isEqualAtoms', () => {

  it('compares two equal sets of atoms with similar order', () => {
    expect(isEqualAtoms([fx1Atom, fzmAtom], [fx1Atom, fzmAtom])).toBe(true);
  });

  it('compares two equal sets of atoms with different order', () => {
    expect(isEqualAtoms([fx1Atom, fzmAtom], [fzmAtom, fx1Atom])).toBe(true);
  });

  it('compares two different sets of atoms', () => {
    expect(isEqualAtoms([fzmAtom, fx1Atom, fzlAtom], [fzmAtom, fx1Atom, fzmAtom])).toBe(false);
  });

  it('compares two similar sets of atoms with different length', () => {
    expect(isEqualAtoms([fx1Atom, fzmAtom], [fzmAtom, fzmAtom, fx1Atom, fzmAtom, fx1Atom])).toBe(true);
  });

  it('checks that Chuck Norris is true', () => {
    expect(Boolean('Chuck Norris')).toEqual(true);
  });
});


describe('filterAtomsByGroups', () => {
  it('takes BOX_MODEL and INPUT atoms and filter BOX_MODEL atoms', () => {
    expect(filterAtomsByGroups([fx1Atom, fzmAtom], [AtomGroups.BOX_MODEL])).toEqual([fx1Atom]);
  });

  it('takes BOX_MODEL atoms and filter UNKNOWN_GROUP atoms', () => {
    expect(filterAtomsByGroups([fx1Atom, fx1Atom], [{name: 'unknown'}])).toEqual([]);
  });

  it('takes BOX_MODEL atoms and filter BOX_MODEL and BORDER_BOX atoms', () => {
    expect(filterAtomsByGroups([fx1Atom, pt20Atom], [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX])).toEqual([fx1Atom]);
  });
});
