import {createAtomSchema} from '../../main/quantum/AtomUtils';
import {AtomGroups} from '../../main/quantum/AtomGroups';

const FONT_SIZES = [{value: 15, alias: '-m'}, {value: 20, alias: '-l'}];
const FLEXES = [{value: 1, alias: '1'}, {value: 2, alias: 2}];
const PADDINGS = [{value: 20, alias: '20'}];

export const TestAtomsSchema = [
  createAtomSchema('fontSize', 'fz', FONT_SIZES, {groups: [AtomGroups.TEXT, AtomGroups.HERITABLE]}),
  createAtomSchema('flex', 'fx', FLEXES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('paddingTop', 'pt', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}),
];
