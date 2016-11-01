
import dstream from '../../src';
import { csv } from 'd3-xhr';
import { timeParse } from 'd3-time-format';
import { curveMonotoneX } from 'd3-shape';
import { extent, max } from 'd3-array';
import { easePoly } from 'd3-ease';

const transitionArea = dstream(document.querySelector('.transitionArea'));

const {
  scales,
  axises,
  shapes: { areas },
} = transitionArea.container;

const margin = {top: 40, right: 20, bottom: 110, left: 40};
const width = 960 - margin.left - margin.right;
const height = 500 - margin.top - margin.bottom;

const parseDate = timeParse('%b %Y');

transitionArea.d3.select('svg').attr('width', 960);
transitionArea.d3.select('svg').attr('height', 500);

transitionArea.dispatch({
  type: 'scale',
  id: 'xScale',
  scaleType: 'time',
  scale: {
    range: [0, width],
  },
});

transitionArea.dispatch({
  type: 'scale',
  id: 'yScale',
  scaleType: 'linear',
  scale: {
    range: [height, 0],
  },
});

transitionArea.dispatch({
  type: 'axis',
  id: 'xAxis',
  orient: 'bottom',
  scaleId: 'xScale',
});

transitionArea.dispatch({
  type: 'axis',
  id: 'yAxis',
  orient: 'left',
  scaleId: 'yScale',
});

transitionArea.dispatch({
  type: 'selection',
  tagName: 'g',
  id: 'transitionAreaGroup',
  node: {},
  attrs: {
    transform:  'translate(' + margin.left + ',' + margin.top + ')',
  },
});

transitionArea.dispatch({
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

transitionArea.dispatch({
  type: 'transition',
  id: 'areaTransition',
  transition: {
    duration: 750,
    ease: easePoly,
  },
});

const button = document.querySelector('.transitionUpdateButton');

button.addEventListener('click', clickButton, false);

let bool = false;

function clickButton() {

  csv( 'data/simple-area.csv', (d)=> {
    d.date = parseDate(d.date);
    d.price = +d.price;

    return d;
  }, (error, data) => {
    bool ^= true;

    update(bool ? data.slice().map((d, k, list) => {
      d.price = data[list.length - (k + 1)].price;
      return d;
    }) : data);
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
  transitionArea.dispatch({
    type: 'scale',
    id: 'xScale',
    scale: {
      domain: extent(data, (d) => d.date),
    },
  });

  transitionArea.dispatch({
    type: 'scale',
    id: 'yScale',
    scale: {
      domain: [0, max(data, (d) => d.price)],
    },
  });

  transitionArea.dispatch({
    type: 'selection',
    id: 'transitionArea',
    selector: '#transitionAreaGroup',
    tagName: 'path',
    transitionId: 'areaTransition',
    node: {
      datum: data,
    },
    attrs: {
      d: areas.mainArea,
    },
  });

  transitionArea.dispatch({
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

  transitionArea.dispatch({
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
