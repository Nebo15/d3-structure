'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _has = require('ramda/src/has');

var _has2 = _interopRequireDefault(_has);

var _d3Transition = require('d3-transition');

var d3 = _interopRequireWildcard(_d3Transition);

function _interopRequireWildcard(obj) { if (obj && obj.__esModule) { return obj; } else { var newObj = {}; if (obj != null) { for (var key in obj) { if (Object.prototype.hasOwnProperty.call(obj, key)) newObj[key] = obj[key]; } } newObj.default = obj; return newObj; } }

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function _objectWithoutProperties(obj, keys) { var target = {}; for (var i in obj) { if (keys.indexOf(i) >= 0) continue; if (!Object.prototype.hasOwnProperty.call(obj, i)) continue; target[i] = obj[i]; } return target; }

var transitionProps = ['call', 'delay', 'duration', 'ease', 'text'];

var createTransition = function createTransition(_ref, transitions) {
  var id = _ref.id,
      _ref$attrs = _ref.attrs,
      attrs = _ref$attrs === undefined ? {} : _ref$attrs,
      _ref$styles = _ref.styles,
      styles = _ref$styles === undefined ? {} : _ref$styles,
      options = _objectWithoutProperties(_ref, ['id', 'attrs', 'styles']);

  var transition = d3.transition(id);

  transitions[id] = transition;

  Object.keys(attrs).forEach(function (attr) {
    return transition.attr(attr, attrs[attr]);
  });
  Object.keys(styles).forEach(function (style) {
    return transition.style(style, styles[style]);
  });

  transitionProps.forEach(function (prop) {
    return options[prop] && transition[prop] && transition[prop](options[prop]);
  });

  return transition;
};

exports.default = (0, _cond2.default)([[function (_ref2, transitions) {
  var id = _ref2.id;
  return !(0, _has2.default)(id, transitions);
}, createTransition]]);