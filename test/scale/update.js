
import { expect } from 'chai';
import * as d3 from 'd3-scale';

import typeList from './_typeList';

import d3Stream from '../../src';
import scale from '../../src/scale';

describe('Scale Update', () => {
  typeList.forEach((name) => {
    it(name, () => {
      const s = d3Stream('body');

      const updateEvent = {
        domain: [Math.random(), Math.random()],
      };

      const expectedScale = [
        'domain'
      ].reduce((s, k) =>
        s[k](updateEvent[k])
      , d3[`scale${name.charAt(0).toUpperCase()}${name.slice(1)}`]());

      s.scale(`${name}Scale`, { type: name });
      s.scale(`${name}Scale`, updateEvent);

      expect(
        s.container.scales[`${name}Scale`].domain()
      ).be.eql(expectedScale.domain());
    });
  });
});
