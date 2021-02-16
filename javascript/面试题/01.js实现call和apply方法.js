/**
 * * 实现 call 方法
*/

Function.prototype.myCall = function(context, ...args){
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...args)
  delete context[fn]
  return result
}

function sum(amount){
  return this.age + amount
}

let obj = {age:12}

console.log(sum.myCall(obj, 100)) // 112

/**
 * * 实现 apply 方法
*/

Function.prototype.myApply = function(context, argsList){
  const fn = Symbol()
  context[fn] = this
  const result = context[fn](...argsList)
  delete context[fn]
  return result
}

function sum1(amount){
  return this.age + amount
}

let obj1 = {age:12}

console.log(sum1.myApply(obj1, [100])) // 112

// ! 性能对比上，call 远远高于 apply