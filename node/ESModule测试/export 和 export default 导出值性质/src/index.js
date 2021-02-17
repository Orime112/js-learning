import b, {a} from './a.js'

setTimeout(() => {
  console.log(a) //* 0  export {<变量>}这种方式一般称为 命名式导出 或者 具名导出，导出的是一个变量的引用
  console.log(b) //* 20 export default这种方式称为 默认导出 或者 匿名导出，导出的是一个值。
}, 2000)