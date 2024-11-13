let { MinNodeHeap } = require("./minNodeHeap");

describe("Min Node Heap", function () {
  let nh;
  let arr = [
    { priority: 36, val: "ninth most important" },
    { priority: 7, val: "fourth most important" },
    { priority: 25, val: "eighth most important" },
    { priority: 2, val: "second most important" },
    { priority: 1, val: "most important" },
    { priority: 99, val: "least important" },
    { priority: 3, val: "third most important" },
    { priority: 17, val: "sixth most important" },
    { priority: 19, val: "seventh most important" },
    { priority: 9, val: "fifth most important" },
  ];
  beforeEach(function () {
    nh = new MinNodeHeap();
    nh.create(arr);
  });

  test("gets the first node of the priority queue, which should be the most important", function () {
    const node = nh.getNext();
    expect(node.priority).toEqual(1);
    expect(node.value).toBe("most important");
  });

  test("when the first node of the priority queue is removed, replaces it with the next most important node", function () {
    const node1 = nh.removeMin();
    expect(node1.priority).toEqual(1);
    expect(node1.val).toBe("most important");

    const node2 = nh.getNext();
    expect(node2.priority).toEqual(2);
    expect(node2.value).toBe("second most important");
  });

  test("removing all nodes returns an array of all the nodes in reverse sorted order", function () {
    const nodeArr = nh.removeMin(arr.length);
    let priorityArr = nodeArr.map((n) => {
      return n.priority;
    });
    expect(priorityArr).toEqual([1, 2, 3, 7, 9, 17, 19, 25, 36, 99]);
  });

  test("error thrown if removal number is greater than heap length", function () {
    try {
      nh.removeMin(arr.length + 1);
    } catch (err) {
      expect(err.message).toEqual("removal number larger that heap length");
    }
  });

  test("error thrown if removal number is zero or less", function () {
    try {
      nh.removeMin(0);
    } catch (err) {
      expect(err.message).toEqual("removal number less that heap length");
    }
  });
});
