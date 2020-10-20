const name = 'bar'
const age = 18

// 如果module.exports 重置为另外的值了，那么exports所有挂载将失去意义

// module.exports = {}

// module.exports.sayHellow = {
//   sayHellow: function(){console.log('hello')}
// }

console.log(module.exports === exports, typeof typeof module.exports) // true

// 如果module.exports没有重置为另外的值，则 module.exports.xx = xxx 和 exports.xx = xxx 效果一致

module.exports.sex = {sex: '男'}

console.log(module.exports === exports);


exports.name = name;
exports.age = age
