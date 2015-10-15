"use strict";

module.exports = function(input) {
  if (typeof input !== 'string') {
    throw new Error('Invalid input type');
  }

  var reading = false;
  var startChar = null;
  var startIndex = null;

  var read = function(s, e) {
    reading = false;
    startChar = null;
    startIndex = null;
    return input.substring(s, e);
  }

  var result = Array.prototype.reduce.call(
    input.trim(),
    function(result, value, index, arr) {
      if (reading && startChar === ' ' && special(value) && !sp(value)) {
        throw new Error("Invalid argument(s)");
      }

      if (!reading && !special(value)) {
        reading = true;
        startChar = ' ';
        startIndex = index;
        if (index === arr.length - 1 && startChar === ' ') {
          return result.concat([read(startIndex)]);
        }
        return result;
      }

      if (!reading && special(value) && !sp(value)) {
        reading = true;
        startChar = value;
        startIndex = index;
        return result;
      }

      if (!reading) {
        return result;
      }

      if (startChar === ' ' && sp(value)) {
        if (!isValid(index, arr)) {
          throw new Error("Invalid syntax");
        }
        return result.concat([read(startIndex, index)]);
      }

      if (startChar === value && special(startChar) && isValid(index, arr)) {
        return result.concat([read(startIndex + 1, index)]);
      }

      if (index === arr.length - 1 && startChar === ' ') {
        return result.concat([read(startIndex)]);
      }

      return result;
    },
    []
  );

  if (startIndex || startChar) {
    throw new Error("Unexpected end of input");
  }

  return result.map(function(str){
    return str.replace(/\\([\s"'\\])/g, '$1');
  });
}

function sp(c) {
  return /\s/.test(c);
};

function special(c) {
  return /\s|"|'/.test(c);
};

function isValid(index, arr) {
  var counter = 0;
  while (true) {
    if (index - 1 - counter < 0) {
      break;
    }
    if (arr[index - 1 - counter] === '\\') {
      counter++;
      continue;
    }
    break;
  }
  return counter % 2 === 0;
}
