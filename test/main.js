
import { expect } from 'chai';

import { selection } from 'd3';
import { Observable, Subject } from 'rxjs';

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
      expect(s).have.property('d3Stream').and.instanceof(Observable)
    );

    it('container', () =>
      expect(s).have.property('container').a('object')
    );

    it('subject', () =>
      expect(s).have.property('subject').and.instanceof(Subject)
    );

    it('dispatch', () => {
      expect(s).have.property('dispatch').and.be.a('function');
      expect(s.dispatch.length).to.be.equal(1);
    });

    it('subscribe', () => {
      expect(s).have.property('subscribe').and.be.a('function');
      expect(s.dispatch.length).to.be.equal(1);
    });

    it('stream should return d3 selection', (done) =>
      s.d3Stream.subscribe((d3Selector) => {
        expect(d3Selector).to.be.instanceof(selection);
        done();
      })
    );
  });
});
