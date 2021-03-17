/**
 * 给定一个一个字符串，怎么找出里面哪个字符出现的最多
 */

function getMostChar(str) {
  const obj = {}
  for(let char of str){
    obj[char] ? obj[char]++ : obj[char] = 1
  }
  let maxTime = 0
  let maxChar = ''
  for(let key in obj){
    if(obj[key] > maxTime){
      maxTime = obj[key]
      maxChar = key
    }
  }
  return [maxChar, maxTime]
}

// * 测试用例
let str = 'nihaoa'
console.log(getMostChar(str))