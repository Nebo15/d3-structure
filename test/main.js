
import { expect } from 'chai';

import { selection } from 'd3-selection';

import d3Stream from '../src';

describe('d3-stream', () => {
  it('signature', () => {
    expect(d3Stream).to.be.a('function');
    expect(d3Stream.length).to.be.equal(1);
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
  });
});
