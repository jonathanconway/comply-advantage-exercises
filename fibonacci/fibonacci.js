
// Fibonacci generator

const generateNextFibonacci = (function createGenerateNextFibonacci() {

  function* _generateNextFibonacci() {
    yield 0;
    yield 1;

    let next = 1, current = 0;
    while (true) {
      [current, next] = [next, current + next];
      yield next;
    }
  }

  let _generateNextFibonacciInst;

  function generateNextFibonacci(reset) {
    if (reset || !_generateNextFibonacciInst) {
      _generateNextFibonacciInst = _generateNextFibonacci();
    }

    return _generateNextFibonacciInst.next().value;
  }

  return generateNextFibonacci;

}());


// Tests

test("generateNextFibonacci_generatesCorrectResults", function () {
  [0, 1, 1, 2, 3, 5, 8, 13, 21, 34, 55, 89, 144, 233, 377, 610, 987, 1597,
   2584, 4181, 6765, 10946, 17711, 28657]
    .forEach(expected => {
      const result = generateNextFibonacci();
      expect(result).toBe(expected);
    });
});

test("generateNextFibonacci_resetsWhenPassedTrue", function () {
  const result0 = generateNextFibonacci(true);
  expect(result0).toBe(0);

  [1, 1, 2, 3, 5, 8]
    .forEach(expected => {
      const result = generateNextFibonacci();
      expect(result).toBe(expected);
    });

  const result0AfterReset = generateNextFibonacci(true);
  expect(result0AfterReset).toBe(0);

  [1, 1, 2, 3, 5, 8]
    .forEach(expected => {
      const result = generateNextFibonacci();
      expect(result).toBe(expected);
    });
});


// Test Utils

function test(name, fn) {
  console.log(`\n\nTest: ${name}\n`);
  fn();
}

function expect(actual) {
  return {
    toBe: function (expected) {
      if (expected === actual) {
        console.info(`Expected ${expected}. Actual is ${actual}. Passed.`);
      } else {
        console.error(`Expected ${expected}. Actual is ${actual}. Failed.`);
      }
    }
  };
}
