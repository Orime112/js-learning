Array.prototype.myMap = function (fn, thisValue) {
  let res = []
  thisValue = thisValue ?? this
  for (let i = 0; i < this.length; i++) {
    res.push(fn.call(thisValue, this[i], i, thisValue))
  }
  return res
}

var arr = [2, 3, 1, 5]
arr.myMap(function (item, index, arr) {
  console.log(item, index, arr)
})
