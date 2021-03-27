## 1. 说一下你理解的闭包？

对闭包的理解是千人千面的，以下是我的个人观点：

说到闭包，不得不先提及javascript中函数执行的机制：在javascript语句执行过程中，有一个宿主执行环境，可以称之为执行上下文栈（ECS：Execution Context Stack），其中包含全局执行上下文（ECG：Execution Context Global）；而在函数执行语句被执行的时候，比如`func();`，会临时开辟一个新的执行上下文，可以称之为函数执行上下文（ECF：Execution Context Func）；无论每种执行上下文，其中都包含了变量对象VO（Variable Object），标识了当前执行上下文中所拥有的所有变量；javascript语句执行过程中，依次压入当前语句所开辟的执行上下文，执行完毕后弹出；全局执行上下文ECG比较特殊，它默认被推入执行栈底，伴随整个执行周期，最后才被释放，而函数执行上下文在执行过程中，会被依次压入栈中执行，理论上执行完毕出栈；然而执行栈中存在作用域链的概念，在一个执行栈中可以引用自它之下到栈底的所有执行栈中的活动对象（AO：Active Object，当执行栈创建瞬间原有执行栈中的变量对象VO就成了AO），如果任一执行栈中的活动对象被其他执行栈引用，则该执行栈不能被释放（释放意味着执行栈销毁，变量对象被回收），这就形成了闭包，闭包的形成通常场景是外层函数执行返回结果为函数，并且该函数中引用了外层函数中的变量对象。

```js
function foo(){
  let a = 12
  return function bar(){
    console.log(a)
  }
}
let f = foo()
debugger;
f() // * 此时观察控制台，closure 中有 foo -> a = 12
```

```js
let c = undefined;
function foo(){
  let a = {c: 434}
  c = a
  let res = {b: a}
  return {b: a}
}
let obj = foo() // * 此时观察控制台，则不会产生闭包，这种情况比较特殊，返回的时候虽然引用了a，但引用的是a的指针，并不是对标识符a的引用，也就不会产生闭包
debugger;
console.log(obj)
console.log(obj.b === c) // true
```

### 那么引用了外层函数变量的内层函数的执行上下文释放之后外层执行上下文会被释放的对吧？
- 🤔那肯定的啊

## 2. 说一下你用过ES6那些语法？
- 箭头函数，Promise，Proxy，Reflect，Class，

- tips：这个建议提前想一想，因为ES6新特性太多了，一下子说不出来，把自己擅长的排在前面说，比如箭头函数，Promise

### 那么说一下箭头函数和普通函数的区别吧
- 总结为三点：
  - 1.箭头函数没有自己的this，this引用的是外层作用域的this
  - 2.箭头函数没有arguments参数
  - 3.箭头函数没有constructor构造函数，不能被`new`
  - 4.箭头函数只能是函数表达式定义无法被函数声明定义
  - 5.基于上一条，表达式创建的箭头函数即使.bind，apply或call强行绑定this也无效

```js
let a = () => {
  console.log(this.age)
}

function b(){
  console.log(this.age)
}

let obj = {age: 12}

a.call(obj) // undefined
b.call(obj) // 12

let c = new a() // ! TypeError: a is not a constructor
```

### 那么说一下Promise的三种状态和关系吧？
- 三种状态：`PENDING`，`FULFILLED`，`REJECTED`
- 关系：`PENDING`可以变成`FULFILLED`或者`REJECTED`，一旦变为非`PENDING`状态则不能再改变

### Promise的finally什么情况下执行？
- 在 promise 执行完毕后无论其结果怎样都会执行，可以在这里做一些处理或清理时使用

#### 那么Promise.finally后面接.then会发生什么？
- 我答.then的callback不会再执行了
- 其实会执行，但是没有value值传入，参见[01.Promise.finally测试](./01.Promise.finally测试.js)

## 3. 说一下垃圾回收？
- tips：引入计数，标记清除，新生代老生代，碎片整理，weakmap和map区别，参考[weakMap测试](../frontend/../../frontend/垃圾回收机制/01.weakMap-gc-test.js)

## 4.实现一个对象的拷贝怎么做？
- 浅拷贝：{...obj}或者循环obj的key手动拷贝
- tips:JSON.parset(JSON.stringify(obj))；lodash的深拷贝；自己封装个深拷贝

### 如果让你实现一个深拷贝，你有什么思路？

- 简单类型直接返回；复杂类型递归拷贝
- 循环引用使用map方式处理

