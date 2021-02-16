~(function (prototype) {
  function myBind(context, ...outerArgs) {
    return (...innerArgs) => {
      return this.call(context, ...outerArgs, ...innerArgs)
    }
  }
  prototype.myBind = myBind
})(Function.prototype)

function sum(...args) {
  return this.prefix + args.reduce(
    (pre, cur) => pre + cur
  )
}

let obj = {prefix: '$'}
let bindSum = sum.myBind(obj, 1)
console.log(bindSum(4, 5))

// ~function (prototype) {
//   function mybind(context = global, ...outerArgs) {
//       return (...innerArgs) => {
//           return this.call(context, ...outerArgs, ...innerArgs);
//       }
//   }
//   prototype.mybind = mybind;
// }(Function.prototype);

// function sum(...args) {
//   return this.prefix + args.reduce((acc, curr) => acc + curr, 0);
// }
// let obj = { prefix: '$' };
// let bindSum = sum.mybind(obj, 1, 2, 3);
// console.log(bindSum(4, 5));
