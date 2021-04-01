[TOC]

---

# 一、常见 React 面试题

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401084714715.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401084729331.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)

# 二、问题&解答

![在这里插入图片描述](https://img-blog.csdnimg.cn/202104010849128.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)

## 1.React 的优势到底在哪里？

> 🤔 你是如何理解 React 框架的？

如只会 React 基本是无法回答的，必须对其他框架多少有一些理解（Vue，Angular，Svelte 等），但是避免陷入捧一踩一的模式。

框架的出现是为了应对前端开发任务量的增长，公认第一款框架出现于 2009 年，是由 Google 团队开发的 Angular 框架，借鉴了 Java 语言的部分特性，具备自底向上框架的全部构成要素（比如路由，状态管理，响应式开发等），学习成本较高，上手难度大。

后来发展到 React，极大简化了框架的开发模式，React 倡导**一切皆组件！**

Angular 和 React 的本质区别从各自官方定义中就可以看出端倪：
![](https://img-blog.csdnimg.cn/20210401085645132.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401085654116.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)
React 框架本书负责组件，开发者负责数据，**程序员负责 MV 的处理**，而**React 负责 VM 的构建。**

由于 React 只是一个用于构建用户界面的库，所以它的使用场景更加广泛，比如可以开发 PC 端页面引入`react-dom`即可，开发 App 引入`react-dom-native`即可

```js
import React from "react"
import { Text, View } from "react-native"

const YourApp = () => {
  return (
    <View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
      <Text>Try editing me! 🎉</Text>
    </View>
  )
}

export default YourApp
```

还可以使用`react-vr`开发三维 VR 应用

```js
import React from "react"
import { AppRegistry, Pano, Text, View } from "react-vr"
class WelcomeToVR extends React.Component {
  render() {
    // Displays "hello" text on top of a loaded 360 panorama image.
    // Text is 0.8 meters in size and is centered three meters in front of you.
    return (
      <View>
        <Pano source={asset("chess-world.jpg")} />
        <Text
          style={{
            fontSize: 0.8,
            layoutOrigin: [0.5, 0.5],
            transform: [{ translate: [0, 0, -3] }],
          }}
        >
          hello
        </Text>
      </View>
    )
  }
}
AppRegistry.registerComponent("WelcomeToVR", () => WelcomeToVR)
```

还可以使用`react-lnk`开发命令行应用

```js
npm install ink react

import React, {useState, useEffect} from 'react';
import {render, Text} from 'ink';

const Counter = () => {
	const [counter, setCounter] = useState(0);

	useEffect(() => {
		const timer = setInterval(() => {
			setCounter(previousCounter => previousCounter + 1);
		}, 100);

		return () => {
			clearInterval(timer);
		};
	}, []);

	return <Text color="green">{counter} tests passed</Text>;
};

render(<Counter />);
```

![加粗样式](https://img-blog.csdnimg.cn/20210401090656262.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)

**总结：** React 确实如自身文档所述，本身只是一个开发用户界面的 JavaScript 库，通过组件化的方式去解决视图开发组件复用的问题，优势在于视图的拆分与模块的复用，可以更容易地做到高内聚，低耦合，通用性更强，一次性学习之后可以到处编写，比如开发 PC 可以用`react-dom`操作 DOM，`react-native`可以用来操作移动 App 的 DOM，可以用三维开发 VR，可以用 lnk 开发命令行，这使得 React 的适用范围变得足够广泛。

由于 React 本身是一个开发用户界面的库，所以路由，状态管理，组件库等工作，都是交给了社区去做，所以在开发大型应用的场景下，需要向社区寻求并整合整套设计方案，导致选型成本很高。

React 框架 = React 库本身+社区方案

## 2.JSX 映射虚拟 DOM 的原理？

### （1）为什么 React 会选择使用 JSX？

首先剖析这个问题的隐含逻辑：为什么不选择其他语法比如 template？

React 团队认为引入 template 模板是一种不佳的实现，认为模板是分离的，分散了组件内部的关注点；另外模板会引入过多额外概念（@指令、v-for 指令和模板语法），而 JSX 本身就是类 JS 语法，循环和条件表达式都符合 JS 语法，更具有可读性，更贴近原生 HTML。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401092346341.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)

Vue 中组件模板，逻辑和样式分成三块写，事件绑定和循环都是通过指令完成，数据渲染采用模板语法；
React 中数据，逻辑，组件糅合在一起写，但是事件绑定语法贴近原生，数据渲染和 JS 语法一致。

### （2）JSX 映射虚拟 DOM 的原理

- babel 帮我们把 JSX 语法，转化为`ReactDOM.createElement`的形式，

#### a.jsx 是什么？

JSX 是 JavaScript 语法的扩展，本身并不能算作是 HTML 的同类，也不是字符串的同类。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401094355890.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)

JSX 实际是`createElement(element, props, ...children)`的**语法糖**。

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401094525778.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401110906689.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)
具体编译过程如下：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401111830983.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)

