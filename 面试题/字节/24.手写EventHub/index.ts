type EventFnType = (data?: any) => any

class EventHub{
  cache: { [key: string]: Array<EventFnType> } = {}

  on(name: string, fn: EventFnType) {
    this.cache[name] = this.cache[name] || []
    this.cache[name].push(fn)
  }
  emit(name: string, data?: any){
    if(!this.cache[name]) return
    this.cache[name].forEach(f => f(data))
  }
  off(name: string, fn: EventFnType){
    if(!this.cache[name]) return
    this.cache[name] = this.cache[name].filter(f => f !== fn)
  }
}

// 作者：大春春
// 链接：https://www.jianshu.com/p/eb6a22aa6c49
// 来源：简书
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

const eventHub = new EventHub()
eventHub.on('xxx', function(data){
  console.log('触发'+data)
})


let f2 = function(data){
  console.log('第二次'+data)
}

eventHub.on('xxx', f2)

eventHub.off('xxx', f2)

eventHub.emit('xxx', 'aaa')