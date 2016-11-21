
import cond from 'ramda/src/cond';

import {
  selection as selectionFilter,
} from '../filters';

const hasNode = ({ selector, container = '' } , asD3) =>
  selector && !!asD3.selectAll(`${container} ${selector}`).size()

const instanceProps = [
  'html',
  'text',
  'datum',
  'data',
]

const appendNode = ({ attrs = {}, styles = {}, tagName, ...options }, asD3) => {
  const node = asD3.append(tagName);

  instanceProps.forEach((prop) =>
    options[prop] && node[prop] && node[prop](options[prop])
  );

  Object.keys(attrs).forEach((attr) => node.attr(attr, attrs[attr]));
  Object.keys(styles).forEach((style) => node.style(style, styles[style]));

  return node;
}

const appendNodes = ({ nodes, node, container = null }, asD3) => {
  const wrapper = container ? asD3.select(container) : asD3;

  if (nodes && nodes.length) {
    return nodes.map((n) => appendNode(n, wrapper))
  }

  return appendNode(node, wrapper);
};

const updateNode = ({
  node: { attrs = {}, styles = {} },
  selector, ...options
}, asD3) => {
  const selection = asD3.selectAll(selector);

  console.log(selection);

  instanceProps.forEach((prop) =>
    options[prop] && selection[prop] && selection[prop](options[prop])
  );

  Object.keys(attrs).forEach((attr) => selection.attr(attr, attrs[attr]));
  Object.keys(styles).forEach((style) => selection.style(style, styles[style]));

  return selection;
};

export default cond([
  [hasNode, updateNode],
  [(ev, asD3) => !hasNode(ev, asD3), appendNodes]
]);
