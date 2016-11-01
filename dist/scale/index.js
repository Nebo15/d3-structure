'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _d3Scale = require('d3-scale');

var d3 = _interopRequireWildcard(_d3Scale);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasScale = function hasScale(_ref) {
  var id = _ref.e.id,
      container = _ref.container;
  return !!container.scales[id];
};

var updateScale = function updateScale(_ref2) {
  var _ref2$e = _ref2.e,
      _ref2$e$scale = _ref2$e.scale,
      scale = _ref2$e$scale === undefined ? {} : _ref2$e$scale,
      id = _ref2$e.id,
      scaleType = _ref2$e.scaleType,
      scales = _ref2.container.scales;
  return Object.keys(scale).reduce(function (s, k) {
    return s[k](scale[k]);
  }, scales[id]);
};

var createScale = function createScale(_ref3) {
  var _ref3$e = _ref3.e,
      _ref3$e$scale = _ref3$e.scale,
      scale = _ref3$e$scale === undefined ? {} : _ref3$e$scale,
      id = _ref3$e.id,
      scaleType = _ref3$e.scaleType,
      scales = _ref3.container.scales;
  return scales[id] = Object.keys(scale).reduce(function (s, k) {
    return s[k](scale[k]);
  }, d3['scale' + scaleType.charAt(0).toUpperCase() + scaleType.slice(1)]());
};

exports.default = (0, _cond2.default)([[function (ev) {
  return hasScale(ev);
}, updateScale], [function (ev) {
  return !hasScale(ev);
}, createScale]]);