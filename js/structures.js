// Definición de LinkedQueue, Stack, Flight
export class Flight {
  constructor(id, type, fuel /*, operation opcional */ , operation) {
    this.id = id;
    this.type = type;
    this.fuel = fuel;
    this.operation = operation || ""; // <-- nuevo campo (Aterrizaje/Despegue o vacío)
    this.timestamp = Date.now();
  }
}

export class Node {
  constructor(value) {
    this.value = value;
    this.next = null;
  }
}

export class LinkedQueue {
  constructor() {
    this.front = this.rear = null;
  }

  enqueue(value) {
    const node = new Node(value);
    if (!this.rear) this.front = this.rear = node;
    else {
      this.rear.next = node;
      this.rear = node;
    }
  }

  dequeue() {
    if (!this.front) return null;
    const value = this.front.value;
    this.front = this.front.next;
    if (!this.front) this.rear = null;
    return value;
  }

  isEmpty() {
    return !this.front;
  }
}

export class Stack {
  constructor() {
    this.items = [];
  }

  push(item) {
    this.items.push(item);
  }

  pop() {
    return this.items.pop();
  }

  peek() {
    return this.items[this.items.length - 1];
  }

  isEmpty() {
    return this.items.length === 0;
  }
}
