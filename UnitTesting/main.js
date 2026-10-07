import { add, subtract, multiply, divide } from './src/mylib.js';

console.log('add(6, 3)      =', add(6, 3));
console.log('subtract(6, 3) =', subtract(6, 3));
console.log('multiply(6, 3) =', multiply(6, 3));
console.log('divide(6, 3)   =', divide(6, 3));

try {
  divide(6, 0);
} catch (err) {
  console.log('divide(6, 0)   -> error caught:', err.message);
}
