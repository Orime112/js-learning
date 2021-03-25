function ReactEle(type, props) {
  this.type = type
  this.props = props
  this.render = function (container = document.body) {
    const {
      type,
      props: { attr, child, value },
    } = this
    let element = document.createElement(type)
    if (type === "text") {
      element = document.createTextNode(value)
      container.appendChild(element)
      return
    }
    if (attr) {
      for (let key in attr) {
        element.setAttribute(key, attr[key])
      }
    }
    if (child) {
      for (let val of child) {
        val.render(element)
      }
    }
    container.appendChild(element)
    return element
  }
}

/**
 * * 生成虚拟DOM
 * @param {*} type
 * @param {*} attr
 * @param {*} children
 * @returns {$type: string; }
 */
function el(type, attr, children) {
  const props = { attr }
  const child = []
  for (let val of children) {
    // * val 类型有多种 string | ReactEle实例
    if (typeof val === "string") {
      child.push(new ReactEle("text", { value: val }))
    } else {
      child.push(val)
    }
  }
  props.child = child
  return new ReactEle(type, props)
}

let tree = el("ul", { id: "2" }, [
  el("li", { id: 3 }, ["item 1"]),
  el("li", { id: 3 }, ["item 1"]),
  el("li", { id: 3 }, ["item 1"]),
])

console.log(tree)

let a = tree.render()
console.log(a, "aa")

// {
//   /* <ul "id=2;">
//     <li "id=3">item 1</li>
//     <li "id=3">item 1</li>
//     <li "id=3">item 1</li>
// </ul>  */
// }
