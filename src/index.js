
import { Observable, Subject } from 'rxjs';

import select from './selection';
import shape from './shape';

export default (selector) => {
  const asD3 = select(selector);
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

  const svgStream = d3Stream.map(selection =>
    selection.append('svg')
  );

  const d3Subj = new Subject();

  d3Subj.flatMap(shape);

  const API = {
    d3Subj,
    d3: asD3,
    d3Stream,
    container,
    dispatch(e) {
      d3Subj.next({
        e,
        svgStream,
        container,
      });
    },
  };

  return API;
};
