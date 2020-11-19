const http = require('http')

function updateTime(){
  return new Date().toUTCString()
}

http.createServer((req, res) => {
  const { url } = req
  if( url === '/'){
    res.end(`
      <html>
        HTML Update Time ${updateTime()}
        <script src='main.js'></script>
      </html>
    `)
  } else if (url === '/main.js') {
    const content = `document.writeln('<br> JS Update Time: ${updateTime()}')`
    // ? 测试2：强缓存 HTTP 1.0 expires ---> Expires 10秒中内强缓存
    res.setHeader('Expires', new Date(Date.now() + 10*1000).toUTCString())
    // ? 测试3：强缓存 HTTP 1.1 max-age ---> 优先级高于 Expires
    res.setHeader('Cache-Control', 'max-age=20')

    // ! 更改缓存策略为 协商缓存
    res.setHeader('Cache-Control', 'no-cache')

    // ? 测试4：协商缓存 last-modified
    res.setHeader('last-modified', new Date().toUTCString())
    if(new Date(req.headers['if-modified-since']).getTime() + 3 * 1000 > Date.now()){
      console.log('协商缓存命中')
      res.statusCode = 304
      res.end()
      return
    }

    // ? 测试5：Etag 方式进行缓存校验
    // 对内容进行 Hash 操作
    const crypto = require('crypto')
    const hash = crypto.createHash('sha1').update(content).digest('hex')
    res.setHeader('Etag', hash)
    if(req.headers['if-none-match'] === hash) {
      console.log('Etag 协商缓存命中')
      res.statusCode = 304
      res.end()
      return
    }

    res.statusCode = 200
    res.end(content)
  } else if(url === '/favicon.ico'){
    res.end('')
  }
})
.listen(7777, () => console.log('Server is running at http://localhost:7777'))