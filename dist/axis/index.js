'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _d3Axis = require('d3-axis');

var d3 = _interopRequireWildcard(_d3Axis);

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _has = require('ramda/src/has');

var _has2 = _interopRequireDefault(_has);

var _filters = require('../filters');

var _utils = require('../utils');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var axisProps = ['scale', 'ticks', 'tickArguments', 'tickValues', 'tickFormat', 'tickSize', 'tickSizeInner', 'tickSizeOuter', 'tickPadding'];

var createAxis = function createAxis(_ref, axises) {
  var id = _ref.id,
      type = _ref.type,
      options = _objectWithoutProperties(_ref, ['id', 'type']);

  return axises[id] = axisProps.reduce(function (axis, option) {
    return options[option] && axis[option] ? axis[option](options[option]) : axis;
  }, d3['axis' + (0, _utils.camelize)(type)]());
};

var updateAxis = function updateAxis(_ref2, axises) {
  var id = _ref2.id,
      type = _ref2.type,
      options = _objectWithoutProperties(_ref2, ['id', 'type']);

  return axisProps.reduce(function (axis, option) {
    return options[option] && axis[option] ? axis[option](options[option]) : axis;
  }, axises[id]);
};

exports.default = (0, _cond2.default)([[function (_ref3, axises) {
  var id = _ref3.id;
  return (0, _has2.default)(id, axises);
}, updateAxis], [function (_ref4, axises) {
  var id = _ref4.id;
  return !(0, _has2.default)(id, axises);
}, createAxis]]);