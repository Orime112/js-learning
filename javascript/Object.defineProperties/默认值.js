/**
 * * 我们在前面已经说了各个属性是有默认值的，所以在用Object.defineProperty()时某个属性没定义不是代表没用这条属性，而是会用这条属性的默认值。
 * ! 默认 writable: false（不可以写，重写无效）；enumerable：false（不可以枚举该 key）；configurable：false（不可以再修改任何的属性描述符）
 */

let o = {age: 21};
Object.defineProperty(o, 'name', {
    value: '时间跳跃',
    // configurable: false
});

//等同于
// Object.defineProperty(o, 'name', {
//     value: '时间跳跃',
//     writable: false,
//     enumerable: false,
//     configurable: false
// });

// Object.defineProperty(o, 'name', {
//   get(){
//     return '改了'
//   }
// })

Object.keys(o).forEach((key, index) => {
  console.log(key);
})

o.name = '夸夸夸'
console.log(o.name);