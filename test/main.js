
import { expect } from 'chai';

import { selection } from 'd3-selection';

import d3Stream from '../src';

describe('d3-stream', () => {
  it('signature', () => {
    expect(d3Stream).to.be.a('function');
    expect(d3Stream.length).to.be.equal(2);
  });

  describe('API', () => {
    const div = document.createElement('div');
    const s = d3Stream(div);

    it('d3 element', () =>
      expect(s).have.property('d3').and.instanceof(selection)
    );

    it('container', () =>
      expect(s).have.property('container').a('object')
    );

    it('dispatch', () => {
      expect(s).have.property('dispatch').and.be.a('function');
      expect(s.dispatch.length).to.be.equal(1);
    });

    it('scale', () => {
      expect(s).have.property('scale').and.be.a('function');
      expect(s.scale.length).to.be.equal(2);
    });

    // it('shape', () => {
    //   expect(s).have.property('shape').and.be.a('function');
    //   expect(s.shape.length).to.be.equal(1);
    // });
    //
    // it('svg', () => {
    //   expect(s).have.property('svg').and.be.a('function');
    //   expect(s.svg.length).to.be.equal(1);
    // });
    //
    // it('transition', () => {
    //   expect(s).have.property('transition').and.be.a('function');
    //   expect(s.transition.length).to.be.equal(1);
    // });
  });
});
