'use strict';

const { hexToRgb } = require('../../src/hexToRgb');

describe('hexToRgb (unit)', () => {
  describe('valid input', () => {
    test.each([
      ['#ff8800', { r: 255, g: 136, b: 0 }],
      ['ff8800', { r: 255, g: 136, b: 0 }],
      ['#000000', { r: 0, g: 0, b: 0 }],
      ['#ffffff', { r: 255, g: 255, b: 255 }],
      ['#FF0000', { r: 255, g: 0, b: 0 }],
      ['#aBcDeF', { r: 171, g: 205, b: 239 }],
    ])('converts %s', (input, expected) => {
      expect(hexToRgb(input)).toEqual(expected);
    });

    test('expands 3-digit shorthand', () => {
      expect(hexToRgb('#f80')).toEqual({ r: 255, g: 136, b: 0 });
      expect(hexToRgb('abc')).toEqual({ r: 170, g: 187, b: 204 });
    });

    test('ignores surrounding whitespace', () => {
      expect(hexToRgb('  #00ff00 ')).toEqual({ r: 0, g: 255, b: 0 });
    });

    test('returns values within 0-255 as integers', () => {
      const { r, g, b } = hexToRgb('#123456');
      [r, g, b].forEach((v) => {
        expect(Number.isInteger(v)).toBe(true);
        expect(v).toBeGreaterThanOrEqual(0);
        expect(v).toBeLessThanOrEqual(255);
      });
    });
  });

  describe('invalid input', () => {
    test.each([
      ['empty string', ''],
      ['only a hash', '#'],
      ['too short', '#ff'],
      ['4 digits', '#ff00'],
      ['too long', '#ff880000'],
      ['non-hex characters', '#gg0000'],
      ['two hashes', '##ff0000'],
      ['inner whitespace', '#ff 000'],
    ])('throws RangeError for %s', (_name, input) => {
      expect(() => hexToRgb(input)).toThrow(RangeError);
    });

    test.each([
      ['number', 0xff0000],
      ['null', null],
      ['undefined', undefined],
      ['object', {}],
      ['array', ['#ff0000']],
    ])('throws TypeError for %s', (_name, input) => {
      expect(() => hexToRgb(input)).toThrow(TypeError);
    });

    test('error message includes the offending value', () => {
      expect(() => hexToRgb('#xyz123')).toThrow('#xyz123');
    });
  });
});
