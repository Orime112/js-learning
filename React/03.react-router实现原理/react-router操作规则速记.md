以下是常用使用方式举例，建议收藏以备不时之需。

安装
--

输入以下命令进行安装：

```
// npm  
npm install react-router-dom

// yarn  
yarn add react-router-dom

```

react-router相关标签
----------------

```react-router```常用的组件有以下八个：

```js
import {   
  BrowserRouter,  
  HashRouter,  
  Route,  
  Redirect,  
  Switch,  
  Link,  
  NavLink,  
  withRouter,  
} from 'react-router-dom'  
```

简单路由跳转
------

实现一个简单的一级路由跳转

```js
import {   
    BrowserRouter as Router,   
    Route,   
    Link   
} from 'react-router-dom'  
import Home from './home'  
import About from './about'

function App() {  
  return (  
    <div className="App">  
      <Router>  
        <Link to="/home" className="link">跳转Home页面</Link>  
        <Link to="/about" className="link">跳转About页面</Link>  
        <Route path="/home" component={Home}/>  
        <Route path="/about" component={About}/>  
      </Router>  
    </div>  
  );  
}

export default App;

```

**效果如下：**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/gMvNo9rxo41dbk6cA1ibMYx5mSsoCqZ5DnMw1KibusiaFnCia2V8253va6N2dgsxQoByzBj0CjWPLNUnwuzLkBfG0A/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**要点总结：**  

1.  ```Route```组件必须在```Router```组件内部
    
2.  ```Link```组件的```to```属性的值为点击后跳转的路径
    
3.  ```Route```组建的```path```属性是与```Link```标签的```to```属性匹配的; ```component```属性表示```Route```组件匹配成功后渲染的组件对象
    

嵌套路由跳转
------

```React``` 的路由匹配层级是有顺序的

例如，在 ```App``` 组件中，设置了两个路由组件的匹配路径，分别是 ```/home``` 和 ```/about```，代码如下：

```import {   
  BrowserRouter as Router,   
  Route,   
  Link,  
} from 'react-router-dom'  
import Home from './home'  
import About from './about'

function App() {

  return (  
    <div className="App">  
      <Router>  
        <Link to="/home">跳转Home页面</Link>  
        <Link to="/about">跳转About页面</Link>

        <Route path="/home" component={Home}/>  
        <Route path="/about" component={About}/>

      </Router>  
    </div>

  
  );  
}

export default App;

```

然后 ```Home``` 组件中同样也想设置两个路由组件的匹配路径，分别是 ```/home/one``` 和 ```/home/two```，此时就可以看出，这个 ```/home/one``` 和 ```/home/two``` 为上一级路由 ```/home``` 的二级嵌套路由，代码如下：

```import React from 'react'  
import {  
    Route,  
    Link,  
} from 'react-router-dom'  
import One from './one'  
import Two from './two'

function Home () {

        return (  
        <>  
            我是Home页面  
            <Link to="/home/one">跳转到Home/one页面</Link>  
            <Link to="/home/two">跳转到Home/two页面</Link>

            <Route path="/home/one" component={One}/>  
            <Route path="/home/two" component={Two}/>  
        </>

  
    )  
}

export default Home

```

**特别注意：** ```Home``` 组件中的路由组件 ```One``` 的二级路由路径匹配必须要写 ```/home/one``` ，而不是 ```/one``` ，不要以为 ```One``` 组件看似在 ```Home``` 组件内就可以简写成 ```/one```

动态链接
----

```NavLink```可以将当前处于```active```状态的链接附加一个```active```类名，例如：

```import {   
    BrowserRouter as Router,   
    Route,   
    NavLink   
} from 'react-router-dom'  
import Home from './home'  
import About from './about'

function App() {  
  return (  
    <div className="App">  
      <Router>  
        <NavLink to="/home" className="link">跳转Home页面</NavLink>  
        <NavLink to="/about" className="link">跳转About页面</NavLink>  
        <Route path="/home" component={Home}/>  
        <Route path="/about" component={About}/>  
      </Router>  
    </div>  
  );  
}

export default App;

```

```/* 设置active类的样式 */  
.active {  
    font-weight: blod;  
    color: red;  
}  
```

**效果如下：**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/gMvNo9rxo41dbk6cA1ibMYx5mSsoCqZ5DC8AL0fKf5z0VMSbvQbLWy9kyZEyjtXMF9PNtrteFnS3UBibib7QXzbibw/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

路由匹配优化  

---------

当点击跳转链接时，会自动去尝试匹配所有的```Route```对应的路径，如图所示：

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

