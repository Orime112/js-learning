// 测试
let uid = Symbol.for('uid')
let uid1 = Symbol.for('uid')
console.log(uid === uid1, Symbol.keyFor(uid))

const MySymbol = new Object()
const globalObj = {}
MySymbol.for = function(str) {
  if(globalObj[str]){
    return globalObj[str]
  }
  const strSymbol = Symbol(str)
  globalObj[str] = strSymbol
  return strSymbol
}
MySymbol.keyFor = function(symbol){
  if(typeof symbol !== "symbol") throw new TypeError(`${symbol} is not a symbol`)
  const target = Object.entries(globalObj).find(list => list[1] === symbol)
  if(target) return target[0]
  return null
}

let umd = MySymbol.for('umd')
let umd1 = MySymbol.for('umd')
console.log(umd === umd1, MySymbol.keyFor(umd))