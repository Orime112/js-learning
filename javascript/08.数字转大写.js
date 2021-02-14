const map = ['一', '二', '三', '四', '五', '六', '七', '八', '九', '十']
const unit = ['', '十', '百', '千', '万']

function toChineseNum(rawNumber) {
  const str = rawNumber.toString()
  const len = str.length
  if(len > 5) {
    throw new Error('数值过大无法处理！')
  }
  let res = ''
  for(let i = 0; i<len; i++) {
    res += map[str[i] - 1] + unit[len - i - 1]
  }
  return res
}

console.log(toChineseNum(12345))