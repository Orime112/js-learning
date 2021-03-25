## 下面三块代码的执行结果？

```js
var bar = 1
function foo(){
  console.log(bar)
  var bar = 2
}
foo()
```

```js
var bar = 1
function foo(){
  console.log(bar)
  let bar = 2
}
foo()
```

```js
let obj = {x: 1, y: 2}
let o = {...obj}
console.log(o)
// let arr = [...obj]
```