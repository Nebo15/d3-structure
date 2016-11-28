
import cond from 'ramda/src/cond';
import has from 'ramda/src/has';

import {
  selection as selectionFilter,
} from '../filters';

const instanceProps = [
  'html',
  'text',
  'datum',
  'data',
  'call',
  'remove',
];

const appendNode = (
  id, { attrs = {}, styles = {}, tagName, ...options },
  asD3, selections
) => {
  const node = asD3.append(tagName);

  selections[id] = node;

  instanceProps.forEach((prop) =>
    options[prop] && node[prop] && node[prop](options[prop])
  );

  Object.keys(attrs).forEach((attr) => node.attr(attr, attrs[attr]));
  Object.keys(styles).forEach((style) => node.style(style, styles[style]));

  return node;
}

const appendNodes = (
  id, { nodes, node, selector = null },
  asD3, selections
) => {
  const wrapper = selector ? asD3.select(selector) : asD3;

  if (nodes && nodes.length) {
    return nodes.map((n, k) => appendNode(`${id}-k`, n, wrapper, selections));
  }

  return appendNode(id, node, wrapper, selections);
};

const updateNode = (
  id, { node: { attrs = {}, styles = {} }, selector, ...options},
  asD3, selections
) => {
  const selection = selections[id];

  instanceProps.forEach((prop) =>
    options[prop] && selection[prop] && selection[prop](options[prop])
  );

  if (options.remove) {
    delete selections[id];
    return selection;
  }

  Object.keys(attrs).forEach((attr) => selection.attr(attr, attrs[attr]));
  Object.keys(styles).forEach((style) => selection.style(style, styles[style]));

  return selection;
};

export default cond([
  [(id, ev, asD3, selections) => has(id, selections), updateNode],
  [(id, ev, asD3, selections) => !has(id, selections), appendNodes]
]);
