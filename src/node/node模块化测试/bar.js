const name = 'bar'
const age = 18

// 如果module.exports 重置为另外的值了，那么exports所有挂载将失去意义

// module.exports = {}

// module.exports.sayHellow = {
//   sayHellow: function(){console.log('hello')}
// }

console.log(module.exports === exports, typeof typeof module.exports) // true

exports.name = name;
exports.age = age
