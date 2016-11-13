
import cond from 'ramda/src/cond';

import * as d3 from 'd3-scale';

const hasScale = ({ e: { id }, container }) => !!container.scales[id]

const updateScale = ({ e: { scale = {}, id, scaleType }, container: { scales } }) =>
  Object.keys(scale).reduce((reducedScale, optionName) =>
    reducedScale[optionName] ?
      reducedScale[optionName](scale[optionName]) : reducedScale
  , scales[id]);

const createScale = ({ e: { scale = {}, id, scaleType }, container: { scales } }) =>
  scales[id] = Object.keys(scale).reduce((reducedScale, optionName) =>
    reducedScale[optionName] ?
      reducedScale[optionName](scale[optionName]) : reducedScale
  , d3[`scale${scaleType.charAt(0).toUpperCase()}${scaleType.slice(1)}`]());

export default cond([
  [(ev) => hasScale(ev), updateScale],
  [(ev) => !hasScale(ev), createScale]
]);
