
import { Subject } from 'rxjs';

import svg from './svg';

export default (new Subject())
  .flatMap(svg);
