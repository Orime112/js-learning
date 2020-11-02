/**
* 实现一个 Trie (前缀树)，包含 insert, search, 和 startsWith 这三个操作。
你可以假设所有的输入都是由小写字母 a-z 构成的。
保证所有输入均为非空字符串。
*/
class TrieNode {
  constructor(val, isEnd) {
    this.val = val
    this.isEnd = isEnd
    this.children = []
  }
}

class Trie {
  constructor() {
    this.root = new TrieNode(null, false)
  }
  insert(word) {
    let preCNode = this.root
    for (let i = 0; i < word.length; i++) {
      // 如果上一个字符的children中已经存在该字符，则不做操作
      const findChar = preCNode.children.find(child => child.val === word[i])
      if (!findChar) {
        // 如果上一个节点中没有该字符，就新建字符并push到上一个节点的children中
        // 拿到的每个字符依次生成node放到root下面
        let cNode = new TrieNode(word[i], i === word.length - 1)
        preCNode.children.push(cNode)
        preCNode = cNode
      } else {
        // 上一个节点的children中已经存在该字符
        // 如果是最后一个节点了，让该字符的isEnd变为true
        if(i === word.length - 1){
          findChar.isEnd = true
        }
        // 则拿到该字符继续其他操作
        preCNode = findChar
      }

    }
  }
  search(word) {
    let len = word.length
    let preCNode = this.root
    for (let i = 0; i < len; i++) {
      const findChar = preCNode.children.find(child => child.val === word[i])
      if (preCNode.children && findChar) {
        if (i === len - 1) {
          // 最后一个字符
          return findChar.isEnd === true
        }
        preCNode = findChar
      } else {
        return false
      }
    }
  }
  startsWith(word) {
    let len = word.length
    let preCNode = this.root
    for (let i = 0; i < len; i++) {
      const findChar = preCNode.children.find(child => child.val === word[i])
      if (preCNode.children && findChar) {
        preCNode = findChar
      } else {
        return false
      }
    }
    return true
  }
}

/**
 * 思考：树的基本结构是
 每个节点有三个属性：val，children，isEnd
 */
var trieTest = {
  val: null,
  isEnd: false,
  children: [
    {
      val: 'b', isEnd: false, children: [
        { val: 'y', isEnd: true, children: null }
      ]
    },
    {
      val: 'h', isEnd: false, children: [
        {
          val: 'e', isEnd: false, children: [
            {
              val: 'l', isEnd: false, children: [
                {
                  val: 'l', isEnd: false, children: [
                    { val: 'o', isEnd: true, children: null }
                  ]
                }
              ]
            },
            {
              val: 'a', isEnd: false, children: [
                { val: 't', isEnd: true, children: null }
              ]
            }
          ]
        }
      ]
    },
    {
      val: 't', isEnd: false, children: [
        {
          val: 'h', isEnd: false, children: [
            { val: 'e', isEnd: true, children: null }
          ]
        }
      ]
    }
  ]
}


// 测试用例
let trie = new Trie()
trie.insert("apple");
console.log(trie.search("apple"));   // 返回 true
console.log(trie.search("app"));     // 返回 false
console.log(trie.startsWith("app")); // 返回 true
trie.insert("app");
console.log(trie.search("app"));     // 返回 true

// 参考地址：https://juejin.im/entry/6844903941918949383
