
import { expect } from 'chai';

import { selection } from 'd3';
import { Observable } from 'rx-lite';

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

    it('stream', () =>
      expect(s).have.property('d3s').and.instanceof(Observable)
    );

    it('stream should return d3 selection', (done) =>
      s.d3s.subscribe((d3Selector) => {
        expect(d3Selector).to.be.instanceof(selection);
        done();
      })
    );
  });
});
