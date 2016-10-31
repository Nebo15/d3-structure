
import { expect } from 'chai';
import { selection, curveBasis, curveBasisClosed } from 'd3';

import d3Stream from '../../src';
import area from '../../src/shape/area';

describe('Shape Area', () => {
  it('signature', () => {
    expect(area).to.be.a('function');
    expect(area.length).to.be.equal(1);
  });

  describe('events', () => {
    it('should correct define values', () => {
      const areaId = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        type: 'shape',
        shape: 'area',
        id: areaId,
        area: {
          x: Math.random(),
          y: Math.random(),
          defined: true,
          curve: curveBasis,
          context: true,
        }
      };

      s.dispatch(event);

      const savedArea = s.container.shapes.areas[areaId];

      expect(savedArea.x()()).to.be.equal(event.area.x);
      expect(savedArea.y()()).to.be.equal(event.area.y);
      expect(savedArea.curve()).to.be.equal(event.area.curve);
      expect(savedArea.context()).to.be.equal(event.area.context);
    });

    it('should correct update values', () => {
      const areaId = '' + Math.random();
      const s = d3Stream('body');
      const a = area(s.d3Subj);

      const event = {
        type: 'shape',
        shape: 'area',
        id: areaId,
        area: {
          x: Math.random(),
          y: Math.random(),
          defined: true,
          curve: curveBasis,
          context: true,
        }
      };

      const updateEvent = {
        type: 'shape',
        shape: 'area',
        id: areaId,
        area: {
          x: Math.random(),
          y: Math.random(),
          defined: true,
          curve: curveBasisClosed,
          context: true,
        },
      };

      s.dispatch(event);
      s.dispatch(updateEvent);

      const savedArea = s.container.shapes.areas[areaId];

      expect(savedArea.x()()).to.be.equal(updateEvent.area.x);
      expect(savedArea.y()()).to.be.equal(updateEvent.area.y);
      expect(savedArea.curve()).to.be.equal(updateEvent.area.curve);
      expect(savedArea.context()).to.be.equal(updateEvent.area.context);
    });
  });
});
