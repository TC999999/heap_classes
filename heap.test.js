let { Heap, heapSort } = require("./heap");

describe("Max Heap", function () {
  let h;
  let arr = [36, 7, 25, 2, 1, 99, 3, 17, 19, 9];
  beforeEach(function () {
    h = new Heap();
    h.create(arr);
  });

  test("getNext() returns the first value of the heap, which should be the most important", function () {
    expect(h.getNext()).toEqual(99);
  });

  test("insert(): inserting a large value bubbles it up to the top", function () {
    expect(h.insert(100)[0]).toEqual(100);
  });

  test("insert(): inserting a small value keeps it sunk at the bottom", function () {
    expect(h.insert(-1)[arr.length]).toEqual(-1);
  });

  test("removeMax() returns and removes the first value of the heap and replaces it with the next most important value", function () {
    expect(h.removeMax()).toEqual(99);
    expect(h.getNext()).toEqual(36);
  });

  test("removeMax(arr.length) removes all values from the heap and returns an array of all the values in order from greatest to least", function () {
    expect(h.removeMax(arr.length)).toEqual([
      99, 36, 25, 19, 17, 9, 7, 3, 2, 1,
    ]);
  });

  test("insert() and removeMax(): inserting a new value ensures that the removal order is still kept", function () {
    h.insert(22);
    expect(h.removeMax(arr.length + 1)).toEqual([
      99, 36, 25, 22, 19, 17, 9, 7, 3, 2, 1,
    ]);
  });

  test("removeMax() throws an error if removal number is greater than heap length", function () {
    expect(() => h.removeMax(arr.length + 1)).toThrow(
      "removal number larger that heap length"
    );
  });

  test("removeMax() throws an error if removal number is zero or less", function () {
    expect(() => h.removeMax(0)).toThrow(
      "removal number less that heap length"
    );
  });

  test("heapSort() returns a sorted array from greatest to least using a heap", function () {
    expect(heapSort(arr)).toEqual([99, 36, 25, 19, 17, 9, 7, 3, 2, 1]);
  });
});
