class ObjPromise {
  constructor(executor) {
    // promise状态
    this.status = 'pending';
    // resolve回调成功，resolve方法里的参数值
    this.successVal = null;
    // reject回调成功，reject方法里的参数值
    this.failVal = null;

    // resolve的回调函数
    this.onResolveCallback = function () { };
    // reject的回调函数
    this.onRejectCallback = function () { };

    // 定义resolve函数
    const resolve = (successVal) => {
      setTimeout(() => {
        if (this.status !== 'pending') {
          return;
        }
        this.status = 'resolve';
        this.successVal = successVal;

        //执行所有resolve的回调函数
        this.onResolveCallback()
      })
    };

    // 定义reject
    const reject = (failVal) => {
      setTimeout(() => {
        if (this.status !== 'pending') {
          return;
        }
        this.status = 'reject';
        this.failVal = failVal;

        //执行所有reject的回调函数
        this.onRejectCallback()
      })
    };

    try {
      // 将resolve函数给使用者
      executor(resolve, reject)
    } catch (e) {
      // 执行抛出异常时
      reject(e)
    }
  }

  // data为返回值
  // newResolve为新的promise的resolve方法
  // newReject为新的promise的reject方法
  resolvePromise(resPromise, data, newResolve, newReject) {
    if (resPromise === data) {
      return newReject(new TypeError('循环引用'))
    }
    if (!(data instanceof ObjPromise)) {
      return newResolve(data)
    }
    try {
      let then = data.then;
      const resolveFunction = (newData) => {
        this.resolvePromise(resPromise, newData, newResolve, newReject);
      };
      const rejectFunction = (err) => {
        newReject(err);
      };
      then.call(data, resolveFunction, rejectFunction)
    } catch (e) {
      // 错误处理
      newReject(e);
    }
  }

  then(onResolved, onRejected) {
    const isFunction = (fn) => {
      return Object.prototype.toString.call(fn) === "[object Function]"
    };
    onResolved = isFunction(onResolved) ? onResolved : (e) => e;
    onRejected = isFunction(onRejected) ? onRejected : err => {
      throw err
    };

    // 定义这个变量保存要返回的promise对象
    let resPromise;
    switch (this.status) {
      case "resolve":
        resPromise = new ObjPromise((resolve, reject) => {
          try {
            // 传入的第一个函数
            let data = onResolved(this.successVal);
            this.resolvePromise(resPromise, data, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        break;
      case "reject":
        resPromise = new ObjPromise((resolve, reject) => {
          try {
            // 传入的第二个函数
            let data = onRejected(this.failVal);
            this.resolvePromise(resPromise, data, resolve, reject);
          } catch (e) {
            reject(e);
          }
        });
        break;
      case "pending":
        resPromise = new ObjPromise((resolve, reject) => {
          const resolveFunction = () => {
            try {
              // 传入的第一个函数
              let data = onResolved(this.successVal);
              this.resolvePromise(resPromise, data, resolve, reject);
            } catch (e) {
              reject(e);
            }
          };
          const rejectFunction = () => {
            try {
              // 传入的第二个函数
              let data = onRejected(this.failVal);
              this.resolvePromise(resPromise, data, resolve, reject);
            } catch (e) {
              reject(e);
            }
          };
          this.onResolveCallback = resolveFunction;
          this.onRejectCallback = rejectFunction;
        });
        break;
    }
    return resPromise;
  }

  // catch方法
  catch(onRejected) {
    return this.then(null, onRejected)
  }



}

// Promise.resolve()/reject()方法
ObjPromise.resolve = (val) => {
    return new ObjPromise((resolve, reject) => {
        resolve(val)
    })
};

ObjPromise.reject = (val) => {
    return new ObjPromise((resolve, reject) => {
        reject(val)
    })
};

// all方法
ObjPromise.all = (arrPromise) => {
    return new ObjPromise((resolve, reject) => {
        // 传入类型必须为数组
        if(Array.isArray(arrPromise)){
            return reject(new TypeError("传入类型必须为数组"))
        }
        // resp 保存每个promise的执行结果
        let resp = new Array(arrPromise.length);
        // 保存执行完成的promise数量
        let doneNum = 0;
        for (let i = 0; arrPromise.length > i; i++) {
            // 将当前promise
            let nowPromise = arrPromise[i];
            if (!(nowPromise instanceof ObjPromise)) {
                return reject(new TypeError("类型错误"))
            }
            // 将当前promise的执行结果存入到then中
            nowPromise.then((item) => {
                resp[i] = item;
                doneNum++;
                if(doneNum === arrPromise.length){
                    resolve(resp);
                }
            }, reject)
        }
    })
};


new ObjPromise((resolve, reject) => {
  setTimeout(() => {
    resolve(1);
  }, 100)
}).then((resp) => {
  console.log(resp); // 1
  return 2
}).then((resp) => {
  console.log(resp); // 2
  return new ObjPromise((resolve, reject) => {
    resolve(3)
  })
}).then((resp) => {
  console.log(resp); // 3
});
