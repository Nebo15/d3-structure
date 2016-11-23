
import { expect } from 'chai';
import { selection } from 'd3-selection';

import d3Stream from '../../src';
import svg from '../../src/selection';

describe('Selection SVG', () => {
  beforeEach(() => {
    document.body.innerHTML = '';
  });

  it('signature', () => {
    expect(svg).to.be.a('function');
  });

  describe('events', () => {
    it('should append `defs` tag to DOM', () => {
      const defsId = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        node: {
          tagName: 'defs',
          attrs: {
            id: defsId,
          },
          styles: {
            fill: 'red',
          },
          text: '42',
        },
      };

      s.svg('defs', event);

      const defs = document.body.querySelector(
        `defs[id="${defsId}"]`
      );

      expect(defs).to.be.not.null;
      expect(defs.style.fill).to.be.equal('red');
      expect(defs.innerHTML).to.be.equal('42');
    });

    it('should append multiple `defs` tags to DOM', () => {
      const defsId = '' + Math.random();
      const defsId2 = '' + Math.random();
      const s = d3Stream('body');

      const event = {
        nodes: [{
          tagName: 'defs',
          attrs: {
            id: defsId,
          },
        }, {
          tagName: 'g',
          attrs: {
            id: defsId2,
          },
        }],
      };

      s.svg('defs', event);

      const defs = document.body.querySelector(
        `defs[id="${defsId}"]`
      );

      const defs2 = document.body.querySelector(
        `g[id="${defsId2}"]`
      );

      expect(defs).to.be.not.null;
      expect(defs2).to.be.not.null;
    });

    it('should update defs on DOM', () => {
      const defsId = 'defsId';
      const s = d3Stream('body');

      const event = {
        node: {
          tagName: 'defs',
          attrs: {
            id: defsId,
            someValue: '' + Math.random(),
          }
        },
      };

      const updateEvent = {
        selector: `#${defsId}`,
        node: {
          attrs: {
            someValue: '' + Math.random(),
          },
          styles: {
            fill: 'blue',
          }
        },
      };

      s.svg('defs', event);

      const defs = document.body.querySelector(
        `defs[id="${defsId}"]`
      );

      s.svg('defs', updateEvent);

      expect(
        defs.getAttribute('someValue')
      ).to.be.equal(updateEvent.node.attrs.someValue);

      expect(defs.style.fill).to.be.equal('blue');
    });

    it('should save link to selections in container', () => {
      const defsId = 'defsId';
      const s = d3Stream('body');


    });
  });
});
