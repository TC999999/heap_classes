class MinNode {
  constructor(priority, val) {
    this.priority = priority;
    this.val = val;
  }
}

//A Min Heap that uses nodes and priority values to create a reverse priority queue
class MinNodeHeap {
  constructor() {
    this._items = [];
  }

  //returns the current heap as a compact array
  getQueue() {
    return this._items.map((node) => {
      return { priority: node.priority, value: node.val };
    });
  }

  //returns the next node in the start of the queue
  getNext() {
    return { priority: this._items[0].priority, value: this._items[0].val };
  }

  //bubbles up any value at the bottom of the heap when its parent node priority value is greater
  //than its priority value until it reaches its proper place
  bubbleUp() {
    let currentIdx = this._items.length - 1;
    let currNode = this._items[currentIdx];
    let swapIdx = Math.floor(currentIdx / 2);
    if (currentIdx % 2 === 0) {
      swapIdx--;
    }
    let swapNode = this._items[swapIdx];
    while (swapNode && currNode.priority < swapNode.priority) {
      this._items[currentIdx] = swapNode;
      this._items[swapIdx] = currNode;
      currentIdx = swapIdx;
      swapIdx = Math.floor(swapIdx / 2);
      if (currentIdx % 2 === 0) {
        swapIdx--;
      }
      swapNode = this._items[swapIdx];
    }
  }

  //inserts a new node at the bottom of the heap and bubbles it up until it reaches its proper place
  insert(priority, val) {
    let node = new MinNode(priority, val);
    this._items.push(node);
    if (this._items.length > 1) {
      this.bubbleUp();
    }
  }

  //adds new items from an array to the heap
  create(nodeArr) {
    for (let node of nodeArr) {
      this.insert(node.priority, node.val);
    }
  }

  //sinks down the top node when both its children node priority values are greater
  //than its priority value until it reaches its proper place
  sinkDown() {
    let currIdx = 0;
    let leftIDX = 1;
    let rightIDX = 2;
    let curr = this._items[currIdx];
    let left = this._items[leftIDX];
    let right = this._items[rightIDX];
    if (right) {
      while (
        left &&
        right &&
        (curr.priority >= left.priority || curr.priority >= right.priority)
      ) {
        if (curr.priority >= left.priority && curr.priority >= right.priority) {
          if (right.priority <= left.priority) {
            this._items[rightIDX] = curr;
            this._items[currIdx] = right;
            currIdx = rightIDX;
          } else if (right.priority >= left.priority) {
            this._items[leftIDX] = curr;
            this._items[currIdx] = left;
            currIdx = leftIDX;
          }
        } else if (
          curr.priority >= left.priority &&
          curr.priority <= right.priority
        ) {
          this._items[leftIDX] = curr;
          this._items[currIdx] = left;
          currIdx = leftIDX;
        } else if (
          curr.priority <= left.priority &&
          curr.priority >= right.priority
        ) {
          this._items[rightIDX] = curr;
          this._items[currIdx] = right;
          currIdx = rightIDX;
        }
        leftIDX = currIdx * 2 + 1;
        rightIDX = leftIDX + 1;
        left = this._items[leftIDX];
        right = this._items[rightIDX];
      }
    } else {
      if (curr.priority >= left.priority) {
        this._items[leftIDX] = curr;
        this._items[currIdx] = left;
        currIdx = leftIDX;
      }
    }
  }

  //removes the node at the start of the heap and moves the node at the end of the heap to the start
  //the new top node then sinks down to its proper place. Returns all the nodes that were removed from
  //the heap.
  removeMin(i = 1) {
    if (this._items.length === 0) {
      throw new Error("heap is empty");
    } else if (i > this._items.length) {
      throw new Error("removal number larger that heap length");
    } else if (i < 1) {
      throw new Error("removal number less that heap length");
    }
    let returnArr = [];
    while (i > 0) {
      let oldTop = this._items.shift();
      let newTop = this._items.pop();
      returnArr.push(oldTop);
      if (newTop) this._items.unshift(newTop);
      if (this._items.length > 1) {
        this.sinkDown();
      }
      i--;
    }
    if (returnArr.length > 1) {
      return returnArr.map((item) => {
        return { priority: item.priority, value: item.val };
      });
    } else {
      return returnArr[0];
    }
  }
}

// let mnh = new MinNodeHeap();

// mnh.create([
//   { priority: 36, val: "second most important" },
//   { priority: 7, val: "seventh most important" },
//   { priority: 25, val: "third most important" },
//   { priority: 2, val: "ninth most important" },
//   { priority: 1, val: "least important" },
//   { priority: 99, val: "Most Important" },
//   { priority: 3, val: "eighth most important" },
//   { priority: 17, val: "fifth most important" },
//   { priority: 19, val: "fourth most important" },
//   { priority: 9, val: "sixth most important" },
// ]);

module.exports = { MinNodeHeap };
