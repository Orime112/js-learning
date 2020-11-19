(function() {
  function debounce(fn, delay){
    let timerId = null
    return function(...args){
      let _this = this
      if(timerId) { // 初始timerId为null，未设置定时器，则新设置一个定时器；第二次时候timerId有值，就清空定时器不执行，重新设置一个新的
        clearTimeout(timerId)
      }
      timerId = setTimeout(() => {
        fn.call(_this, args)
      }, delay)
    }
  }
  globalThis.debounce = debounce
})()