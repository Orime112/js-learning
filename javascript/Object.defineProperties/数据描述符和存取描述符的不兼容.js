/**
 * * 前面概念已经提出对象属性描述符要么是数据描述符（value，writable），要么是存取描述符（get，set），不应该同时存在两者描述符。
 * ! 这个例子就会报错，其实不难理解，存取方法就是用来定义属性值的，value也是用来定义值的，同时定义程序也不知道该以哪个为准了，所以用了value/writable其一，就不能用get/set了；不过configurable与enumerable这两个属性可以与上面两种属性任意搭配。
 * ? value 和 writable 都是数据描述符
 */

let o = {}
Object.defineProperty(o, 'name', { // ! Invalid property descriptor. Cannot both specify accessors and a value or writable attribute, #<Object>
  value: '李华',
  get(){
    return '韩梅梅'
  }
})

console.log(o.name);