const path = require('path')

const express = require('express')
const multer = require('multer')

const app = express()

const storage = multer.diskStorage({
  destination: (req, file, cb) => {
    cb(null, './uploads')
  },
  filename: (req, file, cb) => {
    cb(null, String(Date.now() + path.extname(file.originalname)))
  }
})

const upload = multer({
  // dest: './uploads',
  storage,
})

// app.use(upload.any())

/** 单个文件上传使用 upload.single('field') 中间件 */
// app.post('/upload', upload.single('file'), (req, res, next) => {
//   console.log(req.file);
//   res.end('文件上传成功~')
// })

/** 多个文件上传使用 upload.fields([{name: 'file'}]) 中间件 或者 upload.array('file', 3) 中间件 */
app.post('/upload', upload.array('file', 3), (req, res, next) => {
  console.log(req.files);
  res.end('文件上传成功~')
})

app.listen(9090, () => {
  console.log('Server is running at http://localhost:9090');
  
})