(function() {
  function throttle(fn, delay){
    // 到了间隔时间再执行
    let now = null
    return function(...args){
      if(!now){
        // 第一次执行
        now = +new Date()
        return
      }
      let current = +new Date()
      if(current - now >= delay){
        // 超过延迟时间了，执行一次
        fn(...args)
        now = +new Date()
      }
    }
  }
  globalThis.throttle = throttle
})()