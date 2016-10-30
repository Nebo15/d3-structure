
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
    expect(svg.length).to.be.equal(1);
  });

  describe('filtering', () => {
    it('events for create line', (done) => {
      const s = d3Stream('body');
      const sel = svg(s.d3Subj);

      const event = {
        type: 'selection',
        tagName: 'defs',
        selector: 'svg',
      };

      sel.catch(done).subscribe(({ e }) => {
        expect(e).to.be.eql(event);
        done();
      });

      s.dispatch(event);
    });

    it('other type in event object', (done) => {
      const s = d3Stream('body');
      const sel = svg(s.d3Subj);

      const falsyTypeEvent = {
        type: 'sselection',
      };

      const falsyShapeEvent = {
        type: 'sselection',
        node: 'ddefs',
        selector: 'svg',
      };

      const truthyEvent = {
        type: 'selection',
        tagName: 'defs',
        node: {}
      };

      sel.catch(done).subscribe((node) => {
        expect(node).to.be.instanceof(selection);
        done();
      });

      s.dispatch(falsyTypeEvent);
      s.dispatch(falsyShapeEvent);
      s.dispatch(truthyEvent);
    });
  });

  describe('events', () => {
    it('should create defs on DOM', (done) => {
      const defsId = '' + Math.random();
      const s = d3Stream('body');
      const sel = svg(s.d3Subj);

      const event = {
        type: 'selection',
        tagName: 'defs',
        id: defsId,
        node: {},
        attrs: {}
      };

      sel.catch(done).subscribe((el) => {
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
      const sel = svg(s.d3Subj);

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

      sel.catch(done).subscribe((el) => {
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
