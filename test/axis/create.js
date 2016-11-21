
import { expect } from 'chai';
import * as d3 from 'd3-axis';

import typeList from './_typeList';

import d3Stream from '../../src';
import axis from '../../src/axis';

describe('Axis Create', () => {
  it('signature', () => {
    expect(axis).to.be.a('function');
  });

  typeList.forEach((name) => {
    it(name, () => {
      const s = d3Stream('body');

      s.scale('linearScale', {
        type: 'linear',
      });

      const typeAxisEvent = {
        type: name,
        scale: s.container.scales['linearScale'],
        tickPadding: Math.floor(
          (Math.random() * 100) + 100
        ),
        tickValues: [Math.floor(
          (Math.random() * 100) + 100
        )],
      };

      s.axis(`${name}Axis`, typeAxisEvent);

      const expectedAxis = ['tickPadding', 'tickValues', 'scale'].reduce(
        (a, k)=> a[k](typeAxisEvent[k]),
        d3[`axis${name.charAt(0).toUpperCase()}${name.slice(1)}`](
          s.container.scales['linearScale']
        )
      );

      expect(
        s.container.axises[`${name}Axis`].tickPadding()
      ).to.be.eql(expectedAxis.tickPadding());
    });
  });
});
