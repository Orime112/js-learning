/** Symbol.iterator表示实现迭代器API的函数 */
class Emitter{
  constructor(max){
    this.max = max
    this.idx = 0
  }
  *[Symbol.iterator](){
    while(this.idx < this.max){
      yield this.idx++
    }
  }
}

function count(){
  let emitter = new Emitter(5)
  for(const x of emitter){
    console.log(x)
  }
}

// count()

/** 正则表达式对象的Symbol.match属性测试 */
class FooMatcher {
  static [Symbol.match](target){
    return target.includes('foo')
  }
}

console.log('foobar'.match(FooMatcher)) /** true */
console.log('barbar'.match(FooMatcher)) /** false */

class StringMatcher{
  constructor(str){
    this.str = str
  }
  [Symbol.match](target){
    return target.includes(this.str)
  }
}

console.log('foobar'.match(new StringMatcher('foo'))) /** true */
console.log('barbar'.match(new StringMatcher('foo'))) /** false */

/** Symbol.split属性 */
console.log('foobarbaz'.split(/bar/).join('abc'))

/** Symbol.toPrimitive属性 */
class Foo{}
let foo = new Foo()
console.log(String(foo))

class Bar{
  constructor(){
    this[Symbol.toPrimitive] = function(hint){
      switch(hint){
        case 'number':
          return 3
        case 'string':
          return 'string bar'
        default:
          return 'default bar'
      }
    }
  }
}

let bar = new Bar()
console.log(3+bar)
console.log(3-bar)
console.log(String(bar))

