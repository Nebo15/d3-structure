
import cond from 'ramda/src/cond';
import has from 'ramda/src/has';

import * as d3 from 'd3-scale';

import { camelize } from '../utils';

const scaleProps = [
  'domain',
  'range',
  'rangeRound',
  'clamp',
  'invert',
  'interpolate',
  'ticks',
  'tickFormat',
  'nice',
  'copy',
  'paddingInner',
];

const updateScale = ({ id, ...options }, scales) =>
  scaleProps.reduce((scale, option) =>
    options[option] && scale[option] ?
      scale[option](options[option]) : scale
  , scales[id]);

const createScale = ({ id, type, ...options }, scales) =>
  scales[id] = scaleProps.reduce((scale, option) => {
    const s = options[option] && scale[option] ?
      scale[option](options[option]) : scale;

    if (s !== scale) {
      return scale;
    }

    return s;
  }, d3[`scale${camelize(type)}`]());

export default cond([
  [({ id }, scales) => has(id, scales), updateScale],
  [({ id }, scales) => !has(id, scales), createScale]
]);
