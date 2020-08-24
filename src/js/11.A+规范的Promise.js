(function () {
  // 创建Promise构造函数
  function MyPromise(executor) {
    const StatusType = {
      PENDING: "pending",
      FULFILLED: "fulfilled",
      REJECTED: "rejected"
    }
    // 添加私有属性
    this.PromiseStatus = StatusType.PENDING
    this.PromiseValue = null
    this.resolveFunc = function () { }
    this.rejectFunc = function () { }
    var _this = this

    // 封装change方法
    function change(status, value) {
      if (_this.PromiseStatus !== StatusType.PENDING) {
        return
      }
      _this.PromiseStatus = status
      _this.PromiseValue = value
      var timerId = setTimeout(function () {
        clearTimeout(timerId)
        timerId = null
        status === StatusType.FULFILLED ?
          _this.resolveFunc.call(_this, value) :
          _this.rejectFunc.call(_this, value)
      }, 0)

    }

    // 创建实例则立即执行executor
    try {
      executor(function (value) {
        change(StatusType.FULFILLED, value)
      }, function (reason) {
        change(StatusType.REJECTED, reason)
      })
    } catch (err) {
      change(StatusType.REJECTED, err.message)
    }

  }

  // 添加.then方法
  MyPromise.prototype.then = function (resolveFunc, rejectFunc) {
    if (typeof resolveFunc !== 'function') {
      resolveFunc = function (value) {
        return MyPromise.resolve(value)
      }
    }
    if (typeof rejectFunc !== 'function') {
      rejectFunc = function (reason) {
        return MyPromise.reject(reason)
      }
    }
    var _this = this
    // .then方法永远会返回一个Promise实例
    return new MyPromise(function (resolve, reject) {
      _this.resolveFunc = function (value) {
        try {
          var x = resolveFunc.call(_this, value)
          x instanceof MyPromise ? x.then(resolve, reject) : resolve(x)
        } catch (err) {
          reject(err.message)
        }
      }
      _this.rejectFunc = function (reason) {
        try {
          var x = rejectFunc.call(_this, reason)
          x instanceof MyPromise ? x.then(resolve, reject) : reject(x)
        } catch (err) {
          reject(err.message)
        }
      }
    })
  }

  // 实现静态属性resolve和reject
  MyPromise.resolve = function (value) {
    return new Promise(function (value) {
      resolve(value)
    })
  }
  MyPromise.reject = function (reason) {
    return new Promise(function (_, reject) {
      reject(reason)
    })
  }

  globalThis.MyPromise = MyPromise

  // 等同于：
  // window.MyPromise = MyPromise
  // global.MyPromise = MyPromise

  // 正确但繁琐的写法
  // if(typeof window !== 'undefined') {
  //   window.MyPromise = MyPromise
  // }
  // if(typeof global !== 'undefined') {
  //   global.MyPromise = MyPromise
  // }
  

})()


new MyPromise((res, rej) => {
  console.log('executor执行')
  setTimeout(() => {
    res(12)
  }, 1000)
}).then(value => {
  console.log(value)
})