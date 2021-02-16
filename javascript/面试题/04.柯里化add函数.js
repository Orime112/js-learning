function originAdd(a, b, c, d, e) {
  const args = [a, b, c, d]
  console.log(args)
  return args.reduce(
    (pre, cur) => pre + cur
  )
}

function currying(fn) {
  const length = fn.length
  let allArgs = []
  return function cur(...args) {
    allArgs = allArgs.concat(args)
    if (allArgs.length >= length) {
      let res = fn(...allArgs)
      allArgs = []
      return res
    } else {
      return cur
    }
  }
}

const add = currying(originAdd)

console.log(add(1)(2)(3)(4)(5))
console.log(add(1)(2)(3)(4, 5))
console.log(add(1)(2, 3, 4)(5))
