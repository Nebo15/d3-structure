'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
var shape = exports.shape = function shape(_ref) {
  var e = _ref.e;
  return e.type === 'shape';
};
var line = exports.line = function line(_ref2) {
  var e = _ref2.e;
  return e.shape === 'line';
};
var area = exports.area = function area(_ref3) {
  var e = _ref3.e;
  return e.shape === 'area';
};

var selection = exports.selection = function selection(_ref4) {
  var e = _ref4.e;
  return e.type === 'selection';
};

var axis = exports.axis = function axis(_ref5) {
  var e = _ref5.e;
  return e.type === 'axis';
};

var scale = exports.scale = function scale(_ref6) {
  var e = _ref6.e;
  return e.type === 'scale';
};

var transition = exports.transition = function transition(_ref7) {
  var e = _ref7.e;
  return e.type === 'transition';
};