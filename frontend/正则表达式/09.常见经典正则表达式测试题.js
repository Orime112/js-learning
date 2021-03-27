/**
 * 参考地址：
 [掘金](https://juejin.im/post/6844903586711732237)
 [博客](https://www.dazhuanlan.com/2019/12/27/5e05852e4b294/?__cf_chl_jschl_tk__=9e0810d5fd6bed18745c1d261f8c348c83ec0e71-1602208680-0-Ac08t3pf-tecovUDxlYK4wE0dwY2gymjkt98kek2PHA3iYDCdTiahPrsjEIsd6MFSfB7lWgFRUPss_2LIfZckSX9HPCDz4McKcliihAGtc8TGuqNwoBywjpOhPxcLIexwaEZY9EZIoPR5Vd2E8xbD2dVOo0NCg5Qnt42vdjsOcVg0ceL-wSCW_MP_qyvI2kuMbdR31EElcVE529snpjqHuzFv_gsLmz44bMn3S496hM2kZ6j-fzg9VFeFUfVtBokAfkK2PsiCcDYRwGR_MCVTEwn1xtocS2Wrwzg_US-2q-lZS7px5oxHTY5ty2TsNRiWg)
 [编程胶囊](https://codejiaonang.com/#/course/regex_chapter2/3/1)
 */

const { RuleTester } = require("eslint")

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
// console.log(reg2.test(ques2), ques2.match(reg2), reg2.exec(ques2))

/**
 * 转换为驼峰命名
 */
 let ques3 = 'get-element-by-id'
 var f3_1 = function(s){
   return s.replace(/-\w+/g, (x) => {
     return x.replace(/-(\w)/g, (content, $1) => {
       return $1.toLocaleUpperCase()
     })
   })
 }
 // 转化为驼峰命名的另一种简单方法
 var f3_2 = function(s){
   return s.replace(/-\w/g, (x) => {
     return x.slice(1).toLocaleUpperCase()
   })
 }
console.log(f3_2(ques3), '转驼峰命名') // getElementById

/**
 * 判断电话号码
 */
let ques4 = '13856962356'
var f4 = function(s){
  return /^1[34578]\d{9}/.test(s)
}
console.log(f4(ques4), '是否为电话号码')

/**
给定字符串str，检查其是否符合如下格式

XXX-XXX-XXXX
其中X为Number类型
 */
let ques5 = '123-123-1234'
const f5 = function(s){
  return /(\d{3}-){2}\d{4}/g.test(s)
}
console.log(f5(ques5), '判断是否符合某种数字格式')

/**
6、判断是否符合USD格式
给定字符串 str，检查其是否符合美元书写格式

以 $ 开始
整数部分，从个位起，满 3 个数字用 , 分隔
如果为小数，则小数部分长度为 2
正确的格式如：$1,023,032.03 或者 $2.03，错误的格式如：$3,432,12.12 或者 $34,344.3**
 */
let ques6 = '$1,023,032.03'
const f6 = function(s){
  return /^\$(\d{1,3})(,\d{3})*(\.\d{2})?$/.test(s)
}
console.log(f6(ques6), '匹配usd')

/**
7.js实现千位分隔符 */
let ques7 = '10521618423025'
const f7 = function(s){
  const reg = /\d{1,3}(?=(\d{3})+$)/g
  // s.replace(reg, (content, $1) => console.log(content, $1, 'xy'))
  return (s + '').replace(reg, '$&,') // $&表示与reg相匹配的字符串
}
console.log(f7(ques7), '实现千位分隔符')

/**
8.获取url中的参数 */
let ques8 = '?a=12&b=13&c=14'
const f8 = function(s){
  const obj = {}
  s.replace(/\??(\w+)=(\w+)&?/g, (content, $1, $2) => {
    // console.log(content, $1, $2)
    obj[$1] = $2
  })
  return obj
}
console.log(f8(ques8), '解析URL')


/**
9.验证邮箱 */
let ques9 = '1126-439586@qq.com'
const f9 = function(s){
  return /^[\w-]+@[\w-]+(\.[\w-]+)+$/.test(s)
}
console.log(f9(ques9), '验证邮箱')

/** 
10.验证身份证号码 */
let ques10 = '13082619940208831x'
const f10 = function(s){
  return /(^\d{15})|(^\d{18})|(^\d{17}(\d|X|x)$)/.test(s)
}
console.log(f10(ques10), '验证身份证号码')

/**
11.匹配中文汉字 */
let ques11 = '中文啊'
const f11 = function(s){
  return /^[\u4e00-\u9fa5]+/.test(s)
}
console.log(f11(ques11), '匹配中文汉字')

/**
12.去除首尾的’/‘ */
let ques12 = 'fsf//'
const f12 = function(s){
  return s.replace(/^(\/*)([^/]*)(\/*)$/g, (content, $1, $2, $3) => {
    // console.log(content, 1, $1, 2, $2, 3, $3)
    return $2
  }) // 加g去除正则匹配懒惰性
}
console.log(f12(ques12), '去除首尾"/"')

/** 
13.16进制颜色正则 */
let ques13 = '#a5b6f7'
const f13 = function(s){
  return /^#?([a-zA-Z0-9]{6}|[a-zA-Z0-9]{3})$/.test(s)
}
console.log(f13(ques13), '16进制颜色正则')

/**
14.过滤HTML标签 */
let ques14 = "<p>dasdsa</p>nice <br> test</br>"
const f14 = function(s){
  const reg = /<[^<>]+>/g;
  // return s.replace(reg, x => '')
  return s.replace(reg, '')
}
console.log(f14(ques14), '过滤HTML标签')

/**
15.密码强度正则，最少6位，包括至少1个大写字母，1个小写字母，1个数字，1个特殊字符
 */
const regx15 = /^.*(?=.{6,})(?=.*\d)(?=.*[A-Z])(?=.*[a-z])(?=.*[!@#$%^&*? ]).*$/;

/**
16.严格URL正则 */
const regx16 = /^((https?|ftp|file):\/\/)?([\da-z\.-]+)\.([a-z\.]{2,6})([\/\w \.-]*)*\/?$/;

/**
17.阻止正则匹配贪婪性的典型案例 */
let ques17 = '<OPTION value="待处理">待处理</OPTION>'
const f17 = function(s){
  // return /^<[^>]*>/.exec(s)[0]
  return /^<.*?>/.exec(s)[0]
}
console.log(f17(ques17), '阻止正则贪婪匹配')