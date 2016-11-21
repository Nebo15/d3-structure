'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var shape = exports.shape = function shape(subjType) {
  return subjType === 'shape';
};

var line = exports.line = function line(_ref) {
  var type = _ref.type;
  return type === 'line';
};
var area = exports.area = function area(_ref2) {
  var type = _ref2.type;
  return type === 'area';
};

var selection = exports.selection = function selection(subjType) {
  return subjType === 'selection';
};

var axis = exports.axis = function axis(subjType) {
  return subjType === 'axis';
};

var scale = exports.scale = function scale(subjType) {
  return subjType === 'scale';
};

var transition = exports.transition = function transition(_ref3) {
  var e = _ref3.e;
  return e.type === 'transition';
};