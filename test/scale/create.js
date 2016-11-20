
import { expect } from 'chai';
import * as d3 from 'd3-scale';

import typeList from './_typeList';

import d3Stream from '../../src';
import scale from '../../src/scale';

describe('Scale Create', () => {
  typeList.forEach((name) => {
    const typeScaleEvent = {
      type: 'scale',
      scaleType: name,
      domain: [Math.random(), Math.random()],
      id: `${name}Scale`,
    };

    const expectedScale = [
      'domain'
    ].reduce(
      (s, k) => s[k](typeScaleEvent[k])
    , d3[`scale${name.charAt(0).toUpperCase()}${name.slice(1)}`]());

    it(name, () => {
      const s = d3Stream('body');

      s.dispatch(typeScaleEvent);

      expect(
        s.container.scales[typeScaleEvent.id].domain()
      ).be.eql(expectedScale.domain());
    });

    it(`dispatch ${name}Scale from global namespace`, () => {
      const s = d3Stream('body');

      s.scale(typeScaleEvent.id, {
        scaleType: name,
        domain: typeScaleEvent.domain,
      });

      expect(
        s.container.scales[typeScaleEvent.id].domain()
      ).be.eql(expectedScale.domain())
    });
  });
});
