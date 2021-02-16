/**
 * 使用对象来模拟栈数据结构，可以让数据存取更加高效
 * 
 */

export default class Stack {

  constructor() {
    this.count = 0;
    this.items = {};
  }

  push(element) {
    this.items[this.count] = element;
    this.count++;
  }

  pop() {
    if (this.isEmpty()) {
      return undefined;
    }
    this.count--;
    const result = this.items[this.count];
    delete this.items[this.count];
    return result;
  }

  peek() {
    if (this.isEmpty()) {
      return undefined;
    }
    return this.items[this.count - 1];
  }

  isEmpty() {
    return this.count === 0;
  }

  size() {
    return this.count;
  }

  clear() {
    /* while (!this.isEmpty()) {
      this.pop();
    } */

    this.items = {};
    this.count = 0;
  }

  toString() {
    if (this.isEmpty()) {
      return '';
    }
    let objString = `${this.items[0]}`;
    for (let i = 1; i < this.count; i++) {
      objString = `${objString},${this.items[i]}`;
    }
    return objString;
  }
}


function baseConverter(decNumber, base) {
  const remStack = new Stack()
  const digits = "0123456789ABCDEFGHIJKLMNOPQRSTUVWXYZ" // {6}
  let number = decNumber
  let rem
  let baseString = ""
  if (!(base >= 2 && base <= 36)) {
    return ""
  }
  while (number > 0) {
    rem = Math.floor(number % base)
    remStack.push(rem)
    number = Math.floor(number / base)
  }
  while (!remStack.isEmpty()) {
    baseString += digits[remStack.pop()] // {7}
  }
  return baseString
}
