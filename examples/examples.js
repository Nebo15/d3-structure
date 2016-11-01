
import dstream from '../src';
import { csv } from 'd3-xhr';
import { timeParse } from 'd3-time-format';
import { curveMonotoneX } from 'd3-shape';
import { extent, max } from 'd3-array';

const simple = dstream(document.querySelector('.simpleExample'));

simple.dispatch({
  type: 'selection',
  tagName: 'rect',
  id: 'simpleRect',
  node: {},
  attrs: {
    fill: 'red',
    width: 60,
    height: 60,
  },
});

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

simpleArea.dispatch({
  type: 'scale',
  id: 'xScale',
  scaleType: 'time',
  scale: {
    range: [0, width],
  },
});

simpleArea.dispatch({
  type: 'scale',
  id: 'yScale',
  scaleType: 'linear',
  scale: {
    range: [height, 0],
  },
});

simpleArea.dispatch({
  type: 'axis',
  id: 'xAxis',
  orient: 'bottom',
  scaleId: 'xScale',
});

simpleArea.dispatch({
  type: 'axis',
  id: 'yAxis',
  orient: 'left',
  scaleId: 'yScale',
});

simpleArea.dispatch({
  type: 'selection',
  tagName: 'g',
  id: 'simpleAreaGroup',
  node: {},
  attrs: {
    transform:  'translate(' + margin.left + ',' + margin.top + ')',
  },
});

simpleArea.dispatch({
  type: 'shape',
  shape: 'area',
  id: 'mainArea',
  area: {
    curve: curveMonotoneX,
    y0: height,
    y1: (d) => scales.yScale(d.price),
    x: (d) => scales.xScale(d.date),
  },
});

csv('data/simple-area.csv', (d)=> {
  d.date = parseDate(d.date);
  d.price = +d.price;

  return d;
}, (error, data) => {
  simpleArea.dispatch({
    type: 'scale',
    id: 'xScale',
    scale: {
      domain: extent(data, (d) => d.date),
    },
  });

  simpleArea.dispatch({
    type: 'scale',
    id: 'yScale',
    scale: {
      domain: [0, max(data, (d) => d.price)],
    },
  });

  simpleArea.dispatch({
    type: 'selection',
    id: 'simpleArea',
    selector: '#simpleAreaGroup',
    tagName: 'path',
    node: {
      datum: data,
    },
    attrs: {
      d: areas.mainArea,
    },
  });

  simpleArea.dispatch({
    type: 'selection',
    id: 'xAxis',
    tagName: 'g',
    node: {
      call: axises.xAxis,
    },
    attrs: {
      transform:' translate(' + margin.left + ',' + (height + margin.top) + ')',
    }
  });

  simpleArea.dispatch({
    type: 'selection',
    id: 'yAxis',
    tagName: 'g',
    node: {
      call: axises.yAxis,
    },
    attrs: {
      transform:' translate(' + margin.left + ', ' + margin.top + ')',
    }
  });
});
