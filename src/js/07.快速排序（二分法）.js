const arr = [1,33,20,2,12]

Array.prototype.quick = function quick() {
  const that = this
  if(that.length <=1) {
    return that
  }
  const middle = that.splice(Math.floor(that.length/2), 1)[0]
  const left = [], right = []
  for(let i = 0;i<that.length;i++) {
    if(that[i] > middle) {
      right.push(that[i])
    } else {
      left.push(that[i])
    }
    
  }
  return quick.call(left).concat(middle).concat(quick.call(right))
}

console.log(arr.quick());
