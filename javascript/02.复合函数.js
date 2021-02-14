// let res = fn(1, 2)(3)
// console.log(res) // 6

// function fn(...args) {
//   return func(...argsa) {
//     return 
//   }
// }

// function compose(...funcs) {
//   return function fn(n) {
//     debugger;
//     funcs.reduce((pre, cur) => {
//       if(typeof pre === 'function' && typeof cur === 'function') pre(cur(n))
//     })
//   }
// }

/**
 * compose复合函数
 * @param  {...any} funcs 
 */

function compose(...funcs) {
  return function fn(n) {
    let cur;
    let fun;
    funcs.forEach(func => {
      if(!cur) cur = n
      cur = func(cur)
      fun = func
      console.log(fun, cur, '及');
    })
    return cur
  }
}

const add1 = x => x + 1
const mul3 = x => x * 3
const div2 = x => x / 2

let res =  compose(add1, mul3, div2)(0)
console.log(res, '结果');
