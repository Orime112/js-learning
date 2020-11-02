/**
 * 回文是正反都能读通的单词、词组、数或一系列字符的序列，例如 madam或 racecar。
 */
function palindromeChecker(str){
  // 极限情况判断
  if(str == undefined || (str != undefined && str.length === 0)) return false
  const queue = []
  let isEqual = true
  const lowerStr = str.toLocaleLowerCase().split(' ').join('') // 小写并移除所有空格
  for(let value of lowerStr){
    queue.push(value)
  }
  while(queue.length > 1){
    let first = queue.splice(0, 1)[0]
    let last = queue.splice(queue.length-1, 1)[0]
    if(first !== last) isEqual = false
  }
  return isEqual
}

// 测试用例
console.log('a', palindromeChecker('a'));
console.log('aa', palindromeChecker('aa'));
console.log('kayak', palindromeChecker('kayak'));
console.log('level', palindromeChecker('level'));
console.log('Was it a car or a cat I saw', palindromeChecker('Was it a car or a cat I saw'));
console.log('Step on no pets', palindromeChecker('Step on no pets'));