
import { expect } from 'chai';
import { selection } from 'd3-selection';
import { curveBasis, curveBasisClosed } from 'd3-shape';

import d3Stream from '../../src';
import area from '../../src/shape/area';

describe('Shape Area', () => {
  it('signature', () => {
    expect(area).to.be.a('function');
  });

  describe('events', () => {
    it('create', () => {
      const areaId = '' + Math.random();
      const s = d3Stream('body');
      const propVal = Math.random();

      const event = {
        type: 'area',
        x: () => propVal * 1,
        y: () => propVal * 2,
        defined: true,
        curve: () => curveBasis,
        context: true,
      };

      s.shape(areaId, event);

      const savedArea = s.container.shapes.areas[areaId];

      expect(savedArea.x()()).to.be.equal(event.x());
      expect(savedArea.y()()).to.be.equal(event.y());
      expect(savedArea.defined()()).to.be.equal(event.defined);
      expect(savedArea.curve()).to.be.equal(curveBasis);
      expect(savedArea.context()).to.be.equal(event.context);
    });


    it('should correct update values', () => {
      const areaId = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        type: 'area',
        x: Math.random(),
        y: Math.random(),
        defined: false,
        curve: () => curveBasis,
        context: true,
      };

      const updateEvent = {
        type: 'area',
        x: Math.random(),
        y: Math.random(),
        defined: true,
        curve: () => curveBasisClosed,
        context: true,
      };

      s.shape(areaId, event);
      s.shape(areaId, updateEvent);

      const savedArea = s.container.shapes.areas[areaId];

      expect(savedArea.x()()).to.be.equal(updateEvent.x);
      expect(savedArea.y()()).to.be.equal(updateEvent.y);
      expect(savedArea.defined()()).to.be.equal(updateEvent.defined);
      expect(savedArea.curve()).to.be.equal(updateEvent.curve());
      expect(savedArea.context()).to.be.equal(updateEvent.context);
    });
  });
});
