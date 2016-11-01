'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _d3Transition = require('d3-transition');

var d3 = _interopRequireWildcard(_d3Transition);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

var hasTransition = function hasTransition(_ref) {
  var id = _ref.e.id,
      container = _ref.container;
  return !!container.transitions[id];
};

var createTransition = function createTransition(_ref2) {
  var _ref2$e = _ref2.e,
      _ref2$e$transition = _ref2$e.transition,
      transition = _ref2$e$transition === undefined ? {} : _ref2$e$transition,
      id = _ref2$e.id,
      _ref2$e$attrs = _ref2$e.attrs,
      attrs = _ref2$e$attrs === undefined ? {} : _ref2$e$attrs,
      container = _ref2.container;
  return container.transitions[id] = Object.keys(attrs).reduce(function (t, attrKey) {
    return t.attr(attrKey, attrs[attrKey]);
  }, Object.keys(transition).reduce(function (t, k) {
    return transition[k] instanceof Array ? t[k].apply(t, transition[k]) : t[k](transition[k]);
  }, d3.transition(id)));
};

var updateTransition = function updateTransition(_ref3) {
  var _ref3$e = _ref3.e,
      _ref3$e$transition = _ref3$e.transition,
      transition = _ref3$e$transition === undefined ? {} : _ref3$e$transition,
      id = _ref3$e.id,
      _ref3$e$attrs = _ref3$e.attrs,
      attrs = _ref3$e$attrs === undefined ? {} : _ref3$e$attrs,
      container = _ref3.container;
  return container.transitions[id] = Object.keys(attrs).reduce(function (t, attrKey) {
    return t.attr(attrKey, attrs[attrKey]);
  }, Object.keys(transition).reduce(function (t, k) {
    return transition[k] instanceof Array ? t[k].apply(t, transition[k]) : t[k](transition[k]);
  }, container.transitions[id]));
};

exports.default = (0, _cond2.default)([[function (ev) {
  return hasTransition(ev);
}, updateTransition], [function (ev) {
  return !hasTransition(ev);
}, createTransition]]);