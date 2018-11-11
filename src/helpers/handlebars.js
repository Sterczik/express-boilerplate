const moment = require('moment');

export function truncate(str, len) {
  if (str.length > len && str.length > 0) {
    let newStr = `${str} `;
    newStr = str.substr(0, len);
    newStr = str.substr(0, newStr.lastIndexOf(' '));
    newStr = (newStr.length > 0) ? newStr : str.substr(0, len);
    return `${newStr}...`;
  }
  return str;
}

export function formatDate(date, format) {
  return moment(date).format(format);
}

export function ifCond(v1, operator, v2, options) {
  switch (operator) {
  case '==':
    return (v1 === v2) ? options.fn(this) : options.inverse(this);
  case '===':
    return (v1 === v2) ? options.fn(this) : options.inverse(this);
  case '!=':
    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
  case '!==':
    return (v1 !== v2) ? options.fn(this) : options.inverse(this);
  case '<':
    return (v1 < v2) ? options.fn(this) : options.inverse(this);
  case '<=':
    return (v1 <= v2) ? options.fn(this) : options.inverse(this);
  case '>':
    return (v1 > v2) ? options.fn(this) : options.inverse(this);
  case '>=':
    return (v1 >= v2) ? options.fn(this) : options.inverse(this);
  case '&&':
    return (v1 && v2) ? options.fn(this) : options.inverse(this);
  case '||':
    return (v1 || v2) ? options.fn(this) : options.inverse(this);
  default:
    return options.inverse(this);
  }
}
