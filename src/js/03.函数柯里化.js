/**
 * 函数柯理化：currying（柯理化）是把接受多个参数的函数变换成接受一个单一参数（最初函数的第一个参数）的函数，并且返回接受余下的参数而且返回结果的新函数的技术。
 * @param {*} fn 
 * @param {*} arr 
 */

// 1、固定参数个数的柯理化
let currying1 = (fn, arr = []) => {
  let len = fn.length
  return (...args) => {
    let concatArr = [...arr, ...args]
    if (concatArr.length < len) {
      return currying1(fn, concatArr)
    } else {
      return fn(...concatArr)
    }
  }
}

function fn(a, b, c, d) {
  console.log(a, b, c, d)
}

let curryFn = currying1(fn)
curryFn(12)(2)(3, 56)

// 2、接收参数个数不固定的柯理化函数
function fnAny(...args) {
  return args.reduce((previousValue, currentValue) => previousValue + currentValue)
}

let currying2 = function (func, argumensts = []) {
  return function (...args) {
    if (args.length) {
      // 还在继续接收参数
      let currentArgs = [...args, ...argumensts]
      return currying2(func, currentArgs)
    }
    return func(...argumensts)
  }
}

let anyFunc = currying2(fnAny)
console.log(anyFunc(1, 2, 3, 4, 5)())
console.log(anyFunc(1)(2, 3)(4)(5)())

// 3、巧用函数的toString，不需要空调用
function add(...args) {
  // add函数执行多次，保存每次传入的值
  let _args = args
  function fn(...funcArgs) {
    _args = args.concat(funcArgs)
    return add(..._args)
  }
  fn.toString = () => _args.reduce((pre, cur) => pre + cur)
  return fn
}

console.log(+add(1, 2)(3)(4, 5)(6))
