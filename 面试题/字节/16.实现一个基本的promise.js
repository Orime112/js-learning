/**
 * [参考地址](https://www.yuque.com/yangye7668/ruxnsr/hixmfh#BHwJJ)
 */

const STATUS = {
  PENDING: "pending",
  FULFILLED: "fulfilled",
  REJECTED: "rejected"
}

class MyPromise {
  constructor(fn){
    this.status = STATUS.PENDING
    this.value = null
    this.reason = null

    this.resolvedCallbacks = []
    this.rejectedCallbacks = []

    const resolve = res => {
      if(this.status === STATUS.PENDING){
        this.status = STATUS.FULFILLED
        this.reason = res
        this.resolvedCallbacks.forEach(cb => cb(res))
      }
    }
    
    const reject = reason => {
      if(this.status === STATUS.PENDING){
        this.status = STATUS.REJECTED
        this.reason = reason
        this.rejectedCallbacks.forEach(cb => cb(reason))
      }
    }

    // * 执行fn
    try{
      fn(resolve, reject)
    } catch(err){
      reject(err)
    }
  }

  // * 实例属性then方法
  then(onFulfilled, onRejected){
    onFulfilled = typeof onFulfilled === 'function' ? onFulfilled : (res) => res
    onRejected = typeof onRejected === 'function' ? onRejected : (rea) => rea
    if(this.status === STATUS.PENDING){
      this.resolvedCallbacks.push(onFulfilled)
      this.rejectedCallbacks.push(onRejected)
    } else if (this.status === STATUS.FULFILLED){
      onFulfilled(this.value)
    } else {
      onRejected(this.reason)
    }
  }
  
  catch(rejFn){
    rejFn(this.reason)
  }
}

const promise = new MyPromise((res, rej) => {
  setTimeout(() => {
    console.log('OK res')
    rej('piupiu')
  }, 1000)
})

promise.then((res) => {
  console.log(res, 'fulfilled')
}, (reason) => {
  console.log(reason, 'rejected')
})