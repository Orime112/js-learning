const path = require('path')
const express = require('express')

const app = express()

const bodyParser = require('body-parser')
const cookieParser = require('cookie-parser')

app.use(bodyParser.urlencoded({extended: true}))
app.use(bodyParser.json())
app.use(cookieParser())

app.use(express.static(path.resolve(__dirname, 'public')))
app.use(express.static(path.resolve(__dirname)))

const userList = [{username: 'orime', password: 'orime'}, {username: 'yy', password: 'yy'}]
const SESSION_ID = 'connect.id'
const session = {} // 根据 SESSION_ID 找到对应的用户信息记录
const commentList = [{username: '阿Q', content: '人活着就要开心'}, {username: '孔乙己', content: '回字到底有多少种写法？'}]

// * 用户登录接口
app.post('/api/login', (req, res) => {
  const { username, password } = req.body
  console.log(username, password)
  const user = userList.find(user => {
    return user.username === username && user.password === password
  })
  if(user) {
    const cardId = Math.random() + Date.now()
    res.cookie(SESSION_ID, cardId, {httpOnly: true})
    session[cardId] = {user}
    res.json({code: 0})
  } else {
    res.json({code: 1, error: '用户不存在'})
  }
})

// * 登录成功返回接口
// ! 反射型 XSS 攻击 http://localhost:3000/welcome?type=<script>alert(document.cookie)</script>
app.get('/welcome', (req, res) => {
  res.send(`${encodeURIComponent(req.query.type)}`) // ! 发送文本使用 res.send 它们的主要区别在于，encodeURI()不会对本身属于URI的特殊字符进行编码，例如冒号、正斜杠、问号和井字号；而encodeURIComponent()则会对它发现的任何非标准字符进行编码。
})

// * 获取评论列表接口
app.get('/api/list', (req, res) => {
  res.json({code: 0, comments: commentList})
})

// * HTML转义
function htmlEncode(str) {
  return String(str)
    .replace(/&/g, '&amp;')
    .replace(/"/g, '&quot;')
    .replace(/'/g, '&#39;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;');
}


// * 新增评论接口
app.post('/api/comments', (req, res) => {
  const cookies = req.cookies
  console.log(cookies)
  const id = cookies[SESSION_ID]
  const user = session[id]
  if(!user) {
    res.json({code: 1, error: '用户未登录'})
  } else {
    commentList.push({username: user.user.username, content: htmlEncode(req.body.content)})
    res.json({code: 0})
  }
})

app.listen(3000, () => {
  console.log(`Server is running at http://localhost:3000`)
})