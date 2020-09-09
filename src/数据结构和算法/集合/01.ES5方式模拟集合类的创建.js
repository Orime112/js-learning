/** 创建集合类 */
class MySet{
  constructor(){
    this.item = {}
  }
  /** 检验集合中是否拥有目标元素 */
  has(element){
    return Object.prototype.hasOwnProperty.call(this.item, element)
  }
  /** 集合中添加元素 */
  add(element){
    console.log(this)
    if(!this.has(element)){ /** 如果没有元素则添加 */
      this.item[element] = element
      return true
    }
    return false
  }
  /** 集合中删除元素 */
  delete(element){
    if(this.has(element)){
      delete this.item[element]
      return true
    }
    return false
  }
  /** 清空集合中的元素 */
  clear(){
    this.item = {}
  }
  /** 返回集合中元素个数 */
  size(){
    return Object.keys(this.item).length
  }
  /** 实现集合的values方法 */
  values(){
    return Object.values(this.item)
  }
}

const set = new MySet();
set.add(1);
console.log(set.values()); // 输出[1]
console.log(set.has(1)); // 输出 true
console.log(set.size()); // 输出 1
set.add(2);
console.log(set.values()); // 输出[1, 2]
console.log(set.has(2)); // 输出 true
console.log(set.size()); // 输出 2
set.delete(1);
console.log(set.values()); // 输出[2]
set.delete(2);
console.log(set.values()); // 输出[]