#### b.React.createElement 做了什么？

观察源码会发现，入参分为为`type，props，...child`
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401112349521.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)
这里对传入的 children 参数处理比较巧妙，如果是一个 children 直接将 children 挂载到 props 上即可，否则会遍历所有传入的 child 行成 children 数组进行挂载

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401112649619.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)
将解析入参之后的成果全部传入`ReactElement`函数里：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401112933497.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)
`ReactElement`方法接收传过来的参数，首先新建 element 对象进行保存，然后对传过来的 props 和新建的 element 对象都进行冻结，使其无法再被更改。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401113046755.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)
最终返回的成果：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401113358167.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)
**总结：** JSX 是 JavaScript 语言的扩展，实际是`createElement`函数执行的语法糖，最终会被 babel 转化为`createElement`语法进行渲染。
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401113737145.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)

## 3. react-hooks 解决了哪些问题？

### （1）React 团队为什么会在 16.8 版本中加入 hook 特性？

> 加入 hook 带来了什么改变？

问题拆解：本质是类组件和函数式组件的对比。
一段真实的类组件和函数式组件：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401160454342.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)
其实类组件中的功能已经非常完备了，包括组件自有状态等，这决定了类组件的使用场景其实大于函数式组件的，那么为什么还要为函数式组件扩展类组件身上的这些方法呢？

那是因为类组件身上还是存在很多问题的。

### （2）类组件的缺陷

#### 1、this 指向需要额外注意 ![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401160829461.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)

为什么类组件中方法的 this 指向了`undefined`？

> 简单理解就是类中的 changeAge 方法整体传递给了 button 的 onClick 事件，当事件执行的时候则会丢失上下文。

```js
class Foo {
  constructor(name) {
    this.name = name
  }

  display() {
    console.log(this.name)
  }
}

var foo = new Foo("Saurabh")
foo.display() // Saurabh

//下面的赋值操作模拟了上下文的丢失。
//与实际在 React Component 中将处理程序作为 callback 参数传递相似。
var display = foo.display
display() // TypeError: this is undefined
```

那么 onClick 执行的时候上下文为什么是`undefined`

> 类声明和类表达式的主体以 严格模式 执行，主要包括构造函数、静态方法和原型方法。Getter 和 setter 函数也在严格模式下执行。

通常使用`bind`方式绑定 this，原理是：

```js
class Foo {
  constructor(name) {
    this.name = name
  }

  display() {
    console.log(this.name)
  }
}

var foo = new Foo("Saurabh")
foo.display = foo.display.bind(foo)
foo.display() // Saurabh

var display = foo.display
display() // Saurabh
```

箭头函数可以免除这种行为，因为它使用的是词法 this 绑定，会将其自动绑定到定义他们的函数上下文中（如果箭头函数是类属性，则其中 this 永远指向类实例）

