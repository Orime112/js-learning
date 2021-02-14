/** 生成器是一种返回迭代器对象的函数 */
function* createIterator() {
  yield 1;
  yield 2;
  yield 3;
}

const iterator = createIterator()

console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())
console.log(iterator.next())

// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }

/** yield 关键字可以返回任意值或者表达式，并且可以中断函数执行 */
function* createIterator1(items) {
  for(let i = 0; i < items.length; i++){
    yield items[i]
  }
}

const iterator1 = createIterator1([1,2,3])

console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());
console.log(iterator1.next());

// { value: 1, done: false }
// { value: 2, done: false }
// { value: 3, done: false }
// { value: undefined, done: true }
