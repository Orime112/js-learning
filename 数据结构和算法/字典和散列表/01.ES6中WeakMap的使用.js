/**
* WeakMap和map的最主要区别是：
  1、没有entries，keys，values方法
  2、只能使用对象作为键

  相比于Map有什么优势？
  1、WeakMap使用对象作为键，保证了其没有强引用的键，使得JavaScript垃圾回收器可以从中清除整个入口
  2、必须使用键才可以取出值
 */

const map = new WeakMap()

const obj1 = {name: 'Gandalf'}
const obj2 = {name: 'John'}
const obj3 = {name: 'Tyrion'}

map.set(obj1, 'gandalf@email.com')
map.set(obj2, 'John@email.com')
map.set(obj3, 'tyrion@email.com')

console.log(map.has(obj1))
console.log(map.get(obj2))
map.delete(obj2)

const map1 = new Map()
map1.set(obj1, 'gandalf@email.com')
map1.set(obj2, 'john@email.com')
console.log(map1.size)
map1.delete(obj2)
console.log(map1.size)
