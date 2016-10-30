
import { expect } from 'chai';
import { selection } from 'd3';

import d3Stream from '../../src';
import svg from '../../src/selection/svg';

describe('Selection SVG', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('signature', () => {
    expect(svg).to.be.a('function');
  });

  describe('events', () => {
    it('should create defs on DOM', (done) => {
      const defsId = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        type: 'selection',
        tagName: 'defs',
        id: defsId,
        node: {},
        attrs: {}
      };

      s.subscribe((el) => {
        const defs = document.body.querySelector(
          `defs[id="${defsId}"]`
        );

        expect(defs).to.be.not.null;
        expect(defs.getAttribute('id')).to.be.equal(defsId);

        done();
      });

      s.dispatch(event);
    });

    it('should update defs on DOM', (done) => {
      const defsId = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        type: 'selection',
        tagName: 'defs',
        id: defsId,
        node: {},
        attrs: {
          someValue: '' + Math.random(),
        }
      };

      const updateEvent = {
        type: 'selection',
        tagName: 'defs',
        id: defsId,
        node: {},
        attrs: {
          someValue: '' + Math.random(),
        },
      };

      s.dispatch(event);

      s.subscribe((el) => {
        const defs = document.body.querySelector(
          `defs[id="${defsId}"]`
        );

        expect(defs).to.be.not.null;
        expect(
          defs.getAttribute('someValue')
        ).to.be.equal(updateEvent.attrs.someValue);

        done();
      });
      s.dispatch(updateEvent);
    });
  });
});
