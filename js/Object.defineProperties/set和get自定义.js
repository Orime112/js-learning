let o = {}
o.name = '听风是风';
console.log(o.name);

// 使用get set 模拟赋值取值操作符
let age;
Object.defineProperty(o, 'age', {
  get(){
    return age
  },
  set(val){
    age = val
  }
})

o.age = 18
console.log(o.age);