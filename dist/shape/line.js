'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d3Shape = require('d3-shape');

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasLine = function hasLine(_ref) {
  var id = _ref.e.id,
      container = _ref.container;
  return !!container.shapes.lines[id];
};

var createLine = function createLine(_ref2) {
  var _ref2$e = _ref2.e,
      line = _ref2$e.line,
      id = _ref2$e.id,
      container = _ref2.container;
  return container.shapes.lines[id] = Object.keys(line).reduce(function (l, k) {
    if (line[k].hooks) {
      return l[k](function (val) {
        return line[k].hooks.reduce(function (v, hook) {
          return 'function' === typeof hook ? hook(val) : path(hook, container)(val);
        }, val);
      });
    }

    return l[k](line[k]);
  }, (0, _d3Shape.line)());
};

var updateLine = function updateLine(_ref3) {
  var _ref3$e = _ref3.e,
      line = _ref3$e.line,
      id = _ref3$e.id,
      container = _ref3.container;
  return Object.keys(line).reduce(function (l, k) {
    if (line[k].hooks) {
      return l[k](function (val) {
        return line[k].hooks.reduce(function (v, hook) {
          return 'function' === typeof hook ? hook(val) : path(hook, container)(val);
        }, val);
      });
    }

    return l[k](line[k]);
  }, container.shapes.lines[id]);
};

exports.default = (0, _cond2.default)([[function (ev) {
  return !!ev.e.line && hasLine(ev);
}, updateLine], [function (ev) {
  return !!ev.e.line && !hasLine(ev);
}, createLine]]);