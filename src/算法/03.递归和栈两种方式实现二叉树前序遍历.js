/**
二叉树前序遍历
遍历顺序：中左右
 */

// 递归方式实现
let preOrderTraversal1 = function (root) {
  let nums = []
  let fun = function (root) {
    nums.push(root.val)
    root.left && fun(root.left)
    root.right && fun(root.right)
  }
  root && fun(root)
  return nums
}

// 借助栈结构实现
let preOrderTraversal2 = function(root){
  let nums = []
  let stack = []
  if(root) stack.push(root)
  while(stack.length){
    let cur = stack.pop()
    nums.push(cur.val)
    cur.right && stack.push(cur.right)
    cur.left && stack.push(cur.left)
  }
  return nums
}

let data = {
  val: 1,
  left: null,
  right: {
    val: 2,
    left: {
      val: 3
    },
    right: null
  }
}

console.log(preOrderTraversal2(data))