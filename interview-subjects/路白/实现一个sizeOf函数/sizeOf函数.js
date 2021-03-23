
const testData = {
  a: 11,
  b: 'cccc',
  2222: false,
  c: null,
  d: [null, 1, 2],
}

// testData.e = testData
// testData.d[3] = testData

// ? number -> 8个字节
// ? string -> 每个length2个字节
// ? boolean -> 4个字节
let objSet = new Set()
function sizeOfObj(obj) {
  objSet.add(obj)
  let size = 0
  const set = new Set()
  for (let key in obj) {
    if (!set.has(obj[key])) {
      if(objSet.has(obj[key])) throw new Error('不支持循环引用')
      set.add(obj[key])
      size += calculator(obj[key])
    }
    size += key.length * 2
  }
  return size
}

function calculator(object, map = new Map()) {
  const objType = typeof object

  switch (objType) {
    case 'string':
      return object.length * 2
      break;
    case 'number':
      return 8
    case 'boolean':
      return 4
    case 'object':
      if (Array.isArray(object)) {
        // * 数组的处理
        return object.map(calculator).reduce((pre, cur) => pre + cur, 0)
      } else {
        // * 对象的处理
        return sizeOfObj(object)
      }
    default:
      return 0
      break;
  }
}

console.log(calculator(testData)) // * 52