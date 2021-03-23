/**
 * 并发加载图片 -> 比如最大并发量是3个，那么有一个加载完了立即push进去一个
 * @param {*} urls 待加载图片列表
 * @param {*} handler 加载图片函数
 * @param {*} limit 最大并发数
 */
function limitLoad(urls, handler, limit){
  const sequence = [].concat(urls)
  let promises = []
  
  promises = sequence.splice(0, limit).map((url, index) => {
    return handler(url).then(() => {
      return index // * 当前加载完成之后，返回当前加载的索引，比如2
    })
  })

  let p = Promise.race(promises)
  for(let i = 0; i < sequence.length; i++){
    p = p.then((index) => { // * 返回最先完成的加载事件res，这里为索引，比如2
      promises[index] = handler(sequence[i]).then(() => { // * 那么原队列中第2项，替换为sequence的第0个待处理加载事件
        return index // * 并且该加载事件完成后仍占用promise中序号为2的那个位置
      })
      return Promise.race(promises) // * 本次竞速执行完毕，为下一次竞速执行做准备
    })
  }
}

const urls = [
  {info: 'link1', time: 3000},
  {info: 'link2', time: 300},
  {info: 'link3', time: 3000},
  {info: 'link4', time: 30},
  {info: 'link5', time: 3000},
  {info: 'link6', time: 300},
  {info: 'link7', time: 400},
  {info: 'link8', time: 10},
  {info: 'link9', time: 100},
]

// * 设置我们要执行的任务
function loadImg(url){
  return new Promise((resolve, reject) => {
    console.log(`----${url.info} start`)
    setTimeout(() => {
      console.log(`${url.info} OK!`)
      resolve()
    }, url.time)
  })
}

limitLoad(urls, loadImg, 3)

/**
----link1 start
----link2 start
----link3 start

link2 OK!
----link4 start
link4 OK!
----link5 start

link1 OK!
----link6 start
link3 OK!
----link7 start
link6 OK!
----link8 start
link8 OK!
----link9 start
link5 OK!
link7 OK!
link9 OK!
*/