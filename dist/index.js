'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _selection = require('./selection');

var _selection2 = _interopRequireDefault(_selection);

var _shape = require('./shape');

var _shape2 = _interopRequireDefault(_shape);

var _index = require('./selection/index');

var _index2 = _interopRequireDefault(_index);

var _axis = require('./axis');

var _axis2 = _interopRequireDefault(_axis);

var _scale = require('./scale');

var _scale2 = _interopRequireDefault(_scale);

var _transition = require('./transition');

var _transition2 = _interopRequireDefault(_transition);

var _filters = require('./filters');

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (selector) {
  var asD3 = (0, _selection2.default)(selector);
  var svg = asD3.append('svg');

  var container = {
    shapes: {
      lines: {},
      arcs: {},
      pies: {},
      areas: {}
    },
    axises: {},
    scales: {},
    transitions: {}
  };

  var subject = (0, _cond2.default)([[function (e) {
    return (0, _filters.shape)(e);
  }, _shape2.default], [function (e) {
    return (0, _filters.selection)(e);
  }, _index2.default], [function (e) {
    return (0, _filters.scale)(e);
  }, _scale2.default], [function (e) {
    return (0, _filters.axis)(e);
  }, _axis2.default], [function (e) {
    return (0, _filters.transition)(e);
  }, _transition2.default]]);

  var API = {
    d3: asD3,
    container: container,
    dispatch: function dispatch(e) {
      return subject({
        e: e, svg: svg, container: container
      });
    }
  };

  return API;
};