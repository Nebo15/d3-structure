
import { line as d3Line } from 'd3-shape';

import cond from 'ramda/src/cond';
import path from 'ramda/src/path';

import { shapeReducer } from '../utils';

const hasLine = ({ e: { id }, container }) => !!container.shapes.lines[id];

const createLine = ({ e: { line, id }, container }) =>
  container.shapes.lines[id] = shapeReducer(line, d3Line(), { container })

const updateLine = ({ e: { line, id }, container }) =>
  shapeReducer(line, container.shapes.lines[id], { container })

export default cond([
  [(ev) => !!ev.e.line && hasLine(ev), updateLine],
  [(ev) => !!ev.e.line && !hasLine(ev), createLine],
]);
