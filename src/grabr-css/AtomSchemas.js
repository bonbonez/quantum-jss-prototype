import range from 'lodash/range';
import findLast from 'virtual-lodash/findLast';
import {
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
  YELLOW_COLOR
} from './constants';
import {createAtomSchema} from '../quantum/AtomUtils';
import {AtomGroups} from '../quantum/AtomGroups';
import {ReactNativeAtomGroups} from '../quantum/native/ReactNativeAtomGroups';

const DASH_SEPARATOR = '-';

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
const HEIGHTS = [0, 1, 2, 3, 4, 5, 6, 7, 8, 9, 10, 15, 20, 25, 30, 35, 40, 45, 50, 60, 70, 80, 100, 125, 150, 180, 190, 260].map(mapAtomValue);
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

export const AtomSchemas = [
  ['alignItems', 'ai', FLEX_CROSS_AXIS_ALIGNS, {groups: [AtomGroups.BOX_MODEL]}],
  ['alignSelf', 'as', FLEX_SELF_ALIGNS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderBottomWidth', 'bdbw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderLeftWidth', 'bdlw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderRightWidth', 'bdrw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderTopWidth', 'bdtw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderWidth', 'bdw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}],
  ['bottom', 'b', POSITION_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['flex', 'fx', FLEX_GROW_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['flexGrow', 'fxg', FLEX_GROW_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['flexShrink', 'fxs', FLEX_SHRINK_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['flexDirection', 'fxd', FLEX_DIRECTIONS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['flexWrap', 'fxw', FLEX_WRAPS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['height', 'h', HEIGHTS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['justifyContent', 'jc', FLEX_MAIN_AXIS_ALIGNS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['left', 'l', POSITION_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['margin', 'm', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['marginBottom', 'mb', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['marginHorizontal', 'mx', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['marginLeft', 'ml', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['marginRight', 'mr', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['marginTop', 'mt', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['marginVertical', 'my', MARGINS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['maxHeight', 'mah', HEIGHTS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['maxWidth', 'maw', WIDTHS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['minHeight', 'mih', HEIGHTS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['minWidth', 'miw', WIDTHS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['padding', 'p', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}],
  ['paddingBottom', 'pb', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}],
  ['paddingHorizontal', 'px', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}],
  ['paddingLeft', 'pl', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}],
  ['paddingRight', 'pr', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}],
  ['paddingTop', 'pt', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}],
  ['paddingVertical', 'py', PADDINGS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.CONTENT_BOX]}],
  ['position', 'pos', POSITIONS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['right', 'r', POSITION_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['top', 't', POSITION_VALUES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['zIndex', 'z', Z_INDICES, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],
  ['width', 'w', WIDTHS, {groups: [AtomGroups.BOX_MODEL, AtomGroups.BORDER_BOX]}],

// Image
  ['resizeMode', 'rzm', RESIZE_MODES, {groups: [ReactNativeAtomGroups.IMAGE]}],
  ['tintColor', 'tc', COLORS, {groups: [ReactNativeAtomGroups.IMAGE]}],
  ['overlayColor', 'oc', COLORS, {groups: [ReactNativeAtomGroups.IMAGE]}],

// Text
  ['color', 'c', COLORS, {groups: [AtomGroups.TEXT], heritable: true}],
  ['fontSize', 'fz', FONT_SIZES, {groups: [AtomGroups.TEXT], heritable: true}],
  ['fontStyle', 'fs', FONT_STYLE, {groups: [AtomGroups.TEXT]}],
  ['fontWeight', 'fw', FONT_WEIGHTS, {groups: [AtomGroups.TEXT]}],
  ['textAlign', 'ta', TEXT_ALIGNS, {groups: [AtomGroups.TEXT], heritable: true}],
  ['textDecorationLine', 'tdl', TEXT_DECORATION_LINES, {groups: [AtomGroups.TEXT]}],
  ['textAlignVertical', 'tay', VERTICAL_TEXT_ALIGNS, {groups: [AtomGroups.TEXT], heritable: true}],
  ['letterSpacing', 'ls', LETTER_SPACINGS, {groups: [AtomGroups.TEXT]}],
  ['textDecorationColor', 'tdc', COLORS, {groups: [AtomGroups.TEXT]}],
  ['textDecorationStyle', 'tds', TEXT_DECORATION_STYLES, {groups: [AtomGroups.TEXT]}],
  ['writingDirection', 'wd', WRITING_DIRECTION, {groups: [AtomGroups.TEXT], heritable: true}],
  ['lineHeight', 'lh', LINE_HEIGHTS, {groups: [AtomGroups.TEXT], heritable: true}],

// View
  ['backfaceVisibility', 'bfc', BACKFACE_VISIBILITIES, {groups: [AtomGroups.BOX_MODEL]}],
  ['backgroundColor', 'bgc', COLORS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderBottomColor', 'bdbc', COLORS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderBottomLeftRadius', 'bdblr', RADII, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderBottomRightRadius', 'bdbrr', RADII, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderBottomWidth', 'bdbw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderColor', 'bdc', COLORS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderLeftColor', 'bdlc', COLORS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderLeftWidth', 'bdlw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderRadius', 'bdr', RADII, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderRightColor', 'bdrc', COLORS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderRightWidth', 'bdrw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderStyle', 'bds', BORDER_STYLES, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderTopColor', 'bdtc', COLORS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderTopLeftRadius', 'bdtlr', RADII, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderTopRightRadius', 'bdtrr', RADII, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderTopWidth', 'bdtw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}],
  ['borderWidth', 'bdw', BORDER_WIDTHS, {groups: [AtomGroups.BOX_MODEL]}],
  ['opacity', 'op', OPACITIES, {groups: [AtomGroups.BOX_MODEL]}],
  ['overflow', 'ov', OVERFLOWS, {groups: [AtomGroups.BOX_MODEL]}],
  ['elevation', 'el', ELEVATIONS, {groups: [AtomGroups.BOX_MODEL]}],
];