

// 测试用例
let str = 'good good study and day day up'
let reg = /\b([a-z])[a-z]*\b/g
let upperStr = str.replace(reg, (...args) => {
  let [big, $1] = args
  big = big.slice(1)
  $1 = $1.toUpperCase()
  return $1 + big
})

console.log(upperStr) // Good Good Study And Day Day Up