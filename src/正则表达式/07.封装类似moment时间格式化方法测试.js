/** 封装类似moment时间字符串格式化方法测试 */
~function(){
  function formatTime(template = 'YY年MM月DD日 hh:mm:ss'){
    const timeArg = this.match(/(\d+)/g)
    const formatArg = ['YY', 'MM', 'DD', 'hh', 'mm', 'ss']
    let temp = template,
        index = 0
    temp = temp.replace(/(\w+)/g, (content, $1) => {
      console.log(content, $1)
      return timeArg[formatArg.indexOf($1)]
    })
    return temp
  }
  ['formatTime'].forEach(item => {
    String.prototype[item] = eval(item)
  })
}()

let time = '2020-10-04 11:37:36'
console.log(time.formatTime('YY年 hh:mm'))