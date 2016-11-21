
import { expect } from 'chai';
import { selection } from 'd3-selection';
import { curveBasis, curveBasisClosed } from 'd3-shape';

import d3Stream from '../../src';
import line from '../../src/shape/line';

describe('Shape Line', () => {
  it('signature', () => {
    expect(line).to.be.a('function');
  });

  describe('events', () => {
    it('create', () => {
      const lineId = '' + Math.random();
      const s = d3Stream('body');
      const propVal = Math.random();

      const event = {
        type: 'line',
        x: () => propVal * 1,
        y: () => propVal * 2,
        defined: true,
        curve: () => curveBasis,
        context: true,
      };

      s.shape(lineId, event);

      const savedLine = s.container.shapes.lines[lineId];

      expect(savedLine.x()()).to.be.equal(event.x());
      expect(savedLine.y()()).to.be.equal(event.y());
      expect(savedLine.defined()()).to.be.equal(event.defined);
      expect(savedLine.curve()).to.be.equal(curveBasis);
      expect(savedLine.context()).to.be.equal(event.context);
    });


    it('should correct update values', () => {
      const lineId = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        type: 'line',
        x: Math.random(),
        y: Math.random(),
        defined: false,
        curve: () => curveBasis,
        context: true,
      };

      const updateEvent = {
        type: 'line',
        x: Math.random(),
        y: Math.random(),
        defined: true,
        curve: () => curveBasisClosed,
        context: true,
      };

      s.shape(lineId, event);
      s.shape(lineId, updateEvent);

      const savedLine = s.container.shapes.lines[lineId];

      expect(savedLine.x()()).to.be.equal(updateEvent.x);
      expect(savedLine.y()()).to.be.equal(updateEvent.y);
      expect(savedLine.defined()()).to.be.equal(updateEvent.defined);
      expect(savedLine.curve()).to.be.equal(updateEvent.curve());
      expect(savedLine.context()).to.be.equal(updateEvent.context);
    });
  });
});
