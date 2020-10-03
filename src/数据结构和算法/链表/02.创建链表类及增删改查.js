/** 链表结点类 */
class Node{
  constructor(element) {
    this.element = element
    this.next = null
  }
}

/** 创建链表类 */
class LinkedList {
  constructor(){
    this.head = null;
    this.count = 0;
  }
  // 向链表末尾添加结点
  push(element){
    const node = new Node(element)
    let current
    if(!this.head){
      this.head = node
    }else {
      current = head
      while(current.next){
        current = current.next
      }
      current.next = node
    }
    this.count++
  }
  // insert向链表某一位置插入一个元素
  insert(element, position){
    const node = new Node(element)
    // 如果是空链表而且position为0则设置为head
    if(!this.head){
      if(position === 0){
        this.head = node
      } else {
        throw new Error('链表为空，对应位置无法插入！')
      }
    }else{
      if(position > this.count-1){
        throw new Error('指定位置超过链表长度，无法插入！')
      }
      let [current, preNode, pos] = [this.head, null, 0]
      while(pos <= position){
        preNode = current
        current = current.next
        pos++
      }
      if(preNode){
        preNode.next = node
      }else{
        this.head = node
      }
      node.next = current
    }
    this.count++
  }
  // getElementAt返回链表中指定位置的元素
  getElementAt(index){
    if(!this.head || index>this.count-1){
      return undefined
    }
    let [current, pos] = [this.head, 0]
    while(pos<=index){
      current = current.next
      pos++
    }
    return current.element
  }
  // remove从链表中移除一个元素
  remove(element){
    if(!this.head) throw new Error('链表为空，无法移除元素！')
    let [preNode, current] = [null, this.head]
    while(current){
      if(current.element === element){
        if(preNode){
          preNode.next = current.next
        }else{
          if(current.next) {
            this.head = current.next
          }else{
            this.head = null
          }
        }
      }
      current = current.next
    }
  }
  // 
}
