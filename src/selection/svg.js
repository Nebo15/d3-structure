
import { Observable } from 'rxjs';

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
}, svg }) => {
  const parentNode = selector ? svg.select(selector) : svg;
  const appended = Object.keys(node).reduce((a, k) =>
    a[k](node[k])
  , parentNode.append(tagName));

  const withAttrs = Object.keys(attrs).reduce((a, k) =>
    a.attr(k, attrs[k])
  , appended).attr('id', id);

  return Observable.of(withAttrs)
};

const updateNode = ({ e: {
  id,
  tagName,
  selector = '',
  attrs = {},
  node,
}, svg }) => {
  const updatedNode = Object.keys(node).reduce((a, k) =>
    a[k](node[k])
  , svg.select(`
    ${selector} ${tagName}${id ? `[id="${id}"]` : null}
  `));

  const withAttrs = Object.keys(attrs).reduce((a, k) =>
    a.attr(k, attrs[k])
  , updatedNode);

  return Observable.of(withAttrs);
};

const createBranch = (ev) => Observable.if(
  () => !!ev.e.node && !hasNode(ev),
  Observable.of(ev).flatMap(appendNode),
  Observable.of(ev),
);

export default (ev) => Observable.if(
  () => !!ev.e.node && hasNode(ev),
  Observable.of(ev).flatMap(updateNode),
  Observable.of(ev).flatMap(createBranch),
);
