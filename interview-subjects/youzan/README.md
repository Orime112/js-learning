## 1. 说一下你理解的闭包？

### 那么引用内层函数执行上下文释放之后外层执行上下文会被释放的对吧？
- 🤔对的吧

## 2. 说一下你用过ES6那些语法？
- 箭头函数，Promise，Proxy，Reflect，Class，

- tips：这个建议提前想一想，因为ES6新特性太多了，一下子说不出来，把自己擅长的排在前面说，比如箭头函数，Promise

### 那么说一下箭头函数和普通函数的区别吧
- 总结为三点：
  - 1.箭头函数没有自己的this，this引用的是外层作用域的this
  - 2.箭头函数没有arguments参数
  - 3.箭头函数没有constructor构造函数，不能被`new`

### 那么说一下Promise的三种状态和关系吧？
- 三种状态：`PENDING`，`FULFILLED`，`REJECTED`
- 关系：`PENDING`可以变成`FULFILLED`或者`REJECTED`，一旦变为非`PENDING`状态则不能再改变

### Promise的finally什么情况下执行？
- 在 promise 执行完毕后无论其结果怎样都会执行，可以在这里做一些处理或清理时使用

#### 那么Promise.finally后面接.then会发生什么？
- 我答.then的callback不会再执行了
- 其实会执行，但是没有value值传入，参见[01.Promise.finally测试](./01.Promise.finally测试.js)

## 3. 说一下垃圾回收？
- tips：引入计数，标记清除，新生代老生代，碎片整理，weakmap和map区别

## 4.实现一个对象的拷贝怎么做？
- 浅拷贝：{...obj}或者循环obj的key手动拷贝
- tips:JSON.parset(JSON.stringify(obj))；lodash的深拷贝；自己封装个深拷贝

### 如果让你实现一个深拷贝，你有什么思路？

### 如果一个对象我就想JSON.stringify()它，但它还是循环引用的，那你需要怎么处理？
- tips：第二个参数可以做一下过滤（map）

## 5.React的合成事件什么原理？
- tips：在document上捕获

### react的document捕获和普通HTML的捕获事件有什么区别？

### react的事件是在render完毕才挂载的吗？

## 6.老生常谈：为什么不能在循环和判断中使用useState和useEffect钩子？
- 遵守钩子注册的执行顺序，防止造成index冲突

## 7.TS的unknown类型和any类型有什么区别？

### class类中属性修饰符有哪几种？
- protected public private

### 后面问的没听清：private私有属性和 #私有属性有什么区别？
- 没答上来，问面试官这个常用吗？说在新的提案中有，谷歌了半天，在阮一峰老师的ES6入门中看到真有这么个[提案](https://es6.ruanyifeng.com/#docs/class#%E7%A7%81%E6%9C%89%E6%96%B9%E6%B3%95%E5%92%8C%E7%A7%81%E6%9C%89%E5%B1%9E%E6%80%A7)

```js
class IncreasingCounter {
  #count = 0;
  get value() {
    console.log('Getting the current value!');
    return this.#count;
  }
  increment() {
    this.#count++;
  }
}
```

## 8. 最后问了一些我编辑器项目里的东西，舒服~