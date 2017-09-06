import range from 'lodash/range';
import map from 'virtual-lodash/map';
import find from 'virtual-lodash/find';
import {createAtomSchema} from './utils';
import {
  AtomGroupName,
  BLACK_COLOR,
  BRAND_BLUE_COLOR,
  FACEBOOK_COLOR,
  FONT_SIZE_L,
  FONT_SIZE_M,
  FONT_SIZE_S,
  FONT_SIZE_XL,
  FONT_SIZE_XXL,
  GREEN_COLOR,
  GREY_12_COLOR,
  GREY_3_COLOR,
  GREY_44_COLOR,
  GREY_65_COLOR,
  GREY_7_COLOR,
  RED_COLOR,
  TRANSPARENT_COLOR,
  TWITTER_COLOR,
  WHITE_50_COLOR,
  WHITE_COLOR,
  YELLOW_COOR
} from './variables';
import {lookupAtomPropertyValue} from '../stylesUtils';

function processValueOrReturnNull(callback) {
  return this ? callback(this) : null;
}

const FLEX_CROSS_AXIS_ALIGNS = [
  ['flex-start', 'fs'],
  ['flex-end', 'fe'],
  ['center', 'c'],
  ['stretch', 's']
];
const FLEX_MAIN_AXIS_ALIGNS = [
  ['flex-start', 'fs'],
  ['flex-end', 'fe'],
  ['center', 'c'],
  ['space-between', 'sb'],
  ['space-around', 'sa']
];
const FLEX_SELF_ALIGNS = [
  ['auto', 'a'],
  ['flex-start', 'fs'],
  ['flex-end', 'fe'],
  ['center', 'c'],
  ['stretch', 's']
];
const FLEX_DIRECTIONS = [
  ['row', 'r'],
  ['row-reverse', 'rr'],
  ['column', 'c'],
  ['column-reverse', 'cr']
];
const FLEX_WRAPS = [
  ['wrap', 'w'],
  ['nowrap', 'nw']
];
const FLEX_GROW_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const FLEX_SHRINK_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const POSITIONS = [
  ['absolute', 'a'],
  ['relative', 'r']
];
const MARGINS = [0, 1, 3, 5, 7, 10, 15, 20, 25, 30, 40, 50, 60, 70];
const PADDINGS = [0, 1, 3, 5, 7, 10, 15, 20, 25, 30, 40, 50, 60, 70];
const WIDTHS = [
  ['100%', '100p'],
  ['50%', '50p'],
  ['25%', '25p'],
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 100, 125, 150, 180, 190, 260];
const HEIGHTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 100, 125, 150, 180, 190, 260];
const POSITION_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 60];
const BORDER_WIDTHS = [1, 2];
const BORDER_STYLES = [
  ['solid', 's'],
  ['dotted', 'd'],
  ['dashed', 'd']
];
const Z_INDICES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10];
const RADII = [
  [9999, 'c'],
  0, 5];
