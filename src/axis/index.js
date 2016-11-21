
import * as d3 from 'd3-axis';

import cond from 'ramda/src/cond';
import has from 'ramda/src/has';

import { axis as axisFilter } from '../filters';
import { camelize } from '../utils';

const axisProps = [
  'scale',
  'ticks',
  'tickArguments',
  'tickValues',
  'tickFormat',
  'tickSize',
  'tickSizeInner',
  'tickSizeOuter',
  'tickPadding',
];

const createAxis = ({ id, type, ...options }, axises) =>
  axises[id] = axisProps.reduce((axis, option) =>
    options[option] && axis[option] ?
      axis[option](options[option]) : axis
  , d3[`axis${camelize(type)}`]());

const updateAxis = ({ id, type, ...options }, axises) =>
  axisProps.reduce((axis, option) =>
    options[option] && axis[option] ?
      axis[option](options[option]) : axis
  , axises[id]);

export default cond([
  [({ id }, axises) => has(id, axises), updateAxis],
  [({ id }, axises) => !has(id, axises), createAxis]
]);
