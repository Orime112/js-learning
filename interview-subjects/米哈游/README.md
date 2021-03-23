## 问题

### 一、有没有做过混合式开发？
- tips:`webview`，`hybrid概念`

#### hybrid概念
- 移动应用可以分为是三种：
  - 原生应用(native app)， 
  - 网页应用(web app，或HTML5 app)，
  - 以及它们的混血儿——混合模式移动应用(hybrid app)。
- hybrid APP的优势
  - Hybrid app从外观上来看是一个native app，实则只有一个UIWebView，里面访问的是一个web app，如新闻类和视频类的应用普遍采取该策略：native的框架加上web的内容。不同于native app需要针对不同的平台使用不同的开发语言（如使用Objective-C、Swift开发iOS应用，使用Java等开发Android应用，使用C#开发Windows Phone应用），hybrid app允许开发者仅使用一套网页语言代码（HTML5+CSS+JavaScript），即可开发能够在不同平台上部署的类原生应用 。由于hybrid app结合了native app良好用户交互体验和web app跨平台开发的优势，能够显著节省移动应用开发的时间和成本，hybrid app得到越来越多公司的青睐。
- hybrid app通常可以分为三种类型：
  - 多View混合型：native view和web view独立展示，交替出现。 其应用主体通常是native app，web技术作为补充。即在需要的时候，将web view作为独立的view运行，在web view内完成相关的展示操作。
  - 单View混合型：在同一个view内，native view和web view为层叠关系，同时出现。开发成本较高，难度较大，但是体验较好。
  - Web主体型：应用主体是web view，穿插native功能，主要以网页语言编写。整体开发难度低，基本可以实现跨平台；而用户体验好坏，主要取决于底层中间件的交互与跨平台能力。举个栗子：项目管理工具 Basecamp使用web view呈现内容，调用系统原生API实现界面导航等功能来提高用户体验。
- hybrid APP的缺点
  - Hybrid app也并非是完美的解决方案。由于其使用HTML5，某些依赖于复杂的原生功能或者繁重的过渡动画的应用会出现卡顿；同时，为了模拟native app的UI和感官，需要投入额外的时间和精力；尽管可以跨平台，但是并不能完全支持所有的设备和操作系统；最后，如果应用的体验不够原生化，如一个简单的网站，则还有被Apple App Store拒绝的风险。
- 什么时候应该选择hybrid app
  - 如果要设计Angry Birds一类对图形要求很高的游戏，那么在暂不考虑技术团队能力的情况下，native app是最优选择；如果要设计如Yelp一类内容导向的应用，那么hybrid app会是很好的选择；如果项目时间紧张，没有足够的人手和资金，对图形和系统原生特性没有要求，那么web app将是性价比最高的解决方案。
- native app, hybrid app和web app在不同方面的表现

