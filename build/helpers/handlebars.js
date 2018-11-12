'use strict';

Object.defineProperty(exports, "__esModule", {
  value: true
});
exports.truncate = truncate;
exports.formatDate = formatDate;
exports.ifCond = ifCond;

var _moment = require('moment');

var _moment2 = _interopRequireDefault(_moment);

function _interopRequireDefault(obj) { return obj && obj.__esModule ? obj : { default: obj }; }

function truncate(str, len) {
  if (str.length > len && str.length > 0) {
    var newStr = str + ' ';
    newStr = str.substr(0, len);
    newStr = str.substr(0, newStr.lastIndexOf(' '));
    newStr = newStr.length > 0 ? newStr : str.substr(0, len);
    return newStr + '...';
  }
  return str;
}

function formatDate(date, format) {
  return (0, _moment2.default)(date).format(format);
}

function ifCond(v1, operator, v2, options) {
  switch (operator) {
    case '==':
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case '===':
      return v1 === v2 ? options.fn(this) : options.inverse(this);
    case '!=':
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case '!==':
      return v1 !== v2 ? options.fn(this) : options.inverse(this);
    case '<':
      return v1 < v2 ? options.fn(this) : options.inverse(this);
    case '<=':
      return v1 <= v2 ? options.fn(this) : options.inverse(this);
    case '>':
      return v1 > v2 ? options.fn(this) : options.inverse(this);
    case '>=':
      return v1 >= v2 ? options.fn(this) : options.inverse(this);
    case '&&':
      return v1 && v2 ? options.fn(this) : options.inverse(this);
    case '||':
      return v1 || v2 ? options.fn(this) : options.inverse(this);
    default:
      return options.inverse(this);
  }
}