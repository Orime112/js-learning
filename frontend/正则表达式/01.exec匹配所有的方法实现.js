~function(){
  function execAll(str = ''){
    // str是要匹配的字符串
    // this是当前正则表达式实例
    if(!this.global) return this.exec(str)
    let arr = [], res = this.exec(str)
    while(res){
      arr.push(res[0])
      res = this.exec(str)
    }
    return arr.length === 0 ? arr : null
  }
  RegExp.prototype.execAll = execAll
}()

let reg = /\d+/g
console.log(reg.execAll('珠峰2019@培训2010')) // [ '2019', '2010' ]

// 虽然正则上没有一个现成的execAll方法让我捕获所有
// 但是字符串上有一个现成的方法叫做match能够捕获到所有 --- 如果捕获不到则返回的是null而不是空数组
console.log('珠峰2019@培训2010'.match(reg)) // [ '2019', '2010' ]