#### 2、在组件之间复用状态逻辑很难

React 没有提供将可复用性行为“附加”到组件的途径（例如，把组件连接到 store）。如果你使用过 React 一段时间，你也许会熟悉一些解决此类问题的方案，比如 render props 和 高阶组件。但是这类方案需要重新组织你的组件结构，这可能会很麻烦，使你的代码难以理解。如果你在 React DevTools 中观察过 React 应用，你会发现由 providers，consumers，高阶组件，render props 等其他抽象层组成的组件会形成“嵌套地狱”。尽管我们可以在 DevTools 过滤掉它们，但这说明了一个更深层次的问题：React 需要为共享状态逻辑提供更好的原生途径。

你可以使用 Hook 从组件中提取状态逻辑，使得这些逻辑可以单独测试并复用。Hook 使你在无需修改组件结构的情况下复用状态逻辑。 这使得在组件间或社区内共享 Hook 变得更便捷。

#### 3.复杂组件变得难以理解

我们经常维护一些组件，组件起初很简单，但是逐渐会被状态逻辑和副作用充斥。每个生命周期常常包含一些不相关的逻辑。例如，组件常常在 componentDidMount 和 componentDidUpdate 中获取数据。但是，同一个 componentDidMount 中可能也包含很多其它的逻辑，如设置事件监听，而之后需在 componentWillUnmount 中清除。相互关联且需要对照修改的代码被进行了拆分，而完全不相关的代码却在同一个方法中组合在一起。如此很容易产生 bug，并且导致逻辑不一致。

在多数情况下，不可能将组件拆分为更小的粒度，因为状态逻辑无处不在。这也给测试带来了一定挑战。同时，这也是很多人将 React 与状态管理库结合使用的原因之一。但是，这往往会引入了很多抽象概念，需要你在不同的文件之间来回切换，使得复用变得更加困难。

为了解决这个问题，Hook 将组件中相互关联的部分拆分成更小的函数（比如设置订阅或请求数据），而并非强制按照生命周期划分。你还可以使用 reducer 来管理组件的内部状态，使其更加可预测。

**总结：** hooks 的出现，让函数式组件也能拥有自己的状态，1.函数式组件无需注意 this 指向问题；2.可以编写自定义 hooks，让组件/逻辑复用更加简单；3.按照逻辑划分代码结构而不是按照生命周期，使得同一逻辑的代码能够写在同一代码块中，方便理解和维护。

## 4.setState 到底是同步的还是异步的？

### 4.1 钩子函数和 React 合成事件中的 setState

1.调用 setState 不会立即更新 2.所有组件使用的是同一套更新机制，当所有组件 didmount 后，父组件 didmount，然后执行更新 3.更新时会把每个组件的更新合并，每个组件只会触发一次更新的生命周期。

### 4.2 异步函数和原生事件中的 setstate？

1.在父组件 didmount 后执行 2.调用 setState 同步更新

### 4.3setState 的执行流程

- partialState：setState 传入的第一个参数，对象或函数
- \_pendingStateQueue：当前组件等待执行更新的 state 队列
- isBatchingUpdates：react 用于标识当前是否处于批量更新状态，所有组件公用
- dirtyComponent：当前所有处于待更新状态的组件队列
- transcation：react 的事务机制，在被事务调用的方法外包装 n 个 waper 对象，并一次执行：waper.init、 - 被调用方法、waper.close
- FLUSH_BATCHED_UPDATES：用于执行更新的 waper，只有一个 close 方法

执行流程详细：