### 如果一个对象我就想JSON.stringify()它，但它还是循环引用的，那你需要怎么处理？
- tips：第二个参数可以做一下过滤（map）
- [测试代码](./02.对循环引用对象的JSON.stringify.js)

JSON对象是Javascript语言级别的内置对象，在任何Javascript环境中，都能方便的使用它。

关于它的更多细节，可以在[这里](https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/JSON/stringify)查看。

我总结了几个关键点：

- 非数组对象的顺序是不确定的
- undefined、任意的函数以及 symbol 值，会被忽略（不在数组中）或转换成null（数组中）
- 如果对象存在toJSON函数，会对toJSON的返回值进行序列化
- 如果存在循环引用，会抛出异常
- 可以传入第二个参数，在属性值被序列化之前改变它
- 我们的需求是将对象做序列化，然后打印输出成一份JSON文件。所以需要对原生的JSON.stringify做一些修改。

参数：
- value
将要序列化成 一个 JSON 字符串的值。
- replacer 可选
如果该参数是一个函数，则在序列化过程中，被序列化的值的每个属性都会经过该函数的转换和处理；如果该参数是一个数组，则只有包含在这个数组中的属性名才会被序列化到最终的 JSON 字符串中；如果该参数为 null 或者未提供，则对象所有的属性都会被序列化。
- space 可选
指定缩进用的空白字符串，用于美化输出（pretty-print）；如果参数是个数字，它代表有多少的空格；上限为10。该值若小于1，则意味着没有空格；如果该参数为字符串（当字符串长度超过10个字母，取其前10个字母），该字符串将被作为空格；如果该参数没有提供（或者为 null），将没有空格。

异常：
- 循环应用不能被序列化
- BigInt不能被序列化

> tips: 什么是序列化？
> 序列化(Serialization)是将对象的状态信息转换为可以存储或传输的形式的过程（来自“百度百科—序列化“，学术性强，略显高端）；
> 对象序列化是指将对象的状态转换为字符串（来自我这菜鸟的理解，好像有些书上也是这么说的，浅显易懂！）；


