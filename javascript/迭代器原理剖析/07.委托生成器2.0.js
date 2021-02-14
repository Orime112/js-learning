/**
 * * 可以使用委托生成器的返回值
*/

function *createNumberIterator() {
  yield 1;
  yield 2;
  // yield 3  // ! 必须是 return 3；否则返回值是 undefined
  return 3
}

function *createIterator(){
  const number = yield *createNumberIterator()
  // yield number; // * 会在上一个生成器所有 yield 表达式执行完毕之后返回结果
  for(let i = 0; i < number; i++){
    yield i    
  }
}

const iterator = createIterator()

console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
