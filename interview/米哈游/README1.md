## 一、你的项目中有一个权限控制，你能说说吗？
- tips:`路由权限`，`颗粒权限`

- react前台权限
  - 权限功能基本上是后台管理项目中不可或缺的部分
  - 一般情况下，权限的控制体现在页面级别以及按钮级别（用户是否可以访问某个页面或者操作某个按钮，比如新增、删除），这个权限在用户注册、分配或者后期超级管理员更改的时候确定
  - 实现方式
    - 用户登录，从后台获取注册时的角色（权限标识）
    - 通过权限标识，对注册的 menu 菜单进行过滤，渲染到页面

```js
getMenu = menu => {
    let newMenu,
        auth = JSON.parse(localStorage.getItem('user')).auth // 获取存储的用户权限标识
    if (!auth) {
        return menu
    } else {
        // 过滤注册的 menu
        newMenu = menu.filter(res => res.auth && res.auth.indexOf(auth) !== -1)
        return newMenu
    }
}
```

```js
{routes.map(item => {
    return (
        <Route
            key={item.path}
            path={item.path}
            exact={item.exact}
            render={props =>
                !auth ? (
                    <item.component {...props} />
                ) : item.auth && item.auth.indexOf(auth) !== -1 ? (
                    <item.component {...props} />
                ) : (
                    // 这里也可以跳转到 403 页面
                    <Redirect to='/404' {...props} />
                )
            }></Route>
    )
})}
```




- 后台权限
  - 权限 RABC + 中间件拦截

### 那么你有没有看过什么关于权限的文章？

## 二、CSS3动画如何监听到动画结束？
- tips:`监听动画结束的事件`

## 三、事件循环知道吗？
- tips:`js执行线程和渲染线程互斥`，`微任务和宏任务`，`微任务宏任务嵌套情况下的执行逻辑`

## 四、能详细说说原型链吗？
- tips:`JavaScript中一切都是对象`，`对象上的__proto__指向其构造函数原型prototype`，`而构造函数也是由其父构造函数实例化形成，其上__proto__又指向了父构造函数的prototype`，`依次类推形成原型链`

### 原型链指向null之前指向了什么？说下这个过程

## 五、CORS解决跨域可以设置哪些属性？

