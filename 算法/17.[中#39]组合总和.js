/**给定一个无重复元素的数组 candidates 和一个目标数 target ，找出 candidates 中所有可以使数字和为 target 的组合。
candidates 中的数字可以无限制重复被选取。解集不能包含重复的组合。
 */
var combinationSum = function(candidates, target) {
  const result = []
  // 1、排序
  candidates.sort((a, b) => a-b)
  // 2、截取满足条件的数组
  const newArr = []
  for(let i = 0; i < candidates.length; i++){
    if(candidates[i] <= target){
      newArr.push(candidates[i])
    }else{
      break // break是结束整个循环，因为后面的值都是比target大的了
    }
  }
  // 3、定义递归算法
  const recursion = (path, sum) => {
    if(sum > target){
      return
    }
    if(sum === target){
      result.push(path)
    }
    // 每次从新数组中挑选值添加到path中
    for(let i = 0; i < newArr.length; i++){
      const lastNumber = path[path.length - 1] || 0 // path路径的最后一个数字
      let value = newArr[i]
      if(value >= lastNumber){
        path.push(newArr[i])
      }
    }
  }
  // 4、进行递归
  

};

// 常规暴力解法：将目标值进行取商数和取余数，记录各种可能性，依次循环判读并推入
// 经典回溯算法，先对目标数组进行return a-b升序排列，再<=target进行截取；对新数组进行遍历，如果和小于目标值则记录并进行下一次遍历比较
// 如果和等于目标值则push到结果集中

// 测试用例
let candidatesTest = [2,3,6,7], targetTest = 7; // [[2,2,3],[7]]