'use strict';

/**
 * Matches a hex colour with an optional leading "#".
 * Accepts either 3 digits (shorthand, e.g. "f00") or 6 digits (e.g. "ff0000").
 */
const HEX_PATTERN = /^#?([0-9a-f]{3}|[0-9a-f]{6})$/i;

function hexToRgb(hex) {
  if (typeof hex !== 'string') {
    throw new TypeError('Hex value must be a string');
  }

  const match = HEX_PATTERN.exec(hex.trim());
  if (!match) {
    throw new RangeError(`Invalid hex colour: "${hex}"`);
  }

  let digits = match[1];
  if (digits.length === 3) {
    // Expand shorthand: "abc" -> "aabbcc"
    digits = digits.split('').map((d) => d + d).join('');
  }

  return {
    r: parseInt(digits.slice(0, 2), 16),
    g: parseInt(digits.slice(2, 4), 16),
    b: parseInt(digits.slice(4, 6), 16),
  };
}

module.exports = { hexToRgb };
