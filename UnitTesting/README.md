# UnitTesting

A tiny JavaScript library with `add`, `subtract`, `multiply` and `divide`,
tested with Mocha and Chai (should style).

## Run it

```bash
npm install
npm start    # runs the main program
npm test     # runs only the tests
```

## Files

- `src/mylib.js` – the library
- `main.js` – small program that uses the library
- `tests/mylib.test.js` – the tests

## What the tests check

There are 9 tests, at least one for every function:

- `add`, `subtract`, `multiply` give the right results (including negative
  results, multiplying by 0 and decimals).
- `divide` gives the right result, and **throws a ZeroDivision error when the
  divisor is 0**.
- Passing something that isn't a number (like `'1'` or `NaN`) throws a
  `TypeError`.

A `before` hook runs once before all tests and an `after` hook runs once after
them. They only print a message here, but that's where setup and cleanup would go.

## Key parts

The library refuses to divide by zero (JavaScript would just return `Infinity`):

```js
export function divide(a, b) {
  assertNumbers(a, b);
  if (b === 0) {
    throw new Error('ZeroDivision: cannot divide by zero');
  }
  return a / b;
}
```

The test wraps the call in a function so Chai can catch the error itself:

```js
(() => divide(5, 0)).should.throw(Error, 'ZeroDivision');
```

Decimals are compared with a tolerance, since `0.1 + 0.2` is not exactly `0.3`:

```js
add(0.1, 0.2).should.be.closeTo(0.3, 1e-9);
```

## Limitations

- Only a few example values are tested, not extreme cases like huge numbers.
- Floating point rounding is tolerated in the test, not fixed in the library.
- `NaN` and `Infinity` are always rejected, which may be too strict.
- Only the should style is used, and there is no coverage report.
- Chai 5+ is ESM-only, so the project uses `import`/`export` instead of `require`.
