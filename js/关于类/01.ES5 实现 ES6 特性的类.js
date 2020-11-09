// * ES6 中基本的类声明
class PersonClass {
  // 等价于 ES5 中function PersonType(){} 的构造函数
  constructor(name) {
    this.name = name
  }
  // 等价于 PersonType.propertype.sayName
  sayName(){
    console.log(this.name);
  }
}

let person = new PersonClass('Nicholas')
person.sayName()

// * ES5 实现 ES6 的等价声明方式
let PersonType2 = (function(){
  'use strict'
  const PersonType2 = function(name){
    // 确保通过关键字 new 调用该函数
    if(typeof new.target === 'undefined'){
      throw new TypeError('必须通过关键字 new 调用构造函数')
    }
    this.name = name
  }
  // 将原型属性设置为不可枚举类型
  Object.defineProperty(PersonType2.prototype, 'sayName', {
    value: function(){
      // 确保不会通过 new 关键字调用该方法
      if(typeof new.target !== 'undefined'){
        throw new Error('不可使用关键字 new 调用该方法')
      }
    },
    enumerable: false,
  })
})()

