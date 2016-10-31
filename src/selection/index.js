
import { Observable } from 'rxjs';

import svg from './svg';

export default (ev) => Observable.of(ev).flatMap(svg);
