
import { Observable, Subject } from 'rxjs';

import d3Select from './selection';

import shape from './shape';
import selection from './selection/index';

import {
  shape as shapeFilter,
  selection as selectionFilter,
} from './filters';

export default (selector) => {
  const asD3 = d3Select(selector);
  const container = {
    shapes: {
      lines: {},
      arcs: {},
      pies: {},
      areas: {},
    },
  };

  const d3Stream = Observable.create(observer =>
    observer.next(asD3)
  );

  const svg = asD3.append('svg');

  const subject = new Subject()
    .flatMap(e => Observable.if(
      () => shapeFilter(e),
      Observable.of(e).flatMap(shape),
      Observable.if(
        () => selectionFilter(e),
        Observable.of(e).flatMap(selection),
      )
    ));

  subject.subscribe();

  const API = {
    d3: asD3,
    subject,
    d3Stream,
    container,
    subscribe(cb) {
      return subject.subscribe(cb);
    },
    dispatch(e) {
      return subject.next({
        e, svg, container,
      });
    },
  };

  return API;
};
