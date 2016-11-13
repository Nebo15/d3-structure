
import cond from 'ramda/src/cond';
import path from 'ramda/src/path';

const hookReducer = (val, hooks, { container }) =>
  hooks.reduce((v, hook) =>
    'function' === typeof hook ? hook(val) : path(hook, container)(val)
  , val);

export const shapeReducer = (options, shape, { container }) =>
  Object.keys(options).reduce((reducedShape, optionName) => {
    if (options[optionName].hooks) {
      return reducedShape[optionName]((val) =>
        hookReducer(val, options[optionName].hooks, { container }
      ));
    }

    return reducedShape[optionName](options[optionName]);
  }, shape)
