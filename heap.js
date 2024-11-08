class Heap {
  constructor() {
    this._items = [];
  }

  bubbleUp() {
    let currentIdx = this._items.length - 1;
    let val = this._items[currentIdx];
    let swapIdx = Math.floor(currentIdx / 2);
    if (currentIdx % 2 === 0) {
      swapIdx--;
    }
    let swapVal = this._items[swapIdx];
    while (val > swapVal) {
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
    while (bottom < left || bottom < right) {
      if (bottom < left && bottom < right) {
        if (right > left) {
          this._items[rightIDX] = bottom;
          this._items[bottomIdx] = right;
          bottomIdx = rightIDX;
        } else if (right < left) {
          this._items[leftIDX] = bottom;
          this._items[bottomIdx] = left;
          bottomIdx = leftIDX;
        }
      } else if (bottom < left && !bottom < right) {
        this._items[leftIDX] = bottom;
        this._items[bottomIdx] = left;
        bottomIdx = leftIDX;
      } else if (!bottom < left && bottom < right) {
        this._items[rightIDX] = bottom;
        this._items[bottomIdx] = right;
        bottomIdx = rightIDX;
      }
      leftIDX = bottomIdx * 2 + 1;
      rightIDX = leftIDX + 1;
      left = this._items[leftIDX];
      right = this._items[rightIDX];
    }
  }

  removeMax() {
    let bottom = this._items.pop();
    let bottomIdx = 0;
    this._items[bottomIdx] = bottom;
    this.sinkDown();
    return this._items;
  }
}

let h = new Heap();

h.create([36, 7, 25, 2, 1, 99, 3, 17, 19, 9]);
