/**
 * * 参考：[手写EventHub - 简书](https://www.jianshu.com/p/a42df0cb17ce)
 */

class EventHub{
  cache = {}
  on(name, fn){
    this.cache[name] = this.cache[name] || []
    this.cache[name].push(fn)
  }
  emit(name, data){
    if(!this.cache[name]) return
    this.cache[name].forEach(f => f(data))
  }
  off(name, fn){
    if(!this.cache[name]) return
    this.cache[name] = this.cache[name].filter(f => f !== fn)
  }
}

let eh = new EventHub()
let f1 = (data) => console.log('f1 run', data)
let f2 = (data) => console.log('f2 run', data)

eh.on('xxx', f1)
eh.on('xxx', f2)

eh.off('xxx', f1)

eh.emit('xxx', 'yyyy')