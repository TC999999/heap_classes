let { NodeHeap, maxHeapSort } = require("./nodeHeap");

describe("Max Node Heap", function () {
  let nh;
  let arr = [
    { priority: 36, value: "second most important" },
    { priority: 7, value: "seventh most important" },
    { priority: 25, value: "third most important" },
    { priority: 2, value: "ninth most important" },
    { priority: 1, value: "least important" },
    { priority: 99, value: "most important" },
    { priority: 3, value: "eighth most important" },
    { priority: 17, value: "fifth most important" },
    { priority: 19, value: "fourth most important" },
    { priority: 9, value: "sixth most important" },
  ];
  beforeEach(function () {
    nh = new NodeHeap();
    nh.create(arr);
  });

  test("getNext() returns the first node of the priority queue, which should be the most important", function () {
    const node = nh.getNext();
    expect(node.priority).toEqual(99);
    expect(node.value).toBe("most important");
  });

  test("insert(): inserting a large value bubbles it up to the top", function () {
    nh.insert(100, "the new most important");
    const node = nh.getNext();
    expect(node.priority).toEqual(100);
    expect(node.value).toBe("the new most important");
  });

  test("insert(): inserting a small value keeps it sunk at the bottom", function () {
    nh.insert(-1, "the new least important");
    const node = nh._items[arr.length];
    expect(node.priority).toEqual(-1);
    expect(node.value).toBe("the new least important");
  });

  test("removeMax() returns and removes the first node of the priority queue and replaces it with the next most important node", function () {
    const node1 = nh.removeMax();
    expect(node1.priority).toEqual(99);
    expect(node1.value).toBe("most important");

    const node2 = nh.getNext();
    expect(node2.priority).toEqual(36);
    expect(node2.value).toBe("second most important");
  });

  test("removeMax(arr.length) removes all nodes from the heap and returns an array of all the nodes in order from greatest to least", function () {
    const nodeArr = nh.removeMax(arr.length);
    let priorityArr = nodeArr.map((n) => {
      return n.priority;
    });
    expect(priorityArr).toEqual([99, 36, 25, 19, 17, 9, 7, 3, 2, 1]);
  });

  test("insert() and removeMax(): inserting a new value ensures that the removal order is still kept", function () {
    nh.insert(22, "new value");
    let valArr = nh.removeMax(arr.length + 1).map((n) => {
      return n.priority;
    });
    expect(valArr).toEqual([99, 36, 25, 22, 19, 17, 9, 7, 3, 2, 1]);
  });

  test("create() and removeMax(): inserting an array of values ensures that the removal order is still kept", function () {
    nh.create([
      { priority: 22, value: "a" },
      { priority: 45, value: "b" },
      { priority: 87, value: "c" },
      { priority: 32, value: "d" },
    ]);
    let valArr = nh.removeMax(arr.length + 4).map((n) => {
      return n.priority;
    });
    expect(valArr).toEqual([99, 87, 45, 36, 32, 25, 22, 19, 17, 9, 7, 3, 2, 1]);
  });

  test("removeMax() throws an error if removal number is greater than heap length", function () {
    expect(() => nh.removeMax(arr.length + 1)).toThrow(
      "removal number larger that heap length"
    );
  });

  test("removeMax() throws an error  if removal number is zero or less", function () {
    expect(() => nh.removeMax(0)).toThrow(
      "removal number less that heap length"
    );
  });

  test("maxHeapSort() returns a sorted array from greatest to lest using a heap", function () {
    let HSArr = maxHeapSort(arr).map((v) => {
      return v.priority;
    });
    expect(HSArr).toEqual([99, 36, 25, 19, 17, 9, 7, 3, 2, 1]);
  });
});
