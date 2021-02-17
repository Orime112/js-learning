let obj = {
  name: "李华",
  age: 10,
  home: {
    name: "杭州",
  },
  hobbies: ["抽烟", "喝酒", "烫头"],
}

obj.obj = obj

//! 传统克隆不解决循环引用问题将会导致： RangeError: Maximum call stack size exceeded

function clone(source, map = new Map()) {
  if (typeof source === "object") {
    if (map.get(source)) return map.get(source)
    const target = Array.isArray(source) ? [] : {}
    map.set(source, target)
    for (let key in source) {
      target[key] = clone(source[key], map)
    }
    return target
  }
  return source
}

let obj2 = clone(obj)
console.log(obj2)
/**
<ref *1> {
  name: '李华',
  age: 10,
  home: { name: '杭州' },
  hobbies: [ '抽烟', '喝酒', '烫头' ],
  obj: [Circular *1]
} */
