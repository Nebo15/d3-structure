
import cond from 'ramda/src/cond';
import path from 'ramda/src/path';

export const camelize = (s) => `${s.charAt(0).toUpperCase()}${s.slice(1)}`

const hookReducer = (val, hooks, { container }) =>
  hooks.reduce((v, hook) =>
    'function' === typeof hook ? hook(val) : path(hook, container)(val)
  , val);

export const shapeReducer = (shape, { container, ...options }) =>
  Object.keys(options).reduce((reducedShape, optionName) => {
    if (options[optionName].hooks) {
      return reducedShape[optionName]((val) =>
        hookReducer(val, options[optionName].hooks, { container }
      ));
    }

    return reducedShape[optionName](options[optionName]);
  }, shape)
