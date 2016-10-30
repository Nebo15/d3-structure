
import { Observable } from 'rxjs';

import {
  selection as selectionFilter,
} from '../filters';

import svg from './svg';

export default (ev) => Observable.of(ev).flatMap(svg);
