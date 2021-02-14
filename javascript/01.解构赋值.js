// 数组和对象的解构赋值
let { foo, bar } = { foo: "js", bar: "cool" }
console.log(foo+bar);

// 对已经定义过的变量进行解构，必须在解构语句外层包裹()才能解构成功
let far;
({ far } = { far: "试试就试试" })
console.log(far);

// undefined是没有值，null是有值并且这个值就是null

// 数组解构的时候格式要对应上

// 扩展运算符...arr1，就相当于把arr1里面的元素一个个拿出来，而不是再针对arr1的操作了

// for of 循环取数组的值
const f1 = (first, ...arg) => {
  // console.log(arg);
  for( const val of arg ) {
    console.log(val);
    
  }
}
// f1(0,1,2,3,4,5,6,7)

// 测试for of 循环取对象的值 ====> for of 里面的参数val表示的被遍历对象的成员本身，而不是成员的值
const f2 = (first, ...arg) => {
  // console.log(arg);
  
  for(const val of arg) {
    console.log(val);
  }
}
// f2( {a:"12"}, {b:"31"}, {c:"85"} )

// includes替代indexOf
let str1 = "替代"
let str2 = "使用includes替代indexOf判断字符串是否包含"
console.log(str2.includes(str1));

// .repeat复制字符串
console.log("复制*".repeat(10));

// 判断是否是数字
// let num1 = 12
// console.log(Number.isFinite(num1));
// console.log(Number.isFinite("num"));
// console.log(Number.isFinite(NaN));
// console.log(Number.isFinite(undefined));
// console.log(Number.isFinite("字符串"));

// Array.from将一个json格式的对象转换为数组

let json_arr = {
  '0':'jspang',
  '1':'技术胖',
  '2':'编程',
  '3':'算法',
  length : 4
}
// console.log(Array.from(json_arr));

// Array.of转换成数组
// console.log(Array.of(1,2,3));
// console.log(JSON.parse('[1,2,3]'));

// 试验includes和indexOf对于""的判断===>includes对""为true，indexOf对""为0，能找的情况下includes相当于Boolean(str.indexOf(str1))
// console.log("abcdefg".indexOf(""));

// 实例方法find，返回符合条件的数组元素，只返回符合条件的一个
//Returns the value of the first element in the array where predicate is true, and undefined otherwise.
// value用以行成查找条件的目标数组中的每一个元素，index是查找过程中找到之前所经历过的所有下标
// arr就是原数组
let arr3 = [1,3,4,5,6,7]
console.log(arr3.find((value,index,arr) => {
  // console.log(index);
  // console.log(arr);
  return value>4
} ));

// find方法验证
let arr4 = [1,23,45,75,87]
console.log(arr4.find((value,index,arr) => {
  return value === 23
}));

/** 解构参数传值  */
function setCookie(name, value, {secure, path, domain, expires}){
  console.log(name, value, secure, path, '简单实现')
}
setCookie('测试', '值啊', {secure: '安全得很', expires: 600, path: 'https://www.baidu.com'})

/** 解构参数默认值Pro——设置默认参数 */
const defaultOptionObj = {secure: '安全', path: '路径', domain: '主域名', expires: '16000'}
function setCookieDefault(name, value, {secure='默认', path='默认', domain='默认', expires='默认'} = defaultOptionObj){
  console.log(name, value, secure, path, domain, expires, '默认值实现')
}
setCookieDefault('默认值name', '默认值value', {secure: '默认值安全', path: '默认值路径'})
