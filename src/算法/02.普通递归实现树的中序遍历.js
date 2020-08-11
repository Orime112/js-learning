/**
* 给定一个二叉树，返回它的中序（左根右）遍历
[1, null, 2, 3]
1
 \
  2
 /
3
输出：[1, 3, 2]
*/
let result = []
function middleOrder(data, result) {
  data.forEach(item => {
    if (item.left) {
      middleOrder(item.left, result)
    }
    result.push(item.root)
    if (item.right) {
      middleOrder(item.right, result)
    }
  })
  return result
}

// 测试用例
let data = [
  {
    root: 1,
    left: null,
    right: [
      {
        root: 2,
        left: [
          {
            root: 3,
            left: null,
            right: null
          }
        ],
        right: null
      }
    ]
  }
]

console.log(middleOrder(data, result))