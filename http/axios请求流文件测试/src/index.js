console.log('进入index.js');

axios.get('http://localhost:8989', {
  // headers: {
  //   'content-type': 'application/octet-stream'
  // }
}).then((res) => {
  // let blob = new Blob([res.data])
  // let url = URL.createObjectURL(blob)
  // // 下载该blob链接
  // console.log(url)
  // downloadFile(url, 'abc.png')
  console.log(res);
}).catch(error => { console.log(error) })

// 下载方法
function downloadFile(downUrl, fileName) {
  const aLinkUrl = document.createElementNS('http://www.w3.org/1999/xhtml', 'a')
  aLinkUrl.href = downUrl
  aLinkUrl.download = fileName
  const clickAlink = (obj) => { // 模拟点击
    const ev = document.createEvent('MouseEvents')
    ev.initMouseEvent('click', true, false, window, 0, 0, 0, 0, 0, false, false, false, false, 0, null)
    obj.dispatchEvent(ev)
  }
  clickAlink(aLinkUrl)
}