
import { expect } from 'chai';
import * as d3 from 'd3-axis';

import typeList from './_typeList';

import d3Stream from '../../src';
import axis from '../../src/axis';

describe('Axis Create', () => {
  it('signature', () => {
    expect(axis).to.be.a('function');
    expect(axis.length).to.be.equal(1);
  });

  typeList.forEach((name) => {
    it(name, () => {
      const s = d3Stream('body');

      s.dispatch({
        type: 'scale',
        scaleType: 'linear',
        id: 'linearScale',
      });

      const typeAxisEvent = {
        type: 'axis',
        orient: name,
        id: `${name}Axis`,
        scaleId: 'linearScale',
        axis: {
          tickPadding: Math.floor(
            (Math.random() * 100) + 100
          ),
          tickValues: [Math.floor(
            (Math.random() * 100) + 100
          )],
        }
      };

      const updateEvent = {
        type: 'axis',
        id: `${name}Axis`,
        axis: {
          tickPadding: Math.floor(
            (Math.random() * 100) + 100
          ),
          tickValues: [Math.floor(
            (Math.random() * 100) + 100
          )],
        }
      };

      s.dispatch(typeAxisEvent);
      s.dispatch(updateEvent);

      const expectedAxis = Object.keys(updateEvent.axis).reduce(
        (a, k)=> a[k](updateEvent.axis[k]),
        d3[`axis${name.charAt(0).toUpperCase()}${name.slice(1)}`](
          s.container.scales[typeAxisEvent.scaleId]
        )
      );

      expect(
        s.container.axises[typeAxisEvent.id].tickPadding()
      ).to.be.eql(expectedAxis.tickPadding());
    });
  });
});
