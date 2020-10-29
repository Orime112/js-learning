const fs = require('fs')
const sharp = require('sharp')

fs.readFile('./foo.txt', (err, data) => {
  if(err) {
    console.log(err);
    return
  }
  console.log(data);
  console.log(data.toString());
})

fs.readFile('./bar.jpg', (err, data) => {
  console.log(data);
  sharp('./baz.png')
    .resize(100, 100)
    .toFile('./bax.png')
})