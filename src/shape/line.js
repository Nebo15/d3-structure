
import { line as d3Line } from 'd3-shape';

import has from 'ramda/src/has';
import merge from 'ramda/src/merge';
import cond from 'ramda/src/cond';
import path from 'ramda/src/path';

import { shapeReducer } from '../utils';

const lineProps = [
  'x',
  'y',
  'defined',
  'curve',
  'context',
];

const createLine = ({ id, ...options }, lines) =>
  lines[id] = lineProps.reduce((line, prop) =>
    shapeReducer(line, prop, options)
  , d3Line());

const updateLine = ({ id, ...options }, lines) =>
  lineProps.reduce((line, prop) =>
    shapeReducer(line, prop, options)
  , lines[id]);

export default cond([
  [
    ({ id }, { lines }) => has(id, lines),
    (options, { lines }) => updateLine(options, lines)
  ],
  [
    ({ id }, { lines }) => !has(id, lines),
    (options, { lines }) => createLine(options, lines)
  ],
]);
