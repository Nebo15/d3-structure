
import { area as d3Area } from 'd3-shape';

import has from 'ramda/src/has';
import merge from 'ramda/src/merge';
import cond from 'ramda/src/cond';
import path from 'ramda/src/path';

import { shapeReducer } from '../utils';

const areaProps = [
  'x',
  'y',
  'x0',
  'x1',
  'y0',
  'y1',
  'defined',
  'curve',
  'context',
];

const createArea = ({ id, ...options }, areas) =>
  areas[id] = areaProps.reduce((area, prop) =>
    shapeReducer(area, prop, options)
  , d3Area());

const updateArea = ({ id, ...options }, areas) =>
  areaProps.reduce((area, prop) =>
    shapeReducer(area, prop, options)
  , areas[id]);

export default cond([
  [
    ({ id }, { areas }) => has(id, areas),
    (options, { areas }) => updateArea(options, areas)
  ],
  [
    ({ id }, { areas }) => !has(id, areas),
    (options, { areas }) => createArea(options, areas)
  ],
]);
