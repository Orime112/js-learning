/** 时间字符串格式化 */

// 自执行法函数给String的原型绑定多个方法
~function(){
  function formatTime(){
    console.log(this)
    const timeArg = this.match(/(\d+)/g)
    console.log(timeArg)
    let template = "{0}年{1}月{2}日 {3}时{4}分{5}秒"
    template = template.replace(/\{(\d+)\}/g, (content, $1) => {
      console.log(content, $1)
      let time = timeArg[$1]
      typeof time == "undefined" ? time = "00" : time = time.padStart(2, '0')
      return time
    })
    return template
  }
  ['formatTime'].forEach(item => {
    String.prototype[item] = eval(item)
  })
}()

let str = "2020-10-04 10:33:5"
console.log(str.formatTime())