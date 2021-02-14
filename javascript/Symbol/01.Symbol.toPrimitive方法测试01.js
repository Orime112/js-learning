function Read(book) {
  this.book = book
}

Read.prototype[Symbol.toPrimitive] = function(hint){
  switch (hint) {
    case 'string':
      return this.book + '本'
    case 'number':
      return this.book
    case 'default':
      return this.book + '🎉'
  }
}

const bookCount = new Read(32)
console.log(bookCount + 1); // 默认
console.log(bookCount/2); // 数字
console.log(String(bookCount)); // 字符串
