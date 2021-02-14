let arr = []

function sum(...args) {
  arr = arr.concat(args)
  if (arr.length < 6) {
    return sum
  } else {
    return {value: function () {
      return arr.reduce((pre, cur) => pre+cur)
    }}
  }
}


console.log(sum(1)(2,3)(4,5,6).value())