'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d3Shape = require('d3-shape');

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _path = require('ramda/src/path');

var _path2 = _interopRequireDefault(_path);

var _filters = require('../filters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasStream = function hasStream(_ref) {
  var id = _ref.e.id,
      container = _ref.container;
  return !!container.shapes.areas[id];
};

var createArea = function createArea(_ref2) {
  var _ref2$e = _ref2.e,
      area = _ref2$e.area,
      id = _ref2$e.id,
      container = _ref2.container;
  return container.shapes.areas[id] = Object.keys(area).reduce(function (a, k) {
    if (area[k].hooks) {
      return a[k](function (val) {
        return area[k].hooks.reduce(function (v, hook) {
          return 'function' === typeof hook ? hook(val) : (0, _path2.default)(hook, container)(val);
        }, val);
      });
    }

    return a[k](area[k]);
  }, (0, _d3Shape.area)());
};

var updateArea = function updateArea(_ref3) {
  var _ref3$e = _ref3.e,
      area = _ref3$e.area,
      id = _ref3$e.id,
      container = _ref3.container;
  return Object.keys(area).reduce(function (a, k) {
    if (area[k].hooks) {
      return l[k](function (val) {
        return line[k].hooks.reduce(function (v, hook) {
          return 'function' === typeof hook ? hook(val) : (0, _path2.default)(hook, container)(val);
        }, val);
      });
    }

    return a[k](area[k]);
  }, container.shapes.areas[id]);
};

exports.default = (0, _cond2.default)([[function (ev) {
  return !!ev.e.area && hasStream(ev);
}, updateArea], [function (ev) {
  return !!ev.e.area && !hasStream(ev);
}, createArea]]);