'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});

var _cond = require('ramda/src/cond');

var _cond2 = _interopRequireDefault(_cond);

var _filters = require('../filters');

var _line = require('./line');

var _line2 = _interopRequireDefault(_line);

var _area = require('./area');

var _area2 = _interopRequireDefault(_area);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

exports.default = (0, _cond2.default)([[_filters.line, _line2.default], [_filters.area, _area2.default]]);