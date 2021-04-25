# 前端路由

- 路由跳转不发起服务端请求

## hash 路由

- 通过`location.hash`能够拿到`#`+`路径`
- 一个简单的示例

```html
<body>
  <a href="#home">home</a>
  <a href="#about">about</a>
  <div id="app"></div>
  <script>
    const $app = document.getElementById("app")
    const map = {
      home() {
        $app.innerHTML = "home"
      },
      about() {
        $app.innerHTML = "about"
      },
    }
    window.onhashchange = function () {
      const hash = location.hash.replace("#", "")
      const func = map[hash]
      func()
    }
  </script>
</body>
```
