
import merge from 'ramda/src/merge';

import d3Select from './selection';

import shape from './shape';
import selection from './selection/index';
import axis from './axis';
import scale from './scale';
import transition from './transition';

export default (selector, options) => {
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
    transitions: {},
  };

  const API = {
    d3: asD3,
    container,

    scale(id, options = {}) {
      return scale(merge({ id }, options), container.scales)
    },

    shape(id, options = {}) {
      return shape(merge({ id }, options), container.shapes);
    },

    axis(id, options = {}) {
      return axis(merge({ id }, options), container.axises)
    },

    svg(options = {}) {
      return selection(options, svg);
    },

    transition(id, options = {}) {
      return transition(merge({ id }, options), container.transitions);
    }
  };

  return API;
};
