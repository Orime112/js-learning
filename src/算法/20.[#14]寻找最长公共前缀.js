// 横向扫描法
const longestCommonPreFix1 = (strs) => {
  const len = strs.length
  if (len === 0) {
    return ""
  }
  if (len === 1) {
    return strs[0]
  }
  let longestFix = strs[0]
  for (let i = 1; i < len; i++) {
    if (!longestFix.length) {
      break
    }
    let newFix = ""
    for (let j = 0; j < longestFix.length; j++) {
      if (longestFix[j] === strs[i][j]) {
        newFix += longestFix[j]
      } else {
        longestFix = newFix
        break
      }
    }
  }
  return longestFix
}

// 纵向扫描法1
const longestCommonPreFix2 = (strs) => {
  const len = strs.length
  if (len === 0) {
    return ""
  }
  // 找到长度最短的字符串
  const sortArr = strs.sort((a, b) => a.length - b.length)
  const shortStr = sortArr[0]
  if (shortStr.length === 0) {
    return ""
  }
  let preFix = ""
  let isEqual = true
  for (let i = 0; i < len; i++) {
    let currentPre = shortStr[i]
    for (let j = 1; j < shortStr.length; j++) {
      // 一旦不相等，就break
      if (currentPre !== str[j][i]) {
        isEqual = false
        break
      }
    }
    // 一轮结束，如果isEqual为true，则增加，否则退出
    if (isEqual) {
      preFix += currentPre
    }else{
      break
    }
  }
  return preFix
}

// 纵向扫描法2
const longestCommonPreFix3 = (strs) => {
  const len = strs.length
  if(len === 0 ) return ""
  if(len === 1) return strs[0]
  let preFix = ""
  const current = strs[0]
  const currentLen = current.length
  let isEqual = true
  for(let i = 0; i < currentLen; i++){ // 第i个字符
    for(let j = 1; j < len; j++){ // 第j个单词a
      if(strs[j][i] !== current[i]){
        isEqual = false
        break
      }
    }
    if(isEqual) preFix += current[i]
  }
  return preFix
}

// 纵向扫描法3
const longestCommonPreFix4 = (strs) => {
  let re = ""
  const len = strs.length
  if(len === 0) return re
  if(len === 1) return strs[0]
  for(let i = 0; i < strs[0].length; i++){
    for(let j = 1; j < len; j++){
      if(strs[j][i] !== strs[0][i]){
        return re
      }
    }
    re += strs[0][i]
  }
  return re
}

let strList = ['flower', 'fly', 'flo']
console.log(longestCommonPreFix4(strList))