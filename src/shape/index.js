
import { Subject } from 'rxjs';

import line from './line';
import area from './area';

export default (new Subject())
  .flatMap(line)
  .flatMap(area);
