let obj = {
  married: true,
  age: 10,
  name: 'zhufeng',
  girlfriend: null,
  boyfriend: undefined,
  flag: Symbol('man'),
  home: { name: '北京' },
  set: new Set(),
  map: new Map(),
  getName: function () { },
  hobbies: ['抽烟', '喝酒', '烫头'],
  error: new Error('error'),
  pattern: /^regexp$/ig,
  math: Math,
  json: JSON,
  // document: document,
  // window: window
};
obj.set.add(1);
obj.map.set('name', 'value');
obj.obj = obj;

let OBJECT_TYPES = [{}, [], new Map(), new Set(), new Error(), new Date(), /^$/].map(item => getType(item));
const MAP_TYPE = getType(new Map());
const SET_TYPE = getType(new Set());
const CONSTRUCT_TYPE = [new Error(), new Date()].map(item => getType(item));
const SYMBOL_TYPE = getType(Symbol('1'));
const REGEXP_TYPE = getType(/^$/);
function clone(source, map = new Map()) {
  let type = getType(source);
  if (!OBJECT_TYPES.includes(type)) {//基本数据类型
      return source;
  }
  if (map.get(source)) {
      return map.get(source);
  }
  if (CONSTRUCT_TYPE.includes(type)) {
      return new source.constructor(source);
  }
  let target = new source.constructor();
  map.set(source, target);

  if (SYMBOL_TYPE === type) {
      return Object(Symbol.prototype.valueOf.call(source));
  }
  if (REGEXP_TYPE === type) {
      const flags = /\w*$/;
      const target = new source.constructor(source.source, flags.exec(source));
      target.lastIndex = source.lastIndex;
      return target;
  }
  if (SET_TYPE === type) {
      source.forEach(value => {
          target.add(clone(value, map));
      });
      return target;
  }
  if (MAP_TYPE === type) {
      source.forEach((value, key) => {
          target.set(key, clone(value, map));
      });
      return target;
  }
  let keys = Object.keys(source);
  let length = keys.length;
  let index = 0;
  while (index < length) {
      target[keys[index]] = clone(source[keys[index]], map);
      index++;
  }
  return target;
};

function getType(source) {
  return Object.prototype.toString.call(source);
}
let cloned = clone(obj);
console.log(cloned);
console.log(obj.home === cloned.home);
console.log(obj.set === cloned.set);
console.log(obj.map === cloned.map);
/*
[object Boolean]
[object Number]
[object String]
[object Null]
[object Undefined]
[object Symbol]
[object Object]
[object Function]
[object Array]
[object Error]
[object RegExp]
[object Math]
[object JSON]
[object HTMLDocument]
[object Window]"
*/
 