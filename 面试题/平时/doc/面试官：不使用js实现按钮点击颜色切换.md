## 题目
面试官：页面上有三个按钮，红黄绿，点击任何一个按钮，该按钮颜色由之前变为白色，再点击其他按钮，颜色恢复为原来颜色，注意不能使用js

## 解答
这道题刚拿到手是一脸得意，心想这还不简单，于是：

```html
<head>
  ...
  <style>
    * {
     margin: 0;
     padding: 0;
    }
    button {
      width: 100px;
      height: 40px;
      border-radius: 10px;
      background-color: chartreuse;
      /* border: none; */
    }
    button:nth-of-type(2){
      background-color: brown;
    }
    button:nth-of-type(3){
      background-color: lightpink;
    }
  </style>
</head>
<body>
  <div id="fa">
    <button id="a"></button>
    <button id="b"></button>
    <button id="c"></button>
  </div>
  <script>

    let aBg = a.style.backgroundColor
    a.addEventListener('focus', (e) => {
      console.log(e, 'focus')
      e.target.style.backgroundColor = 'white'
    })
    a.addEventListener('blur', (e) => {
      e.target.style.backgroundColor = aBg
    })

    let bBg = b.style.backgroundColor
    b.addEventListener('focus', (e) => {
      console.log(e, 'focus')
      e.target.style.backgroundColor = 'white'
    })
    b.addEventListener('blur', (e) => {
      e.target.style.backgroundColor = aBg
    })

    let cBg = c.style.backgroundColor
    c.addEventListener('focus', (e) => {
      console.log(e, 'focus')
      e.target.style.backgroundColor = 'white'
    })
    c.addEventListener('blur', (e) => {
      e.target.style.backgroundColor = aBg
    })
    
  </script>
</body>
```

监听按钮的`focus`和`blur`事件，在focus的时候改变颜色为白色，blur的时候改回原来颜色。


![三个按钮颜色切换.gif](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/b04bfcad973e4aa2a0d642353026ae7b~tplv-k3u1fbpfcp-watermark.image)

面试官：不能使用js！！！

啊这，不好好审题自罚读题五十遍~

![image.png](https://p3-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/e77df991891c4c4fb7ca10665f57112e~tplv-k3u1fbpfcp-watermark.image)

那么不使用js该怎么解决呢？开始在我贫瘠的大脑知识库中全力搜索，就在我行将放弃的时候，忽然想到一个伪类`:focus`，大概是控制按钮激活的，还有个`:active`好像也行，先整`:focus`试试吧，死马当活马医了

```html
<head>
  ...
  <style>
    * {
     margin: 0;
     padding: 0;
    }
    button {
      width: 100px;
      height: 40px;
      border-radius: 10px;
      background-color: chartreuse;
      /* border: none; */
    }
    button:nth-of-type(2){
      background-color: brown;
    }
    button:nth-of-type(3){
      background-color: lightpink;
    }
    button:focus{
      background-color: #fff;
    }
  </style>
</head>
<body>
  <div id="fa">
    <button id="a"></button>
    <button id="b"></button>
    <button id="c"></button>
  </div>
</body>
```

神奇的事情发生了，用这一行css样式，竟然能替代十几行的js代码，完成了一模一样的功能！
```css
button:focus{
  background-color: #fff;
}
```

再去试试那个`:active`
```css
button:active{
  background-color: blue;
}
```


![active控制鼠标在按钮上方按下期间样式表现.gif](https://p6-juejin.byteimg.com/tos-cn-i-k3u1fbpfcp/47a4b6226ec949f79506a70057daca2e~tplv-k3u1fbpfcp-watermark.image)


原来，`:active`控制鼠标在按钮上方按下期间样式表现

## 总结
- button标签上的`:focus`伪类控制按钮聚焦样式，不需要额外事件处理情况下，可以实现js的focus和blur事件效果。
- button标签上的`:active`伪类控制按钮被鼠标按下的样式，可以实现js的mouseDown和mouseUp事件
- 常见的伪类要多用用，说不定哪天面试就遇到了~
（本文完）
