import {name, age, sayHello, d} from './modules/bar.js'

console.log('hello main.js')

console.log(name, age, sayHello, d)

/** 在对name进行导入的过程中，相当于在模块空间记录中声明了一个name常量后进行导出
    原模块中对变量进行修改会映射到模块空间记录的常量一份
    但是模块导入之后，由于是const常量，所以无法进行修改（引用类型数据才可以修改）
 */
setTimeout(() => {
  console.log(name, '定时器中的name')
}, 2000)

/** import函数动态载入测试 */
let flag = true
if(flag){
  import('./modules/foo.js').then(foo => {
    console.log('在import函数中加载')
    console.log(foo) // {name, age, sayHello...}
  })
}