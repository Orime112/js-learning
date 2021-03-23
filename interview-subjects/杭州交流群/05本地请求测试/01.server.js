const express = require("express")

const app = express()
app.all("*", function (req, res, next) {
  //第二个参数,是一个*号,表示任意域名下的页面都可以都可以请求请求这台服务器;
  res.header("Access-Control-Allow-Origin", "*")
  //设置指定域名:
  //res.header("Access-Control-Allow-Origin", "http://localhost:5001");
  //这样,baidu.com下面的网页,就可以ajax请求你的服务器了
  res.header("Access-Control-Allow-Headers", "X-Requested-With")
  res.header("Access-Control-Allow-Methods", "PUT,POST,GET,DELETE,OPTIONS")
  //第二个参数,为对方可以以哪种HTTP请求方式请求你的服务器,根据自己的情况酌情设置
  res.header("X-Powered-By", " 3.2.1")
  res.header("Content-Type", "application/json;charset=utf-8")
  next()
})

app.get("/get/data", (req, res) => {
  res.json({ loginTime: new Date().toLocaleString(), code: 200 })
})

app.listen(8088, () => {
  console.log(`Server is running at http://localhost:8088`)
})
