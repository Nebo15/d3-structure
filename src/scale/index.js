
import cond from 'ramda/src/cond';

import * as d3 from 'd3-scale';

const hasScale = ({ e: { id }, container }) => !!container.scales[id]

const createScale = ({ e: { scale = {}, id, scaleType }, container: { scales } }) =>
  scales[id] = Object.keys(scale).reduce((s, k) =>
    s[k](scale[k])
  , d3[`scale${scaleType.charAt(0).toUpperCase()}${scaleType.slice(1)}`]());

export default cond([
  [(ev) => !hasScale(ev), createScale]
]);
