
import dstream from '../../src';
import { csv } from 'd3-xhr';
import { timeParse } from 'd3-time-format';
import { curveMonotoneX } from 'd3-shape';
import { extent, max } from 'd3-array';

const dynamicArea = dstream(document.querySelector('.dynamicArea'));

const {
  scales,
  axises,
  shapes: { areas },
} = dynamicArea.container;

const margin = {top: 40, right: 20, bottom: 110, left: 40};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const parseDate = timeParse('%b %Y');

dynamicArea.d3.select('svg').attr('width', 960);
dynamicArea.d3.select('svg').attr('height', 500);

dynamicArea.dispatch({
  type: 'scale',
  id: 'xScale',
  scaleType: 'time',
  scale: {
    range: [0, width],
  },
});

dynamicArea.dispatch({
  type: 'scale',
  id: 'yScale',
  scaleType: 'linear',
  scale: {
    range: [height, 0],
  },
});

dynamicArea.dispatch({
  type: 'axis',
  id: 'xAxis',
  orient: 'bottom',
  scaleId: 'xScale',
});

dynamicArea.dispatch({
  type: 'axis',
  id: 'yAxis',
  orient: 'left',
  scaleId: 'yScale',
});

dynamicArea.dispatch({
  type: 'selection',
  tagName: 'g',
  id: 'dynamicAreaGroup',
  node: {},
  attrs: {
    transform:  'translate(' + margin.left + ',' + margin.top + ')',
  },
});

dynamicArea.dispatch({
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

const button = document.querySelector('.dynamicUpdateButton');

button.addEventListener('click', clickButton, false);

function clickButton() {
  csv('data/dynamic-area.csv', (d)=> {
    d.date = parseDate(d.date);
    d.price = +d.price;

    return d;
  }, (error, data) => {
    update(data);
  });
}

csv('data/simple-area.csv', (d)=> {
  d.date = parseDate(d.date);
  d.price = +d.price;

  return d;
}, (error, data) => {
  update(data);
});

function update(data) {
  dynamicArea.dispatch({
    type: 'scale',
    id: 'xScale',
    scale: {
      domain: extent(data, (d) => d.date),
    },
  });

  dynamicArea.dispatch({
    type: 'scale',
    id: 'yScale',
    scale: {
      domain: [0, max(data, (d) => d.price)],
    },
  });

  dynamicArea.dispatch({
    type: 'selection',
    id: 'dynamicArea',
    selector: '#dynamicAreaGroup',
    tagName: 'path',
    node: {
      datum: data,
    },
    attrs: {
      d: areas.mainArea,
    },
  });

  dynamicArea.dispatch({
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

  dynamicArea.dispatch({
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
}
