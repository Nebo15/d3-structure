
import cond from 'ramda/src/cond';

import * as d3 from 'd3-axis';

import {
  axis as axisFilter,
} from '../filters';
import { camelize } from '../utils';

const hasAxis = ({ e: { id }, container }) => !!container.axises[id]

const createAxis = ({ e: { axis = {}, orient, id, scaleId }, container }) =>
  container.axises[id] = Object.keys(axis).reduce(
    (a, k)=> {
      return a[k](axis[k]);
    }, d3[`axis${camelize(orient)}`](container.scales[scaleId])
  );

const updateAxis = ({ e: { axis = {}, id }, container }) =>
   Object.keys(axis).reduce(
    (a, k)=> a[k](axis[k]),
    container.axises[id]
  );

export default cond([
  [(ev) => !hasAxis(ev), createAxis],
  [(ev) => hasAxis(ev), updateAxis]
]);
