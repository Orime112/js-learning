// import "@babel/polyfill" // ! 引入 @babel/polyfill 之后，包体积由 80k 上升到 1M
import "./btn"

import counter from "./js/counter"
import number from "./js/number"
import es6test from "./js/es6code"

import "./css/index.css"


counter()
number()

console.log("Hello World ")

if (module.hot) {
  module.hot.accept("./js/number.js", () => {
    document.body.removeChild(document.getElementById("number"))
    number()
  })
}

