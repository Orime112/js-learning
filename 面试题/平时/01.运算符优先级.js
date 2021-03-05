function Faicso() {
  getName = function () {
    console.log("凡客快图")
  }
  return this
}

Faicso.getName = function () {
  console.log("凡科微传单")
}
Faicso.prototype.getName = function () {
  console.log("凡科建站")
}

var getName = function () {
  console.log("凡科互动")
}
function getName() {
  console.log("凡科商城")
}

//请写出以下输出结果:
Faicso.getName()
getName()
Faicso().getName()
getName()
new Faicso.getName()
new Faicso().getName()
new new Faicso().getName()
