// /**
//  * *  方案一：新的变量
//  */

// let array = [{name: 'sam', value: 10},{name: 'wiki', value: 20}]
// // * target:name -> sam

// function deleteTarget(arr, tgt){
//   arr = arr.filter((item) => {
//     return item.name !== tgt.name
//   })
//   return arr
// }

// console.log(array)
// array = deleteTarget(array, {name: 'sam'})
// console.log(array)
/**
 * *  方案二：无需新的存储空间
 */

let array = [{name: 'sam', value: 10},{name: 'wiki', value: 20}]
// * target:name -> sam

function deleteTarget(arr, tgt){
  const targetIndex = arr.findIndex((item) => {
    return item.name === tgt.name
  })
  arr.splice(targetIndex, 1)
}

console.log(array)
deleteTarget(array, {name: 'sam'})
console.log(array)