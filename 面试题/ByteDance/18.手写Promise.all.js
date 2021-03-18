const PromiseStatus = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected",
}

class MyPromise {
  constructor(fn) {
    this.status = PromiseStatus.PENDING
    this.value = null
    this.reason = null

    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    const resolve = (value) => {
      if (this.status === PromiseStatus.PENDING) {
        this.status = PromiseStatus.FULFILLED
        this.value = value
        this.resolvedCallbacks.forEach((cb) => cb(value))
      }
    }

    const reject = (reason) => {
      if (this.status === PromiseStatus.PENDING) {
        this.status === PromiseStatus.REJECTED
        this.reason = reason
        this.rejectedCallbacks.forEach((cb) => cb(reason))
      }
    }

    try {
      fn(resolve, reject)
    } catch (err) {
      reject(err)
    }
  }

  then(onFulfilled, onRejected) {
    onFulfilled =
      typeof onFulfilled === "function"
        ? onFulfilled
        : function (v) {
            return v
          }
    onRejected =
      typeof onRejected === "function"
        ? onRejected
        : function (r) {
            throw r
          }
    if (this.status === PromiseStatus.PENDING) {
      this.resolvedCallbacks.push(onFulfilled)
      this.rejectedCallbacks.push(onRejected)
    } else if (this.status === PromiseStatus.FULFILLED) {
      onFulfilled(this.value)
    } else {
      onRejected(this.reason)
    }
  }
}

/**
 * 总结 promise.all 的特点
 1、接收一个 Promise 实例的数组或具有 Iterator 接口的对象，
 2、如果元素不是 Promise 对象，则使用 Promise.resolve 转成 Promise 对象
 3、如果全部成功，状态变为 resolved，返回值将组成一个数组传给回调
 4、只要有一个失败，状态就变为 rejected，返回值将直接传递给回调all() 的返回值也是新的 Promise 对象
 */

MyPromise.resolve = function (value) {
  if (value instanceof Promise) return value
  if (value === null) return null
  // 判断如果是promise
  if (typeof value === "object" || typeof value === "function") {
    try {
      // 判断是否有then方法
      let then = value.then
      if (typeof then === "function") {
        return new Promise(then.call(value)) // 执行value方法
      }
    } catch (e) {
      return new Promise((resolve, reject) => {
        reject(e)
      })
    }
  }
  return value
}

// ————————————————
// 版权声明：本文为CSDN博主「ruiurrui」的原创文章，遵循CC 4.0 BY-SA版权协议，转载请附上原文出处链接及本声明。
// 原文链接：https://blog.csdn.net/u010982507/article/details/103806145

MyPromise.all = function (promises) {
  return new Promise(function (resolve, reject) {
    if (!Array.isArray(promises)) {
      return reject(new TypeError("arguments must be an array"))
    }
    let resolvedCounter = 0
    let promiseNum = promises.length
    let resolvedValues = new Array(promiseNum)
    for (let i = 0; i < promiseNum; i++) {
      // MyPromise.resolve(promises[i]).then(
      promises[i].then(
        function (value) {
          resolvedCounter++
          resolvedValues[i] = value
          if (resolvedCounter == promiseNum) {
            return resolve(resolvedValues)
          }
        },
        function (reason) {
          return reject(reason)
        }
      )
    }
  })
}

// 作者：JayJunG
// 链接：https://juejin.cn/post/6844903761505173512
// 来源：掘金
// 著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。

const promise1 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise1")
  }, 1000)
})

const promise2 = new MyPromise((resolve, reject) => {
  // setTimeout(() => {
  //   resolve('promise2')
  // })
  resolve("promise2")
})

const promise3 = new MyPromise((resolve, reject) => {
  setTimeout(() => {
    resolve("promise3")
  }, 2000)
})

let promiseAll = MyPromise.all([promise1, promise2, promise3])
promiseAll.then(function (res) {
  console.log(res)
})

/**
标准解答 */
Promise.myAll = function(promiseList){
  return new Promise((resolve, reject) => {
    if(!Array.isArray(promiseList)){
      reject(new TypeError('Arguments must be array'))
    }
    let count = 0
    let length = promiseList.length
    let result = new Array(length)
    for(let i = 0; i < length; i++){
      Promise.resolve(promiseList[i]).then((value) => {
        count++
        result[i] = value
        if(count === length){
          return resolve(result)
        }
      }, (reason) => {
        return reject(reason)
      })
    }
  })
}

let promiseAll1 = Promise.myAll([promise1, promise2, promise3])
promiseAll1.then(function (res) {
  console.log(res)
})
