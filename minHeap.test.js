let { MinHeap, minHeapSort } = require("./minHeap");

describe("Min Heap", function () {
  let h;
  let arr = [36, 7, 25, 2, 1, 99, 3, 17, 19, 9];
  beforeEach(function () {
    h = new MinHeap();
    h.create(arr);
  });

  test("getNext() returns the first value of the heap, which should be the most important", function () {
    expect(h.getNext()).toEqual(1);
  });

  test("removeMin() returns and removes the first node of the heap and replaces it with the next most important node", function () {
    expect(h.removeMin()).toEqual(1);
    expect(h.getNext()).toEqual(2);
  });

  test("removeMin(arr.length) removes all nodes from the heap and returns an array of all the nodes in order from greatest to least", function () {
    expect(h.removeMin(arr.length)).toEqual([
      1, 2, 3, 7, 9, 17, 19, 25, 36, 99,
    ]);
  });

  test("removeMin() throws an error if removal number is greater than heap length", function () {
    expect(() => h.removeMin(arr.length + 1)).toThrow(
      "removal number larger that heap length"
    );
  });

  test("removeMin() throws an error  if removal number is zero or less", function () {
    expect(() => h.removeMin(0)).toThrow(
      "removal number less that heap length"
    );
  });

  test("minHeapSort() returns a sorted array from greatest to lest using a heap", function () {
    expect(minHeapSort(arr)).toEqual([1, 2, 3, 7, 9, 17, 19, 25, 36, 99]);
  });
});
