function curry(fn, ...args){
  return args.length < fn.length ? (...innerArgs) => curry(fn, ...args, ...innerArgs) : fn(...args)
}

function originAdd(a, b, c, d, e){
  return a + b + c + d + e
}

const add = curry(originAdd)

console.log(add(1,2,3,4,5))
console.log(add(1,2,3)(4,5))
console.log(add(1)(2)(3)(4,5))