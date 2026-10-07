/**
 * @module mylib
 * @description A small library providing the basic arithmetic operations.
 */

/**
 * Validates that every argument is a finite number.
 * @param {...number} values - Values to validate.
 * @throws {TypeError} If any value is not a finite number.
 */
function assertNumbers(...values) {
  for (const v of values) {
    if (typeof v !== 'number' || !Number.isFinite(v)) {
      throw new TypeError(`Expected a finite number but got: ${String(v)}`);
    }
  }
}

/**
 * Adds two numbers.
 * @param {number} a - First addend.
 * @param {number} b - Second addend.
 * @returns {number} The sum a + b.
 */
export function add(a, b) {
  assertNumbers(a, b);
  return a + b;
}

/**
 * Subtracts b from a.
 * @param {number} a - Minuend.
 * @param {number} b - Subtrahend.
 * @returns {number} The difference a - b.
 */
export function subtract(a, b) {
  assertNumbers(a, b);
  return a - b;
}

/**
 * Multiplies two numbers.
 * @param {number} a - First factor.
 * @param {number} b - Second factor.
 * @returns {number} The product a * b.
 */
export function multiply(a, b) {
  assertNumbers(a, b);
  return a * b;
}

/**
 * Divides a by b.
 * @param {number} a - Dividend.
 * @param {number} b - Divisor (must not be 0).
 * @returns {number} The quotient a / b.
 * @throws {Error} "ZeroDivision" error if b is 0.
 */
export function divide(a, b) {
  assertNumbers(a, b);
  if (b === 0) {
    throw new Error('ZeroDivision: cannot divide by zero');
  }
  return a / b;
}
