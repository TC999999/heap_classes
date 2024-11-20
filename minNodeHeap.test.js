let { MinNodeHeap, minHeapSort } = require("./minNodeHeap");

describe("Min Node Heap", function () {
  let nh;
  let arr = [
    { priority: 36, value: "ninth most important" },
    { priority: 7, value: "fourth most important" },
    { priority: 25, value: "eighth most important" },
    { priority: 2, value: "second most important" },
    { priority: 1, value: "most important" },
    { priority: 99, value: "least important" },
    { priority: 3, value: "third most important" },
    { priority: 17, value: "sixth most important" },
    { priority: 19, value: "seventh most important" },
    { priority: 9, value: "fifth most important" },
  ];
  beforeEach(function () {
    nh = new MinNodeHeap();
    nh.create(arr);
  });

  test("getNext() returns the first node of the priority queue, which should be the most important", function () {
    const node = nh.getNext();
    expect(node.priority).toEqual(1);
    expect(node.value).toBe("most important");
  });

  test("insert(): inserting a large value keeps it sunk at the bottom", function () {
    nh.insert(100, "the new least important");
    const node = nh._items[arr.length];
    expect(node.priority).toEqual(100);
    expect(node.value).toBe("the new least important");
  });

  test("insert(): inserting a small value bubbles it up to the top", function () {
    nh.insert(-1, "the new most important");
    const node = nh.getNext();
    expect(node.priority).toEqual(-1);
    expect(node.value).toBe("the new most important");
  });

  test("removeMin() returns and removes the first node of the priority queue and replaces it with the next most important node", function () {
    const node1 = nh.removeMin();
    expect(node1.priority).toEqual(1);
    expect(node1.value).toBe("most important");

    const node2 = nh.getNext();
    expect(node2.priority).toEqual(2);
    expect(node2.value).toBe("second most important");
  });

  test("removeMin(arr.length) removes all nodes from the heap and returns an array of all the nodes with priority values from least to greatest", function () {
    const nodeArr = nh.removeMin(arr.length);
    let priorityArr = nodeArr.map((n) => {
      return n.priority;
    });
    expect(priorityArr).toEqual([1, 2, 3, 7, 9, 17, 19, 25, 36, 99]);
  });

  test("insert() and removeMin(): inserting a new value ensures that the removal order is still kept", function () {
    nh.insert(22, "new value");
    let valArr = nh.removeMin(arr.length + 1).map((n) => {
      return n.priority;
    });
    expect(valArr).toEqual([1, 2, 3, 7, 9, 17, 19, 22, 25, 36, 99]);
  });

  test("create() and removeMin(): inserting an array of values ensures that the removal order is still kept", function () {
    nh.create([
      { priority: 22, value: "a" },
      { priority: 45, value: "b" },
      { priority: 87, value: "c" },
      { priority: 32, value: "d" },
    ]);
    let valArr = nh.removeMin(arr.length + 4).map((n) => {
      return n.priority;
    });
    expect(valArr).toEqual([1, 2, 3, 7, 9, 17, 19, 22, 25, 32, 36, 45, 87, 99]);
  });

  test("removeMin() throws an error if the removal number is greater than heap length", function () {
    expect(() => nh.removeMin(arr.length + 1)).toThrow(
      "removal number larger that heap length"
    );
  });

  test("removeMin() throws an error if removal number is zero or less", function () {
    expect(() => nh.removeMin(0)).toThrow(
      "removal number less that heap length"
    );
  });

  test("minHeapSort() returns a sorted array from least to greatest using heap sort", function () {
    let HSArr = minHeapSort(arr).map((v) => {
      return v.priority;
    });
    expect(HSArr).toEqual([1, 2, 3, 7, 9, 17, 19, 25, 36, 99]);
  });
});
