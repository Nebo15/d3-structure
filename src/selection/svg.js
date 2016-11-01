
import cond from 'ramda/src/cond';

import {
  selection as selectionFilter,
} from '../filters';

const hasNode = ({ e: {
  id = '',
  tagName,
  selector = '',
}, svg }) => !!svg.select(`
  ${selector} ${tagName}${id ? `[id="${id}"]` : null}
`).size()

const appendNode = ({ e: {
  id,
  tagName,
  selector = '',
  attrs = {},
  node,
  transitionId = ''
}, svg, container }) => {
  const parentNode = selector ? svg.select(selector) : svg;
  const appended = Object.keys(node).reduce((a, k) =>
    a[k](node[k])
  , parentNode.append(tagName));

  appended.transition(container.transitions[transitionId]);

  return Object.keys(attrs).reduce((a, k) =>
    a.attr(k, attrs[k])
  , appended).attr('id', id);
};

const updateNode = ({ e: {
  id,
  tagName,
  selector = '',
  attrs = {},
  node = {},
  transitionId
}, svg, container }) => {
  const selection = svg.select(`
    ${selector} ${tagName}${id ? `[id="${id}"]` : null}
  `);

  const updatedNode = Object.keys(node).reduce((a, k) => {
    return a[k](node[k]);
  }, selection);

  return Object.keys(attrs).reduce((a, k) =>
    a.attr(k, attrs[k])
  , transitionId ? updatedNode.transition(container.transitions[transitionId]) : updatedNode);
};

export default cond([
  [(ev) => !!ev.e.node && hasNode(ev), updateNode],
  [(ev) => !!ev.e.node && !hasNode(ev), appendNode]
]);