const OPACITIES = range(0, 101);
const OVERFLOWS = [
  ['visible', 'v'],
  ['hidden', 'h']
];
const ELEVATIONS = range(0, 101);
const RESIZE_MODES = [
  ['cover', 'cv'],
  ['contain', 'ct'],
  ['stretch', 's'],
  ['repeat', 'r'],
  ['center', 'c']
];
const BACKFACE_VISIBILITIES = [
  ['visible', 'v'],
  ['hidden', 'h']
];
// Text
const COLORS = [
  [TRANSPARENT_COLOR, 'tt'],
  [WHITE_COLOR , 'w'],
  [WHITE_50_COLOR, 'w50'],
  [GREY_3_COLOR, 'g3'],
  [GREY_7_COLOR, 'g7'],
  [GREY_12_COLOR, 'g12'],
  [GREY_44_COLOR, 'g44'],
  [GREY_65_COLOR, 'g65'],
  [BLACK_COLOR, 'b'],
  [BRAND_BLUE_COLOR, 'bb'],
  [YELLOW_COOR , 'y'],
  [RED_COLOR , 'r'],
  [GREEN_COLOR , 'gr'],
  [FACEBOOK_COLOR , 'fb'],
  [TWITTER_COLOR , 'tw']
];
const FONT_SIZES = [
  [FONT_SIZE_S, 's'],
  [FONT_SIZE_M, 'm'],
  [FONT_SIZE_L, 'l'],
  [FONT_SIZE_XL, 'xl'],
  [FONT_SIZE_XXL, 'xxl']
];
const FONT_STYLE = [
  ['normal', 'n'],
  ['italic', 'i']
];
const FONT_WEIGHTS = [
  ['normal', 'n'],
  ['bold', 'b'],
  ['100', '100'],
  ['200', '200'],
  ['300', '300'],
  ['400', '400'],
  ['500', '500'],
  ['600', '600'],
  ['700', '700'],
  ['800', '800'],
  ['900', '900']
];
const TEXT_ALIGNS = [
  ['auto', 'a'],
  ['left', 'l'],
  ['right', 'r'],
  ['center', 'c'],
  ['justify', 'j']
];
const TEXT_DECORATION_LINES = [
  ['none', 'n'],
  ['underline', 'u'],
  ['line-through', 'lt'],
  ['underline', 'u'],
  ['line-through', 'lt']
];
const VERTICAL_TEXT_ALIGNS = [
  ['auto', 'a'],
  ['top', 't'],
  ['bottom', 'b'],
  ['center', 'c']
];
const LETTER_SPACINGS = [
  [1, '1'],
  [5, '5']
];
const TEXT_DECORATION_STYLES = [
  ['solid', 's'],
  ['double', 'd'],
  ['dotted', 'd'],
  ['dashed', 'd']
];
const WRITING_DIRECTION = [
  ['auto', 'a'],
  ['ltr', 'l'],
  ['rtl', 'r']
];

// TODO: need to make line heights relative
// possible solution - is to compute current line height value depending on element's font size
// const LINE_HEIGHTS = [[Math.floor(11 * 1.5), 'ts'],[Math.floor(16 * 1.5), 'tm'],[Math.floor(22 * 1.5), 'tl'],[Math.floor(30 * 1.5), 'txl'],[Math.floor(44 * 1.5), 'txxl'],[Math.floor(11 * 1.3), 'hs'],[Math.floor(16 * 1.3), 'hm'],[Math.floor(22 * 1.3), 'hl'],[Math.floor(30 * 1.3), 'hxl'],[Math.floor(44 * 1.3), 'hxxl']]

