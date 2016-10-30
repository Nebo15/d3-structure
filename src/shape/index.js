
import { Observable } from 'rxjs';

import {
  line as lineFilter,
  area as areaFilter,
} from '../filters';

import line from './line';
import area from './area';

export default (ev) => Observable.of(ev)
  .flatMap((e) =>
    Observable.if(
      () => lineFilter(e),
      Observable.of(e).flatMap(line),
      Observable.if(
        () => areaFilter(e),
        Observable.of(e).flatMap(area),
        Observable.of(e),
      )
    )
  );
