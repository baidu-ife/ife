'use strict'

var detect = require('acorn-globals');

var lastSRC = '(null)';
var lastRes = true;
var lastConstants = undefined;

module.exports = isConstant;
function isConstant(src, constants) {
  src = '(' + src + ')';
  if (lastSRC === src && lastConstants === constants) return lastRes;
  lastSRC = src;
  lastConstants = constants;
  try {
    isExpression(src);
    return lastRes = (detect(src).filter(function (key) {
      return !constants || !(key.name in constants);
    }).length === 0);
  } catch (ex) {
    return lastRes = false;
  }
}
isConstant.isConstant = isConstant;

isConstant.toConstant = toConstant;
function toConstant(src, constants) {
  if (!isConstant(src, constants)) throw new Error(JSON.stringify(src) + ' is not constant.');
  return Function(Object.keys(constants || {}).join(','), 'return (' + src + ')').apply(null, Object.keys(constants || {}).map(function (key) {
    return constants[key];
  }));
}

function isExpression(src) {
  try {
    eval('throw "STOP"; (function () { return (' + src + '); })()');
    return false;
  }
  catch (err) {
    return err === 'STOP';
  }
}
