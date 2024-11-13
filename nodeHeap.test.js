let { NodeHeap } = require("./nodeHeap");

describe("Max Node Heap", function () {
  let nh;
  let arr = [
    { priority: 36, val: "second most important" },
    { priority: 7, val: "seventh most important" },
    { priority: 25, val: "third most important" },
    { priority: 2, val: "ninth most important" },
    { priority: 1, val: "least important" },
    { priority: 99, val: "most important" },
    { priority: 3, val: "eighth most important" },
    { priority: 17, val: "fifth most important" },
    { priority: 19, val: "fourth most important" },
    { priority: 9, val: "sixth most important" },
  ];
  beforeEach(function () {
    nh = new NodeHeap();
    nh.create(arr);
  });

  test("gets the first node of the priority queue, which should be the most important", function () {
    const node = nh.getNext();
    expect(node.priority).toEqual(99);
    expect(node.value).toBe("most important");
  });

  test("when the first node of the priority queue is removed, replaces it with the next most important node", function () {
    const node1 = nh.removeMax();
    expect(node1.priority).toEqual(99);
    expect(node1.val).toBe("most important");

    const node2 = nh.getNext();
    expect(node2.priority).toEqual(36);
    expect(node2.value).toBe("second most important");
  });

  test("removing all nodes returns an array of all the nodes in reverse sorted order", function () {
    const nodeArr = nh.removeMax(arr.length);
    let priorityArr = nodeArr.map((n) => {
      return n.priority;
    });
    expect(priorityArr).toEqual([99, 36, 25, 19, 17, 9, 7, 3, 2, 1]);
  });

  test("error thrown if removal number is greater than heap length", function () {
    try {
      nh.removeMax(arr.length + 1);
    } catch (err) {
      expect(err.message).toEqual("removal number larger that heap length");
    }
  });

  test("error thrown if removal number is zero or less", function () {
    try {
      nh.removeMax(0);
    } catch (err) {
      expect(err.message).toEqual("removal number less that heap length");
    }
  });
});
