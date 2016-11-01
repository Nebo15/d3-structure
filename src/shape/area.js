
import { area as d3Area } from 'd3-shape';
import cond from 'ramda/src/cond';
import path from 'ramda/src/path';

import {
  shape as shapeFilter,
  area as areaFilter,
} from '../filters';

const hasStream = ({ e: { id }, container }) =>
  !!container.shapes.areas[id]

const createArea = ({ e: { area, id }, container }) =>
  container.shapes.areas[id] = Object.keys(area).reduce((a, k) => {
    if (area[k].hooks) {
      return a[k]((val) => area[k].hooks.reduce((v, hook) =>
        'function' === typeof hook ? hook(val) : path(hook, container)(val)
      , val));
    }

    return a[k](area[k]);
  }, d3Area());

const updateArea = ({ e: { area, id }, container }) =>
  Object.keys(area).reduce((a, k) => {
    if (area[k].hooks) {
      return l[k]((val) => line[k].hooks.reduce((v, hook) =>
        'function' === typeof hook ? hook(val) : path(hook, container)(val)
      , val));
    }

    return a[k](area[k]);
  }, container.shapes.areas[id])

export default cond([
  [(ev) => !!ev.e.area && hasStream(ev), updateArea],
  [(ev) => !!ev.e.area && !hasStream(ev), createArea],
]);
