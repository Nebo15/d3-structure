
import { markdown } from 'markdown';

import dstream from '../src';

// const docs = document.querySelectorAll('.docs-code');
//
// docs.forEach(function(elem) {
//   const html_content = markdown.toHTML( elem.innerText);
//   elem.innerHTML = html_content;
// });

const simple = dstream(document.querySelector('.simpleExample'));

simple.subscribe();

simple.dispatch({
  type: 'selection',
  tagName: 'defs',
  id: 'simpleExample',
  node: {},
  attrs: {
    someValue: '' + Math.random(),
  },
});

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
