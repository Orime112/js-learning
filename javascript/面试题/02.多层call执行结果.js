function fn1(){
  console.log('1')
}
function fn2(){
  console.log('2')
}

fn1.call.call(fn2) // * 2

// ! 相当于 Function.prototype.call 执行，将 fn2 传进去
// ! 此时执行 call 方法，执行主体为 fn2，相当于 fn2[Symbol()] = this = fn2，fn2[Symbol]() -> fn2()