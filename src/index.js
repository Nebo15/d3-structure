
import cond from 'ramda/src/cond';

import d3Select from './selection';

import shape from './shape';
import selection from './selection/index';

import {
  shape as shapeFilter,
  selection as selectionFilter,
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
  };

  const subject = cond([
    [(e) => shapeFilter(e), shape],
    [(e) => selectionFilter(e), selection]
  ]);

  const API = {
    d3: asD3,
    container,
    dispatch(e) {
      return subject({
        e, svg, container
      });
      // return subject.next({
      //   e, svg, container,
      // });
    },
  };

  return API;
};
