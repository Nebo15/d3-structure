
import { expect } from 'chai';
import * as d3 from 'd3-transition';

import d3Stream from '../../src';
import transtion from '../../src/transition';

it('signature', () => {
  expect(transtion).to.be.a('function');
});

describe('Transition Create', () => {
  it('should be exist in container', () => {
    const s = d3Stream('body');

    s.transition('testTransition');

    expect(
      s.container.transitions['testTransition']
    ).be.ok;
  });
});