1.将 setState 传入的 partialState 参数存储在当前组件实例的 state 暂存队列中。 2.判断当前 React 是否处于批量更新状态，如果是，将当前组件加入待更新的组件队列中。 3.如果未处于批量更新状态，将批量更新状态标识设置为 true，用事务再次调用前一步方法，保证当前组件加入到了待更新组件队列中。 4.调用事务的 waper 方法，遍历待更新组件队列依次执行更新。 5.执行生命周期 componentWillReceiveProps。 6.将组件的 state 暂存队列中的 state 进行合并，获得最终要更新的 state 对象，并将队列置为空。 7.执行生命周期 componentShouldUpdate，根据返回值判断是否要继续更新。 8.执行生命周期 componentWillUpdate。 9.执行真正的更新，render。 10.执行生命周期 componentDidUpdate。

**总结：** 1.钩子函数和合成事件中：
在 react 的生命周期和合成事件中，react 仍然处于他的更新机制中，这时 isBranchUpdate 为 true。
按照上述过程，这时无论调用多少次 setState，都会不会执行更新，而是将要更新的 state 存入\_pendingStateQueue，将要更新的组件存入 dirtyComponent。
当上一次更新机制执行完毕，以生命周期为例，所有组件，即最顶层组件 didmount 后会将 isBranchUpdate 设置为 false。这时将执行之前累积的 setState。 2.异步函数和原生事件中
由执行机制看，setState 本身并不是异步的，而是如果在调用 setState 时，如果 react 正处于更新过程，当前更新会被暂存，等上一次更新执行后在执行，这个过程给人一种异步的假象。
在生命周期，根据 JS 的异步机制，会将异步函数先暂存，等所有同步代码执行完毕后在执行，这时上一次更新过程已经执行完毕，isBranchUpdate 被设置为 false，根据上面的流程，这时再调用 setState 即可立即执行更新，拿到更新结果。
3.partialState 合并机制
如果传入的是对象，很明显会被合并成一次：

```js
Object.assign(nextState, { index: state.index + 1 }, { index: state.index + 1 })
```

复制代码如果传入的是函数，函数的参数 preState 是前一次合并后的结果，所以计算结果是准确的。

### 4.4componentDidMount 中 setState 的行为表现

不推荐直接在 componentDidMount 直接调用 setState，由上面的分析：`componentDidMount`本身处于一次更新中，我们又调用了一次 setState，就会在未来再进行一次 render，造成不必要的性能浪费，大多数情况可以设置初始值来搞定。
当然在`componentDidMount`我们可以调用接口，再回调中去修改 state，这是正确的做法。
当 state 初始值依赖 dom 属性时，在`componentDidMount`中 setState 是无法避免的。

### 4.5 在 componentWillUpdate 和 componentDidUpdate 中调用 setState

不能在这两个生命周期中调用 setState，否则会造成死循环
当然，可以加入判断避免死循环

### 4.6 推荐的方式

在调用 setState 时使用函数传递 state 值，在回调函数中获取最新更新后的 state。

### 5.如何面向组件跨层级通信？

#### 5.1 父子通信

父组件包裹子组件，父组件直接通过 props 向子组件传递数据，子组件以父组件传来的回调函数参数形式向父组件发送数据。

#### 5.2 兄弟组件通信

两个组件并列存在于父组件中，数据需要进行相互传递，往往依赖共同的父组件进行中转。

#### 5.3 无直接关系组件通信

两个组件并没有直接的关联关系，处在一棵树中相距甚远的位置，但需要共享、传递数据。

- Context

```js
import React, { useContext } from "react"

// 1.创建上下文
const MyContext = React.createContext()
const { Provider, Consumer } = MyContext

function Child(prop) {
  return <div>Child: {prop.foo}</div>
}
// 使用hook消费
function Child2() {
  const context = useContext(MyContext)
  return <div>Child2: {context.foo}</div>
}
// 使用class指定静态contextType
class Child3 extends React.Component {
  // 设置静态属性通知编译器获取上下文中数据并赋值给this.context
  static contextType = MyContext
  render() {
    return <div>Child3: {this.context.foo}</div>
  }
}
export default function ContextTest() {
  return (
    <div>
      <Provider value={{ foo: "bar" }}>
        {/* 消费方法1：Consumer */}
        <Consumer>{(value) => <Child {...value} />}</Consumer>
        {/* 消费方法2：hook */}
        <Child2 />
        {/* 消费方法3：contextType */}
        <Child3 />
      </Provider>
    </div>
  )
}
```

