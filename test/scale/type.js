
import { expect } from 'chai';
import * as d3 from 'd3-scale';

import typeList from './_typeList';

import d3Stream from '../../src';
import scale from '../../src/scale';

describe('Scale Type', () => {
  it('signature', () => {
    expect(scale).to.be.a('function');
    expect(scale.length).to.be.equal(1);
  });

  typeList.forEach((name) => {
    it(name, () => {
      const s = d3Stream('body');

      const typeScaleEvent = {
        type: 'scale',
        scaleType: name,
        id: `${name}Scale`,
      };

      s.dispatch(typeScaleEvent);

      expect(
        s.container.scales[typeScaleEvent.id]
      ).not.be.undefined;
    });
  });
});
