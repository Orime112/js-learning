/** 默认情况下，开发者定义的对象都是不可迭代对象
* * 但如果给该对象增加一个名为 [Symbol.iterator] 的生成器
* * 则该对象会变为可迭代对象
 */
 
let collection = {
  items: [],
  *[Symbol.iterator]() {
    for(let item of this.items) {
      yield item
    }
  }
}

collection.items.push(1)
collection.items.push(2)
collection.items.push(3)
for( let val of collection){
  console.log(val);
}

// 1
// 2
// 3