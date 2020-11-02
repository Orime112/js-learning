function Temperature(degress){
  this.degress = degress
}

Temperature.prototype[Symbol.toPrimitive] = function(hint) {
  switch(hint) {
    case 'string':
      return this.degress + '\u00b0';
    case 'number':
      return this.degress;
    case 'default':
      return this.degress + 'degress'
  }
}

const freezing = new Temperature(32)
console.log(freezing + 1); // + 触发 default
console.log(freezing/2); // / 触发 number
console.log(String(freezing)); // String 方法触发 string


