
/**
 * Performs a deep value comparison on two objects - `this` and `compare`.
 *
 * Examples:
 *   {}, {} = true
 *   'a', 'a' = true
 *   { name: 'jess' }, { name: 'jess' } = true
 *   { name: 'jess' }, { name: 'jess2' } = false
 *   { coords: { x: 1, y: 1 } }, { coords: { x: 1, y: 1 } } = true
 *   { coords: { x: 1, y: 1 } }, { coords: { x: 1, y: 2 } } = false
 *
 * @param compare object to compare `this` with.
 * @return true if equal, false if not.
 */
Object.prototype.isEqual = Object.prototype.isEqual || function (compare) {
    // If they're equal values, they're equal.
    if (this === compare) return true;

    // If either is falsy, then we can't drill into its properties.
    if (!this || !compare) return false;

    // Collect all properties from both objects.
    const allUniquePropNames = [...(new Set([
        ...Object.keys(this),
        ...Object.keys(compare)
    ]))];

    // Scan properties, looking for differences.
    for (let propName of allUniquePropNames) {
        // Sub-objects: recursively compare each of their properties.
        if (typeof this[propName] === "object") {
            if (!this[propName].isEqual(compare[propName])) {
                return false;
            } else {
                continue;
            }
        }

        // Values: directly compare.
        if (this[propName] !== compare[propName]) {
            return false;
        }
    }

    // No differences found? They must be equal.
    return true;
};


var obj1 = {
    name: "John",
    age: 10,
    info: {
        address: 'some place',
        tel: '0123456789',
        hobbies: ['1', '2']
    }
}

var obj2 = {
    name: "John",
    age: 10,
    info: {
        address: 'some place',
        tel: '0123456789',
        hobbies: ['1', '2']
    }
}

var smallObj = {
    name: "John",
    age: 10
}


var obj3 = obj2;
var obj4 = obj1;

test("isEqual", function () {

    expect(smallObj.isEqual(obj1)).toBe(false);
    expect(smallObj.isEqual({name: "John"})).toBe(false);
    expect(obj1.isEqual(undefined)).toBe(false);
    expect(obj2.isEqual(obj1)).toBe(true);
    expect(obj3.isEqual(obj1)).toBe(true);
    expect(obj4.isEqual(obj1)).toBe(true);

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