
import cond from 'ramda/src/cond';

import {
  line as lineFilter,
  area as areaFilter,
} from '../filters';

import line from './line';
import area from './area';

export default cond([
  [lineFilter, line],
  [areaFilter, area]
]);
