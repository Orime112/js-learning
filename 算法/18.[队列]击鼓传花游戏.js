/**
 * 在这个游戏中，孩子们围成一个圆圈，把花尽快地传递给旁边的人。某一时刻传花停止，
这个时候花在谁手里，谁就退出圆圈、结束游戏。重复这个过程，直到只剩一个孩子（胜者）。
 */
function hotPotato(list, num) {
  const queue = []
  const elimitatedList = []
  // 将给定的数组退如队列中
  for(let value of list){
    queue.push(value)
  }
  // 当queue的长度大于1的时候循环并标记
  while(queue.length > 1){
    for(let i = 0; i < num; i++){
      let moveEle = queue.splice(0, 1)
      queue.push(moveEle)
    }
    elimitatedList.push(queue.shift())
  }
  return {
    eliminated: elimitatedList,
    winner: queue[0],
  }
}

// 测试用例
let names = ["John", "Jack", "Camila", "Ingrid", "Carl"]
let result = hotPotato(names, 7)
result.eliminated.forEach((name) => {
  console.log(`${name}在击鼓传花游戏中被淘汰。`)
})
console.log(`胜利者： ${result.winner}`)
/**
 *
Camila在击鼓传花游戏中被淘汰。
Jack在击鼓传花游戏中被淘汰。
Carl在击鼓传花游戏中被淘汰。
Ingrid在击鼓传花游戏中被淘汰。
胜利者： John
 */