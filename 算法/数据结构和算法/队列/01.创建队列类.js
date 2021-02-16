/**
 * 队列遵循先进先出的规则
 */

class Queue{
  constructor(){
    this.count = 0
    this.lowestCount = 0
    this.item = {}
  }
  // enqueue添加元素方法
  enqueue(element){
    this.item[this.count++] = element
  }
  // dequeue删除元素方法
  dequeue(){
    if(this.isEmpty()) return undefined
    let target = this.item[this.lowestCount++]
    delete this.item[this.lowestCount - 1]
    return target
  }
  // 判断是否为空isEmpty方法
  isEmpty(){
    return this.count - this.lowestCount === 0
  }
  // 获取最顶端的元素
  peek(){
    return this.item[this.lowestCount]
  }
  // toString方法
  toString(){
    if(this.isEmpty()) return ''
    let str = this.item[this.lowestCount]
    for(let i = this.lowestCount + 1; i < this.count; i++){
      str = `${str},${this.item[i]}`
    }
    return str
  }
  // 清空队列
  clear(){
    this.count = 0
    this.lowestCount = 0
    this.item = {}
  }
  // 查看队列长度
  size(){
    return this.count - this.lowestCount
  }
}

const queue = new Queue()
console.log(queue.isEmpty())
queue.enqueue('john')
queue.enqueue('jack')
console.log(queue.toString())
queue.enqueue('camila')
console.log(queue.toString())
queue.dequeue('john')
queue.dequeue('jack')
console.log(queue.size())

