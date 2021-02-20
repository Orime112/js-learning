/**
 * * 生成虚拟DOM
 * @param {*} type 
 * @param {*} attr 
 * @param {*} children 
 */
function el(type, attr, children){
  // * children 类型有多种 string|element
  let element = document.createElement(type)
  for(let key in attr){
    element.setAttribute(key, attr[key])
  }
  for(let child of children){
    console.log(child, typeof child)
    if(typeof child === "string"){
      element.innerText = children
    } else {
      element.appendChild(children)
    }
  }
  // * return type -> element
  console.log(element, typeof element)
  return element
}
el.render = function(){
  document.body.appendChild(this)
}
let tree = el('ul',{id:'2'},[
      el('li',{id:3}, ['item 1']),
      el('li',{id:3}, ['item 1']),
      el('li',{id:3}, ['item 1'])
])

let a = tree.render()
console.log(a,'aa');

{/* <ul "id=2;">
    <li "id=3">item 1</li>
    <li "id=3">item 1</li>
    <li "id=3">item 1</li>
</ul>  */}