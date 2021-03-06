import range from 'lodash/range';
import findLast from 'virtual-lodash/findLast';
import {createAtomDictionary, createAtomSchema} from '../quantum/AtomUtils';
import {AtomGroups} from '../quantum/AtomGroups';
import {ReactNativeAtomGroups} from '../quantum/native/ReactNativeAtomGroups';
import {createAliases} from '../quantum/AliasUtils';

const DASH_SEPARATOR = '-';

export const FONT_SIZE_S = 11;
export const FONT_SIZE_M = 16;
export const FONT_SIZE_L = 22;
export const FONT_SIZE_XL = 30;
export const FONT_SIZE_XXL = 44;

export const TRANSPARENT_COLOR = 'transparent';
export const WHITE_COLOR = '#ffffff';
export const WHITE_50_COLOR = 'rgba(255, 255, 255, 0.5)';
export const GREY_3_COLOR= '#f8f8f8';
export const GREY_7_COLOR= '#eeeeee';
export const GREY_12_COLOR= '#e0e0e0';
export const GREY_44_COLOR= '#8f8f95';
export const GREY_65_COLOR= '#57585a';
export const BLACK_COLOR= '#000000';
export const BRAND_BLUE_COLOR = '#48A8c1';
export const YELLOW_COLOR = '#feb310';
export const RED_COLOR = '#ff806f';
export const GREEN_COLOR = '#5ce785';
export const FACEBOOK_COLOR = '#48649f';
export const TWITTER_COLOR = '#50acee';

function mapAtomValue(value) {
  value = Array.isArray(value) ? value : [value, value];
  const [atomValue, atomAlias] = value;
  const separator = !isNaN(parseInt(atomAlias, 10)) ? '' : DASH_SEPARATOR;
  return {
    value: atomValue,
    alias: `${separator}${atomAlias}`
  };
}

const FLEX_CROSS_AXIS_ALIGNS = [
  ['flex-start', 'fs'],
  ['flex-end', 'fe'],
  ['center', 'c'],
  ['stretch', 's']
].map(mapAtomValue);
const FLEX_MAIN_AXIS_ALIGNS = [
  ['flex-start', 'fs'],
  ['flex-end', 'fe'],
  ['center', 'c'],
  ['space-between', 'sb'],
  ['space-around', 'sa']
].map(mapAtomValue);
const FLEX_SELF_ALIGNS = [
  ['auto', 'a'],
  ['flex-start', 'fs'],
  ['flex-end', 'fe'],
  ['center', 'c'],
  ['stretch', 's']
].map(mapAtomValue);
const FLEX_DIRECTIONS = [
  ['row', 'r'],
  ['row-reverse', 'rr'],
  ['column', 'c'],
  ['column-reverse', 'cr']
].map(mapAtomValue);
const FLEX_WRAPS = [
  ['wrap', 'w'],
  ['nowrap', 'nw']
].map(mapAtomValue);
const FLEX_GROW_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(mapAtomValue);
const FLEX_SHRINK_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(mapAtomValue);
const POSITIONS = [
  ['absolute', 'a'],
  ['relative', 'r']
].map(mapAtomValue);
const MARGINS = [0, 1, 3, 5, 7, 10, 15, 20, 25, 30, 40, 50, 60, 70].map(mapAtomValue);
const PADDINGS = [0, 1, 3, 5, 7, 10, 15, 20, 25, 30, 40, 50, 60, 70].map(mapAtomValue);
const WIDTHS = [
  ['100%', '100p'],
  ['50%', '50p'],
  ['25%', '25p'],
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 100, 125, 150, 180, 190, 260].map(mapAtomValue);
const HEIGHTS = [
  ['100%', '100p'],
  ['50%', '50p'],
  ['25%', '25p'],
  0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 100, 125, 150, 180, 190, 260].map(mapAtomValue);
const POSITION_VALUES = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 60].map(mapAtomValue);
const BORDER_WIDTHS = [1, 2].map(mapAtomValue);
const BORDER_STYLES = [
  ['solid', 's'],
  ['dotted', 'd'],
  ['dashed', 'd']
].map(mapAtomValue);
const Z_INDICES = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10].map(mapAtomValue);
const RADII = [
  [9999, 'c'],
  0, 5].map(mapAtomValue);
