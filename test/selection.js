
import { expect } from 'chai';

import { selection } from 'd3';
import { Observable } from 'rx-lite';

import select, {
  selectWrapper,
  asD3,
} from '../src/selection';

describe('Selection', () => {
  it('signatature', () => {
    expect(selectWrapper).to.be.a('function');
    expect(selectWrapper.length).to.equal(1);
  });

  it('should return HTMLElement', () => {
    const div = document.createElement('div');
    const selection = selectWrapper('body');
    const selectionDiv = selectWrapper(div);

    expect(selection).to.be.equal(document.body);
    expect(selectionDiv).to.be.equal(div);
  });

  describe('.asD3', () => {
    it('signature', () => {
      expect(asD3).to.be.a('function');
      expect(asD3.length).to.equal(1);
    });

    it('should return as d3 selection', () => {
      const div = document.createElement('div');
      const d3Selection = asD3(selectWrapper(div));


      expect(d3Selection).to.be.instanceof(selection);
    });
  });

  describe('result of compose', () => {
    it('signature', () => {
      expect(select).to.be.a('function');
      expect(select.length).to.equal(1);
    });

    it('should return as d3 selection', () => {
      const div = document.createElement('div');
      const sel = select(div)


      expect(sel).to.be.instanceof(selection);
    });
  });

  // it('stream should return dom element', () => {
  //   const div = document.createElement('div');
  //   const divStream = from(div);
  //   // const bodyStream = selectWrapper(s)(body);
  //
  //   expect(selectWrapper(div)).to.be.equal(div);
  //   // expect(s('body')()).to.be.equal(document.body);
  // });
});
