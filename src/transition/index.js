
import cond from 'ramda/src/cond';
import * as d3 from 'd3-transition';

const hasTransition = ({ e: { id }, container }) => !!container.transitions[id]

const createTransition = ({ e: { transition = {}, id, attrs = {} }, container }) =>
  container.transitions[id] = Object.keys(attrs).reduce((t, attrKey) =>
    t.attr(attrKey, attrs[attrKey])
  , Object.keys(transition).reduce((t, k) =>
    transition[k] instanceof Array ?
      t[k].apply(t, transition[k]) : t[k](transition[k])
  , d3.transition(id)));

const updateTransition = ({ e: { transition = {}, id, attrs = {} }, container }) =>
  container.transitions[id] = Object.keys(attrs).reduce((t, attrKey) =>
    t.attr(attrKey, attrs[attrKey])
  , Object.keys(transition).reduce((t, k) =>
    transition[k] instanceof Array ?
      t[k].apply(t, transition[k]) : t[k](transition[k])
  , container.transitions[id]));

export default cond([
  [(ev) => hasTransition(ev), updateTransition],
  [(ev) => !hasTransition(ev), createTransition]
]);
