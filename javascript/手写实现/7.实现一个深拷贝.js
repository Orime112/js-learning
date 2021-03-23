/**
 * 浅拷贝和深拷贝的区别：

浅拷贝：只拷贝一层，更深层的对象级别的只拷贝引用

深拷贝：拷贝多层，每一级别的数据都会拷贝。这样更改拷贝值就不影响另外的对象

ES6浅拷贝方法：Object.assign(target,...sources)

 */

let obj = {
  id: 1,
  name: "Tom",
  msg: {
    age: 18,
  },
}
let o = {}
//实现深拷贝  递归    可以用于生命游戏那个题对二维数组的拷贝，
//但比较麻烦，因为已知元素都是值，直接复制就行，无需判断
function deepCopy(newObj, oldObj) {
  for (var k in oldObj) {
    let item = oldObj[k]
    //判断是数组？对象？简单类型？
    if (item instanceof Array) {
      newObj[k] = []
      deepCopy(newObj[k], item)
    } else if (item instanceof Object) {
      newObj[k] = {}
      deepCopy(newObj[k], item)
    } else {
      //简单数据类型，直接赋值
      newObj[k] = item
    }
  }
}
