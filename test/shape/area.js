
import { expect } from 'chai';
import { selection, curveBasis, curveBasisClosed } from 'd3';

import d3Stream from '../../src';
import area from '../../src/shape/area';

describe('Shape Area', () => {
  it('signature', () => {
    expect(area).to.be.a('function');
    expect(area.length).to.be.equal(1);
  });

  describe('filtering', () => {
    it('events for create line', (done) => {
      const s = d3Stream('body');
      const a = area(s.d3Subj);

      const event = {
        type: 'shape',
        shape: 'area',
      };

      a.catch(done).subscribe(({ e }) => {
        expect(e).to.be.eql(event);
        done();
      });

      s.dispatch(event);
    });

    it('other type in event object', (done) => {
      const s = d3Stream('body');
      const a = area(s.d3Subj);

      const falsyTypeEvent = {
        type: 'sshape',
      };

      const falsyShapeEvent = {
        type: 'shape',
        shape: 'aarea',
      };

      const truthyEvent = {
        type: 'shape',
        shape: 'area',
      };

      a.catch(done).subscribe(({ e }) => {
        expect(e).to.be.equal(truthyEvent);
        done();
      });

      s.dispatch(falsyTypeEvent);
      s.dispatch(falsyShapeEvent);
      s.dispatch(truthyEvent);
    });
  });

  describe('events', () => {
    it('should correct define values', (done) => {
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

      a.catch(done).subscribe((area) => {
        const savedArea = s.container.shapes.areas[areaId];

        expect(savedArea.x()()).to.be.equal(event.area.x);
        expect(savedArea.y()()).to.be.equal(event.area.y);
        expect(savedArea.curve()).to.be.equal(event.area.curve);
        expect(savedArea.context()).to.be.equal(event.area.context);

        done();
      });

      s.dispatch(event);
    });

    it('should correct update values', (done) => {
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

      a.catch(done).subscribe((area) => {
        const savedArea = s.container.shapes.areas[areaId];

        expect(savedArea.x()()).to.be.equal(updateEvent.area.x);
        expect(savedArea.y()()).to.be.equal(updateEvent.area.y);
        expect(savedArea.curve()).to.be.equal(updateEvent.area.curve);
        expect(savedArea.context()).to.be.equal(updateEvent.area.context);

        done();
      });

      s.dispatch(updateEvent);
    });
  });
});
