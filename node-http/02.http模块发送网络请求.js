const http = require('http')

/** http 模块发送 GET 请求 */
http.get('http://localhost:8888', (res) => {
  res.on('data', (data) => {
    console.log(data.toString());
    
  })
})

/** http 模块发送 POST 请求 */
const req = http.request({
  method: 'POST',
  hostname: 'localhost', // hostname 掐头（http://）去尾（:8888），只放中间的地址即可 
  port: '8888'
}, (res) => {
  res.on('data', (data) => {
    console.log(data.toString())
  })
})
req.end()