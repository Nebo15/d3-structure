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

var lineProps = ['x', 'y', 'defined', 'curve', 'context'];

var createLine = function createLine(_ref, lines) {
  var id = _ref.id,
      options = _objectWithoutProperties(_ref, ['id']);

  return lines[id] = lineProps.reduce(function (line, prop) {
    return (0, _utils.shapeReducer)(line, prop, options);
  }, (0, _d3Shape.line)());
};

var updateLine = function updateLine(_ref2, lines) {
  var id = _ref2.id,
      options = _objectWithoutProperties(_ref2, ['id']);

  return lineProps.reduce(function (line, prop) {
    return (0, _utils.shapeReducer)(line, prop, options);
  }, lines[id]);
};

exports.default = (0, _cond2.default)([[function (_ref3, _ref4) {
  var id = _ref3.id;
  var lines = _ref4.lines;
  return (0, _has2.default)(id, lines);
}, function (options, _ref5) {
  var lines = _ref5.lines;
  return updateLine(options, lines);
}], [function (_ref6, _ref7) {
  var id = _ref6.id;
  var lines = _ref7.lines;
  return !(0, _has2.default)(id, lines);
}, function (options, _ref8) {
  var lines = _ref8.lines;
  return createLine(options, lines);
}]]);