import type {ReactElement} from 'react-native/flow/react';

export type NativeStyleSheet = {[name: string]: number};

export type CssProperty = string; // Should become $Values<NativeCssProperty> later on.

export type ClassName = string; // Space-separated list of CSS-like class names.

export type AtomGroup = {
  name: string
};

export type ClassNameAlias = AtomName[];

export type ClassNameAliasesSchema = {
  [name: string]: ClassNameAlias
}

export type AtomValueScalar = number | string;

export type AtomValueGetter = (atoms: Atom[], element: ReactElement) => AtomValueScalar | Object; // Object type denotes animation.

export type AtomValueSchema = [AtomValueScalar | AtomValueGetter, string]; // Tuple of value (or value getter) and alias.

export type AtomSchemaOptions = {
  groups: [],
  heritable: boolean
};

export type AtomSchema = {
  property: CssProperty, // CSS property name.
  abbrev: string, // CSS property abbreviation.
  values: AtomValueSchema[] // List of atom values.
  groups: AtomGroup[], // List of groups this atom should belong to.
  heritable: boolean
}

export type AtomName = string;

export type Atom = {
  name: AtomName, // Ex. fx-z
  scalar: boolean,
  property: CssProperty, // CSS property name.
  getValue: AtomValueGetter, // Getter that returns value for this atom.
  groups: AtomGroup[],
  heritable: boolean // can be passed down or not
};

export type AtomDictionary = {[name: string]: Atom};