## 5.React的合成事件什么原理？
-  参考：[(……) 深入React合成事件机制原理 - SegmentFault 思否](https://segmentfault.com/a/1190000039108951)
- tips：在document上捕获
- react事件机制产生原因：
  - 由于fiber机制的特点，生成一个fiber节点时，它对应的dom节点有可能还未挂载，onClick这样的事件处理函数作为fiber节点的prop，也就不能直接被绑定到真实的DOM节点上。
  - 为了避免`绑定事件` 先于 `生成fiber节点的dom挂载`造成无法实现绑定，React提供了一种`顶层注册，事件收集，统一触发`的事件机制。
- **顶层注册**：其实是在root元素上绑定一个统一的事件处理函数。
- **事件收集**：指的是事件触发时（实际上是root上的事件处理函数被执行），构造合成事件对象，按照冒泡或捕获的路径去组件中收集真正的事件处理函数。
- **统一触发**：发生在收集过程之后，对所收集的事件逐一执行，并共享同一个合成事件对象。这里有一个重点是绑定到root上的事件监听并非我们写在组件中的事件处理函数，注意这个区别，下文会提到。

以上是React事件机制的简述，这套机制规避了无法将事件直接绑定到DOM节点上的问题，并且能够很好地利用fiber树的层级关系来生成事件执行路径，进而模拟事件捕获和冒泡，另外还带来两个非常重要的特性：

- 对事件进行归类，可以在事件产生的任务上包含不同的优先级
- 提供合成事件对象，抹平浏览器的兼容性差异

为一个元素绑定事件`<div onClick={() => {/*do something*/}}>React</div>`

onClick作为props，在进入render阶段的complete阶段时，会被识别为`事件`进行处理
```js
function setInitialDOMProperties(
  tag: string,
  domElement: Element,
  rootContainerElement: Element | Document,
  nextProps: Object,
  isCustomComponentTag: boolean,
): void {
  for (const propKey in nextProps) {
    if (!nextProps.hasOwnProperty(propKey)) {
      ...
    } else if (registrationNameDependencies.hasOwnProperty(propKey)) {
        // * 如果propKey属于事件类型，则进行事件绑定
        ensureListeningTo(rootContainerElement, propKey, domElement);
      }
    }
  }
}
```

- 绑定过程：
  - 根据React的事件名称寻找该事件依赖，例如onMouseEnter事件依赖了mouseout和mouseover两个原生事件，onClick只依赖了click一个原生事件，最终会循环这些依赖，在root上绑定对应的事件。例如组件中为onClick，那么就会在root上绑定一个click事件监听。
  - 依据组件中写的事件名识别其属于哪个阶段的事件（冒泡或捕获），例如onClickCapture这样的React事件名称就代表是需要事件在捕获阶段触发，而onClick代表事件需要在冒泡阶段触发。
  - 根据React事件名，找出对应的原生事件名，例如click，并根据上一步来判断是否需要在捕获阶段触发，调用addEventListener，将事件绑定到root元素上。
  - 若事件需要更新，那么先移除事件监听，再重新绑定，绑定过程重复以上三步。

```js
  // 根据事件名称，创建不同优先级的事件监听器。
  let listener = createEventListenerWrapperWithPriority(
    targetContainer,
    domEventName,
    eventSystemFlags,
    listenerPriority,
  );

  // 绑定事件
  if (isCapturePhaseListener) {
    ...
    unsubscribeListener = addEventCaptureListener(
      targetContainer,
      domEventName,
      listener,
    );
  } else {
    ...
    unsubscribeListener = addEventBubbleListener(
      targetContainer,
      domEventName,
      listener,
    );

  }
```
- createEventListenerWrapperWithPriority函数的名字已经把它做的事情交代得八九不离十了。它会首先根据事件的名称去找对应的事件优先级，然后依据优先级返回不同的事件监听函数。

React按照事件的紧急程度，把它们划分成三个等级：

- 离散事件（DiscreteEvent）：click、keydown、focusin等，这些事件的触发不是连续的，优先级为0。
- 用户阻塞事件（UserBlockingEvent）：drag、scroll、mouseover等，特点是连续触发，阻塞渲染，优先级为1。
- 连续事件（ContinuousEvent）：canplay、error、audio标签的timeupdate和canplay，优先级最高，为2。

- 事件优先级是根据事件的交互程度划分的，优先级和事件名的映射关系存在于一个Map结构中。**createEventListenerWrapperWithPriority**会根据事件名或者传入的优先级返回不同级别的事件监听包装器。


总的来说，会有三种事件监听包装器：

dispatchDiscreteEvent: 处理离散事件
dispatchUserBlockingUpdate：处理用户阻塞事件
dispatchEvent：处理连续事件
这些包装器是真正绑定到root上的事件监听器listener，它们持有各自的优先级，当对应的事件触发时，调用的其实是这个包含优先级的事件监听。

![](https://segmentfault.com/img/remote/1460000039108956)

- 事件处理的注册阶段总结：
  - 事件处理函数不是绑定到组件的元素上的，而是绑定到root上，这和fiber树的结构特点有关，即事件处理函数只能作为fiber的prop。
  - 绑定到root上的事件监听不是我们在组件里写的事件处理函数，而是一个持有事件优先级，并能传递事件执行阶段标志的监听器。
  
- 事件监听器做了什么
  - 它做的事情可以用一句话概括：负责以不同的优先级权重来触发真正的事件流程，并传递事件执行阶段标志（eventSystemFlags）。
  - 也就是说绑定到root上的事件监听listener只是相当于一个传令官，它按照事件的优先级去安排接下来的工作：事件对象的合成、将事件处理函数收集到执行路径、 事件执行，这样在后面的调度过程中，scheduler才能获知当前任务的优先级，然后展开调度。

- root上的事件监听被触发会引发事件对象的合成和事件的收集过程，这是为真正的事件触发做准备。

- 合成事件对象

  - 在组件中的事件处理函数中拿到的事件对象并不是原生的事件对象，而是经过React合成的SyntheticEvent对象。它解决了不同浏览器之间的兼容性差异。抽象成统一的事件对象，解除开发者的心智负担。

- 这就是为什么可以调用`e.nativeEvent`的原因
```js
  // 构造合成事件对象
  const event = new SyntheticEvent(
    reactName,
    null,
    nativeEvent,
    nativeEventTarget,
    EventInterface,
  );
```

- 事件冒泡路径寻址
  - 函数内部最重要的操作无疑是收集事件到执行路径，为了实现这一操作，需要在fiber树中从触发事件的源fiber节点开始，向上一直找到root，形成一条完整的冒泡或者捕获的路径。同时，沿途路过fiber节点时，根据事件名，从props中获取我们真正写在组件中的事件处理函数，push到路径中，等待下一步的批量执行。

- 总结：**总结一下事件机制的原理：由于fiber树的特点，一个组件如果含有事件的prop，那么将会在对应fiber节点的commit阶段绑定一个事件监听到root上，这个事件监听是持有优先级的，这将它和优先级机制联系了起来，可以把合成事件机制当作一个协调者，负责去协调合成事件对象、收集事件、触发真正的事件处理函数这三个过程。

> fiber节点的生命周期？fiber架构渲染共有几个阶段？

- 协调阶段：Reconciliation（也叫render）
  - 目的：确定需要在UI中更新的内容
  - 代码实质：得到标记了副作用的Fiber节点树。副作用描述了在下一个commit阶段需要完成的工作。
  - 这一过程可中断。事实上React通过时间分片的方式来处理一个或多个Fiber节点，从而赋予对正在做的工作以暂停，恢复，撤销重做的能力。这一阶段的工作对用户始终不可见。
- 提交阶段：Commit阶段
  - 目的：更新UI，对DOM应用上一个过程得到的patch结果。
  - 代码实质：已经得到了标记了副作用的的Fiber节点树，通过遍历副作用列表，根据副作用类型执行具体的副作用，包括DOM更新，生命周期函数调用，ref更新等一系列用户可见的UI变化。
![](https://libin1991.github.io/2019/07/01/%E7%90%86%E8%A7%A3-React-Fiber-%E6%9E%B6%E6%9E%84/1.png)

### react的document捕获和普通HTML的捕获事件有什么区别？

- 最大的区别：普通事件捕获挂载的是原生事件；react的事件捕获挂载的是一个事件包（syntheticEvent，包含事件本身和优先级标识，nativeEvent，predefault等属性）
- 其次，普通HTML事件`return false;`即可阻止冒泡，react中的事件必须`e.stopPropagation();`才能阻止冒泡

- react中事件特性
  - react16版本之前，在异步事件中要先执行`e.persist()`才能获取到，v17 开始，e.persist() 将不再生效，因为 SyntheticEvent 不再放入事件池中。
  - react17中取消了事件池概念
  - 事件池：SyntheticEvent 对象会被放入池中统一管理。这意味着 SyntheticEvent 对象可以被复用，当所有事件处理函数被调用之后，其所有属性都会被置空。

```js
function handleChange(e) {
  // Prevents React from resetting its properties:
  e.persist(); // ! 确保异步事件中能正常获取到事件对象e

  setTimeout(() => {
    console.log(e.target.value); // Works
  }, 100);
}
```

- react组件上绑定事件会发生什么？
  - 对大多数事件来说，React 实际上并不会将它们附加到 DOM 节点上。相反，React 会直接在 document 节点上为每种事件类型附加一个处理器。这被称为事件委托。
  - 自从其发布以来，React 一直自动进行事件委托。当 document 上触发 DOM 事件时，React 会找出调用的组件，然后 React 事件会在组件中向上 “冒泡”。但实际上，原生事件已经冒泡出了 document 级别，React 在其中安装了事件处理器。
- 为什么React17要将事件挂载到根节点而不是document上？
  - 在 React 17 中，React 将不再向 document 附加事件处理器。而会将事件处理器附加到渲染 React 树的根 DOM 容器中：
  - 在 React 16 或更早版本中，React 会对大多数事件执行 document.addEventListener()。React 17 将会在底层调用 rootNode.addEventListener()。
  - 如果页面上有多个 React 版本，他们都将在顶层注册事件处理器。这会破坏 e.stopPropagation()：如果嵌套树结构中阻止了事件冒泡，但外部树依然能接收到它。这会使不同版本 React 嵌套变得困难重重。
![](https://zh-hans.reactjs.org/static/bb4b10114882a50090b8ff61b3c4d0fd/1e088/react_17_delegation.png)


### react的事件是在render完毕才挂载的吗？
- 不是，react的事件在commit阶段会被记录下来挂载到document/root上

## 6.老生常谈：为什么不能在循环和判断中使用useState和useEffect钩子？
- 遵守钩子注册的执行顺序，防止造成index冲突

## 7.TS的unknown类型和any类型有什么区别？
- any 和 unknown 的最大区别是, unknown 是 top type (任何类型都是它的 subtype) , 而 any 即是 top type, 又是 bottom type (它是任何类型的 subtype ) ,这导致 any 基本上就是放弃了任何类型检查.

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

## 8. 编辑器项目里的东西