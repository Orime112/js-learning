const http = require('http')

const server = http.createServer((req, res) => {
  // console.log(req);

  /**
   * ! Content-Type是个非常有用的属性，text/plain 浏览器将解析响应数据为普通文本，text/html 会解析为HTML文本，application/html 会执行下载 
   */
  res.statusCode = 404
  res.setHeader('Content-Type', 'text/HTML;charset=utf8')
  
  res.end('<h2>这里是标题</h2>')
})

server.listen(8888, () => {
  console.log('Server is running at 8888');
  
})