/**
 * 参考地址：
 [掘金](https://juejin.im/post/6844903586711732237)
 [博客](https://www.dazhuanlan.com/2019/12/27/5e05852e4b294/?__cf_chl_jschl_tk__=9e0810d5fd6bed18745c1d261f8c348c83ec0e71-1602208680-0-Ac08t3pf-tecovUDxlYK4wE0dwY2gymjkt98kek2PHA3iYDCdTiahPrsjEIsd6MFSfB7lWgFRUPss_2LIfZckSX9HPCDz4McKcliihAGtc8TGuqNwoBywjpOhPxcLIexwaEZY9EZIoPR5Vd2E8xbD2dVOo0NCg5Qnt42vdjsOcVg0ceL-wSCW_MP_qyvI2kuMbdR31EElcVE529snpjqHuzFv_gsLmz44bMn3S496hM2kZ6j-fzg9VFeFUfVtBokAfkK2PsiCcDYRwGR_MCVTEwn1xtocS2Wrwzg_US-2q-lZS7px5oxHTY5ty2TsNRiWg)
 */

/**
匹配连续出现的四组以.连接的字符串
题目：abc.dss.sds.wer
 */ 
let ques1 = 'abc.dss.sds.wer'
let reg1 = /^(\w{3}\.){3}(\w{3})/g
// console.log(reg1.test(ques1), ques1.match(reg1), reg1.exec(ques1))

/**
 * 匹配数字而非数字
 */
let ques2 = '11X22X3333'
let reg2 = /(\d{2}\D){2}(\d{3})/g
console.log(reg2.test(ques2), ques2.match(reg2), reg2.exec(ques2))
ques2.replace(reg2, (content, $1, $2, $3) => {
  console.log(content, $1, $2, $3)
})

/**
 * 转换为驼峰命名
 */
 let ques3 = 'get-element-by-id'
 var f3 = function(s){
   return s.replace(/-\w+/g, (x) => {
     return x.replace(/-(\w)/g, (content, $1) => {
       return $1.toLocaleUpperCase()
     })
   })
 }
console.log(f3(ques3)) // getElementById

/**
 * 判断电话号码
 */
let ques4 = '13856962356'
var f4 = function(s){
  return /^1[34578]\d{9}/.test(s)
}
console.log(f4(ques4), '是否为电话号码')


