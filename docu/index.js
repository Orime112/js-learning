const a = [1,4,6]
const b = [2,5,7]

function mergeArr(arr1, arr2){ return [...arr1, ...arr2].sort((a, b) => a -b) }

function mergeArr1(arr1, arr2){
  let a = [...arr1]
  let b = [...arr2]
  const first = a[0] > b[0] ? b.shift() : a.shift()
  const res = [first]
  while(a[0] < b[0]){
    // a 4 b 2 res 1
    if(a[0] > b[0]){
      res.push(b.shift())
    } else {
      res.push(a.shift)
    }
  }
  return res
}

console.log(mergeArr(a, b))
console.log(mergeArr1(a, b))

