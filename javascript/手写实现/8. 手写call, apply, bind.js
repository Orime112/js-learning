Function.prototype.myCall = function (context = window) {
  // 函数的方法，所以写在Fuction原型对象上
  if (typeof this !== "function") {
    // 这里if其实没必要，会自动抛出错误
    throw new Error("不是函数")
  }
  const obj = context || window //这里可用ES6方法，为参数添加默认值，js严格模式全局作用域this为undefined
  obj.fn = this //this为调用的上下文,this此处为函数，将这个函数作为obj的方法
  const arg = [...arguments].slice(1) //第一个为obj所以删除,伪数组转为数组
  res = obj.fn(...arg)
  delete obj.fn // 不删除会导致context属性越来越多
  return res
}

Function.prototype.myApply = function (context) {
  // 箭头函数从不具有参数对象！！！！！这里不能写成箭头函数
  let obj = context || window
  obj.fn = this
  const arg = arguments[1] || [] //若有参数，得到的是数组
  let res = obj.fn(...arg)
  delete obj.fn
  return res
}
function f(a, b) {
  console.log(a, b)
  console.log(this.name)
}
let obj = {
  name: "张三",
}
f.myApply(obj, [1, 2]) //arguments[1]

this.value = 2
var foo = {
  value: 1,
}
var bar = function (name, age, school) {
  console.log(name) // 'An'
  console.log(age) // 22
  console.log(school) // '家里蹲大学'
}
var result = bar.bind(foo, "An") //预置了部分参数'An'
result(22, "家里蹲大学") //这个参数会和预置的参数合并到一起放入bar中
