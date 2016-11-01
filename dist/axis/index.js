'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _d3Axis = require('d3-axis');

var d3 = _interopRequireWildcard(_d3Axis);

var _filters = require('../filters');

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasAxis = function hasAxis(_ref) {
  var id = _ref.e.id,
      container = _ref.container;
  return !!container.axises[id];
};

var createAxis = function createAxis(_ref2) {
  var _ref2$e = _ref2.e,
      _ref2$e$axis = _ref2$e.axis,
      axis = _ref2$e$axis === undefined ? {} : _ref2$e$axis,
      orient = _ref2$e.orient,
      id = _ref2$e.id,
      scaleId = _ref2$e.scaleId,
      container = _ref2.container;
  return container.axises[id] = Object.keys(axis).reduce(function (a, k) {
    return a[k](axis[k]);
  }, d3['axis' + orient.charAt(0).toUpperCase() + orient.slice(1)](container.scales[scaleId]));
};

var updateAxis = function updateAxis(_ref3) {
  var _ref3$e = _ref3.e,
      _ref3$e$axis = _ref3$e.axis,
      axis = _ref3$e$axis === undefined ? {} : _ref3$e$axis,
      id = _ref3$e.id,
      container = _ref3.container;
  return Object.keys(axis).reduce(function (a, k) {
    return a[k](axis[k]);
  }, container.axises[id]);
};

exports.default = (0, _cond2.default)([[function (ev) {
  return !hasAxis(ev);
}, createAxis], [function (ev) {
  return hasAxis(ev);
}, updateAxis]]);