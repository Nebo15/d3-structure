
import { area as d3Area } from 'd3-shape';

import cond from 'ramda/src/cond';
import path from 'ramda/src/path';

import {
  shape as shapeFilter,
  area as areaFilter,
} from '../filters';

import { shapeReducer } from '../utils';

const hasStream = ({ e: { id }, container }) =>
  !!container.shapes.areas[id]

const createArea = ({ e: { area, id }, container }) =>
  container.shapes.areas[id] = shapeReducer(area, d3Area(), { container })

const updateArea = ({ e: { area, id }, container }) =>
  shapeReducer(area, container.shapes.areas[id], { container })

export default cond([
  [(ev) => !!ev.e.area && hasStream(ev), updateArea],
  [(ev) => !!ev.e.area && !hasStream(ev), createArea],
]);
