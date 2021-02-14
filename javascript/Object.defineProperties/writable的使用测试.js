/**
writable是一个布尔值，若不定义默认为false，表示此条属性只可读，不可修改，举个例子：
 */

let o = {}
Object.defineProperty(o, 'name', {
  value: '听风是风',
  writable: true // ! 通过Object.defineProperty定义一个属性的时候，和字面量定义有区别，会将 o 中的 name 属性自定更改为 {writable: false}
})

o.name = '时间跳跃'
console.log(o.name);