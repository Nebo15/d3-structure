
import * as d3 from 'd3';
import { Observable, Subject } from 'rxjs';

const hasStream = ({ e: { id }, container }) =>
  !!container.shapes.lines[id]

const createLine = ({ e: { line, id }, container }) => {
  const newLine = Object.keys(line).reduce((l, k) =>
    l[k](line[k])
  , d3.line());

  container.shapes.lines[id] = newLine;

  return Observable.create(o => o.next(newLine));
};

const updateLine = ({ e: { line, id }, container }) => {
  return Observable.create(o => o.next(
    Object.keys(line).reduce((l, k) =>
      l[k](line[k])
    , container.shapes.lines[id])
  ));
};

const createBranch = (ev) => Observable.if(
  () => !!ev.e.line && !hasStream(ev),
  Observable.create(o => o.next(ev)).flatMap(createLine),
  Observable.create(o => o.next(ev)),
);

export default (ev) => Observable.if(
  () => !!ev.e.line && hasStream(ev),
  Observable.create(o => o.next(ev)).flatMap(updateLine),
  createBranch(ev),
)
