/** 
 * * 迭代器是一种特殊对象，所有迭代器对象都有 next 方法
 * * 每次调用会返回一个结果对象，格式为 { value: 'xx', done: boolean }
 */

/** ES5 方式实现迭代器对象 */
function createIterator(item) {
  var i = 0;
  return {
    next: function() {
      var done = i >= item.length
      var value = !done ? item[i++] : undefined
      return {done: done, value: value}
    }
  }
}

var iterator = createIterator([1,2,3])
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());
console.log(iterator.next());

// { done: false, value: 1 }
// { done: false, value: 2 }
// { done: false, value: 3 }
// { done: true, value: undefined }
// { done: true, value: undefined }
