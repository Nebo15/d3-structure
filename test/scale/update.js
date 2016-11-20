
import { expect } from 'chai';
import * as d3 from 'd3-scale';

import typeList from './_typeList';

import d3Stream from '../../src';
import scale from '../../src/scale';

describe('Scale Update', () => {
  typeList.forEach((name) => {
    it(name, () => {
      const s = d3Stream('body');

      const typeScaleEvent = {
        scaleType: name,
      };

      const updateEvent = {
        type: 'scale',
        domain: [Math.random(), Math.random()],
        id: `${name}Scale`,
      };

      const expectedScale = [
        'domain'
      ].reduce((s, k) =>
        s[k](updateEvent[k])
      , d3[`scale${name.charAt(0).toUpperCase()}${name.slice(1)}`]());

      s.scale(`${name}Scale`, typeScaleEvent);
      s.dispatch(updateEvent);

      expect(
        s.container.scales[`${name}Scale`].domain()
      ).be.eql(expectedScale.domain());
    });
  });
});
