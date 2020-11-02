const fs = require('fs');

// 传统的写入方式
// fs.writeFile("./bar.txt", "Hello Stream", {flag: "a"}, (err) => {
//   console.log(err);
// });

// Stream的写入方式
const writer = fs.createWriteStream('./bar.txt', {
  // flags: "a", // a在windows系统中默认追加到内容最后，start 失效
  flags: "r+", // r+才能在指定位置开始写
  start: 4
});

writer.write("你好啊", (err) => {
  if (err) {
    console.log(err);
    return;
  }
  console.log("写入成功");
});

writer.write("李银河", (err) => {
  console.log("第二次写入");
})

// writer.close();
// write("Hello World");
// close();
writer.end("Hello World");

writer.on('close', () => {
  console.log("文件被关闭");
})