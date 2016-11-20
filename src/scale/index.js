
import cond from 'ramda/src/cond';

import * as d3 from 'd3-scale';

import { camelize } from '../utils';

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
  , d3[`scale${camelize(scaleType)}`]());

export default cond([
  [(ev) => hasScale(ev), updateScale],
  [(ev) => !hasScale(ev), createScale]
]);
