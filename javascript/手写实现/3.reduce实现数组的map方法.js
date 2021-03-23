Array.prototype.myMap = function(fn, thisValue){
  const res = []
  thisValue = thisValue ?? this
  this.reduce((pre, cur, index, arr) => {
    console.log(pre, cur, index, 'pre & cur') // ! pre是表达式返回值（数组长度）
    return res.push(fn.call(thisValue, cur, index, arr))
  }, []) // ! 初始值只是为了从数组第一项开始计算，其实没啥用
  return res
}

var arr = [2,3,1,5];
arr.myMap(function(item,index,arr){
 console.log(item,index,arr);
})
