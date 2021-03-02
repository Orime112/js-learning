/**
 *       6
 *     /   \
 *    4    9
 *   / \  / \
 *  3  5 7  11
 *         / \
 *        10 12
 */
const binarySearchTree = {
  val: 6,
  left: {
    val: 4,
    left: {
      val: 3,
    },
    right: {
      val: 5,
    },
  },
  right: {
    val: 9,
    left: {
      val: 7,
    },
    right: {
      val: 11,
      left: {
        val: 10,
      },
      right: {
        val: 12,
      },
    },
  },
}

const node = binarySearchTree

let left = node.right.right // val:3
let right = node.right.left // val:7

function findCommonRoot(
  root,
  lNode,
  rNode
) {
  if (!root) return null
  // * 如果找到相等的直接返回
  if (root.val === lNode.val)
    return lNode
  if (root.val === rNode.val)
    return rNode
  if (lNode.val < root.val) {
    // * 如果分别在左右两侧就返回root
    if (rNode.val > root.val) {
      return root
    } else {
      // * 说明都在左子树
      return findCommonRoot(
        root.left,
        lNode,
        rNode
      )
    }
  } else {
    if (rNode.val < root.val) {
      return root
    } else {
      return findCommonRoot(
        root.right,
        lNode,
        rNode
      )
    }
  }
}

console.log(findCommonRoot(node, left, right))