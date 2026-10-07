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
