/**
 * * enumerable 控制对象中的 key 是否可以被枚举
 */

let o = {
  name: '李华',
  age: 12
}

Object.defineProperty(o, 'age', {
  enumerable: false
})

Object.keys(o).forEach((key, index) => {
  console.log(key);
})

/**
* * configurable的值也是Boolean，默认是false，configurable 特性表示对象的属性是否可以被删除，以及除 value 和 writable 特性外的其他特性是否可以被修改
* ! 由于前面我们说了，未定义的属性虽然没用代码写出来，但它们其实都有了默认值，当configurable为false时，这些属性都无法被重新定义以及修改。
 */

let foo = {
  name: '李华',
  age: 23
}

Object.defineProperty(foo, 'age', {
  configurable: false
})

console.log(delete foo.name); // * true
console.log(delete foo.age); // * false ---> {configurable: false} 无法被删除

Object.defineProperty(foo, 'age', { // ! 报错：Cannot redefine property: age
  get(){
    return '12'
  }
})