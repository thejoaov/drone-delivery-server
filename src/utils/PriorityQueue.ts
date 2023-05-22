export class PriorityQueue {
  private values: { val: any; priority: number }[];

  constructor() {
    this.values = [];
  }

  enqueue(val: any, priority: number) {
    this.values.push({ val, priority });
    this.sort();
  }

  dequeue() {
    return this.values.shift();
  }

  sort() {
    this.values.sort((a, b) => a.priority - b.priority);
  }

  isEmpty() {
    return this.values.length === 0;
  }
}
