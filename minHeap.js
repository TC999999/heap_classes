class MinHeap {
  constructor() {
    this._items = [];
  }

  getNext() {
    return this._items[0];
  }

  bubbleUp() {
    let currentIdx = this._items.length - 1;
    let val = this._items[currentIdx];
    let swapIdx = Math.floor(currentIdx / 2);
    if (currentIdx % 2 === 0) {
      swapIdx--;
    }
    let swapVal = this._items[swapIdx];
    while (val < swapVal) {
      this._items[currentIdx] = swapVal;
      this._items[swapIdx] = val;
      currentIdx = swapIdx;
      swapIdx = Math.floor(swapIdx / 2);
      if (currentIdx % 2 === 0) {
        swapIdx--;
      }
      swapVal = this._items[swapIdx];
    }
  }

  insert(val) {
    this._items.push(val);
    if (this._items.length > 1) {
      this.bubbleUp();
    }
    return this._items;
  }

  create(arr) {
    for (let val of arr) {
      this.insert(val);
    }
  }

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

function minHeapSort(arr) {
  let sortHeap = new MinHeap();
  sortHeap.create(arr);
  return sortHeap.removeMin(arr.length);
}

module.exports = { MinHeap, minHeapSort };
