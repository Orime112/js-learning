const invertTree = (root) => {
  if(root == null) {
    return
  }
  invertTree(root.left)
  invertTree(root.right)
  if(root.left && root.right) [root.left, root.right] = [root.right, root.left]
}

// 测试用例
let tree = {
  root: {
    value: '4',
    left: {
      value: '2',
      left: {
        value: '1', 
      },
      right: {
        value: '3'
      }
    },
    right: {
      value: '7',
      left: {
        value: '6'
      },
      right: {
        value: '9'
      }
    }
  }
}

// console.log(tree)
invertTree(tree.root)
console.log(tree)