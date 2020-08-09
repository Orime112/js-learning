const currying = (fn, arr = []) => {
  let len = fn.length
  return (...args) => {
    let concatArr = [...arr, ...args]
    if(concatArr.length < len) {
      return currying(fn, concatArr)
    } else {
      return fn(...concatArr)
    }
  }
}

function fn(a,b,c,d) {
  console.log(a,b,c,d)
}

const curryFn = currying(fn)
curryFn(12)(2)(3,56)