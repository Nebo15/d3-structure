'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.asD3 = exports.selectWrapper = undefined;

var _d3Selection = require('d3-selection');

var selectWrapper = exports.selectWrapper = function selectWrapper(selector) {
  return selector instanceof window.HTMLElement ? selector : document.querySelector(selector);
};

var asD3 = exports.asD3 = function asD3(el) {
  return (0, _d3Selection.select)(el);
};

exports.default = function (selector) {
  return asD3(selectWrapper(selector));
};