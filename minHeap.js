class MinHeap {
  constructor() {
    this._items = [];
  }

  //returns the first node of the queue
  getNext() {
    return this._items[0];
  }

  //bubbles up any value at the bottom of the heap when its parent value is greater
  //than its own value until it reaches its proper place
  bubbleUp() {
    let currentIdx = this._items.length - 1;
    let value = this._items[currentIdx];
    let swapIdx = Math.floor(currentIdx / 2);
    if (currentIdx % 2 === 0) {
      swapIdx--;
    }
    let swapVal = this._items[swapIdx];
    while (value < swapVal) {
      this._items[currentIdx] = swapVal;
      this._items[swapIdx] = value;
      currentIdx = swapIdx;
      swapIdx = Math.floor(swapIdx / 2);
      if (currentIdx % 2 === 0) {
        swapIdx--;
      }
      swapVal = this._items[swapIdx];
    }
  }

  //inserts a new value at the bottom of the heap and bubbles it up until it reaches its proper place
  insert(value) {
    this._items.push(value);
    if (this._items.length > 1) {
      this.bubbleUp();
    }
    return this._items;
  }

  //adds new values from an array to the heap
  create(arr) {
    for (let value of arr) {
      this.insert(value);
    }
  }

  //sinks down the top node when both its children values are greater
  //than its own value until it reaches its proper place
  sinkDown() {
    let bottomIdx = 0;
    let leftIDX = 1;
    let rightIDX = 2;
    let bottom = this._items[bottomIdx];
    let left = this._items[leftIDX];
    let right = this._items[rightIDX];
    if (right) {
      while (left && right && (bottom >= left || bottom >= right)) {
        if (bottom >= left && bottom >= right) {
          if (right <= left) {
            this._items[rightIDX] = bottom;
            this._items[bottomIdx] = right;
            bottomIdx = rightIDX;
          } else if (right >= left) {
            this._items[leftIDX] = bottom;
            this._items[bottomIdx] = left;
            bottomIdx = leftIDX;
          }
        } else if (bottom >= left && bottom <= right) {
          this._items[leftIDX] = bottom;
          this._items[bottomIdx] = left;
          bottomIdx = leftIDX;
        } else if (bottom <= left && bottom >= right) {
          this._items[rightIDX] = bottom;
          this._items[bottomIdx] = right;
          bottomIdx = rightIDX;
        }
        leftIDX = bottomIdx * 2 + 1;
        rightIDX = leftIDX + 1;
        left = this._items[leftIDX];
        right = this._items[rightIDX];
      }
    } else {
      if (bottom >= left) {
        this._items[leftIDX] = bottom;
        this._items[bottomIdx] = left;
        bottomIdx = leftIDX;
      }
    }
  }
  //removes the value at the start of the heap and moves the value at the end of the heap to the start
  //the new top value then sinks down to its proper place. Returns all the values that were removed from
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
      let top = this._items.shift();
      returnArr.push(top);
      let bottom = this._items.pop();
      this._items.unshift(bottom);
      this.sinkDown();
      i--;
    }
    if (returnArr.length > 1) {
      return returnArr;
    } else {
      return returnArr[0];
    }
  }
}

// takes an array of values, makes a heap out of them, and the removes top values until the heap is empty. Returns an array of values sorted from least to greatest
function minHeapSort(arr) {
  let sortHeap = new MinHeap();
  sortHeap.create(arr);
  return sortHeap.removeMin(arr.length);
}

module.exports = { MinHeap, minHeapSort };
