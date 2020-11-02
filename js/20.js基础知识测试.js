/**
  Symbol符号的使用
 */

 // 创建全局符号
 let s = Symbol.for('foo')
 console.log(Symbol.keyFor(s))

 /** defineProperty的使用 */
 let s1 = Symbol('foo'),
     s2 = Symbol('bar'),
     s3 = Symbol('baz'),
     s4 = Symbol('qux')
let o = {
  [s1]: 'foo val'
}

Object.defineProperty(o, s2, {value: 'bar value'})
Object.defineProperties(o, {
  [s3]: {value: 'baz value'},
  [s4]: {value: 'qux value'}
})

console.dir(o)

let p1 = Symbol('foo'),
    p2 = Symbol('bar')
  
let p = {
  [s1]: 'foo val',
  [s2]: 'bar val',
  baz: 'baz val',
  qux: 'qux val'
}
console.log(Object.getOwnPropertySymbols(p))
console.log(Object.getOwnPropertyNames(p))
// console.log(Object.getOwnPropertyDescriptors(p))
console.log(Reflect.ownKeys(p))
