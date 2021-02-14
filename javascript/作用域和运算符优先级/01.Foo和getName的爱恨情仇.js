/* eslint-disable no-undef */
function Foo(){
  getName = function(){
    console.log(1)
  }
  return this
}

Foo.getName = function(){
  console.log(2)
}

Foo.prototype.getName = function(){
  console.log(3)
}

var getName = function(){
  console.log(4)
}

function getName(){
  console.log(6)
}

Foo.getName(); // * 2
getName() // * var 定义的变量为主 4
Foo().getName(); // * 更改全局 getName -> 1，return 的 this 是 window；1
getName(); // * 1
// ! 运算符优先级：圆括号最高，逗号最低，成员访问 === ?. === new Xxx() > new Xxx > ++/--
new Foo.getName(); // 由于 new Xxx < Foo.getName，所以打印 2，
new Foo().getName() // 由于 new Xxx() === Foo().getName 所以从左往右计算，//! 由于这是在创建一个实例，所以this指向实例本身，而不是全局window，所以打印3
new new Foo().getName() //! 先执行 new Foo() 返回 Foo 实例，此时相当于 new Foo实例.getName() -> 有参数 new，打印 3，返回 getName()的实例