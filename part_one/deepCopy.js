// Solution
// Is Immutable but only clones the top layer
// I reach for the spread whenever it suits
const deepCopy = (sourceObj) => {
  return { ...sourceObj };
};

// Not a solution but an interesting option when cloning objects with nested properties
// Is immutable and also clones all levels of nested objects and arrays
// Note: Does not clone methods !!!
// A powerful pattern but not suitable for Set2 as it contains a method which is ignored and also turns the date into a string
const deepCopyTwo = (sourceObj) => {
  return JSON.parse(JSON.stringify(sourceObj));
};

// Example simple test case
const source = {
  a: 1,
  b: "string",
  c: false,
};

const target = deepCopy(source);
console.group("Set1");
console.log("source ==>", source);
console.log("target ==>", target);
console.groupEnd();

// Example more advanced test case
const source1 = {
  a: [1, 2, 3, 4],
  b: {
    c: 1,
    d: 2,
    e: new Date(),
    f: () => console.log("Hello World"),
  },
};
const target1 = deepCopy(source1);
console.group("Set2");
console.log("source ==>", source1);
console.log("target ===>", target1);
console.groupEnd();

// Feel free to show off different style test cases as you see fit
