/**

* 给定一个数组arr，寻找target项的索引

*/

Array.prototype.myFindIndex = function find(target){
    let len = this.length
    let midIndex = Math.floor(len/2)
    let l = 0, r = len
    while(l <= r){
        let midIndex = Math.floor((l+r)/2)
        let midValue = this[midIndex]
        if(midValue === target) return midIndex
        if(midValue > target){
            r = midIndex
        }else{
            l = midIndex + 1
        }
    }
  return -1
}

// 测试用例
let arr = Array.from({length: 100}, (item, index) => index+1)
let target = 99
console.time('myFindIndex')
let res = arr.myFindIndex(target)
console.timeEnd('myFindIndex')
console.log(res) // 98
