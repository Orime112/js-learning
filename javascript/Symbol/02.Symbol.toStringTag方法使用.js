/**
 * 对象上的 [Symbol.toStringTag] 属性决定了对象调用toString方法时返回的 '[object xxxx]'值
 */

function Person(name){
  this.name = name
}

Person.prototype[Symbol.toStringTag] = 'Person'

const me = new Person('me');

console.log(me.toString()); // [object Person]
console.log(Object.prototype.toString.call(me)); // [object Person]

