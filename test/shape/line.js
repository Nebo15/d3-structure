
import { expect } from 'chai';
import { Subject } from 'rxjs';
import { selection, curveBasis, curveBasisClosed } from 'd3';

import d3Stream from '../../src';
import line from '../../src/selection/index';

describe('Shape Line', () => {
  it('signature', () => {
    expect(line).to.be.a('function');
  });

  describe('events', () => {
    it('should create line', (done) => {
      const lineId = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        type: 'shape',
        shape: 'line',
        id: lineId,
        line: {
          x: 0,
          y: 0,
          defined: true,
          curve: (d) => d,
          context: true,
        }
      };

      s.subscribe((line) => {
        expect(s.container.shapes.lines[lineId]).to.be.eql(line);
        done();
      });

      s.dispatch(event);
    });

    it('should correct define values', (done) => {
      const lineId = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        type: 'shape',
        shape: 'line',
        id: lineId,
        line: {
          x: Math.random(),
          y: Math.random(),
          defined: true,
          curve: curveBasis,
          context: true,
        }
      };

      s.subscribe((line) => {
        const savedLine = s.container.shapes.lines[lineId];

        expect(savedLine.x()()).to.be.equal(event.line.x);
        expect(savedLine.y()()).to.be.equal(event.line.y);
        expect(savedLine.curve()).to.be.equal(event.line.curve);
        expect(savedLine.context()).to.be.equal(event.line.context);

        done();
      });

      s.dispatch(event);
    });

    it('should correct update values', (done) => {
      const lineId = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        type: 'shape',
        shape: 'line',
        id: lineId,
        line: {
          x: Math.random(),
          y: Math.random(),
          defined: true,
          curve: curveBasis,
          context: true,
        }
      };

      const updateEvent = {
        type: 'shape',
        shape: 'line',
        id: lineId,
        line: {
          x: Math.random(),
          y: Math.random(),
          defined: true,
          curve: curveBasisClosed,
          context: true,
        },
      };

      s.dispatch(event);

      s.subscribe((line) => {
        const savedLine = s.container.shapes.lines[lineId];

        expect(savedLine.x()()).to.be.equal(updateEvent.line.x);
        expect(savedLine.y()()).to.be.equal(updateEvent.line.y);
        expect(savedLine.curve()).to.be.equal(updateEvent.line.curve);
        expect(savedLine.context()).to.be.equal(updateEvent.line.context);

        done();
      });

      s.dispatch(updateEvent);
    });
  });
});
