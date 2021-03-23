// 1. ES6提供的新方法 flat
let arr = [1, 2, [3, 4, [5, 6]]]
// console.log(arr.flat(Infinity))
// console.log(arr, 'arr')


// 2. 利用concat
function myFlat(array){
  const res = []
  while(array.find((item) => Array.isArray(item))){
    array = [].concat(...array) // ! 这里array重新赋值改变了复杂对象的引用
  }
  return array
}

// console.log(myFlat(arr))
// console.log(arr)

// 3. 利用concat比较恶心的递归算法
function myFlat1(array){
  const res = []
  for(let i = 0; i < array.length; i++){
    if(Array.isArray(array[i])){
      res.push(...myFlat1(array[i])) // ! concat和push天差地别,push如实加入，concat展开一层
    } else {
      res.push(array[i])
    }
  }
  return res
}

let arr1 = [ 1, 2, [ 3, 4, [ 5, 6 ] ] ]
console.log(myFlat1(arr1))