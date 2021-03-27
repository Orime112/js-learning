### 说一下vue和react的区别？

1. 数据监听实现原理不同：

Vue通过 getter/setter以及一些函数的劫持，能精确知道数据变化。

React默认是通过比较引用的方式（diff）进行的，如果不优化可能导致大量不必要的VDOM的重新渲染。为什么React不精确监听数据变化呢？这是因为Vue和React设计理念上的区别，Vue使用的是可变数据，而React更强调数据的不可变，两者没有好坏之分，Vue更加简单，而React构建大型应用的时候更棒。

2. 数据流的不同

vue 2.x 开始进制父子组件的双向数据流，而保留了组件和UI的数据绑定

React一直不支持双向绑定，提倡的是单向数据流，称之为onChange/setState()模式。不过由于我们一般都会用Vuex以及Redux等单向数据流的状态管理框架，因此很多时候我们感受不到这一点的区别了。

3. HoC和mixins

Vue组合不同功能的方式是通过mixin，Vue中组件是一个被包装的函数，并不简单的就是我们定义组件的时候传入的对象或者函数。

React组合不同功能的方式是通过HoC(高阶组件）。React最早也是使用mixins的，不过后来他们觉得这种方式对组件侵入太强会导致很多问题，就弃用了mixinx转而使用HoC。高阶组件本质就是高阶函数，React的组件是一个纯粹的函数，所以高阶函数对React来说非常简单。

4. 组件通信的区别

Vue中有三种方式可以实现组件通信：
- 父组件通过props向子组件传递数据或者回调，虽然可以传递回调，但是我们一般只传数据；
- 子组件通过事件向父组件发送消息；
- 通过V2.2.0中新增的provide/inject来实现父组件向子组件注入数据，可以跨越多个层级。

React中也有对应的三种方式：父组件通过props可以向子组件传递数据或者回调；可以通过 context 进行跨层级的通信，这其实和 provide/inject 起到的作用差不多。React 本身并不支持自定义事件，而Vue中子组件向父组件传递消息有两种方式：事件和回调函数，但Vue更倾向于使用事件。在React中我们都是使用回调函数的，这可能是他们二者最大的区别。

5. 模板渲染方式的不同

在表层上，模板的语法不同，React是通过JSX渲染模板。而Vue是通过一种拓展的HTML语法进行渲染，但其实这只是表面现象，毕竟React并不必须依赖JSX。

在深层上，模板的原理不同，这才是他们的本质区别：React是在组件JS代码中，通过原生JS实现模板中的常见语法，比如插值，条件，循环等，都是通过JS语法实现的，更加纯粹更加原生。而Vue是在和组件JS代码分离的单独的模板中，通过指令来实现的，比如条件语句就需要 v-if 来实现对这一点，这样的做法显得有些独特，会把HTML弄得很乱。

举个例子，说明React的好处：react中render函数是支持闭包特性的，所以我们import的组件在render中可以直接调用。但是在Vue中，由于模板中使用的数据都必须挂在 this 上进行一次中转，所以我们import 一个组件完了之后，还需要在 components 中再声明下，这样显然是很奇怪但又不得不这样的做法。

6. 渲染过程不同

Vue可以更快地计算出Virtual DOM的差异，这是由于它在渲染过程中，会跟踪每一个组件的依赖关系，不需要重新渲染整个组件树。

React在应用的状态被改变时，全部子组件都会重新渲染。通过shouldComponentUpdate这个生命周期方法可以进行控制，但Vue将此视为默认的优化。

如果应用中交互复杂，需要处理大量的UI变化，那么使用Virtual DOM是一个好主意。如果更新元素并不频繁，那么Virtual DOM并不一定适用，性能很可能还不如直接操控DOM。

7. 框架本质不同

Vue本质是MVVM框架，由MVC发展而来；

React是前端组件化框架，由后端组件化发展而来。

8. Vuex和Redux的区别

从表面上来说，store注入和使用方式有一些区别。在Vuex中，`$store`被直接注入到了组件实例中，因此可以比较灵活的使用：使用dispatch、commit提交更新，通过mapState或者直接通过this.$store来读取数据。在Redux中，我们每一个组件都需要显示的用connect把需要的props和dispatch连接起来。另外，Vuex更加灵活一些，组件中既可以dispatch action，也可以commit updates，而Redux中只能进行dispatch，不能直接调用reducer进行修改。

从实现原理上来说，最大的区别是两点：Redux使用的是不可变数据，而Vuex的数据是可变的，因此，Redux每次都是用新state替换旧state，而Vuex是直接修改。Redux在检测数据变化的时候，是通过diff的方式比较差异的，而Vuex其实和Vue的原理一样，是通过getter/setter来比较的，这两点的区别，也是因为React和Vue的设计理念不同。React更偏向于构建稳定大型的应用，非常的科班化。相比之下，Vue更偏向于简单迅速的解决问题，更灵活，不那么严格遵循条条框框。因此也会给人一种大型项目用React，小型项目用Vue的感觉。



#### 那么react的diff算法是怎么从O(n³)优化到O(n)的？

- 先看**树的编辑距离**：在计算器语言学与计算机科学中，编辑距离通过计算将一个字符转化为例一个字符串所需的最小操作数来量化两个字符串差异程度。
```js
比如计算 kitten与sitting的编辑距离：

kitten → sitten (将k替换为s)
sitten → sittin (e替换为i)
sittin → sitting (插入g)

所以编辑距离为3
```

- Tree edit distance就是指将一颗Tree映射到例外一颗Tree所需的最小操作数。
  - Tree edit distance算法复杂度远超过edit distance
  - 该算法是一个递归算法，在递归过程中将Tree一直拆分成所有可能的子树，然后分别计算每个子树的edit distance。
  - <img src="https://pic1.zhimg.com/50/v2-3b71f63bed6fb64dbb79606df7c34a61_hd.jpg?source=1940ef5c" data-caption="" data-size="normal" data-rawwidth="766" data-rawheight="368" data-default-watermark-src="https://pic1.zhimg.com/50/v2-b344685271905af15552f99b975dda5e_hd.jpg?source=1940ef5c" class="origin_image zh-lightbox-thumb" width="766" data-original="https://pic2.zhimg.com/v2-3b71f63bed6fb64dbb79606df7c34a61_r.jpg?source=1940ef5c"/>

- 传统Diff算法需要找到两个树的最小更新方式，所以需要[两两]对比每个叶子节点是否相同，对比就需要O(n^2 )次了，再加上更新（移动、创建、删除）时需要遍历一次，所以是O(n^3)。
  - 找到差异后还要计算最小转换方式，最终结果为O(n^3)

React的Diff算法完全不同，简单到有些粗暴，过程如下。
- 按叶子节点位置比较
```js
[0,0]     :     PA->LA   # 相同，不理会
[0.0, 0.0]:     PB->LD   # 不同，删除PB，添加LD
[0.1, 0.1]:     PD->LB   # 不同，更新
[0.1.0, 0.1.0]: PC->Null # Last树没有该节点，所以删除PC即可
[0.1.2, 0.1.2]: Null->LC # Prev树没有该节点，所以添加C到该位置
```
- 标准的O(n)，所有的节点只遍历一次。React认为：一个ReactElement的type不同，那么内容基本不会复用，所以直接删除节点，添加新节点，这是一个非常大的优化，大大减少了对比时间复杂度。

##### 另一种解释方式
- **React 最为核心的就是** **Virtual DOM 和 Diff 算法**。React 在内存中维护一颗虚拟 DOM 树，当数据发生改变时（state & props），会自动的更新虚拟 DOM，获得一个新的虚拟 DOM 树，然后通过 Diff 算法，比较新旧虚拟 DOM 树，找出最小的有变化的部分，将这个变化的部分（Patch）加入队列，最终批量的更新这些 Patch 到实际的 DOM 中。

##### React diff 理念源流

传统 diff 算法其时间复杂度最优解是 O(n^3)，那么如果有 1000 个节点，则一次 diff 就将进行 10 亿次比较，这显然无法达到高性能的要求。而 React 通过大胆的假设，并基于假设提出相关策略，成功的将 O(n^3) 复杂度的问题转化为 O(n) 复杂度的问题。


（1）两个假设

为了优化 diff 算法，React 提出了两个假设：

两个不同类型的元素会产生出不同的树
开发者可以通过 key prop 来暗示哪些子元素在不同的渲染下能保持稳定

（2）三个策略

基于这上述两个假设，React 针对性的提出了三个策略以对 diff 算法进行优化：

Web UI 中 DOM 节点跨层级的移动操作特别少，可以忽略不计
拥有相同类型的两个组件将会生成相似的树形结构，拥有不同类型的两个组件将会生成不同树形结构
对于同一层级的一组子节点，它们可以通过唯一 key 进行区分

（3）diff 具体优化

基于上述三个策略，React 分别对以下三个部分进行了 diff 算法优化

- tree diff
- component diff
- element diff

tree diff

React 只对虚拟 DOM 树进行分层比较，不考虑节点的跨层级比较。如下图：
![](https://img2020.cnblogs.com/blog/898684/202007/898684-20200705173015426-2063874687.png)

- 为什么要避免跨层级操作DOM
  - 通过分层比较可知，React 并不会复用 B 节点及其子节点，而是会直接删除 A 节点下的 B 节点，然后再在 C 节点下创建新的 B 节点及其子节点。因此，如果发生跨级操作，React 是不能复用已有节点，可能会导致 React 进行大量重新创建操作，这会影响性能。所以 React 官方推荐尽量避免跨层级的操作。
![](https://img2020.cnblogs.com/blog/898684/202007/898684-20200705173026947-801165920.png)

component diff
React 是基于组件构建的，对于组件间的比较所采用的策略如下：

如果是同类型组件，首先使用 shouldComponentUpdate()方法判断是否需要进行比较，如果返回true，继续按照 React diff 策略比较组件的虚拟 DOM 树，否则不需要比较
如果是不同类型的组件，则将该组件判断为 dirty component，从而替换整个组件下的所有子节点
![](https://img2020.cnblogs.com/blog/898684/202007/898684-20200706164007770-1808235477.jpg)

element diff

element diff 涉及三种操作：移动、创建、删除。对于同一层级的子节点，对于是否使用 key 分别进行讨论。


对于不使用 key 的情况，如下图：

![](https://img2020.cnblogs.com/blog/898684/202007/898684-20200705173102635-1532111616.png)

React 对新老同一层级的子节点对比，发现新集合中的 B 不等于老集合中的 A，于是删除 A，创建 B，依此类推，直到删除 D，创建 C。这会使得相同的节点不能复用，出现频繁的删除和创建操作，从而影响性能。


对于使用 key 的情况，如下图：

![](https://img2020.cnblogs.com/blog/898684/202007/898684-20200705173113504-215799162.png)

##### 总结：
- React 通过大胆的假设，制定对应的 diff 策略，将 O(n3) 复杂度的问题转换成 O(n) 复杂度的问题

- 通过分层对比策略，对 tree diff 进行算法优化
- 通过相同类生成相似树形结构，不同类生成不同树形结构以及shouldComponentUpdate策略，对 component diff 进行算法优化
- 通过设置唯一 key 策略，对 element diff 进行算法优化

综上，tree diff 和 component diff 是从顶层设计上降低了算法复杂度，而 element diff 则在在更加细节上做了进一步优化。

##### 来自官网的启示
- 前提：当对比两棵树时，React 首先比较两棵树的根节点。不同类型的根节点元素会有不同的形态。

###### 对比不同类型的元素：
- 当根节点为不同类型的元素时，React 会拆卸原有的树并且建立起新的树。举个例子，当一个元素从 `<a>` 变成 `<img>`，从 `<Article>` 变成 `<Comment>`，或从`<Button>` 变成 `<div>` 都会触发一个完整的重建流程。

在根节点以下的组件也会被卸载，它们的状态会被销毁。比如，当比对以下更变时：
```html
<div>
  <Counter />
</div>

<span>
  <Counter />
</span>
```
React 会销毁 Counter 组件并且重新装载一个新的组件。

###### 对比同类型的元素
- 当对比两个相同类型的 React 元素时，React 会保留 DOM 节点，仅比对及更新有改变的属性。比如：
```html
<div className="before" title="stuff" />

<div className="after" title="stuff" />
```
通过对比这两个元素，React 知道只需要修改 DOM 元素上的 className 属性。

当更新 style 属性时，React 仅更新有所更变的属性。比如：
```html
<div style={{color: 'red', fontWeight: 'bold'}} />

<div style={{color: 'green', fontWeight: 'bold'}} />
```
通过对比这两个元素，React 知道只需要修改 DOM 元素上的 color 样式，无需修改 fontWeight。

> 在处理完当前节点之后，React 继续对子节点进行递归。

###### 对比同类型的组件元素

当一个组件更新时，组件实例会保持不变，因此可以在不同的渲染时保持 state 一致。React 将更新该组件实例的 props 以保证与最新的元素保持一致，并且调用该实例的 UNSAFE_componentWillReceiveProps()、UNSAFE_componentWillUpdate() 以及 componentDidUpdate() 方法。

###### 对子节点进行递归

默认情况下，当递归 DOM 节点的子元素时，React 会同时遍历两个子元素的列表；当产生差异时，生成一个 mutation。

在子元素列表末尾新增元素时，更新开销比较小。比如：
```html
<ul>
  <li>first</li>
  <li>second</li>
</ul>

<ul>
  <li>first</li>
  <li>second</li>
  <li>third</li>
</ul>
```
React 会先匹配两个 `<li>first</li>` 对应的树，然后匹配第二个元素 `<li>second</li>` 对应的树，最后插入第三个元素的 `<li>third</li>` 树。

如果只是简单的将新增元素插入到表头，那么更新开销会比较大。比如：

```html
<ul>
  <li>Duke</li>
  <li>Villanova</li>
</ul>

<ul>
  <li>Connecticut</li>
  <li>Duke</li>
  <li>Villanova</li>
</ul>
```

React 并不会意识到应该保留 `<li>Duke</li>` 和 `<li>Villanova</li>`，而是会重建每一个子元素。这种情况会带来性能问题。

###### Keys
为了解决上述问题，React 引入了 key 属性。当子元素拥有 key 时，React 使用 key 来匹配原有树上的子元素以及最新树上的子元素。以下示例在新增 key 之后，使得树的转换效率得以提高：

```html
<ul>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

<ul>
  <li key="2014">Connecticut</li>
  <li key="2015">Duke</li>
  <li key="2016">Villanova</li>
</ul>

```

> 这个 key 不需要全局唯一，但在列表中需要保持唯一。TODO 需要在源码中确定



### 说一下前端安全中的CSRF

1. 先看一个典型的场景

邮箱登录态，点击了垃圾邮件执行了页面的隐藏脚本
```js
<form method="POST" action="https://mail.google.com/mail/h/ewt1jmuj4ddv/?v=prf" enctype="multipart/form-data"> 
    <input type="hidden" name="cf2_emc" value="true"/> 
    <input type="hidden" name="cf2_email" value="hacker@hakermail.com"/> 
    .....
    <input type="hidden" name="irf" value="on"/> 
    <input type="hidden" name="nvp_bu_cftb" value="Create Filter"/> 
</form> 
<script> 
    document.forms[0].submit();
</script>
```
> 会发生的事情：这个页面只要打开，就会向Gmail发送一个post请求。请求中，执行了“Create Filter”命令，将所有的邮件，转发到“hacker@hackermail.com”。
> 小明由于刚刚就登陆了Gmail，所以这个请求发送时，携带着小明的登录凭证（Cookie），Gmail的后台接收到请求，验证了确实有小明的登录凭证，于是成功给小明配置了过滤器。
>黑客可以查看小明的所有邮件，包括邮件里的域名验证码等隐私信息。拿到验证码之后，黑客就可以要求域名服务商把域名重置给自己。

2. 一句话概括什么是`CSRF`

CSRF（Cross-site request forgery）跨站请求伪造：攻击者诱导受害者进入第三方网站，在第三方网站中，向被攻击网站发送跨站请求。利用受害者在被攻击网站已经获取的注册凭证，绕过后台的用户验证，达到冒充用户对被攻击的网站执行某项操作的目的。

3. 一个典型的CSRF攻击有着如下的流程：
- 受害者登录a.com，并保留了登录凭证（Cookie）。
- 攻击者引诱受害者访问了b.com。
- b.com 向 a.com 发送了一个请求：a.com/act=xx。浏览器会默认携带a.com的Cookie。
- a.com接收到请求后，对请求进行验证，并确认是受害者的凭证，误以为是受害者自己发送的请求。
- a.com以受害者的名义执行了act=xx。
- 攻击完成，攻击者在受害者不知情的情况下，冒充受害者，让a.com执行了自己定义的操作。

![](https://cdn.jsdelivr.net/gh/Orime112/picbed/img/20210326174132.png))

4. CSRF类型

a. GET型，常用语图片地址：`<img src=http://wooyun.org/csrf.php?xx=11 />`，`![](http://bank.example/withdraw?account=xiaoming&amount=10000&for=hacker)`
b. POST型，常常配合一个自动提交的表单
```js
 <form action="http://bank.example/withdraw" method=POST>
    <input type="hidden" name="account" value="xiaoming" />
    <input type="hidden" name="amount" value="10000" />
    <input type="hidden" name="for" value="hacker" />
</form>
<script> document.forms[0].submit(); </script> 
```
c. 链接类型：需要用户手动点击触发：`  <a href="http://test.com/csrf/withdraw.php?amount=1000&for=hacker" taget="_blank">
  重磅消息！！
  <a/>`

5. CSRF特点

- 攻击一般发起在第三方网站，而不是被攻击的网站。被攻击的网站无法防止攻击发生。
- 攻击利用受害者在被攻击网站的登录凭证，冒充受害者提交操作；而不是直接窃取数据。
- 整个过程攻击者并不能获取到受害者的登录凭证，仅仅是“冒用”。
- 跨站请求可以用各种方式：图片URL、超链接、CORS、Form提交等等。部分请求方式可以直接嵌入在第三方论坛、文章中，难以进行追踪。
- CSRF通常是跨域的，因为外域通常更容易被攻击者掌控。但是如果本域下有容易被利用的功能，比如可以发图和链接的论坛和评论区，攻击可以直接在本域下进行，而且这种攻击更加危险。

6. CSRF防护策略

- 基于CSRF的两个特点
  - CSRF（通常）发生在第三方域名。
  - CSRF攻击者不能获取到Cookie等信息，只是使用。

- 阻止不明外域的访问
  - 同源检测
  - Samesite Cookie
- 提交时要求附加本域才能获取的信息
  - CSRF Token
  - 双重Cookie验证

7. 同源检测策略

在HTTP协议中，每一个异步请求都会携带两个Header，用于标记来源域名：

- Origin Header
  - 字段内包含请求的域名（不包含path及query）
  - 但是IE11不会在跨站CORS请求上添加Origin标头，Referer头将仍然是唯一的标识。
  - 在302重定向之后Origin不包含在重定向的请求中
- Referer Header
  - 记录了该HTTP请求的来源地址。
  - 对于Ajax请求，图片和script等资源请求，Referer为发起请求的页面地址。对于页面跳转，Referer为打开页面历史记录的前一个页面地址。
  - 在部分情况下，攻击者可以隐藏，甚至修改自己请求的Referer。
  - 设置Referrer Policy的方法有三种：
    - 在CSP设置
    - 页面头部增加meta标签
    - a标签增加referrerpolicy属性
- CSRF Token
  - 前面讲到CSRF的另一个特征是，攻击者无法直接窃取到用户的信息（Cookie，Header，网站内容等），仅仅是冒用Cookie中的信息。
  - 我们可以要求所有的用户请求都携带一个CSRF攻击者无法获取到的Token。服务器通过校验请求是否携带正确的Token，来把正常的请求和攻击的请求区分开，也可以防范CSRF的攻击。
- 双重Cookie验证
  - 无需使用Session，适用面更广，易于实施。
  - Token储存于客户端中，不会给服务器带来压力。
  - 相对于Token，实施成本更低，可以在前后端统一拦截校验，而不需要一个个接口和页面添加。
  - Cookie中增加了额外的字段。
  - 如果有其他漏洞（例如XSS），攻击者可以注入Cookie，那么该防御方式失效。
  - 难以做到子域名的隔离。
  - 为了确保Cookie传输安全，采用这种防御方式的最好确保用整站HTTPS的方式，如果还没切HTTPS的使用这种方式也会有风险。

- Samesite Cookie属性
  - 为Set-Cookie响应头新增Samesite属性，它用来标明这个 Cookie是个“同站 Cookie”，同站Cookie只能作为第一方Cookie，不能作为第三方Cookie，Samesite 有两个属性值，分别是 Strict 和 Lax
  - Samesite=Strict：表明这个 Cookie 在任何情况下都不可能作为第三方 Cookie，绝无例外。
```js
Set-Cookie: foo=1; Samesite=Strict
Set-Cookie: bar=2; Samesite=Lax
Set-Cookie: baz=3
```

我们在 a.com 下发起对 b.com 的任意请求，foo 这个 Cookie 都不会被包含在 Cookie 请求头中，但 bar 会。举个实际的例子就是，假如淘宝网站用来识别用户登录与否的 Cookie 被设置成了 Samesite=Strict，那么用户从百度搜索页面甚至天猫页面的链接点击进入淘宝后，淘宝都不会是登录状态，因为淘宝的服务器不会接受到那个 Cookie，其它网站发起的对淘宝的任意请求都不会带上那个 Cookie。




这两个Header在浏览器发起请求时，大多数情况会自动带上，并且不能由前端自定义内容。 服务器可以通过解析这两个Header中的域名，确定请求的来源域。





### 说一下HTTP中的四次挥手

#### 先说三次握手吧
- 三次握手（Three-way Handshake）其实就是指建立一个TCP连接时，需要客户端和服务器总共发送3个包。进行三次握手的主要作用就是为了确认双方的接收能力和发送能力是否正常、指定自己的初始化序列号为后面的可靠性传送做准备。实质上其实就是连接服务器指定端口，建立TCP连接，并同步连接双方的序列号和确认号，交换TCP窗口大小信息。


作者：猿人谷
链接：https://juejin.cn/post/6844903958624878606
来源：掘金
著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。
| 行为 | 事件 | client状态 | server状态 |
| ---- | ---- | ---- | ---- |
| 初始 | ---- | Closed | Listen |
| 第一次握手 | client发送SYN给server，携带ISN序列号 | SYN_SEND | Listen |
| 第二次握手 | server收到SYN报文以自己的SYN作为应答，客户端ISN+1作为ACK | SYN_SEND | SYN_RCVD |
| 第三次次握手 | client收到server发来的ACK和SYN，再发一个ACK（ISN再+1） | ESTABLISHED | ESTABLISHED |

#### 那么四次挥手来了

- 第一次挥手：客户端发送一个 FIN 报文，报文中会指定一个序列号。此时客户端处于 FIN_WAIT1 状态。
即发出连接释放报文段（FIN=1，序号seq=u），并停止再发送数据，主动关闭TCP连接，进入FIN_WAIT1（终止等待1）状态，等待服务端的确认。
- 第二次挥手：服务端收到 FIN 之后，会发送 ACK 报文，且把客户端的序列号值 +1 作为 ACK 报文的序列号值，表明已经收到客户端的报文了，此时服务端处于 CLOSE_WAIT 状态。
即服务端收到连接释放报文段后即发出确认报文段（ACK=1，确认号ack=u+1，序号seq=v），服务端进入CLOSE_WAIT（关闭等待）状态，此时的TCP处于半关闭状态，客户端到服务端的连接释放。客户端收到服务端的确认后，进入FIN_WAIT2（终止等待2）状态，等待服务端发出的连接释放报文段。
- 第三次挥手：如果服务端也想断开连接了，和客户端的第一次挥手一样，发给 FIN 报文，且指定一个序列号。此时服务端处于 LAST_ACK 的状态。
即服务端没有要向客户端发出的数据，服务端发出连接释放报文段（FIN=1，ACK=1，序号seq=w，确认号ack=u+1），服务端进入LAST_ACK（最后确认）状态，等待客户端的确认。
- 第四次挥手：客户端收到 FIN 之后，一样发送一个 ACK 报文作为应答，且把服务端的序列号值 +1 作为自己 ACK 报文的序列号值，此时客户端处于 TIME_WAIT 状态。需要过一阵子以确保服务端收到自己的 ACK 报文之后才会进入 CLOSED 状态，服务端收到 ACK 报文之后，就处于关闭连接了，处于 CLOSED 状态。
  - 即客户端收到服务端的连接释放报文段后，对此发出确认报文段（ACK=1，seq=u+1，ack=w+1），客户端进入TIME_WAIT（时间等待）状态。此时TCP未释放掉，需要经过时间等待计时器设置的时间2MSL后，客户端才进入CLOSED状态。

- 问题1：为什么挥手需要四次？
  - 因为当服务端收到客户端的SYN连接请求报文后，可以直接发送SYN+ACK报文。其中ACK报文是用来应答的，SYN报文是用来同步的。但是关闭连接时，当服务端收到FIN报文时，很可能并不会立即关闭SOCKET，所以只能先回复一个ACK报文，告诉客户端，"你发的FIN报文我收到了"。只有等到我服务端所有的报文都发送完了，我才能发送FIN报文，因此不能一起发送。故需要四次挥手。

- 问题2：2MSL等待状态出现的原因？
  - TIME_WAIT状态也成为2MSL等待状态。每个具体TCP实现必须选择一个报文段最大生存时间MSL（Maximum Segment Lifetime），它是任何报文段被丢弃前在网络内的最长时间。这个时间是有限的，因为TCP报文段以IP数据报在网络内传输，而IP数据报则有限制其生存时间的TTL字段。
  - **为了保证客户端发送的最后一个ACK报文段能够到达服务器。**因为这个ACK有可能丢失，从而导致处在LAST-ACK状态的服务器收不到对FIN-ACK的确认报文。服务器会超时重传这个FIN-ACK，接着客户端再重传一次确认，重新启动时间等待计时器。最后客户端和服务器都能正常的关闭。假设客户端不等待2MSL，而是在发送完ACK之后直接释放关闭，一但这个ACK丢失的话，服务器就无法正常的进入关闭连接状态。



### 自研框架mpx