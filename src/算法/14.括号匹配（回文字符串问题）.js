/**
 * 给定一个只包括"[{()}]"的字符串，判断是否有效
 * 有效依据：1、左括号必须同类型闭合；2、左括号必须以正确顺序闭合
 */

let bracketsMap = new Map()
bracketsMap.set('(', ')')
bracketsMap.set('[', ']')
bracketsMap.set('{', '}')

var judgeStr = function(str){
  const len = str.length
  const flag = Math.floor(len/2)
  if(len/2 !== flag) {
    return false
  }
  let i = 0, j = len - 1
  for(; i < flag; i++){
    if(bracketsMap.get(str[i]) !== str[j]){
      return false
    }
    j--
  }
  return true
}

// 测试用例
let str1 = '{[()]}' // true
let str2 = '{[(]}' // false
let str3 = '{[(]]}' // false

console.log(judgeStr(str1))
console.log(judgeStr(str2))
console.log(judgeStr(str3))

// 1、双指针对撞；反向映射数据结构