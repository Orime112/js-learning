function *createNumberIterator(){
  yield 1;
  yield 2;
  yield 3;
}

function *createColorIterator(){
  yield 'red';
  yield 'green';
  yield 'blue';
}

function *createIterator(){
  yield *createColorIterator()
  yield *createNumberIterator()
  yield 'main'
}

let iterator = createIterator()

console.log(iterator.next()); // * { value: 'red', done: false } 
console.log(iterator.next()); // * { value: 'green', done: false }
console.log(iterator.next()); // * { value: 'blue', done: false }
console.log(iterator.next()); // * { value: 1, done: false }
console.log(iterator.next()); // * { value: 2, done: false }
console.log(iterator.next()); // * { value: 3, done: false }
console.log(iterator.next()); // * { value: 'main', done: false }
console.log(iterator.next()); // * { value: undefined, done: true }

