'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _has = require('ramda/src/has');

var _has2 = _interopRequireDefault(_has);

var _d3Scale = require('d3-scale');

var d3 = _interopRequireWildcard(_d3Scale);

var _utils = require('../utils');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var scaleProps = ['domain', 'range', 'rangeRound', 'clamp', 'invert', 'interpolate', 'ticks', 'tickFormat', 'nice', 'copy'];

var updateScale = function updateScale(_ref, scales) {
  var id = _ref.id,
      options = _objectWithoutProperties(_ref, ['id']);

  return scaleProps.reduce(function (scale, option) {
    return options[option] && scale[option] ? scale[option](options[option]) : scale;
  }, scales[id]);
};

var createScale = function createScale(_ref2, scales) {
  var id = _ref2.id,
      type = _ref2.type,
      options = _objectWithoutProperties(_ref2, ['id', 'type']);

  return scales[id] = scaleProps.reduce(function (scale, option) {
    return options[option] && scale[option] ? scale[option](options[option]) : scale;
  }, d3['scale' + (0, _utils.camelize)(type)]());
};

exports.default = (0, _cond2.default)([[function (_ref3, scales) {
  var id = _ref3.id;
  return (0, _has2.default)(id, scales);
}, updateScale], [function (_ref4, scales) {
  var id = _ref4.id;
  return !(0, _has2.default)(id, scales);
}, createScale]]);