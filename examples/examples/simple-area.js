
import dstream from '../../src';
import { csv } from 'd3-xhr';
import { timeParse } from 'd3-time-format';
import { curveMonotoneX } from 'd3-shape';
import { extent, max, min } from 'd3-array';

const simpleArea = dstream(document.querySelector('.simpleArea'));

const {
  scales,
  axises,
  shapes: { areas },
} = simpleArea.container;

const margin = {top: 40, right: 20, bottom: 110, left: 40};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const parseDate = timeParse('%b %Y');

simpleArea.d3.select('svg').attr('width', 960);
simpleArea.d3.select('svg').attr('height', 500);

simpleArea.scale('xScale', {
  type: 'time',
  range: [0, width],
});

simpleArea.scale('yScale', {
  type: 'linear',
  range: [height, 0],
});

simpleArea.svg('simpleAreaGroup', {
  node: {
    tagName: 'g',
    attrs: {
      id: 'simpleAreaGroup',
      transform:  'translate(' + margin.left + ',' + margin.top + ')',
    },
  },
});

simpleArea.shape('mainArea', {
  type: 'area',
  curve: () => curveMonotoneX,
  y0: height,
  y1: () => d => scales.yScale(d.price),
  x: () => d => scales.xScale(d.date),
});

csv('data/simple-area.csv', (d)=> {
  d.date = parseDate(d.date);
  d.price = +d.price;

  return d;
}, (error, data) => {
  simpleArea.scale('xScale', {
    domain: extent(data, (d) => d.date),
  });

  simpleArea.scale('yScale', {
    domain: [0, max(data, (d) => d.price)],
  });

  simpleArea.svg('simpleAreaPath', {
    selector: '#simpleAreaGroup',
    node: {
      tagName: 'path',
      styles: {
        fill: 'steelblue',
      },
      attrs: {
        id: 'simpleArea',
        d: areas.mainArea(data)
      },
    },
  });
});
