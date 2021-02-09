// 测试

const isSon = (f, s) => {
  const same = (a, b) => {
    let isSame = true
    for (let i = 0; i < a.length; i++) {
      if (a[i] !== b[i]) {
        isSame = false
        break
      } else if (typeof a[i] === 'object') {
        isSame = same(a[i], b[i])
      }
    }
    return isSame
  }
  let startIndex = f.indexOf(s[0])
  let subArr = f.splice(startIndex, s.length)
  return same(subArr, s)
}

let c = ['天王老子']

let d = c

let e = ['赤面阎罗', c]
let g = e
// g[1] = d // true
g[1] = ['天王'] // true

let f = [1, 2, 3, e, 4, 5, 6]
let s = [2, 3, g, 4]

console.log(isSon(f, s));