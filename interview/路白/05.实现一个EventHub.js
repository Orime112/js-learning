class EventHub{
  constructor(){
    this.events = {}
  }

  on(event, cb){
    this.events[event] = this.events[event] || []
    this.events[event].push(cb)
    return this
  }

  once(event, cb){
    const func = (...args) => {
      cb.apply(this, args)
      this.off(event, func)
    }
    this.on(event, func)
    return this
  }

  emit(event, ...args){
    const cbs = this.events[event]
    if(!cbs){
      console.warn(`没有事件${event}的处理函数`)
      return this
    }
    cbs.forEach((cb) => cb.apply(this, args))
    return this
  }

  off(event, cb){
    if(!this.events[event]){
      return this
    }
    this.events[event] = this.events[event].filter((cb) => cb !== event)
  }
}