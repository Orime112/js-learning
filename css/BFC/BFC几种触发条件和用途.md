### 第 39 题：介绍下 BFC 及其应用。

解析：[第 39 题](https://github.com/Advanced-Frontend/Daily-Interview-Question/issues/59)

解答

BFC 全称是 Block Formatting Context，块级格式化上下文，在元素内部触发 BFC 之后，相当于给元素设置了结界，内部元素变化将不再影响到外部
触发条件有：

- display 为 inline-block
- overflow 不为 hidden，为（scroll，auto）
- float 不为 none
- position 不为 static

```javascript

```

#### 总结：

- 参考文章[知乎](https://zhuanlan.zhihu.com/p/25321647)

- FC（格式化上下文的概念）：Formatting context(格式化上下文) 是 W3C CSS2.1 规范中的一个概念。它是页面中的一块渲染区域，并且有一套渲染规则，它决定了其子元素将如何定位，以及和其他元素的关系和相互作用。

- BFC 发生了什么：具有 BFC 特性的元素可以看作是隔离了的独立容器，容器里面的元素不会在布局上影响到外面的元素，并且 BFC 具有普通容器所没有的一些特性。

- 触发 BFC 的条件

  - body 根元素
  - 浮动元素：float 除 none 以外的值
  - 绝对定位元素：position (absolute、fixed)
  - display 为 inline-block、table-cells、flex
  - overflow 除了 visible 以外的值 (hidden、auto、scroll)

- BFC 的实际应用

1. 同一个 BFC 下外边距会发生折叠，如果想要避免外边距的重叠，可以将其放在不同的 BFC 容器中。

```html
<style>
  .container {
    /* 如果非BFC，则会margin塌陷 */
    overflow: hidden;
  }
  p {
    width: 100px;
    height: 100px;
    background: lightblue;
    margin: 100px;
  }
</style>
<div class="container">
  <p></p>
</div>
<div class="container">
  <p></p>
</div>
```

2. 使 BFC 元素包裹浮动元素，撑开高度

```html
<div style="border: 1px solid #000;overflow: hidden">
  <div style="width: 100px;height: 100px;background: #eee;float: left;"></div>
</div>
```

![20210128193913](https://cdn.jsdelivr.net/gh/Orime112/picbed/20210128193913.png)

3. BFC 可以阻止元素被浮动元素覆盖
   先来看一个文字环绕效果：

<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #333; color: white">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #333;</div>

这时候其实第二个元素有部分被浮动元素所覆盖，(但是文本信息不会被浮动元素所覆盖) 如果想避免元素被覆盖，可触第二个元素的 BFC 特性，在第二个元素中加入 overflow: hidden，就会变成：

<div style="height: 100px;width: 100px;float: left;background: lightblue">我是一个左浮动的元素</div>
<div style="width: 200px; height: 200px;background: #333; overflow: hidden; color: white">我是一个没有设置浮动, 
也没有触发 BFC 元素, width: 200px; height:200px; background: #333;</div>

这个方法可以用来实现两列自适应布局，效果不错，这时候左边的宽度固定，右边的内容自适应宽度(去掉上面右边内容的宽度)。

#### 扩展：
