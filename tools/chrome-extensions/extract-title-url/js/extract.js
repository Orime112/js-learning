function extract(el) {
  const nodeList = document.querySelectorAll('h2')
  console.log(nodeList, 'nodeList')
  const data = [...nodeList].map((item) => {
    return item.innerText
  })
  console.log(data, 'data')
  el.innerText = data.length ? data.toString() : '暂无数据'
}

var art_title = document.getElementById("art_title")
extract(art_title)
