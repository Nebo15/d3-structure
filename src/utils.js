
import cond from 'ramda/src/cond';
import path from 'ramda/src/path';

export const camelize = (s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`

const hookReducer = (val, hooks, { container }) =>
  hooks.reduce((v, hook) =>
    'function' === typeof hook ? hook(val) : path(hook, container)(val)
  , val);

export const shapeReducer = (shape, prop, options) => {
  console.log(prop, options[prop] && shape[prop]);
  return options[prop] && shape[prop] ?
      typeof options[prop] === 'function' ?
        shape[prop](options[prop]()) : shape[prop](options[prop])
      : shape;
}