const OPACITIES = range(0, 101).map(mapAtomValue);
const OVERFLOWS = [
  ['visible', 'v'],
  ['hidden', 'h']
].map(mapAtomValue);
const ELEVATIONS = range(0, 101).map(mapAtomValue);
const RESIZE_MODES = [
  ['cover', 'cv'],
  ['contain', 'ct'],
  ['stretch', 's'],
  ['repeat', 'r'],
  ['center', 'c']
].map(mapAtomValue);
const BACKFACE_VISIBILITIES = [
  ['visible', 'v'],
  ['hidden', 'h']
].map(mapAtomValue);
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
  [YELLOW_COLOR , 'y'],
  [RED_COLOR , 'r'],
  [GREEN_COLOR , 'gr'],
  [FACEBOOK_COLOR , 'fb'],
  [TWITTER_COLOR , 'tw']
].map(mapAtomValue);
const FONT_SIZES = [
  [FONT_SIZE_S, 's'],
  [FONT_SIZE_M, 'm'],
  [FONT_SIZE_L, 'l'],
  [FONT_SIZE_XL, 'xl'],
  [FONT_SIZE_XXL, 'xxl']
].map(mapAtomValue);
const FONT_STYLE = [
  ['normal', 'n'],
  ['italic', 'i']
].map(mapAtomValue);
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
].map(mapAtomValue);
const TEXT_ALIGNS = [
  ['auto', 'a'],
  ['left', 'l'],
  ['right', 'r'],
  ['center', 'c'],
  ['justify', 'j']
].map(mapAtomValue);
const TEXT_DECORATION_LINES = [
  ['none', 'n'],
  ['underline', 'u'],
  ['line-through', 'lt'],
  ['underline', 'u'],
  ['line-through', 'lt']
].map(mapAtomValue);
const VERTICAL_TEXT_ALIGNS = [
  ['auto', 'a'],
  ['top', 't'],
  ['bottom', 'b'],
  ['center', 'c']
].map(mapAtomValue);
const LETTER_SPACINGS = [
  [1, '1'],
  [5, '5']
].map(mapAtomValue);
const TEXT_DECORATION_STYLES = [
  ['solid', 's'],
  ['double', 'd'],
  ['dotted', 'd'],
  ['dashed', 'd']
].map(mapAtomValue);
const WRITING_DIRECTION = [
  ['auto', 'a'],
  ['ltr', 'l'],
  ['rtl', 'r']
].map(mapAtomValue);
const LINE_HEIGHTS = [
  [(atoms, element) => calculateLineHeight(atoms, element, 1.5), 't'],
  [(atoms, element) => calculateLineHeight(atoms, element, 1.3), 'h']
].map(mapAtomValue);

function calculateLineHeight(atoms, element, multiplier) {
  const fontSize = atoms::findLast({property: 'fontSize'});
  if (!fontSize) {
    throw new Error('lineHeight required fontSize');
  }
  return fontSize.getValue(atoms, element) * multiplier;
}

