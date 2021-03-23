/**
 * 柯里化的定义：接收一部分参数，返回一个函数接收剩余参数，接收足够参数后，执行原函数。

当柯里化函数接收到足够参数后，就会执行原函数，如何去确定何时达到足够的参数呢？

有两种思路：

通过函数的 length 属性，获取函数的形参个数，形参的个数就是所需的参数个数
在调用柯里化工具函数时，手动指定所需的参数个数

将这两点结合一下，实现一个简单 curry 函数：
 */

// function curry(fn, len = fn.length){
//   return _curry.call(this, fn, len)
// }

// function _curry(fn, len, ...args){
//   return function(...params){
//     let _args = [...args, ...params]
//     if(_args.length >= len){
//       return fn.apply(this, _args)
//     } else {
//       return _curry(this, fn, len, ...args)
//     }
//   }
// }

// let _fn = curry(function(a,b,c,d,e){
//   console.log(a,b,c,d,e)
//  });

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
function fn(a, b, c, d, e) {
  console.log(a, b, c, d, e)
}

let _fn = currying1(fn)

_fn(1, 2, 3, 4, 5) // print: 1,2,3,4,5
_fn(1)(2)(3, 4, 5) // print: 1,2,3,4,5
_fn(1, 2)(3, 4)(5) // print: 1,2,3,4,5
_fn(1)(2)(3)(4)(5) // print: 1,2,3,4,5

// ? lodash 的 curry 方法还有个占位符
// ![](https://mmbiz.qpic.cn/mmbiz_png/aVp1YC8UV0fAsFFmCF6F1vtGFwbjdYygnQkaxlQGYT2XgzmXibfibqCVwenx9oI8mPHD8AU0icRg9dicwOINFiaXicxw/640?wx_fmt=png&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)
