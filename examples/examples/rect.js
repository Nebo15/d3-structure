
import dstream from '../../src';

const simple = dstream(document.querySelector('.simpleExample'));

simple.dispatch({
  type: 'selection',
  tagName: 'rect',
  id: 'simpleRect',
  node: {},
  attrs: {
    fill: 'red',
    width: 60,
    height: 60,
  },
});
