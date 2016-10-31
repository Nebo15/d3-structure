
import cond from 'ramda/src/cond';

import d3Select from './selection';

import shape from './shape';
import selection from './selection/index';
import axis from './axis';
import scale from './scale';

import {
  shape as shapeFilter,
  selection as selectionFilter,
  axis as axisFilter,
  scale as scaleFilter,
} from './filters';

export default (selector) => {
  const asD3 = d3Select(selector);
  const svg = asD3.append('svg');

  const container = {
    shapes: {
      lines: {},
      arcs: {},
      pies: {},
      areas: {},
    },
    axises: {},
    scales: {},
  };

  const subject = cond([
    [(e) => shapeFilter(e), shape],
    [(e) => selectionFilter(e), selection],
    [(e) => scaleFilter(e), scale],
    [(e) => axisFilter(e), axis],
  ]);

  const API = {
    d3: asD3,
    container,
    dispatch(e) {
      return subject({
        e, svg, container
      });
    },
  };

  return API;
};
