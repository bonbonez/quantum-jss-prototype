import React from 'react';
import {Span} from './Span';

export function wrapTextNodes(children, key = null) {
  if (Array.isArray(children)) {
    return children.map(wrapTextNodes);
  }

  if (React.isValidElement(children)) {
    return children;
  }

  return <Span key={key}>{children}</Span>;
}