正常情况下，只需匹配到一个规则，渲染即可，即匹配成功一个后，无需进行后续的匹配尝试，此时可以用```Switch```组件，如下所示：  

```import {   
  BrowserRouter as Router,   
  Route,   
  NavLink,  
  Switch,  
} from 'react-router-dom'  
import Home from './home'  
import About from './about'

function App() {  
  return (  
    <div className="App">  
      <Router>  
        <NavLink to="/home" className="link">跳转Home页面</NavLink>     
        <NavLink to="/about" className="link">跳转About页面</NavLink>

        <Switch>  
          <Route path="/home" component={Home}/>         
          <Route path="/about" component={About}/>        
          <Route path="/home" component={Home}/>         
          <Route path="/home" component={Home}/>          
          {/* 此处省略一万个Route组件 */}                    
          <Route path="/home" component={Home}/>                             
        </Switch>

      </Router>  
    </div>

  
  );  
}

export default App;

```

**效果如下：**

![图片](https://mmbiz.qpic.cn/sz_mmbiz_gif/gMvNo9rxo41dbk6cA1ibMYx5mSsoCqZ5D7ic38GcBDh2p50F71SIlFrXoMcvGTV5ibF6UwKeKrVbQngORnBqXdxyg/640?wx_fmt=gif&tp=webp&wxfrom=5&wx_lazy=1&wx_co=1)

**要点总结：**  

1.  将多个```Route```组件同时放在一个```Switch```组件中，即可避免多次无意义的路由匹配，以此提升性能
    

重定向
---

当页面跳转时，若跳转链接没有匹配上任何一个 ```Route``` 组件，那么就会显示 ```404``` 页面，所以我们需要一个重定向组件 ```Redirect``` ，代码如下：

```import {   
  BrowserRouter as Router,   
  Route,   
  NavLink,  
  Switch,  
  Redirect,  
} from 'react-router-dom'  
import Home from './home'  
import About from './about'

function App() {  
  return (  
    <div className="App">  
      <Router>  
        <NavLink to="/home" className="link">跳转Home页面</NavLink>     
        <NavLink to="/about" className="link">跳转About页面</NavLink>  
        <NavLink to="/shop" className="link">跳转Shop页面</NavLink>   {/* 点击，跳转到/shop，但该路径没有设置 */}

        <Switch>  
          <Route path="/home" component={Home}/>         
          <Route path="/about" component={About}/>        
          <Redirect to="/home" />    {/* 当以上Route组件都匹配失败时，重定向到/home */}                      
        </Switch>

      </Router>  
    </div>

  
  );  
}

export default App;

```

**效果如下：**

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

路由传参  

-------

所有路由传递的参数，都会在跳转路由组件的 ```props``` 中获取到，每种传参方式接收的方式略有不同

路由传参的方式一共有三种，依次来看一下

### 第一种

第一种是在 ```Link``` 组件的跳转路径上携带参数，并在 ```Route``` 组件的匹配路径上通过 ```:参数名``` 的方式接收参数，代码如下：

```import {   
  BrowserRouter as Router,   
  Route,   
  NavLink,  
  Switch,  
} from 'react-router-dom'  
import Home from './home'  
import About from './about'

function App() {  
  return (  
    <div className="App">  
      <Router>  
        {/* 在 /home 的路径上携带了 张三、18 共两个参数 */}  
        <NavLink to="/home/张三/18" className="link">跳转Home页面</NavLink>     
        <NavLink to="/about" className="link">跳转About页面</NavLink>

        <Switch>  
          {/* 在 /home 匹配路径上相同的位置接收了 name、age 两个参数 */}  
          <Route path="/home/:name/:age" component={Home}/>         
          <Route path="/about" component={About}/>                             
        </Switch>

      </Router>  
    </div>

  
  );  
}

export default App;

```

尝试跳转，并打印一下路由组件的 ```props```

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

可以看到，第一种方式的参数是通过 ```props.match.params``` 来获取的  

### 第二种

第二种方式就是通过在 ```Link``` 组件的跳转链接后面跟上以 ```?``` 开头，类似 ```?a=1&b=3``` 这样的参数进行传递，代码如下：

```import {   
  BrowserRouter as Router,   
  Route,   
  NavLink,  
  Switch,  
} from 'react-router-dom'  
import Home from './home'  
import About from './about'

function App() {  
  return (  
    <div className="App">  
      <Router>  
        {/* 在跳转路径后面以?开头传递两个参数，分别为name=张三、age=18 */}  
        <NavLink to="/home?name=张三&age=18" className="link">跳转Home页面</NavLink>     
        <NavLink to="/about" className="link">跳转About页面</NavLink>

        <Switch>  
          {/* 此处无需做接收操作 */}  
          <Route path="/home" component={Home}/>         
          <Route path="/about" component={About}/>                             
        </Switch>

      </Router>  
    </div>

  
  );  
}

export default App;

```

尝试跳转，并打印一下路由组件的 ```props```

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

可以看到，第二种方式的参数是通过 ```props.location.search``` 来获取的，不过这里的参数需要自己简单做进一步转化，这里就不做过多说明了  

### 第三种

第三种方式就是以**对象**的形式编写 ```Link``` 组件的 ```to``` 跳转属性，并通过 ```state``` 属性来传递参数，代码如下：

```import {   
  BrowserRouter as Router,   
  Route,   
  NavLink,  
  Switch,  
} from 'react-router-dom'  
import Home from './home'  
import About from './about'

function App() {  
  return (  
    <div className="App">  
      <Router>  
        {/* 以对象的形式描述to属性，路径属性名为pathname，参数属性名为state */}  
        <NavLink to={{pathname: "/home", state: {name: '张三', age: 18}}} className="link">跳转Home页面</NavLink>     
        <NavLink to="/about" className="link">跳转About页面</NavLink>

        <Switch>  
          {/* 此处无需特地接收属性 */}  
          <Route path="/home" component={Home}/>         
          <Route path="/about" component={About}/>                             
        </Switch>

      </Router>  
    </div>

  
  );  
}

export default App;

```

尝试跳转，并打印一下路由组件的 ```props```

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

可以看到，第三种方式的参数是通过 ```props.location.state``` 来获取的  

函数式路由
-----

以上主要都是通过 ```react-router-dom``` 中的 ```Link``` 组件来往某个路由组件跳转

但有时，我们需要更灵活的方式进行跳转路由，例如通过调用一个函数，随时随地进行路由跳转，这就叫**函数式路由**

函数式路由用到的方法有以下 ```5``` 个（下方截图来自**路由组件**的 ```props```）

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

```5``` 个方法分别是 ```push```、```replace```、```goForward```、```goBack```、```go```，接下来按顺序介绍一下这几个方法  

### push

```push``` 方法就是使页面跳转到对应路径，并在浏览器中留下记录（即可以通过浏览器的回退按钮，返回上一个页面）

举个例子：在路由组件 ```Home``` 中设置一个按钮 ```button``` ，点击后调用 ```push``` 方法，跳转到 ```/about``` 页面

```import React from 'react'

function Home (props) {

    let pushLink = () => {  
        props.history.push('/about')  
    }

        return (  
        <div className="a">  
            我是Home页面  
            <button onClick={pushLink}>跳转到about页面</button>  
        </div>  
    )  
}

export default Home

```

**跳转效果如下：**

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

可以看到，通过 ```push``` 方法跳转以后，可以通过浏览器的回退按钮，返回上一个页面  

### replace

```replace``` 方法与 ```push``` 方法类似，不一样的地方就是，跳转后不会在浏览器中保存上一个页面的记录（即无法通过浏览器的回退按钮，返回上一个页面）

改动一下代码

```import React from 'react'

function Home (props) {

    let replaceLink = () => {  
        props.history.replace('/about')  
    }

        return (  
        <div className="a">  
            我是Home页面  
            <button onClick={replaceLink}>跳转到about页面</button>  
        </div>  
    )  
}

export default Home

```

**跳转效果如下：**

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

可以看到，刚开始的路径是 '/' ，然后跳转到 '/home' ，再点击按钮，通过 ```replace``` 方法跳转到 ```/about``` 页面。最后通过浏览器的回退按钮返回到了 ```/``` 页面，说明中间的 ```/home``` 没有被存在浏览器的记录里  

### goForward

调用 ```goForward``` 方法，就相当于点击了浏览器的返回下一个页面按钮，如下图所示：

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

这里就不做过多演示了  

### goBack

调用 ```goBack``` 方法，就相当于点击了浏览器的返回上一个页面的按钮，如下图所示：

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

### go  

```go``` 方法顾名思义，是用于跳转到指定路径的。

该方法接受一个参数（参数类型为 ```Number```），情况如下：

1.  当参数为正数 ```n``` 时，表示跳转到下 ```n``` 个页面。例如 ```go(1)``` 相当于调用了一次 ```goForward``` 方法
    
2.  当参数为负数 ```n``` 时，表示跳转到上 ```n``` 个页面。例如 ```go(-3)``` 相当于调用了三次 ```goBack``` 方法
    
3.  当参数为 ```0``` 时，表示刷新当前页面
    

普通组件使用路由
--------

这里区分两个概念，分别为 **普通组件** 和 **路由组件**

通过 ```Route``` 组件渲染的组件为**路由组件** ，其余的基本上都为 **普通组件**

例如，下方代码中：```Home``` 组件为**路由组件** ; ```App``` 组件为**普通组件**

```import {  
  BrowserRouter as Router,   
  Route,   
  NavLink,  
  Switch,  
} from 'react-router-dom'  
import Home from './home'

export default function App() {

    return (  
    <div className="App">  
      <Router>  
        <NavLink to='/home' className="link">跳转Home页面</NavLink> 

        <Switch>  
          <Route path="/home" component={Home}/>                                
        </Switch>

      </Router>  
    </div>

  
  );  
}

```

然后，路由组件跟普通组件最大的区别就是，组件的 ```props``` 属性中是否有下图所示的内容：（前者有，后者无）

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

此时，```react-router-dom``` 提供了一个 ```withRouter``` 方法，可以使普通组件也能像路由组件一样有那些方法或数据可以使用  

使用方法如下：

```import {   
  BrowserRouter as Router,   
  Route,   
  NavLink,  
  Switch,  
  withRouter,  // 1. 引入 witRouter  
} from 'react-router-dom'  
import About from './about'

function App(props) {

  console.log(props);   // 3. 尝试打印普通组件App的props，发现此时props中已有内容了，即普通组件也能拥有跟路由组件一样类似的功能

  return (  
    <div className="App">  
      <Router>  
        <NavLink to="/about" className="link">跳转About页面</NavLink>

        <Switch>  
          <Route path="/about" component={About}/>                             
        </Switch>

      </Router>  
    </div>

  
  );  
}

export default withRouter(App);  // 2. 通过withRouter方法对普通组件做一层包装处理

```

补充
--

### replace

在函数式路由里跳转类型主要有两种，分别是 ```push``` 和 ```replace```，那么在非函数式路由中，同样也可以自定义跳转类型，具体的实现代码如下：

```import {   
    BrowserRouter as Router,   
    Route,   
    Link   
} from 'react-router-dom'  
import Home from './home'  
import About from './about'

function App() {  
  return (  
    <div className="App">  
      <Router>  
        <Link to="/home" className="link">跳转Home页面</Link>  
        <Link to="/about" className="link">跳转About页面</Link>

        <Route path="/home" component={Home} replace={true}/>  {/* replace为true，跳转类型为replace */}  
        <Route path="/about" component={About} replace={false}/>   {/* replace为false，跳转类型为push */}  
      </Router>  
    </div>

  
  );  
}

export default App;

```

```Route``` 组件上有个 ```replace``` 属性可以设定跳转类型，当值为 ```true``` 时，跳转类型为 ```replace``` ; 为 ```false``` 时，跳转类型为 ```push```

### excat

路由的匹配默认是**模糊匹配**的，举个例子：

```import {   
  BrowserRouter as Router,   
  Route,   
  Link,  
} from 'react-router-dom'  
import Home from './home'  
import About from './about'

function App() {

  return (  
    <div className="App">  
      <Router>  
        <Link to="/home/abc">跳转Home页面</Link>    {/* 跳转到/home/abc，但实际home下没有abc这个路由组件 */}  
        <Link to="/about/abc">跳转About页面</Link>  {/* 跳转到/about/abc，但实际home下也没有abc这个路由组件 */}

        <Route path="/home" component={Home} />    {/* 路由匹配规则为/home，没有设置exact属性，当前为模糊匹配 */}  
        <Route path="/about" component={About} exact/>   {/* 路由匹配规则为/about，设置了exact属性，当前为精准匹配 */}

      </Router>  
    </div>

  
  );  
}

export default App;

```

**效果如下：**

![图片](data:image/gif;base64,iVBORw0KGgoAAAANSUhEUgAAAAEAAAABCAYAAAAfFcSJAAAADUlEQVQImWNgYGBgAAAABQABh6FO1AAAAABJRU5ErkJggg==)

图中看出，因为跳转 ```/home/abc``` 时，第一个 ```Route``` 组件是模糊匹配的，所以先匹配到了 ```/home```，因此 ```Home``` 组件渲染了 ; 而跳转 ```/about/abc``` 时，第二个 ```Route``` 组件是精准匹配的，即 ```/about/abc``` 不等于 ```/about```，所以 ```About``` 组件也没有渲染  

**总结：**

1.  如果想要精准匹配的话，只需要将 ```Route``` 组件的 ```exact``` 属性设置为 ```true``` 即可
    
2.  精准匹配要谨慎使用，因为可能会影响嵌套路由的使用
    
