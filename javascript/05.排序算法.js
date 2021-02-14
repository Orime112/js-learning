const arr = [1,45,2,13,12]

function swap(arr, i, j) {
  const temp = arr[i]
  arr[i] = arr[j]
  arr[j] = temp
}

Array.prototype.bubel = function bubel() {
  var that = this,
      flag = false;
  for(let i = 0; i<that.length-1; i++ ) {
    for(let j = 0;j<that.length - 1 -i;j++) {
      if(that[j] > that[j+1]) {
        swap(that, j, j+1)
        flag = true
      }
    }
    if(!flag) {
      break
    }
    flag = false
  }
  return that
}

console.log(arr.bubel())