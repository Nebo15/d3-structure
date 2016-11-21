'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _filters = require('../filters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var hasNode = function hasNode(_ref, asD3) {
  var selector = _ref.selector;
  return selector && !!asD3.selectAll(selector).size();
};

var instanceProps = ['html', 'text'];

var appendNode = function appendNode(_ref2, asD3) {
  var _ref2$attrs = _ref2.attrs,
      attrs = _ref2$attrs === undefined ? {} : _ref2$attrs,
      _ref2$styles = _ref2.styles,
      styles = _ref2$styles === undefined ? {} : _ref2$styles,
      tagName = _ref2.tagName,
      options = _objectWithoutProperties(_ref2, ['attrs', 'styles', 'tagName']);

  var node = asD3.append(tagName);

  Object.keys(attrs).forEach(function (attr) {
    return node.attr(attr, attrs[attr]);
  });
  Object.keys(styles).forEach(function (style) {
    return node.style(style, styles[style]);
  });

  instanceProps.forEach(function (prop) {
    return options[prop] && node[prop] && node[prop](options[prop]);
  });

  return node;
};

var appendNodes = function appendNodes(_ref3, asD3) {
  var nodes = _ref3.nodes,
      node = _ref3.node;

  if (nodes && nodes.length) {
    return nodes.map(function (n) {
      return appendNode(n, asD3);
    });
  }

  return appendNode(node, asD3);
};

var updateNode = function updateNode(_ref4, asD3) {
  var _ref4$node = _ref4.node,
      attrs = _ref4$node.attrs,
      styles = _ref4$node.styles,
      selector = _ref4.selector,
      options = _objectWithoutProperties(_ref4, ['node', 'selector']);

  var selection = asD3.selectAll(selector);

  Object.keys(attrs).forEach(function (attr) {
    return selection.attr(attr, attrs[attr]);
  });
  Object.keys(styles).forEach(function (style) {
    return selection.style(style, styles[style]);
  });

  instanceProps.forEach(function (prop) {
    return options[prop] && selection[prop] && selection[prop](options[prop]);
  });

  return selection;
};

exports.default = (0, _cond2.default)([[hasNode, updateNode], [function (ev, asD3) {
  return !hasNode(ev, asD3);
}, appendNodes]]);