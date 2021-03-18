function getElement() {
  // return import(/* webpackChunkName:"lds" */ "lodash").then(({ default: _ }) => {
  return import("lodash").then(({ default: _ }) => {
    const element = document.createElement("div")
    element.innerHTML = _.join(["a", "b", "c"])
    return element
  })
}

// * 打包生成三个文件 index.html main.js 和 vendors.js，页面初始只加载 index.html 和 main.js；
// * 只有当点击页面的时候才会网络请求 vendors.js
// * 优点：项目启动更快
document.addEventListener("click", () => {
  getElement().then((ele) => {
    document.body.appendChild(ele)
  })
})