- Window 上全局变量

#### 5.4 集中式状态管理容器

- Flux
- Redux
- Mobx

### 6.对比一下 Redux 和 Vuex 的设计思想

共同点
首先两者都是处理全局状态的工具库，大致实现思想都是：全局 state 保存状态---->dispatch(action)
------>reducer(vuex 里的 mutation)----> 生成 newState; 整个状态为同步操作；

区别
最大的区别在于处理异步的不同，vuex 里面多了一步 commit 操作，在 action 之后 commit(mutation)之前处理异步，而 redux 里面则是通过中间件处理

#### Store 模式

最简单的处理就是把状态存到一个外部变量里面，比如：this.$root.$data，当然也可以是一个全局变量。但是这样有一个问题，就是数据改变后，不会留下变更过的记录，这样不利于调试

所以我们稍微搞得复杂一点，用一个简单的 Store 模式

```js
var store = {
  state: {
    message: "Hello!",
  },
  setMessageAction(newValue) {
    // 发生改变记录点日志啥的
    this.state.message = newValue
  },
  clearMessageAction() {
    this.state.message = ""
  },
}
```

store 的 state 来存数据，store 里面有一堆的 action，这些 action 来控制 state 的改变，也就是不直接去对 state 做改变，而是通过 action 来改变，因为都走 action，我们就可以知道到底改变（mutation）是如何被触发的，出现错误，也可以记录记录日志啥的

不过这里没有限制组件里面不能修改 store 里面的 state，万一组件瞎胡修改，不通过 action，那我们也没法跟踪这些修改是怎么发生的。所以就需要规定一下，组件不允许直接修改属于 store 实例的 state，组件必须通过 action 来改变 state，也就是说，组件里面应该执行 action 来分发 (dispatch) 事件通知 store 去改变。这样约定的好处是，我们能够记录所有 store 中发生的 state 改变，同时实现能做到记录变更 (mutation)、保存状态快照、历史回滚/时光旅行的先进的调试工具。

#### Vuex

每一个 Vuex 里面有一个全局的 Store，包含着应用中的状态 State，这个 State 只是需要在组件中共享的数据，不用放所有的 State，没必要。这个 State 是单一的，和 Redux 类似，所以，一个应用仅会包含一个 Store 实例。单一状态树的好处是能够直接地定位任一特定的状态片段，在调试的过程中也能轻易地取得整个当前应用状态的快照。

Vuex 通过 store 选项，把 state 注入到了整个应用中，这样子组件能通过 this.$store 访问到 state 了。

```js
const app = new Vue({
  el: "#app",
  // 把 store 对象提供给 “store” 选项，这可以把 store 的实例注入所有的子组件
  store,
  components: { Counter },
  template: `
    <div class="app">
      <counter></counter>
    </div>
  `,
})
const Counter = {
  template: `<div>{{ count }}</div>`,
  computed: {
    count() {
      return this.$store.state.count
    },
  },
}
```

State 改变，View 就会跟着改变，这个改变利用的是 Vue 的响应式机制。

显而易见，State 不能直接改，需要通过一个约定的方式，这个方式在 Vuex 里面叫做 mutation，更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件：每个 mutation 都有一个字符串的 事件类型 (type) 和 一个 回调函数 (handler)。

```js
const store = new Vuex.Store({
  state: {
    count: 1,
  },
  mutations: {
    increment(state) {
      // 变更状态
      state.count++
    },
  },
})
```

