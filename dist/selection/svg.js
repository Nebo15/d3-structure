'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _filters = require('../filters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasNode = function hasNode(_ref) {
  var _ref$e = _ref.e,
      _ref$e$id = _ref$e.id,
      id = _ref$e$id === undefined ? '' : _ref$e$id,
      tagName = _ref$e.tagName,
      _ref$e$selector = _ref$e.selector,
      selector = _ref$e$selector === undefined ? '' : _ref$e$selector,
      svg = _ref.svg;
  return !!svg.select('\n  ' + selector + ' ' + tagName + (id ? '[id="' + id + '"]' : null) + '\n').size();
};

var appendNode = function appendNode(_ref2) {
  var _ref2$e = _ref2.e,
      id = _ref2$e.id,
      tagName = _ref2$e.tagName,
      _ref2$e$selector = _ref2$e.selector,
      selector = _ref2$e$selector === undefined ? '' : _ref2$e$selector,
      _ref2$e$attrs = _ref2$e.attrs,
      attrs = _ref2$e$attrs === undefined ? {} : _ref2$e$attrs,
      node = _ref2$e.node,
      _ref2$e$transitionId = _ref2$e.transitionId,
      transitionId = _ref2$e$transitionId === undefined ? '' : _ref2$e$transitionId,
      svg = _ref2.svg,
      container = _ref2.container;

  var parentNode = selector ? svg.select(selector) : svg;
  var appended = Object.keys(node).reduce(function (a, k) {
    return a[k](node[k]);
  }, parentNode.append(tagName));

  appended.transition(container.transitions[transitionId]);

  return Object.keys(attrs).reduce(function (a, k) {
    return a.attr(k, attrs[k]);
  }, appended).attr('id', id);
};

var updateNode = function updateNode(_ref3) {
  var _ref3$e = _ref3.e,
      id = _ref3$e.id,
      tagName = _ref3$e.tagName,
      _ref3$e$selector = _ref3$e.selector,
      selector = _ref3$e$selector === undefined ? '' : _ref3$e$selector,
      _ref3$e$attrs = _ref3$e.attrs,
      attrs = _ref3$e$attrs === undefined ? {} : _ref3$e$attrs,
      _ref3$e$node = _ref3$e.node,
      node = _ref3$e$node === undefined ? {} : _ref3$e$node,
      transitionId = _ref3$e.transitionId,
      svg = _ref3.svg,
      container = _ref3.container;

  var selection = svg.select('\n    ' + selector + ' ' + tagName + (id ? '[id="' + id + '"]' : null) + '\n  ');

  var updatedNode = Object.keys(node).reduce(function (a, k) {
    return a[k](node[k]);
  }, selection);

  return Object.keys(attrs).reduce(function (a, k) {
    return a.attr(k, attrs[k]);
  }, transitionId ? updatedNode.transition(container.transitions[transitionId]) : updatedNode);
};

exports.default = (0, _cond2.default)([[function (ev) {
  return !!ev.e.node && hasNode(ev);
}, updateNode], [function (ev) {
  return !!ev.e.node && !hasNode(ev);
}, appendNode]]);