export const AtomDictionary = createAtomDictionary([
  createAtomSchema('alignItems', 'ai', FLEX_CROSS_AXIS_ALIGNS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('alignSelf', 'as', FLEX_SELF_ALIGNS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderBottomWidth', 'bdbw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderLeftWidth', 'bdlw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderRightWidth', 'bdrw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderTopWidth', 'bdtw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderWidth', 'bdw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('bottom', 'b', POSITION_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('flex', 'fx', FLEX_GROW_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('flexGrow', 'fxg', FLEX_GROW_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('flexShrink', 'fxs', FLEX_SHRINK_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('flexDirection', 'fxd', FLEX_DIRECTIONS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('flexWrap', 'fxw', FLEX_WRAPS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('height', 'h', HEIGHTS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('justifyContent', 'jc', FLEX_MAIN_AXIS_ALIGNS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('left', 'l', POSITION_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('margin', 'm', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('marginBottom', 'mb', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('marginHorizontal', 'mx', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('marginLeft', 'ml', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('marginRight', 'mr', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('marginTop', 'mt', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('marginVertical', 'my', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('maxHeight', 'mah', HEIGHTS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('maxWidth', 'maw', WIDTHS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('minHeight', 'mih', HEIGHTS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('minWidth', 'miw', WIDTHS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('padding', 'p', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}),
  createAtomSchema('paddingBottom', 'pb', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}),
  createAtomSchema('paddingHorizontal', 'px', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}),
  createAtomSchema('paddingLeft', 'pl', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}),
  createAtomSchema('paddingRight', 'pr', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}),
  createAtomSchema('paddingTop', 'pt', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}),
  createAtomSchema('paddingVertical', 'py', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}),
  createAtomSchema('position', 'pos', POSITIONS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('right', 'r', POSITION_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('top', 't', POSITION_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('zIndex', 'z', Z_INDICES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),
  createAtomSchema('width', 'w', WIDTHS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}),

// Image
  createAtomSchema('resizeMode', 'rzm', RESIZE_MODES, {groups: [ReactNativeAtomGroups.IMAGE]}),
  createAtomSchema('tintColor', 'tc', COLORS, {groups: [ReactNativeAtomGroups.IMAGE]}),
  createAtomSchema('overlayColor', 'oc', COLORS, {groups: [ReactNativeAtomGroups.IMAGE]}),

// Text
  createAtomSchema('color', 'c', COLORS, {groups: [AtomGroups.TEXT, AtomGroups.HERITABLE]}),
  createAtomSchema('fontSize', 'fz', FONT_SIZES, {groups: [AtomGroups.TEXT, AtomGroups.HERITABLE]}),
  createAtomSchema('fontStyle', 'fs', FONT_STYLE, {groups: [AtomGroups.TEXT]}),
  createAtomSchema('fontWeight', 'fw', FONT_WEIGHTS, {groups: [AtomGroups.TEXT]}),
  createAtomSchema('textAlign', 'ta', TEXT_ALIGNS, {groups: [AtomGroups.TEXT, AtomGroups.HERITABLE]}),
  createAtomSchema('textDecorationLine', 'tdl', TEXT_DECORATION_LINES, {groups: [AtomGroups.TEXT]}),
  createAtomSchema('textAlignVertical', 'tay', VERTICAL_TEXT_ALIGNS, {groups: [AtomGroups.TEXT, AtomGroups.HERITABLE]}),
  createAtomSchema('letterSpacing', 'ls', LETTER_SPACINGS, {groups: [AtomGroups.TEXT]}),
  createAtomSchema('textDecorationColor', 'tdc', COLORS, {groups: [AtomGroups.TEXT]}),
  createAtomSchema('textDecorationStyle', 'tds', TEXT_DECORATION_STYLES, {groups: [AtomGroups.TEXT]}),
  createAtomSchema('writingDirection', 'wd', WRITING_DIRECTION, {groups: [AtomGroups.TEXT, AtomGroups.HERITABLE]}),
  createAtomSchema('lineHeight', 'lh', LINE_HEIGHTS, {groups: [AtomGroups.TEXT, AtomGroups.HERITABLE]}),

// View
  createAtomSchema('backfaceVisibility', 'bfc', BACKFACE_VISIBILITIES, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('backgroundColor', 'bgc', COLORS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderBottomColor', 'bdbc', COLORS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderBottomLeftRadius', 'bdblr', RADII, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderBottomRightRadius', 'bdbrr', RADII, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderBottomWidth', 'bdbw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderColor', 'bdc', COLORS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderLeftColor', 'bdlc', COLORS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderLeftWidth', 'bdlw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderRadius', 'bdr', RADII, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderRightColor', 'bdrc', COLORS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderRightWidth', 'bdrw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderStyle', 'bds', BORDER_STYLES, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderTopColor', 'bdtc', COLORS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderTopLeftRadius', 'bdtlr', RADII, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderTopRightRadius', 'bdtrr', RADII, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderTopWidth', 'bdtw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('borderWidth', 'bdw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('opacity', 'op', OPACITIES, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('elevation', 'el', ELEVATIONS, {groups: [AtomGroups.BOX_MODEL]}),
  createAtomSchema('overflow', 'ov', OVERFLOWS, {groups: [AtomGroups.BOX_MODEL]}),

  //createAtomSchema('overflow-x', 'ovx', [['scroll', 's']].map(mapAtomValue)),
  //createAtomSchema('overflow-y', 'ovy', [['scroll', 's']].map(mapAtomValue))
]);

export const Aliases = createAliases({
  'btn': 'h50 fxd-r jc-c ai-c w100p bdr5 fz-m',
  'btn--w': 'bgc-w c-b',
  'btn--fb': 'bgc-fb c-w',

  'input': 'w100p pt15 ta-l fz-m c-b'
});
