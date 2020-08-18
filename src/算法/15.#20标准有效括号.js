/**
 * 给定一个只包括 '('，')'，'{'，'}'，'['，']' 的字符串，判断字符串是否有效。

有效字符串需满足：

左括号必须用相同类型的右括号闭合。
左括号必须以正确的顺序闭合。
注意空字符串可被认为是有效字符串。

示例 1:

输入: "()"
输出: true
示例 2:

输入: "()[]{}"
输出: true
示例 3:

输入: "(]"
输出: false
示例 4:

输入: "([)]"
输出: false
示例 5:

输入: "{[]}"
输出: true

 * 
 */

let bracketsMap = new Map()
bracketsMap.set('(', ')')
bracketsMap.set('[', ']')
bracketsMap.set('{', '}')

var isValid = function(str){
  let len = str.length
  if(len === 0) return true
  let stack = []
  for(let i = 0; i < len; i++){
    let opposite = bracketsMap.get(str[i])
    if(opposite){
      // 如果是左括号就进栈
      stack.push(opposite)
    } else {
      if(!stack.length) return false
      // 如果不是左括号就出栈并比较
      if(stack.pop() !== str[i]){
        return false
      }
    }
  }
  if(!stack.length) {
    return true
  } else {
    return false
  }
}

// 测试用例
let str1 = '[' // true
let str2 = '{[(]}' // false
let str3 = '{[(]]}' // false
let str4 = '(){}[]' // true
let str5 = '' // true
let str6 = '([)]' // false

console.log(isValid(str1))
console.log(isValid(str2))
console.log(isValid(str3))
console.log(isValid(str4))
console.log(isValid(str5))
console.log(isValid(str6))