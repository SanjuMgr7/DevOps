import { should } from 'chai';
import { add, subtract, multiply, divide } from '../src/mylib.js';

// Activates the `.should` property on all objects.
should();

describe('mylib', function () {
  // Runs once before the first test.
  before(function () {
    console.log('    [before] starting mylib test suite');
  });

  // Runs once after the last test.
  after(function () {
    console.log('    [after] mylib test suite finished');
  });

  describe('add()', function () {
    it('adds two numbers', function () {
      add(2, 3).should.equal(5);
    });
    it('handles floats with a tolerance', function () {
      add(0.1, 0.2).should.be.closeTo(0.3, 1e-9);
    });
  });

  describe('subtract()', function () {
    it('subtracts two numbers', function () {
      subtract(5, 3).should.equal(2);
    });
    it('can return a negative result', function () {
      subtract(3, 5).should.equal(-2);
    });
  });

  describe('multiply()', function () {
    it('multiplies two numbers', function () {
      multiply(4, 3).should.equal(12);
    });
    it('returns 0 when multiplying by 0', function () {
      multiply(7, 0).should.equal(0);
    });
  });

  describe('divide()', function () {
    it('divides two numbers', function () {
      divide(10, 4).should.equal(2.5);
    });
    it('throws a ZeroDivision error when the divisor is 0', function () {
      (() => divide(5, 0)).should.throw(Error, 'ZeroDivision');
    });
  });

  describe('input validation', function () {
    it('throws TypeError for non-number input', function () {
      (() => add('1', 2)).should.throw(TypeError);
      (() => divide(1, NaN)).should.throw(TypeError);
    });
  });
});
