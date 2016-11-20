
import cond from 'ramda/src/cond';

import * as d3 from 'd3-scale';

const scaleProps = [
  'domain',
];

const hasScale = ({ e: { id }, container }) => !!container.scales[id]

const updateScale = ({ e, container: { scales } }) =>
  scaleProps.reduce((reducedScale, optionName) =>
    e[optionName] && reducedScale[optionName] ?
      reducedScale[optionName](e[optionName]) : reducedScale
  , scales[e.id]);

const createScale = ({ e, e: { id, scaleType }, container: { scales } }) =>
  scales[id] = scaleProps.reduce((reducedScale, optionName) =>
    e[optionName] && reducedScale[optionName] ?
      reducedScale[optionName](e[optionName]) : reducedScale
  , d3[`scale${scaleType.charAt(0).toUpperCase()}${scaleType.slice(1)}`]());

export default cond([
  [(ev) => hasScale(ev), updateScale],
  [(ev) => !hasScale(ev), createScale]
]);
