'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _merge = require('ramda/src/merge');

var _merge2 = _interopRequireDefault(_merge);

var _selection = require('./selection');

var _selection2 = _interopRequireDefault(_selection);

var _shape2 = require('./shape');

var _shape3 = _interopRequireDefault(_shape2);

var _index = require('./selection/index');

var _index2 = _interopRequireDefault(_index);

var _axis2 = require('./axis');

var _axis3 = _interopRequireDefault(_axis2);

var _scale2 = require('./scale');

var _scale3 = _interopRequireDefault(_scale2);

var _transition2 = require('./transition');

var _transition3 = _interopRequireDefault(_transition2);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = function (selector, options) {
  var asD3 = (0, _selection2.default)(selector);
  var _svg = asD3.append('svg');

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

  var API = {
    d3: asD3,
    container: container,

    scale: function scale(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (0, _scale3.default)((0, _merge2.default)({ id: id }, options), container.scales);
    },
    shape: function shape(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (0, _shape3.default)((0, _merge2.default)({ id: id }, options), container.shapes);
    },
    axis: function axis(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (0, _axis3.default)((0, _merge2.default)({ id: id }, options), container.axises);
    },
    svg: function svg(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (0, _index2.default)((0, _merge2.default)({ id: id }, options), _svg);
    },
    transition: function transition(id) {
      var options = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : {};

      return (0, _transition3.default)((0, _merge2.default)({ id: id }, options), container.transitions);
    }
  };

  return API;
};