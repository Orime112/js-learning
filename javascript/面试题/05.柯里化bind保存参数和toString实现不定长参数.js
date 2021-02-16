
/**
 * * 使用 bind 方法保存传入的参数
*/
// ~function(prototype){
//   function bind(context, ...outerArgs){
//     return function(...innerArgs){
//       return this.call(context, ...outerArgs, ...innerArgs)
//     }
//   }
//   prototype.bind = bind
// }(Function.prototype)

// ! add(1) 返回 _add 方法 (...innerArgs) => this.call(null, 1, ...innerArgs)
// ! add(1)(2) 执行的是 (2) => add(1, 2)，返回了新的 _add 方法： (...inner) => this.call(null, 1, 2, ...innerArgs)
// ! add(1)(2)(3) 执行的是 add(1, 2, 3)，返回了新的 _add 方法，方法上有 toString 属性，并且 args 为 [1, 2, 3]

~(function (prototype) {
  function myBind(context, ...outerArgs) {
    return (...innerArgs) => {
      return this.call(context, ...outerArgs, ...innerArgs)
    }
  }
  prototype.myBind = myBind
})(Function.prototype)

function add(...args) {
  let _add = add.myBind(null, ...args)
  _add.toString = function () {
    return args.reduce(
      (pre, cur) => pre + cur
    )
  }
  return _add
}

// console.log(add(1, 2, 3) + '')
// console.log(add(1, 2)(3) + '')
console.log(add(1)(2)(3) + '')
