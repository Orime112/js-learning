const fs = require('fs');

// 传统的方式
// fs.readFile('./foo.txt', (err, data) => {
//   console.log(data);
// });

// 流的方式读取
const reader = fs.createReadStream("./foo.txt", {
  start: 3,
  end: 10,
  highWaterMark: 2
});

// 数据读取的过程
reader.on("data", (data) => {
  console.log(data);

  reader.pause(); // 读取文件过程暂停，实现读取缓冲

  setTimeout(() => {
    reader.resume();
  }, 1000);
});

reader.on('open', () => {
  console.log("文件被打开");
})

reader.on('close', () => {
  console.log("文件被关闭");
})
