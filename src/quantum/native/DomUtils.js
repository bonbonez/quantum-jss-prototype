import React from 'react';
import {Span} from './Span';

export function wrapTextNodes(child, key = null) {
  if (React.isValidElement(child)) {
    return child;
  }

  return <Span key={key}>{child}</Span>;
}
