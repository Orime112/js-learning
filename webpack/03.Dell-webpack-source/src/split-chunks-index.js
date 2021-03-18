import splitTest from "./js/split-chunks-test"

console.log(splitTest.name)

function getElement() {
  // return import(/* webpackChunkName:"lds" */ "lodash").then(({ default: _ }) => {
  return import("lodash").then(({ default: _ }) => {
    const element = document.createElement("div")
    element.innerHTML = _.join(["a", "b", "c"])
    return element
  })
}

getElement().then((ele) => {
  document.body.appendChild(ele)
})

const a = 12
const b = 23
function c(a, b) {
  return a + b
}

console.log(c(a, b))
