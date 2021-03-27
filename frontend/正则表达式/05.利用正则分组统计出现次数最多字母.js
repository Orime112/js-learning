/** 利用分组和replace函数统计出现最多字母 */
let str = 'zhufengpeixunabchiwoehhwerrfsr'

let orderedStr = str.split('').sort((a, b) => a.localeCompare(b)).join('')
let res = [],
    count = 0,
    flag = false
for(let i = orderedStr.length; i > 0; i--){
  count++
  let reg = new RegExp('([a-zA-Z])\\1{'+(i-1)+'}', 'g')
  orderedStr.replace(reg, (content, $1) => {
    res.push($1)
    console.log(content)
    flag = true
  })
  if(flag){
    break
  }
}

console.log(res)