var expect = require('chai').expect;
var parse = require('../');

describe('parseargs', function(){
  it(
    'should understand simple words',
    check('my string of arguments', ['my', 'string', 'of', 'arguments'])
  );

  it(
    'should understand single quote',
    check("my 'string of arguments'", ['my', 'string of arguments'])
  );

  it(
    'should understand double quote',
    check('"my string" of arguments', ['my string', 'of', 'arguments'])
  );

  it(
    'should understand escaped single quote',
    check("my 'string \\'of\\'' arguments", ['my', "string 'of'", 'arguments'])
  );

  it(
    'should understand escaped double quote',
    check('my "string \\"of\\"" arguments', ['my', 'string "of"', 'arguments'])
  );

  it(
    'should understand double quotes inside single quotted string',
    check("my 'string \"of\" arguments'", ['my', 'string "of" arguments'])
  );

  it(
    'should understand single quotes inside double quotted string',
    check('my "string \'of\' arguments"', ['my', "string 'of' arguments"])
  );

  it(
    'should not allow for a quotted string to start right after a word',
    invalid('my"string" of arguments', 'Invalid argument(s)')
  );

  it(
    'should detect unexpected EOF',
    invalid('my "string of arguments', 'Unexpected end of input')
  );

  it(
    'should detect wrongly escaped quotes',
    invalid('my \\\\"string\\\\" of arguments', 'Invalid argument(s)')
  );

  it(
    'should ignore consecutive spaces',
    check('my     string of    arguments', ['my', 'string', 'of', 'arguments'])
  );

  it(
    'should accept tabs, newlines and cartridge returns as spaces',
    check('my\tstring\nof\rarguments', ['my', 'string', 'of', 'arguments'])
  );

  it(
    'should not allow escaped spaces',
    invalid('my\\ string of arguments', 'Invalid syntax')
  );

  it(
    'should read a one char word at the end of the input',
    check('my string of arguments 0', ['my', 'string', 'of', 'arguments', '0'])
  );

  it(
    'should only accept strings',
    invalidTypes([
      1,
      2.2,
      true,
      {},
      null,
      void 0,
      function(){},
      [],
    ], 'Invalid input type')
  );

});

function check(subject, expected) {
  return function() {
    expect(parse(subject)).to.be.deep.equal(expected);
  }
}

function invalid(subject, error) {
  return function() {
    expect(function(){
      parse(subject);
    }).to.throw(error);
  }
}

function invalidTypes(types, error) {
  return function() {
    types.forEach(function(type){
      expect(function(){
        parse(type);
      }).to.throw(error);
    });
  }
}
