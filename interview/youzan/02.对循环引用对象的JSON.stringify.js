/**
 * 循环引用对象默认不能JSON.stringify，否则会报错
 */

let o = {
  a: '123',
  b: '李华',
  c: undefined
}

let o1 = [
  '123',
  '李华',
  undefined
]

console.log(JSON.stringify(o)) // * {"a":"123","b":"李华"}

// o.c = o

// console.log(JSON.stringify(o)) // * TypeError: Converting circular structure to JSON


console.log(JSON.stringify(o, ['b', 'c'], 'placeholder'))
console.log(JSON.stringify(o1, ['b', 'c'], 'placeholder'))

// ! 解决方法，冲洗JSON.stringify方法
var handleCircular = function() {  
  var cache = [];
  var keyCache = []
  return function(key, value) {
      if (typeof value === 'object' && value !== null) {
          var index = cache.indexOf(value);
          if (index !== -1) { // * 如果当前cache中有过该对象值，则返回cacheKey对应的key
              return '[Circular ' + keyCache[index] + ']';
          }
          cache.push(value);
          keyCache.push(key || 'root');
      }
      return value;
  }
}

var tmp = JSON.stringify;  
JSON.stringify = function(value, replacer, space) {  
  replacer = replacer || handleCircular();
  return tmp(value, replacer, space);
}

var a = {
	b: 'foo',
    c: {}
}

a.d = a;
a.c.e = a.c;

console.log(JSON.stringify(a)); // * {"b":"foo","c":{"e":"[Circular c]"},"d":"[Circular root]"}


