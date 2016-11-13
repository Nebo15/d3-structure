
import { area as d3Area } from 'd3-shape';

import cond from 'ramda/src/cond';
import path from 'ramda/src/path';

import {
  shape as shapeFilter,
  area as areaFilter,
} from '../filters';

import { shapeReducer } from '../utils';

const hasStream = ({ e: { id }, container }) =>
  !!container.shapes.areas[id];

const createArea = ({ e: { area, id }, container }) =>
  container.shapes.areas[id] = shapeReducer(d3Area(), Object.assign({}, {
    container,
  }, area));

const updateArea = ({ e: { area, id }, container }) =>
  shapeReducer(container.shapes.areas[id], Object.assign({}, {
    container,
  }, area));

export default cond([
  [(ev) => !!ev.e.area && hasStream(ev), updateArea],
  [(ev) => !!ev.e.area && !hasStream(ev), createArea],
]);
