
import { expect } from 'chai';
import * as d3 from 'd3-transition';

import d3Stream from '../../src';
import transtion from '../../src/transition';

it('signature', () => {
  expect(transtion).to.be.a('function');
  expect(transtion.length).to.be.equal(1);
});

describe('Transition Create', () => {
  it('should be exist in container', () => {
    const s = d3Stream('body');

    const transitionEvent = {
      type: 'transition',
      id: 'testTransition',
      transition: {
        style: ['color', 'red'],
      },
      attrs: {
        a: 'b',
      }
    };

    s.dispatch(transitionEvent);

    expect(
      s.container.transitions[transitionEvent.id]
    ).be.ok;
  });

  it('should update values', () => {
    const s = d3Stream('body');

    const transitionEvent = {
      type: 'transition',
      id: 'testTransition',
      transition: {
        style: ['color', 'red'],
      },
      attrs: {
        a: 'b',
      }
    };

    s.dispatch(transitionEvent);

    const oldTransition = s.container.transitions[transitionEvent.id];

    const updateEvent = {
      type: 'transition',
      id: 'testTransition',
      transition: {
        style: ['color', 'green'],
      },
      attrs: {
        b: 'c',
      }
    };

    s.dispatch(updateEvent);

    expect(
      oldTransition
    ).be.eql(s.container.transitions[transitionEvent.id]);
  });
});
