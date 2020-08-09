const arr = [1,34,6,3,71,23]
console.log(1231);


Array.prototype.insert = function insert() {
  const that = this
  const handle = []
  handle.push(that[0])
  for(let i = 1;i<that.length;i++) {
    let A = that[i]
    for(let j = handle.length-1;j>=0;j--) {
      let B = handle[j]
      console.log(A, B)
      if(A>B) {
        handle.splice(j+1, 0, A)
        break
      }
      if(j===0) {
        handle.unshift(A) 
      }
    }
    console.log(handle)
  }
  return handle
}


console.log(arr.insert())