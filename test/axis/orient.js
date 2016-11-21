
import { expect } from 'chai';
import { selection } from 'd3-selection';

import typeList from './_typeList';

import d3Stream from '../../src';
import axis from '../../src/axis';

describe('Axis Orient', () => {
  it('signature', () => {
    expect(axis).to.be.a('function');
  });

  typeList.forEach((type) => {
    it(type, () => {
      const s = d3Stream('body');

      s.axis(`${type}Axis`, { type });

      expect(
        s.container.axises[`${type}Axis`]
      ).not.be.undefined;
    });
  });
});
