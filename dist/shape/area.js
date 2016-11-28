'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d3Shape = require('d3-shape');

var _has = require('ramda/src/has');

var _has2 = _interopRequireDefault(_has);

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _path = require('ramda/src/path');

var _path2 = _interopRequireDefault(_path);

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var areaProps = ['x', 'y', 'x0', 'x1', 'y0', 'y1', 'defined', 'curve', 'context'];

var createArea = function createArea(_ref, areas) {
  var id = _ref.id,
      options = _objectWithoutProperties(_ref, ['id']);

  return areas[id] = areaProps.reduce(function (area, prop) {
    return (0, _utils.shapeReducer)(area, prop, options);
  }, (0, _d3Shape.area)());
};

var updateArea = function updateArea(_ref2, areas) {
  var id = _ref2.id,
      options = _objectWithoutProperties(_ref2, ['id']);

  return areaProps.reduce(function (area, prop) {
    return (0, _utils.shapeReducer)(area, prop, options);
  }, areas[id]);
};

exports.default = (0, _cond2.default)([[function (_ref3, _ref4) {
  var id = _ref3.id;
  var areas = _ref4.areas;
  return (0, _has2.default)(id, areas);
}, function (options, _ref5) {
  var areas = _ref5.areas;
  return updateArea(options, areas);
}], [function (_ref6, _ref7) {
  var id = _ref6.id;
  var areas = _ref7.areas;
  return !(0, _has2.default)(id, areas);
}, function (options, _ref8) {
  var areas = _ref8.areas;
  return createArea(options, areas);
}]]);