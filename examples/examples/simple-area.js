
import dstream from '../../src';
import { csv } from 'd3-xhr';
import { timeParse } from 'd3-time-format';
import { curveMonotoneX } from 'd3-shape';
import { extent, max } from 'd3-array';

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
  range: [0, height],
});

simpleArea.axis('xAxis', {
  type: 'bottom',
  scale: scales['xScale'],
});

simpleArea.axis('yAxis', {
  type: 'bottom',
  scale: scales['yScale'],
});

simpleArea.svg({
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
  y0: height,
  curve: () => curveMonotoneX,
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

  simpleArea.svg({
    container: '#simpleAreaGroup',
    node: {
      datum: data,
      tagName: 'path',
      attrs: {
        id: 'simpleArea',
        d: areas.mainArea,
      },
    },
  });
});
