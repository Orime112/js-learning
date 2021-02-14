/**
 * * WeakMap 集合中存放的键是对象的弱引用，当该对象中的其他强引用都被清除时，集合中弱引用键及其对应的值也会被自动垃圾回收
 */

 /** 使用场景1：存放 DOM 对象 */
// let map1 = new WeakMap(),
//      element = document.querySelector('.element')
// map1.set(element, 'Original')

// let value = map1.get(element)
// // console.log(value);

// // 移出 element 对象
// element.parentNode.removeChild(element)
// element = null

// 此时 map1 集合为空

/** 使用场景2：存储对象的私有数据 */
let Person = (function(){
  let privateData = new WeakMap()
  class Person {
    constructor(name) {
      privateData.set(this, { name });
    }
    getName() {
      return privateData.get(this).name;
    }
  }
  return Person
})()

let p1 = new Person('lihua')
console.log(p1.getName());
