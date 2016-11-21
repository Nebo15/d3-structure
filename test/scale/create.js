
import { expect } from 'chai';
import * as d3 from 'd3-scale';

import typeList from './_typeList';

import d3Stream from '../../src';
import scale from '../../src/scale';

describe('Scale Create', () => {
  typeList.forEach((name) => {
    const typeScaleEvent = {
      type: name,
      domain: [Math.random(), Math.random()],
    };

    const expectedScale = [
      'domain'
    ].reduce(
      (s, k) => s[k](typeScaleEvent[k])
    , d3[`scale${name.charAt(0).toUpperCase()}${name.slice(1)}`]());

    it(name, () => {
      const s = d3Stream('body');

      s.scale(`${name}Scale`, typeScaleEvent);

      expect(
        s.container.scales[`${name}Scale`].domain()
      ).be.eql(expectedScale.domain());
    });

    it(`dispatch ${name}Scale from global namespace`, () => {
      const s = d3Stream('body');

      s.scale(typeScaleEvent.id, {
        type: name,
        domain: typeScaleEvent.domain,
      });

      expect(
        s.container.scales[typeScaleEvent.id].domain()
      ).be.eql(expectedScale.domain())
    });
  });
});
