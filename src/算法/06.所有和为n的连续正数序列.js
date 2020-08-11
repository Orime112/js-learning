/**
输入一个正整数N，输出所有和为N的连续正数序列
例如：输入15
结果：[[1,2,3,4,5], [4, 5, 6], [7, 8]]
*/

var findList = function(n){
  const result = []
  var generateArr = (i, j) => {
    let res = []
    for(let k = i; k <= j; k++){
      res.push(k)
    }
    return res
  }
  for(let i = 1; i < Math.ceil(n/2); i++){
    for(let j = i+1; j < n; j++){
      let total = (i+j)*(j-i+1)/2
      // if(total > n){ // 该break判断在 n = 1000 情况下节省一倍性能，在n = 10000情况下节省7倍性能
      //   break
      // }
      if(total === n){
        let arr = generateArr(i, j)
        result.push(arr)
      }
    }
  }
  return result
}

// 测试用例
let N = 100000
console.time('序列')
var x = findList(N)
console.log(x)
console.timeEnd('序列')
// 1、利用数学公式（m+n）*(m到n的个数或者[m索引-n索引 + 1])/2