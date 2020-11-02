let str = '{0}年{1}月{2}日'
let reg = /\{(\d+)\}/g

let aryBig = [], arySmall = []
let res = reg.exec(str)
while(res){
  let [big, small] = res
  aryBig.push(big)
  arySmall.push(small)
  res = reg.exec(str)
}

console.log(aryBig, arySmall)