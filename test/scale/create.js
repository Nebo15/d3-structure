
import { expect } from 'chai';
import * as d3 from 'd3-scale';

import typeList from './_typeList';

import d3Stream from '../../src';
import scale from '../../src/scale';

describe('Scale Create', () => {
  typeList.forEach((name) => {
    it(name, () => {
      const s = d3Stream('body');

      const typeScaleEvent = {
        type: 'scale',
        scaleType: name,
        id: `${name}Scale`,
        scale: {
          domain: [Math.random(), Math.random()],
        }
      };

      const expectedScale = Object.keys(typeScaleEvent.scale).reduce(
        (s, k) => s[k](typeScaleEvent.scale[k])
      , d3[`scale${name.charAt(0).toUpperCase()}${name.slice(1)}`]());

      s.dispatch(typeScaleEvent);

      expect(
        s.container.scales[typeScaleEvent.id].domain()
      ).be.eql(expectedScale.domain());
    });
  });
});
