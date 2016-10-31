
import { expect } from 'chai';
import { selection } from 'd3-selection';

import typeList from './_typeList';

import d3Stream from '../../src';
import axis from '../../src/axis';

describe('Axis Orient', () => {
  it('signature', () => {
    expect(axis).to.be.a('function');
    expect(axis.length).to.be.equal(1);
  });

  typeList.forEach((name) => {
    it(name, () => {
      const s = d3Stream('body');

      const typeAxisEvent = {
        type: 'axis',
        orient: name,
        id: `${name}Axis`,
      };

      s.dispatch(typeAxisEvent);

      expect(
        s.container.axises[typeAxisEvent.id]
      ).not.be.undefined;
    });
  });
});