对比 Redux 的中间件，Vuex 加入了 Action 这个东西来处理异步，Vuex 的想法是把同步和异步拆分开，异步操作想咋搞咋搞，但是不要干扰了同步操作。View 通过 store.dispatch('increment') 来触发某个 Action，Action 里面不管执行多少异步操作，完事之后都通过 store.commit('increment') 来触发 mutation，一个 Action 里面可以触发多个 mutation。所以 Vuex 的 Action 类似于一个灵活好用的中间件。

Vuex 把同步和异步操作通过 mutation 和 Action 来分开处理，是一种方式。但不代表是唯一的方式，还有很多方式，比如就不用 Action，而是在应用内部调用异步请求，请求完毕直接 commit mutation，当然也可以。

Vuex 还引入了 Getter，这个可有可无，只不过是方便计算属性的复用。

Vuex 单一状态树并不影响模块化，把 State 拆了，最后组合在一起就行。Vuex 引入了 Module 的概念，每个 Module 有自己的 state、mutation、action、getter，其实就是把一个大的 Store 拆开。

总的来看，Vuex 的方式比较清晰，适合 Vue 的思想，在实际开发中也比较方便。

#### 核心概念对比：

i） Redux 提供了 store.getState() 这个 API 获取 store 树，还有 store.subscribe(listener) 订阅 store 的变化，当 store 改变时会调用监听器；Vuex 有一个 getter 的概念用于根据 state 派生出一些数据，像 Vue 的计算属性一样，当 state 改变时会重新计算出一个结果出来，提供给需要的组件。
ii） 对于大型项目，当应用状态数据过于复杂，可以划分状态，这样便于管理数据流向。Redux 可以通过 combineReducers（）结合各个组件的 reducer，各个组件可以单独管理自己的状态，最后合并为一个 reducer 用于生成一个 store；Vuex 这方面用 Module 这个概念划分 store，与 Redux 一样，可以多层嵌套子状态。
iii） 将状态数据绑定到视图：Redux 将状态映射到视图可以通过 React-redux 映射到 React 组件，
当然也可以直接使用 Redux 自己提供的 store.subscribe() 订阅 store 的改变，从而更新视图，因此 Redux 不仅仅可以用于 React，也可以用于其他框架如 Vue；而 Vuex 只能用于 Vue，它提供了 mapState、mapAction、mapMutations 等 API 将 store 映射到 Vuex 各个组件，这个参考了 React-redux 的 mapStateToProps。

#### 使用原则

Redux 的三大原则：
（1）单一数据源（一个 Redux 应用只有一个 store），也是单向的数据流；
（2）state 只读（唯一改变 state 的方法就是触发 action，action 是一个用于描述已发生事件的普通对象。）；
（3）使用纯函数（reducer）来修改 state。
复制代码
Vuex 的三大原则：
a. 应用层级的状态应该集中到单个 store 对象中。
b. 提交 mutation 是更改状态的唯一方法，并且这个过程是同步的。
c. 异步逻辑都应该封装到 action 里面。

#### 处理异步操作

Redux 得益于 中间件机制，利用 redux-thunk （redux-thunk 可以 dispatch 函数，这个函数用于生成 action，所以在这个函数里面我们可以进行异步操作，等异步的结果出来后再放在 action 里面将这个 action 用 dispatch 分发出去, 而这个函数被叫做 “action creator” ），可以将异步逻辑放在 action creator 里面，通过 action creator 做一个控制反转， 给 action creator 传入 dispatch 作为参数，于是就可以 dispatch action，（原本是通过 dispatch 来分发 action ,现在是异步 action 即 action creator 掌握了控制权调用 dispatch，所以叫控制反转），Redux 并没有创造单独的概念出来专门用于异步逻辑，它是利用了 Redux 自己实现的中间件机制，中间件从 dispatch 一个异步 action 到 action 到达 reducer 之间处理 action，在这期间通过异步操作得到的结果可以放到 action 里面再通过 dispatch 分发到 reducer，以前 dispatch 一个 action 之后，这个 action 回立即到达 reducer ，所以是同步 action，现在在 action creator 里面，我们通过控制反转，可以等待异步操作结果再生成 action 分发，所以叫做异步 action：
![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401193104966.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)