export const ATOMS_SCHEMAS = [
  createAtomSchema('alignItems', 'ai', FLEX_CROSS_AXIS_ALIGNS),
  createAtomSchema('alignSelf', 'as', FLEX_SELF_ALIGNS),
  createAtomSchema('borderBottomWidth', 'bdbw', BORDER_WIDTHS),
  createAtomSchema('borderLeftWidth', 'bdlw', BORDER_WIDTHS),
  createAtomSchema('borderRightWidth', 'bdrw', BORDER_WIDTHS),
  createAtomSchema('borderTopWidth', 'bdtw', BORDER_WIDTHS),
  createAtomSchema('borderWidth', 'bdw', BORDER_WIDTHS),
  createAtomSchema('bottom', 'b', POSITION_VALUES, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('flex', 'fx', FLEX_GROW_VALUES),
  createAtomSchema('flexGrow', 'fxg', FLEX_GROW_VALUES),
  createAtomSchema('flexShrink', 'fxs', FLEX_SHRINK_VALUES),
  createAtomSchema('flexDirection', 'fxd', FLEX_DIRECTIONS),
  createAtomSchema('flexWrap', 'fxw', FLEX_WRAPS),
  createAtomSchema('height', 'h', HEIGHTS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('justifyContent', 'jc', FLEX_MAIN_AXIS_ALIGNS),
  createAtomSchema('left', 'l', POSITION_VALUES, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('margin', 'm', MARGINS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('marginBottom', 'mb', MARGINS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('marginHorizontal', 'mx', MARGINS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('marginLeft', 'ml', MARGINS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('marginRight', 'mr', MARGINS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('marginTop', 'mt', MARGINS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('marginVertical', 'my', MARGINS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('maxHeight', 'mah', HEIGHTS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('maxWidth', 'maw', WIDTHS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('minHeight', 'mih', HEIGHTS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('minWidth', 'miw', WIDTHS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('padding', 'p', PADDINGS),
  createAtomSchema('paddingBottom', 'pb', PADDINGS),
  createAtomSchema('paddingHorizontal', 'px', PADDINGS),
  createAtomSchema('paddingLeft', 'pl', PADDINGS),
  createAtomSchema('paddingRight', 'pr', PADDINGS),
  createAtomSchema('paddingTop', 'pt', PADDINGS),
  createAtomSchema('paddingVertical', 'py', PADDINGS),
  createAtomSchema('position', 'pos', POSITIONS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('right', 'r', POSITION_VALUES, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('top', 't', POSITION_VALUES, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('zIndex', 'z', Z_INDICES, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),
  createAtomSchema('width', 'w', WIDTHS, [AtomGroupName.VIEW, AtomGroupName.EXTERNAL_LAYOUT]),

  // Image
  createAtomSchema('resizeMode', 'rzm', RESIZE_MODES, [AtomGroupName.IMAGE]),
  createAtomSchema('tintColor', 'tc', COLORS, [AtomGroupName.IMAGE]),
  createAtomSchema('overlayColor', 'oc', COLORS, [AtomGroupName.IMAGE]),

  // Text
  createAtomSchema('color', 'c', COLORS, [AtomGroupName.TEXT], {heritable: true}),
  createAtomSchema('fontSize', 'fz', FONT_SIZES, [AtomGroupName.TEXT], {heritable: true}),
  createAtomSchema('fontStyle', 'fs', FONT_STYLE, [AtomGroupName.TEXT]),
  createAtomSchema('fontWeight', 'fw', FONT_WEIGHTS, [AtomGroupName.TEXT]),
  createAtomSchema('textAlign', 'ta', TEXT_ALIGNS, [AtomGroupName.TEXT], {heritable: true}),
  createAtomSchema('textDecorationLine', 'tdl', TEXT_DECORATION_LINES, [AtomGroupName.TEXT]),
  createAtomSchema('textAlignVertical', 'tay', VERTICAL_TEXT_ALIGNS, [AtomGroupName.TEXT], {heritable: true}),
  createAtomSchema('letterSpacing', 'ls', LETTER_SPACINGS, [AtomGroupName.TEXT]),
  createAtomSchema('textDecorationColor', 'tdc', COLORS, [AtomGroupName.TEXT]),
  createAtomSchema('textDecorationStyle', 'tds', TEXT_DECORATION_STYLES, [AtomGroupName.TEXT]),
  createAtomSchema('writingDirection', 'wd', WRITING_DIRECTION, [AtomGroupName.TEXT], {heritable: true}),
  createAtomSchema('lineHeight', 'lh', [
    [classNames => classNames::lookupAtomPropertyValue('fontSize')::processValueOrReturnNull(value => value * 1.5), 't'],
    [classNames => classNames::lookupAtomPropertyValue('fontSize')::processValueOrReturnNull(value => value * 1.3), 'h']
  ]),

  // View
  createAtomSchema('backfaceVisibility', 'bfc', BACKFACE_VISIBILITIES),
  createAtomSchema('backgroundColor', 'bgc', COLORS),
  createAtomSchema('borderBottomColor', 'bdbc', COLORS),
  createAtomSchema('borderBottomLeftRadius', 'bdblr', RADII),
  createAtomSchema('borderBottomRightRadius', 'bdbrr', RADII),
  createAtomSchema('borderBottomWidth', 'bdbw', BORDER_WIDTHS),
  createAtomSchema('borderColor', 'bdc', COLORS),
  createAtomSchema('borderLeftColor', 'bdlc', COLORS),
  createAtomSchema('borderLeftWidth', 'bdlw', BORDER_WIDTHS),
  createAtomSchema('borderRadius', 'bdr', RADII),
  createAtomSchema('borderRightColor', 'bdrc', COLORS),
  createAtomSchema('borderRightWidth', 'bdrw', BORDER_WIDTHS),
  createAtomSchema('borderStyle', 'bds', BORDER_STYLES),
  createAtomSchema('borderTopColor', 'bdtc', COLORS),
  createAtomSchema('borderTopLeftRadius', 'bdtlr', RADII),
  createAtomSchema('borderTopRightRadius', 'bdtrr', RADII),
  createAtomSchema('borderTopWidth', 'bdtw', BORDER_WIDTHS),
  createAtomSchema('borderWidth', 'bdw', BORDER_WIDTHS),
  createAtomSchema('opacity', 'op', OPACITIES),
  createAtomSchema('overflow', 'ov', OVERFLOWS),
  createAtomSchema('elevation', 'el', ELEVATIONS),
];