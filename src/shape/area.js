
import * as d3 from 'd3';
import { Observable, Subject } from 'rxjs';

import {
  shape as shapeFilter,
  area as areaFilter,
} from '../filters';

const hasStream = ({ e: { id }, container }) =>
  !!container.shapes.areas[id]

const createArea = ({ e: { area, id }, container }) => {
  const newArea = Object.keys(area).reduce((a, k) =>
    a[k](area[k])
  , d3.area());

  container.shapes.areas[id] = newArea;

  return Observable.create(o => o.next(newArea));
};

const updateArea = ({ e: { area, id }, container }) => {
  return Observable.create(o => o.next(
    Object.keys(area).reduce((a, k) =>
      a[k](area[k])
    , container.shapes.areas[id])
  ));
};

const createBranch = (ev) => Observable.if(
  () => !!ev.e.area && !hasStream(ev),
  Observable.create(o => o.next(ev)).flatMap(createArea),
  Observable.of(ev),
);

export default (ev) => Observable.if(
  () => !!ev.e.area && hasStream(ev),
  Observable.create(o => o.next(ev)).flatMap(updateArea),
  createBranch(ev),
);
