class XHRHook {
  constructor(beforeHooks, afterHooks) {
    this.XHR = window.XMLHttpRequest // * 重写前先保留原来变量
    this.beforeHooks = beforeHooks
    this.afterHooks = afterHooks
    this.init()
  }
  init() {
    let _this = this
    window.XMLHttpRequest = function () {
      // * 开始从写XMLHTTPRequest类
      this._xhr = new _this.XHR() // * 仍然是window上面的XMLHTTPRequest创建实例，之后在该实例上重写属性/方法
      _this.rewrite(this) // * 将创建好的实例传给rewrite函数
    }
  }
  rewrite(proxyXHR) {
    for (let key in this.beforeHooks) {
      if (typeof proxyXHR._xhr[key] === 'function') {
        this.overwriteMethod(key, proxyXHR)
      } else {
        this.overwriteAttribute(key, proxyXHR)
      }
    }
  }

  overwriteMethod(key, proxyXHR) {
    // * 重写方法，考虑拦截
    proxyXHR[key] = (...args) => { // ! 当调用 new XMLHttpRequest().open 的时候执行该方法
      if (this.beforeHooks[key]) {
        const res = this.beforeHooks[key].call(proxyXHR, args)
        if (res === false) {
          return;
        }
      }
      const res = proxyXHR._xhr[key].call(proxyXHR._xhr, args)
      // * 执行afterHooks
      this.afterHooks[key] && this.afterHooks[key].apply(proxyXHR, args)
      return res
    }
  }

  overwriteAttribute(key, proxyXHR) {
    /**
    Object.defineProperty用法：

    const object1 = {};

    Object.defineProperty(object1, 'property1', {
      value: 42,
      writable: false
    });

     */
    Object.defineProperty(proxyXHR, key, this.setPropertyDescriptor(key, proxyXHR))
  }

  setPropertyDescriptor(key, proxyXHR) {
    // ? 属性赋值要明白：赋给了ProxyXHR，实际调用的时候调用的可能是ProxyXHR[key] ，也可能是proxyXHR._xhr[key]
    let obj = Object.create(null)
    let _this = this

    obj.set = function (val) {
      // * 如果不是 on 开头的属性，就加为私有属性
      if (!key.starsWith('on')) {
        proxyXHR['__' + key] = val
        return
      }
      // * 如果是on开头的，比如onreadystatechange
      // * 如果有拦截钩子
      if (_this.beforeHooks[key]) {
        this._xhr[key] = function (...args) { // ! 这里的this指向了ProxyXHR
          _this.beforeHooks[key].call(proxyXHR)
          val.apply(proxyXHR, args)
        }
        return
      }
      // * 如果没有拦截钩子
      this._xhr[key] = val
    }

    obj.get = function () {
      return proxyXHR['__' + key] || this._xhr[key]
    }

    return obj
  }
}
new XHRHook({
  open: function () {
    console.log('open')
  },
  send: function () {
    console.log('send')
  },
  onload: function () {
    console.log('onload')
  },
  onreadystatechange: function () {
    console.log('onreadystatechange')
  },


})

/**
 * * 推荐，模拟实现一个XMLHttpRequest -> https://cloud.tencent.com/developer/article/1341894
 */

const xhr = new XMLHttpRequest()
xhr.open()
xhr.send()
xhr.onload = function () { } // typeof xhr.onreadystatechange "object" 是属性 typeof -> 'object'
xhr.onreadystatechange = function () { } // 
