function Person() {
  // * 初始化年龄
  let age;
  Object.defineProperty(this, 'age', {
    get() {
      let ageRange = [41, 20, 0],
        level = ['老年', '中年', '少年']
      for (let i = 0; i < ageRange.length; i++) {
        if (age >= ageRange[i]) {
          return level[i]
        }
      }
      return level[0]
    },
    set(val) {
      val >= 0 ? age = val : null
    }
  })
}

// let p = new Person()
// p.age = 1
// console.log(p.age);
// p.age = 15
// console.log(p.age);
// p.age = 25
// console.log(p.age);
// p.age = 45
// console.log(p.age);

/**
 * * Function 的方式实现
 */

function Person1() {
  this._age = null
}
Person1.prototype = {
  get age() {
    let ageRange = [41, 20, 0],
      level = ['老年', '中年', '少年']
    for (let i = 0; i < ageRange.length; i++) {
      if (this._age >= ageRange[i]) {
        return level[i]
      }
    }
    return level[0]
  },
  set age(val) {
    val >= 0 ? this._age = val : null
  }
}


let p1 = new Person1()
p1.age = 1
console.log(p1.age);
p1.age = 15
console.log(p1.age);
p1.age = 25
console.log(p1.age);
p1.age = 45
console.log(p1.age);

/**
 * * ES6的class实现方式
 */

class Person2 {
  constructor(val) {
    this.age = val
  }
  get age() {
    let ageRange = [41, 20, 0],
      level = ['老年', '中年', '少年']
    for (let i = 0; i < ageRange.length; i++) {
      if (this.age >= ageRange[i]) {
        return level[i]
      }
    }
    return level[0]
  }
  set age(val){
    val >= 0 ? val : 0
  }
}

let p2 = new Person1()
p2.age = 1
console.log(p2.age);
p2.age = 15
console.log(p2.age);
p2.age = 25
console.log(p2.age);
p2.age = 45
console.log(p2.age);