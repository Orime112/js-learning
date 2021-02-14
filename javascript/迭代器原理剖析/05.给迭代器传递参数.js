/** 
 * * 给 next() 传递的参数，会作为上一条 yield 语句左边接收变量的值
 */

function *createIterator(){
  let first = yield 1
  let second = yield first + 2
  yield second + 3
}

const iterator = createIterator()
console.log(iterator.next());
console.log(iterator.next(4)); // ! 如果调用 next() 的时候传参，则会重置上一次 yield xxx 表达式的值
console.log(iterator.next(5));
console.log(iterator.next());
