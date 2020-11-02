// 由于export default 导出的是匿名对象，所以不可用于const但可以用于匿名函数

// export default const a = 12 // ! 错误

// export default function b(){ // * 正确
//   console.log('b函数')
// }

const c = 34
export default c