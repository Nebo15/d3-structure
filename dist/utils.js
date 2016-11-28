'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.shapeReducer = exports.camelize = undefined;

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _path = require('ramda/src/path');

var _path2 = _interopRequireDefault(_path);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var camelize = exports.camelize = function camelize(s) {
  return '' + s.charAt(0).toUpperCase() + s.slice(1);
};

var hookReducer = function hookReducer(val, hooks, _ref) {
  var container = _ref.container;
  return hooks.reduce(function (v, hook) {
    return 'function' === typeof hook ? hook(val) : (0, _path2.default)(hook, container)(val);
  }, val);
};

var shapeReducer = exports.shapeReducer = function shapeReducer(shape, prop, options) {
  return options[prop] && shape[prop] ? typeof options[prop] === 'function' ? shape[prop](options[prop]()) : shape[prop](options[prop]) : shape;
};