![](https://pic4.zhimg.com/80/fbef93a321aa34a02c44edc7ceee9def_720w.png)






#### 关于webView有什么需要注意的？
- webview的概念
  - WebView对象允许您将Web内容显示为活动布局的一部分，但缺少一些完全开发的浏览器的功能。 当您需要增强对UI的控制和高级配置选项时，WebView很有用。这些选项允许您将网页嵌入到为应用程序专门设计的环境中。
  - webview就是在混合应用中存在的H5页面。一个用来展示网页的view组件，使用webkit渲染引擎来展示（iOS）。一款webkit内核浏览器，含有前进后退，没有地址栏。
- webview如何与native进行通信
  - jsBridge用来webview页面和native通讯的
- 什么是jsBridge？
  - 翻译成“桥”，一端链接web，一端链接native，通过jsBridge可以调用native提供出来的方法。
```js
// 使用native方法前，需要先判断StockJSBridge是否已经被挂在了window上

  waitForJSBridge() {
    return new Promise((resolve) => {
      if (!window.StockJSBridge) {
        document.addEventListener('StockJSBridgeReady', resolve);
      } else {
        resolve();
      }
    });
  }
  
// 拉起分享框
  openShareView(config: SdkShareConfig): Promise<any> {
    return this.waitForJSBridge().then(() => {
        window.StockJSBridge.invoke('openShareView', {
          to: config.platform || ['wx', 'pyq', 'qq', 'qzone'],
          type: config.type,
          params: {
            title: config.title,
            summary: config.description,
            url: config.link,
            image: config.image,
            iconUrl: config.image,
          },
        });
    });
  }
```
- webview的优化
  - 打开webview页面很明显比native页面慢，其中一个原因是webview初始化需要时间，为了更快打开webview页面，在打开APP时，提前初始化webview，等需要的时候就派上场了。这个做法的弊端：会让APP的内存增加。衡量利弊，控制初始化的webview数量以及做好webview内存的释放




### 二、实现动画有哪几种方式？
- tips:`css的媒体查询`，`css的transition`，`js的requestAnimationFrame`

#### 前端实现动画的方式
通常在前端中，实现动画的方案主要有6种：
- javascript直接实现；
- SVG（可伸缩矢量图形）；
- CSS3 transition；
- CSS3 animation；
- Canvas动画；
- requestAnimationFrame；

- js的`setInterval`实现
  - [源码](./animation/01.JavaScript定时器实现动画.html)
  - 缺点：缺点：javascript 实现动画通常会导致页面频繁性重排重绘，消耗性能，一般应该在桌面端浏览器。在移动端上使用会有明显的卡顿

>16ms 的问题：一般认为人眼能辨识的流畅动画为每秒 60 帧，这里 16ms 比(1000ms/60)帧略小一些，但是一般可仍为该动画是流畅的。 在很多移动端动画性能优化时，一般使用 16ms 来进行节流处理连续触发的浏览器事件。例如对touchmove、scroll事件进行节流等。通过这种方式减少持续事件的触发频率，可以大大提升动画的流畅性

- svg实现东湖
  - [源码](./animation/02.svg实现动画.html)

- canvas实现动画
  - [源码](./animation/03.canvas实现动画.html)

- transition
  - transition是过度动画。但是transition并不能实现独立的动画，只能在某个标签元素样式或状态改变时进行平滑的动画效果过渡，而不是马上改变。

> 在移动端开发中，直接使用transition动画会让页面变慢甚至卡顿。所以我们通常添加transform:translate3D(0,0,0)或transform:translateZ(0)来开启移动端动画的GPU加速，让动画过程更加流畅。

- animation
  - animation算是真正意义上的CSS3动画。通过对关键帧和循环次数的控制，页面标签元素会根据设定好的样式改变进行平滑过渡。而且关键帧状态的控制是通过百分比来控制的。
  - [源码](./animation/04.css3动画animation.html)

> CSS3最大的优势是摆脱了js的控制，并且能利用硬件加速以及实现复杂动画效果。

animation属性是一个简写属性，用于设置六个动画属性：

- animation-name
- animation-duration
- animation-timing-function
- animation-delay
- animation-iteration-count
- animation-direction

```css
animation: name duration timing-function delay iteration-count direction;
```

- transition实现动画
  - 用来设置样式的属性值是如何从一种状态平滑过渡到另外一种状态
  - 可以和`transform`属性一起使用，比如：

```css
div{
	width:100px;
	height:100px;
	background-color: pink;
	margin: 100px;
	transition: all 1s;
}
div:hover{
	transform: scale(2) rotate(360deg);
}
```
  - [源码](./animation/05.transition实现动画.html)

```css
/* 简写语法 */
div {
    transition: <property> <duration> <timing-function> <delay>;
}
```

- requestAnimationFrame
  - [源码](./animation/06.RAF实现动画.html)
  - 语法`window.requestAnimationFrame(callback)`
  - window.requestAnimationFrame()：告诉浏览器——你希望执行一个动画，并且要求浏览器在下次重绘之前调用指定的回调函数更新动画。该方法需要传入一个回调函数作为参数，该回调函数会在浏览器下一次重绘之前执行.
  - callback：下一次重绘之前更新动画帧所调用的函数(即上面所说的回调函数)。该回调函数会被传入DOMHighResTimeStamp参数，该参数与performance.now()的返回值相同，它表示requestAnimationFrame() 开始去执行回调函数的时刻。
  - 返回值：一个 long 整数，请求 ID ，是回调列表中唯一的标识。是个非零值，没别的意义。你可以传这个值给 window.cancelAnimationFrame() 以取消回调函数。


#### 既然你说到了requestAnimationFrame，那么它的原理是什么？
- 屏幕刷新率：当你对着电脑屏幕什么也不做的情况下，显示器也会以每秒60次的频率正在不断的更新屏幕上的图像。为什么你感觉不到这个变化？ 那是因为人的眼睛有视觉停留效应，即前一副画面留在大脑的印象还没消失，紧接着后一副画面就跟上来了，这中间只间隔了16.7ms(1000/60≈16.7)， 所以会让你误以为屏幕上的图像是静止不动的。而屏幕给你的这种感觉是对的，试想一下，如果刷新频率变成1次/秒，屏幕上的图像就会出现严重的闪烁，这样就很容易引起眼睛疲劳、酸痛和头晕目眩等症状。

- 根据上面的原理我们知道，你眼前所看到图像正在以每秒60次的频率刷新，由于刷新频率很高，因此你感觉不到它在刷新。而动画本质就是要让人眼看到图像被刷新而引起变化的视觉效果，这个变化要以连贯的、平滑的方式进行过渡。 那怎么样才能做到这种效果呢？

  - 刷新频率为60Hz的屏幕每16.7ms刷新一次，我们在屏幕每次刷新前，将图像的位置向左移动一个像素，即1px。这样一来，屏幕每次刷出来的图像位置都比前一个要差1px，因此你会看到图像在移动；由于我们人眼的视觉停留效应，当前位置的图像停留在大脑的印象还没消失，紧接着图像又被移到了下一个位置，因此你才会看到图像在流畅的移动，这就是视觉效果上形成的动画。

- 为什么不用setTimeout？
  - 理解了上面的概念以后，我们不难发现，setTimeout 其实就是通过设置一个间隔时间来不断的改变图像的位置，从而达到动画效果的。但我们会发现，利用seTimeout实现的动画在某些低端机上会出现卡顿、抖动的现象。 这种现象的产生有两个原因：
  - setTimeout的执行时间不是确定的（实际执行比预设要稍晚一些）
  - setTimeout无法适配不同刷新频率的屏幕（比如60hz和10hz的）
  - 丢帧现象，这种现象就会引起动画卡顿。

- 为什么`requestAnimationFrame`不会丢帧？
  - 与setTimeout相比，requestAnimationFrame最大的优势是由系统来决定回调函数的执行时机。具体一点讲，如果屏幕刷新率是60Hz,那么回调函数就每16.7ms被执行一次，如果刷新率是75Hz，那么这个时间间隔就变成了1000/75=13.3ms，换句话说就是，requestAnimationFrame的步伐跟着系统的刷新步伐走。它能保证回调函数在屏幕每一次的刷新间隔中只被执行一次，这样就不会引起丢帧现象，也不会导致动画出现卡顿的问题。

- 更多优势
  - CPU节能：使用setTimeout实现的动画，当页面被隐藏或最小化时，setTimeout 仍然在后台执行动画任务，由于此时页面处于不可见或不可用状态，刷新动画是没有意义的，完全是浪费CPU资源。而requestAnimationFrame则完全不同，当页面处理未激活的状态下，该页面的屏幕刷新任务也会被系统暂停，因此跟着系统步伐走的requestAnimationFrame也会停止渲染，当页面被激活时，动画就从上次停留的地方继续执行，有效节省了CPU开销。
  - 函数节流：在高频率事件(resize,scroll等)中，为了防止在一个刷新间隔内发生多次函数执行，使用requestAnimationFrame可保证每个刷新间隔内，函数只被执行一次，这样既能保证流畅性，也能更好的节省函数执行的开销。一个刷新间隔内函数执行多次时没有意义的，因为显示器每16.7ms刷新一次，多次绘制并不会在屏幕上体现出来。

- `polyfill`

```js
if (!Date.now)
    Date.now = function() { return new Date().getTime(); };
(function() {
    'use strict';
    var vendors = ['webkit', 'moz'];
    for (var i = 0; i < vendors.length && !window.requestAnimationFrame; ++i) {
        var vp = vendors[i];
        window.requestAnimationFrame = window[vp+'RequestAnimationFrame'];
        window.cancelAnimationFrame = (window[vp+'CancelAnimationFrame']
                                   || window[vp+'CancelRequestAnimationFrame']);
    }
    if (/iP(ad|hone|od).*OS 6/.test(window.navigator.userAgent) // iOS6 is buggy
        || !window.requestAnimationFrame || !window.cancelAnimationFrame) {
        var lastTime = 0;
        window.requestAnimationFrame = function(callback) {
            var now = Date.now();
            var nextTime = Math.max(lastTime + 16, now);
            return setTimeout(function() { callback(lastTime = nextTime); },
                              nextTime - now);
        };
        window.cancelAnimationFrame = clearTimeout;
    }
}());

```



### 三、平时做过性能优化吗？
- tips：`没做过也得说做过`，`首屏加载时间（白屏时间）优化`，`用户交互优化`，`js代码分包`，`预请求和预解析`，`缓存优化`

- 参考：[路白/01.做过哪些前端性能优化](../路白/01.做过哪些前端性能优化.md)
  - 总结：异步加载，缩减体积，时序优化，巧用缓存

### 既然你说到了js代码分包，那谈一下webpack中如何做性能优化吧？
- 我认为分为两种情况：开发打包优化+生产打包优化；
- 参考：[浅谈 webpack 性能优化（内附 webpack 学习笔记） - 知乎](https://zhuanlan.zhihu.com/p/139498741)
- webpack4.0版本升级带来的优化
  - v8 引擎带来的优化（for of 替代 forEach、Map 和 Set 替代 Object、includes 替代 indexOf）
  - 默认使用更快的 md4 hash 算法
  - webpack AST 可以直接从 loader 传递给 AST，减少解析时间
  - 使用字符串方法替代正则表达式

- 压缩js:` terser-webpack-plugin `（生产模式下默认使用）
  - 可以通过设置`parallel`启用多进程压缩

```js
// config/webpack.common.js
const TerserPlugin = require('terser-webpack-plugin');
// ...
const commonConfig = {
  // ...
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
      }),
    ],
  },
  // ...
}
```

- 压缩CSS：`optimize-css-assets-webpack-plugin`（默认压缩引擎为cssnano）

```js
// config/webpack.prod.js
const OptimizeCSSAssetsPlugin = require("optimize-css-assets-webpack-plugin");
// ...
const prodConfig = {
  // ...
  optimization: {
    minimizer: [
      new OptimizeCSSAssetsPlugin({
        assetNameRegExp: /\.optimize\.css$/g,
        cssProcessor: require('cssnano'),
        cssProcessorPluginOptions: {
          preset: ['default', { discardComments: { removeAll: true } }],
        },
        canPrint: true,
      })
    ]
  },
}
```

- 压缩图片：`image-webpack-loader`
```js
{
  loader: 'image-webpack-loader',
  options: {
    // 压缩 jpeg 的配置
    mozjpeg: {
      progressive: true,
      quality: 65
    },
    // 使用 imagemin**-optipng 压缩 png，enable: false 为关闭
    optipng: {
      enabled: false,
    },
    // 使用 imagemin-pngquant 压缩 png
    pngquant: {
      quality: '65-90',
      speed: 4
    },
    // 压缩 gif 的配置
    gifsicle: {
      interlaced: false,
    },
    // 开启 webp，会把 jpg 和 png 图片压缩为 webp 格式
    webp: {
      quality: 75
    }
  }
}
```

- `treeShaking`剔除无用模块

- `splitChunks`分割异步代码(all)属性同步也分割

- `resolve`可优化配置为：
  - `resolve.extensions`，`resolve.extensions= ['js', 'json']`，我们应该把常用到的文件后缀写在前面，或者 我们导入模块时，尽量带上文件后缀名。
  - `resolve.modules`：这个属性告诉 webpack 解析模块时应该搜索的目录，绝对路径和相对路径都能使用。使用绝对路径之后，将只在给定目录中搜索，从而减少模块的搜索层级：

```js
  resolve: {
    extensions: ['.js', '.jsx'],
    mainFiles: ['index', 'list'],
    alias: {
      alias: path.resolve(__dirname, '../src/alias'),
    },
    modules: [
      path.resolve(__dirname, 'node_modules'), // 指定当前目录下的 node_modules 优先查找
      'node_modules', // 将默认写法放在后面
    ]
  },
```

- `resolve.alias` 减少查找过程：还比如我们经常使用的 react 库，其实我们可以直接使用其 dist 目录下打包好的 react.min.js，这样就能跳过耗时的模块解析，具体示例配置如下：

```js
    alias: {
      react: path.resolve(__dirname, './node_modules/react/dist/react.min.js'),
      @alias: path.resolve(__dirname, '../src/alias'),
    },
```

- loader范围约束:排除 Webpack 不需要解析的模块，即使用 loader 的时候，在尽量少的模块中去使用。我们可以借助 include 和 exclude 这两个参数，规定 loader 只在那些模块应用和在哪些模块不应用。`exclude: /node_modules/,`，`include: path.resolve(__dirname, '../src'),`

- `happyPack`多线程打包：推荐我们使用 webpack 官方 `thread-loader`用法：使用很简单，直接在我们使用的 loader 之前加上 thread-loader 就行

```js
      test: /\.jsx?$/, 
      // exclude: /node_modules/,
      // include: path.resolve(__dirname, '../src'), 
      use: [
        {
          loader: 'thread-loader',
          options: {
            workers: 3, // 开启几个 worker 进程来处理打包，默认是 os.cpus().length - 1
          }
        },
        'babel-loader'
      ]
```

- dll方案以被主流cli弃用

- `babel-loader`启用cache缓存
```js
        {
          loader: 'babel-loader',
          options: {
            cacheDirectory: true,
          }
        },
```

- `TerserPlugin`启用缓存

```js
  optimization: {
    minimize: true,
    minimizer: [
      new TerserPlugin({
        parallel: 4, // 开启几个进程来处理压缩，默认是 os.cpus().length - 1
        cache: true,
      }),
    ],
  },
```

- HardSourceWebpackPlugin亲测有bug

- 开发环境下合理使用source-map
  - webpack 5.x版本与下图有较大差异
  - 模板为`[inline|eval]-[cheap]-[module]-source-map`

![](https://cdn.jsdelivr.net/gh/orime/picbed/img/20210322173807.png)

- 使用 ES6 Modules 语法，以保证 Tree-Shaking 起作用
  - 因为 tree-shaking 只对 ES6 Modules 静态引入生效，对于类似于 CommonJs 的动态引入方式是无效的
- 合理使用 Ployfill
  - 如果我们对于引入的 polyfill 不做处理的话，Webpack 会把所有的 Polyfill 都加载进来，导致产出文件过大。推荐使用 @babel/preset-env 的 useBuiltIns='usage' 方案，此配置项会根据浏览器的兼容性帮助我们按需引入所需的垫片；此外我们也可以使用动态 polyfill 服务，每次根据浏览器的 User Agent，下发不同的 Polyfill，具体可以参考 polyfill.io。
- 预加载资源 webpackPrefetch
  - 使用 webpackPrefetch 来提前预加载一些资源，意思就是 将来可能需要一些模块资源，在核心代码加载完成之后带宽空闲的时候再去加载需要用到的模块代码。
- icon 类图片使用 css Sprite 来合并图片
  - 如果 icon 类图片太多的话，就使用雪碧图合成一张图片，减少网络请求，或者使用字体文件。
- html-webpack-externals-plugin
  - 此插件可以将一些公用包提取出来使用 cdn 引入，不打入 bundle 中，从而减少打包文件大小，加快打包速度。
- 合理配置 chunk 的哈希值
  - 在生产环境打包，一定要配置文件的 hash，这样有助于浏览器缓存我们的文件，当我们的代码文件没变化的时候，用户就只需要读取浏览器缓存的文件即可。一般来说 javascript 文件使用 [chunkhash]、css 文件使用 [contenthash]、其他资源（例如图片、字体等）使用 [hash]。

#### 看来你对webpack玩得很6了，那说一下webpack中打包前后分别如何优化吧？
- 打包前：
  - 多入口分包
  - devtool:`eval-cheap-module-source-map`
  - splitChunks: `chunks: all`
  - devServer: `hot: true`
  - cache
- 打包后：
  - optimization -> optimizer -> `new require('terser-webpack-plugin')({parallel: 4})`
  - optimization -> optimizer -> `new require('optimize-css-assets-webpack-plugin')({cssProcessor: require('cssnano'),})`
  - splitChunks
  - prefetch

### 四、你说到了缓存优化，那么说一下缓存类型和区别吧？

- 缓存类型（自定为三种）
  - 不缓存：`Cache-Control: no-store`
  - 强缓存：
    - HTTP/1.0:`Expires: Wed, 22 Nov 2019 08:41:00 GMT`
    - HTTP/1.1:`Cache-Control:max-age=3600`
  - 协商缓存
    - `Cache-Control: no-cache`
    - `res.setHeader('last-modified', new Date().toUTCString())` -> `new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()`
    - `res.setHeader('Etag', hash)` -> `req.headers['if-none-match'] === hash`

- 测试用例
```js
const http = require('http')

function updateTime(){
  return new Date().toUTCString()
}

http.createServer((req, res) => {
  const { url } = req
  if( url === '/'){
    res.end(`
      <html>
        HTML Update Time ${updateTime()}
        <script src='main.js'></script>
      </html>
    `)
  } else if (url === '/main.js') {
    const content = `document.writeln('<br> JS Update Time: ${updateTime()}')`
    // ? 测试2：强缓存 HTTP 1.0 expires ---> Expires 10秒中内强缓存
    res.setHeader('Expires', new Date(Date.now() + 10*1000).toUTCString())
    // ? 测试3：强缓存 HTTP 1.1 max-age ---> 优先级高于 Expires
    res.setHeader('Cache-Control', 'max-age=20')

    // ! 更改缓存策略为 协商缓存
    res.setHeader('Cache-Control', 'no-cache')

    // ? 测试4：协商缓存 last-modified
    res.setHeader('last-modified', new Date().toUTCString())
    if(new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()){
      console.log('协商缓存命中')
      res.statusCode = 304
      res.end()
      return
    }

    // ? 测试5：Etag 方式进行缓存校验
    // 对内容进行 Hash 操作
    const crypto = require('crypto')
    const hash = crypto.createHash('sha1').update(content).digest('hex')
    res.setHeader('Etag', hash)
    if(req.headers['if-none-match'] === hash) {
      console.log('Etag 协商缓存命中')
      res.statusCode = 304
      res.end()
      return
    }

    res.statusCode = 200
    res.end(content)
  } else if(url === '/favicon.ico'){
    res.end('')
  }
})
.listen(7777, () => console.log('Server is running at http://localhost:7777'))
```

- 区别：
  - Etag比last-modified精准，但是耗费计算性能
  - Etag优先级更高（服务器优先考虑）

#### 那么说一下缓存位置吧

- 缓存位置有四种：（优先级从上到下）
  - Service Worker
  - Memory Cache
  - Disk Cache
  - Push Cache

- 规则：
  - 比较大的JS、CSS文件会直接被丢进磁盘，反之丢进内存
  - 内存使用率比较高的时候，文件优先进入磁盘

#### 缓存跟HTTP版本有很大关系吧，那介绍一下你理解的HTTP协议吧？
- 状态码
  - 1xx: 表示目前是协议处理的中间状态，还需要后续操作。
    - 101 Switching Protocols。在HTTP升级为WebSocket的时候，如果服务器同意变更，就会发送状态码 101。
  - 2xx: 表示成功状态。
    - 200 OK是见得最多的成功状态码。通常在响应体中放有数据。
    - 204 No Content含义与 200 相同，但响应头后没有 body 数据
    - 206 Partial Content顾名思义，表示部分内容，它的使用场景为 HTTP **分块下载和断点续传**，当然也会带上相应的响应头字段Content-Range
  - 3xx: 重定向状态，资源位置发生变动，需要重新请求。
    - 301 Moved Permanently即永久重定向
      - 比如你的网站从 HTTP 升级到了 HTTPS 了，以前的站点再也不用了，应当返回301，这个时候浏览器默认会做缓存优化，在第二次访问的时候自动访问重定向的那个地址。
    - 对应着302 Found，即临时重定向
      - 而如果只是暂时不可用，那么直接返回302即可，和301不同的是，浏览器并不会做缓存优化
    - 304 Not Modified: 当协商缓存命中时会返回这个状态码
  - 4xx: 请求报文有误。
    - 400 Bad Request: 开发者经常看到一头雾水，只是笼统地提示了一下错误，并不知道哪里出错了
    - 403 Forbidden: 这实际上并不是请求报文出错，而是服务器禁止访问，原因有很多，比如法律禁止、信息敏感
    - 404 Not Found: 资源未找到，表示没在服务器上找到相应的资源
    - 405 Method Not Allowed: 请求方法不被服务器端允许
    - 406 Not Acceptable: 资源无法满足客户端的条件
  - 5xx: 服务器端发生错误。
    - 500 Internal Server Error: 仅仅告诉你服务器出错了，出了啥错咱也不知道

- 报文结构：起始行 + 头部 + 空行 + 实体
  - 起始行：
    - 请求叫起始行：`GET /home HTTP/1.1` -> `请求方法 路径 HTTP版本`
    - 响应叫状态行：`HTTP/1.1 200 OK` -> `HTTP版本 状态码 原因`

![](https://cdn.jsdelivr.net/gh/orime/picbed/img/20210322180247.png)
![](https://cdn.jsdelivr.net/gh/orime/picbed/img/20210322180255.png)

  - 请求头或响应头格式
    - 字段名不区分大小写
    - 字段名不允许出现空格，不可以出现下划线_
    - 字段名后面必须紧接着:

- HTTP特点
  - 无状态：每次 http 请求都是独立、无关的，默认不需要保留状态信息
  - 可靠传输：HTTP 基于 TCP/IP，因此把这一特性继承了下来。

### 四、平时工作中的跨域问题怎么处理？
- tips：`远古方案jsonp`,`客户端正向代码`,`服务端反向代理`,`服务端跨域资源请求CORS`

- JSONP：script标签可以通过 src 填上目标地址从而发出 GET 请求，实现跨域请求并拿到响应。
  - 和CORS相比，JSONP 最大的优势在于兼容性好，IE 低版本不能使用 CORS 但可以使用 JSONP，缺点也很明显，请求方法单一，只支持 GET 请求

- CORS：跨域资源共享
  - 简单请求：
    - 请求方法为 GET、POST 或者 HEAD
    - 请求头的取值范围: Accept、Accept-Language、Content-Language、Content-Type(只限于三个值application/x-www-form-urlencoded、multipart/form-data、text/plain)

> 它会自动在请求头当中，添加一个Origin字段，用来说明请求来自哪个源。服务器拿到请求之后，在回应时对应地添加Access-Control-Allow-Origin字段，如果Origin不在这个字段的范围中，那么浏览器就会将响应拦截

  - 非简单请求：
    - 非简单请求相对而言会有些不同，体现在两个方面: 预检请求和响应字段
```js
// 预检请求格式
OPTIONS / HTTP/1.1
Origin: 当前地址
Host: xxx.com
Access-Control-Request-Method: PUT
Access-Control-Request-Headers: X-Custom-Header
```

- Nginx
  - Nginx 是一种高性能的反向代理服务器，可以用来轻松解决跨域问题

![](https://user-gold-cdn.xitu.io/2020/3/22/170ffd97d0b1cf15?imageView2/0/w/1280/h/960/format/webp/ignore-error/1)
  - 比如说现在客户端的域名为client.com，服务器的域名为server.com，客户端向服务器发送 Ajax 请求，当然会跨域了，那这个时候让 Nginx 登场了，通过下面这个配置
  - Nginx 相当于起了一个跳板机，这个跳板机的域名也是client.com，让客户端首先访问 client.com/api，这当然没有跨域，然后 Nginx 服务器作为反向代理，将请求转发给server.com，当响应返回时又将响应给到客户端，这就完成整个跨域请求的过程

```bash
server {
  listen  80;
  server_name  client.com;
  location /api {
    proxy_pass server.com;
  }
}
```

- WebSocket，不属于HTTP范畴了

- webpack中配置正向代理
```js
module.exports = {
    ...,    //其他配置不列了
    devServer: {
        ...,    //其他配置不列了
        proxy: {
            //在这里配置~~~
        }
    }
}

proxy: {
  "/api": {
    target: "http://localhost:3000",
    pathRewrite: {"^/api" : ""}
  }
}
```

#### 既然你说到了CORS，那说一下它的原理吧
- CORS原理只需要向响应头header中注入Access-Control-Allow-Origin，这样浏览器检测到header中的Access-Control-Allow-Origin，则就可以跨域操作了
- 整个CORS通信过程，都是浏览器自动完成，不需要用户参与。对于开发者来说，CORS通信与同源的AJAX通信没有差别，代码完全一样。浏览器一旦发现AJAX请求跨源，就会自动添加一些附加的头信息，有时还会多出一次附加的请求，但用户不会有感觉。
  - 因此，实现CORS通信的关键是服务器。只要服务器实现了CORS接口，就可以跨源通信。

#### 这个CORS除了跨域之外还有什么用途？
- 配合referer做防盗链（自己想的可能做不了）
  - 防盗链是利用浏览器Http请求头Referer，告诉服务器谁访问资源，由服务器作判断，如果符合一定规则则返回数据，否则返回403

* 由 [`XMLHttpRequest`](https://developer.mozilla.org/zh-CN/docs/Web/API/XMLHttpRequest) 或 [Fetch](https://developer.mozilla.org/en-US/docs/Web/API/Fetch_API) 发起的跨源 HTTP 请求。
* Web 字体 (CSS 中通过` @font-face `使用跨源字体资源)，[因此，网站就可以发布 TrueType 字体资源，并只允许已授权网站进行跨站调用](https://www.w3.org/TR/css-fonts-3/#font-fetching-requirements "https://www.w3.org/TR/css-fonts-3/#font-fetching-requirements")。
* [WebGL 贴图](https://developer.mozilla.org/zh-CN/docs/Web/API/WebGL_API/Tutorial/Using_textures_in_WebGL)
* 使用 `[drawImage](https://developer.mozilla.org/en-US/docs/Web/API/CanvasRenderingContext2D/drawImage)` 将 Images/video 画面绘制到 canvas

### 五、杭州有一万块钱租房补贴吗？
- ……