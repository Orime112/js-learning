function deepClone(target, cache = new Map()) {
  if (cache.get(target)) return cache.get(target)
  if (target instanceof Object) {
    let dist
    if (target instanceof Array) {
      dist = []
    } else if (target instanceof Function) {
      // * 拷贝函数
      dist = function () {
        return target.call(this, ...arguments)
      }
    } else if (target instanceof RegExp) {
      // * 拷贝正则表达式
      dist = new RegExp(target.source, target.flags)
    } else if (target instanceof Date) {
      dist = new Date(target)
    } else {
      // * 拷贝普通对象
      dist = {}
    }
    // * 如果产生了循环引用
    cache.set(target, dist)
    // * 拷贝可遍历属性
    for (let key in target) {
      // * 过滤原型上的属性 Object.create({name: 'lihua'})
      // eslint-disable-next-line no-prototype-builtins
      if (target.hasOwnProperty(key)) {
        dist[key] = deepClone(target[key], cache)
      }
    }
    return dist
  } else {
    return target
  }
}

const a = {
  i: Infinity,
  s: "",
  bool: false,
  n: null,
  u: undefined,
  sym: Symbol(),
  obj: {
    i: Infinity,
    s: "",
    bool: false,
    n: null,
    u: undefined,
    sym: Symbol(),
  },
  array: [
    {
      nan: NaN,
      i: Infinity,
      s: "",
      bool: false,
      n: null,
      u: undefined,
      sym: Symbol(),
    },
    123,
  ],
  fn: function () {
    return "fn"
  },
  date: new Date(),
  re: /hi\d/gi,
}
let a2 = deepClone1(a)
console.log(a2 !== a)
console.log(a2.i === a.i)
console.log(a2.s === a.s)
console.log(a2.bool === a.bool)
console.log(a2.n === a.n)
console.log(a2.u === a.u)
console.log(a2.sym === a.sym)
console.log(a2.obj !== a.obj)
console.log(a2.array !== a.array)
console.log(a2.array[0] !== a.array[0])
console.log(a2.array[0].i === a.array[0].i)
console.log(a2.array[0].s === a.array[0].s)
console.log(a2.array[0].bool === a.array[0].bool)
console.log(a2.array[0].n === a.array[0].n)
console.log(a2.array[0].u === a.array[0].u)
console.log(a2.array[0].sym === a.array[0].sym)
console.log(a2.array[1] === a.array[1])
console.log(a2.fn !== a.fn)
console.log(a2.date !== a.date)
console.log(a2.re !== a.re)

// * 自行测试开始
function deepClone1(target, cache = new Map()) {
  if (cache.get(target)) return cache.get(target)
  if (target instanceof Object) {
    let dist
    if (Array.isArray(target)) {
      dist = []
    } else if (target instanceof Function) {
      dist = function () {
        return target.call(this, ...arguments)
      }
    } else if (target instanceof RegExp) {
      dist = new RegExp(target.source, target.flags)
    } else if (target instanceof Date) {
      dist = new Date(target)
    } else {
      dist = {}
    }
    for (let key in target) {
      // eslint-disable-next-line no-prototype-builtins
      if (target.hasOwnProperty(key)) {
        dist[key] = deepClone1(target[key], cache)
      }
    }
    return dist
  }
  return target
}
