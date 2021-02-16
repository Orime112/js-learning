
class Node{
  constructor(element) {
    this.element = element
  }
  
}
/**
 * 给定一个链表1->2->3->4->5->null
 * 反转:null<-1<-2<-3<-4<-5
 */

/** 创建从1到n的单向链表 */
function generateLinkedList(n) {
  let head = new Node(1)
  let cur = head
  for (let i = 2; i <= n; i++) {
    let node = new Node(i)
    cur.next = node
    cur = node
  }
  return head
}

const reverseLinkedList = (head) => {
  let pre = null
  let cur = head
  let next
  while (cur != null) {
    next = cur.next
    // 反转
    cur.next = pre
    // 更新
    pre = cur
    cur = next
  }
  return pre
}

let head = generateLinkedList(5)
console.log(reverseLinkedList(head))