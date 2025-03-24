/**
 * Netflix interview question. Define expect, toBe, equalTo, and greaterThan methods so they can be used together to compare and test numbers, in the following format
 * expect(add(4,5)).toBe(equalTo(9))
 * expect(add(4,5)).toBe(greaterThan(8))
 */
function expect(result) {
  return {
    toBe: function(comparator) {
      if (typeof comparator === 'function') {
        if (!comparator(value)) {
          throw new Error(`Test failed: Expected ${value} but condition did not hold.`);
        }
      } else {
        if (result !== comparator) {
          throw new Error(`Test failed: Expected ${value} to be ${comparator}.`);
        }
      }
      console.log("Test passed");
    }
  };
}

/**
 * We need to define them to return a function so the result value could be passed in as a closure to these functions
 */
function equalTo(expected) {
  return function(closedOverResult) {
    return closedOverResult === expected;
  };
}

function greaterThan(threshold) {
  return function(closedOverResult) {
    return closedOverResult > threshold;
  };
}

// Example function to test
function add(a, b) {
  return a + b;
}

// Usage
expect(add(4,5)).toBe(equalTo(9));  // Should pass
expect(add(4,5)).toBe(greaterThan(8));  // Should pass
