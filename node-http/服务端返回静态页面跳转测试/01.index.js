const http = require('http')
const fs = require('fs')
const urlParse = require('url')

http.createServer(async (req, res) => {
  const { url, method } = req
  var urlObj = urlParse.parse(req.url, true);
  var query = urlObj.query;
  const pathname = urlObj.pathname
  if (pathname === '/') {
    const page = await fs.readFileSync('./index.html', 'utf8')
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.end(page)
  } else if (pathname === '/getpath') {
    const page = await fs.readFileSync('./index.html', 'utf8')
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    res.end(page)
  } else if (pathname === '/test') {
    res.setHeader('Content-Type', 'text/html;charset=utf8')
    if (query.name === 'jinrui' && query.password === '123') {
      const content = `
      <html>
        <div>成功跳转业务页</div>
        <script>
        fetch('http://localhost:8888/render').then(res => res.json()).then(myJson => console.log(myJson))
        </script>
      </html>
    `
      res.end(content, 'utf8')
      return
    }
    const content = `
        <html>
          <div>用户名/密码不正确</div>
        </html>
      `
    res.end(content)
  } else if (pathname === '/render') {
    res.setHeader('Content-Type', 'json;charset=utf8')
    res.end(JSON.stringify({ data: '请求成功！' }), 'utf8')
  }
})
  .listen(8888, () => console.log('Server is running at http://localhost:8888'))