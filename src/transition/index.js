
import cond from 'ramda/src/cond';
import has from 'ramda/src/has';
import * as d3 from 'd3-transition';

const transitionProps = [
  'call',
  'delay',
  'duration',
  'ease',
  'text',
];

const createTransition = ({ id, attrs = {}, styles = {}, ...options }, transitions) => {
  const transition = d3.transition(id);

  transitions[id] = transition;

  Object.keys(attrs).forEach((attr) => transition.attr(attr, attrs[attr]));
  Object.keys(styles).forEach((style) => transition.style(style, styles[style]));

  transitionProps.forEach((prop) =>
    options[prop] && transition[prop] && transition[prop](options[prop])
  );

  return transition;
}

export default cond([
  [({ id }, transitions) => !has(id, transitions), createTransition],
]);