而 Vuex 是用 mutation 来对应 Redux 的 action，另外 Vuex 又创造了一个 action 来提交 mutation 并通过异步提交 mutation 来实现异步操作结果能够到达 state.

![在这里插入图片描述](https://img-blog.csdnimg.cn/20210401193111885.png?x-oss-process=image/watermark,type_ZmFuZ3poZW5naGVpdGk,shadow_10,text_aHR0cHM6Ly9ibG9nLmNzZG4ubmV0L3dlaXhpbl80MTg3NjU3NA==,size_16,color_FFFFFF,t_70)

### 7.React 事件和 DOM 事件有什么区别？

#### 7.1 事件绑定方式不同

- DOM 绑定事件
  - DOM0 级

```js
(1)直接写js代码
<span onclick="console.log('我被点击了！！！')">Click me</span>
(2)函数名()
    <span onclick="handle()">Click me</span>
    function handle() {
        console.log('我被点击了！！！);
    }
```

- DOM2 级
  - DOM2 支持同一 dom 元素注册多个同种事件。
  - DOM2 新增了捕获和冒泡的概念。
  - DOM2 事件通过 addEventListener 和 removeEventListener 管理

```js
// * 第三个参数代表是否捕获阶段触发，默认false
    ele.addEventListener(‘click’, handle, false);
```

- React 事件绑定

```js
// 1.不传参数绑定
    <div className="box1" onClick={this.handleClickOne}>
// 2.传递参数绑定
    1. 箭头函数：<div className="box2" onClick={e => this.handleClickTwo(e)}
    2. bind 方法：<div className="box2" onClick={this.handleClickTwo.bind(this, e, others)}
```

#### 7.2 事件对象不同

DOM 事件对象的属性

```js
    currentTarget ： 当前时间程序正在处理的元素, 和this一样的;
    target || srcElement： 事件的目标
    view ： 与元素关联的window， 我们可能跨iframe；
    eventPhase： 如果值为1表示处于捕获阶段， 值为2表示处于目标阶段，值为三表示在冒泡阶段
    preventDefault() 取消默认事件；
    stopPropagation() 取消冒泡或者捕获；
    stopImmediatePropagation 阻止绑定在事件触发元素其他同类事件的callback的运行

    trusted： 为ture是浏览器生成的，为false是开发人员创建的（DOM3）

```

- React 事件对象属性
  React 中的事件对象是合成事件，React 通过 onClick 等方式注册的事件。合成事件实现了一套自己的事件机制，减少了内存的消耗，也最大程度解决了 IE 浏览器的兼容问题。

```js
boolean bubbles
boolean cancelable
DOMEventTarget currentTarget
boolean defaultPrevented
number eventPhase
boolean isTrusted
DOMEvent nativeEvent
void preventDefault()
boolean isDefaultPrevented()
void stopPropagation()
boolean isPropagationStopped()
void persist()
DOMEventTarget target
number timeStamp
string type
```

#### 7.3 阻止冒泡方式不同

- DOM 阻止冒泡

```js
// (1) e.stopPropagation()
// (2) 事件函数中 return false; (同时会阻止默认行为)
```

- React 合成事件阻止冒泡
  阻止合成事件间的冒泡，可以直接使用 e.stopPropagation ()
  阻止合成事件与最外层 document 上的事件间的冒泡，用 e.nativeEvent.stopImmediatePropagation ()
  阻止合成事件与除最外层 document 上的原生事件上的冒泡，通过判断 e.target 来避免

```js
document.body.addEventListener('click',e=>{
// 通过e.target判断阻止冒泡
            if(e.target&&e.target.matches('a')){
return;
            }
console.log('body');
        })
    }
}
```

### 8.谈一谈 React 的状态管理方案

太多了，不想谈……
