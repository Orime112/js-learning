//subscribe.js
class Subscribe {
  constructor() {
      //创建容器
      this.pond = [];
  }
  //向容器中增加方法，注意去重
  add(fn) {
      let pond = this.pond,
          isExist = false;
      //去重环节
      pond.forEach(item => item === fn ? isExist = true : null);
      !isExist ? pond.push(fn) : null;
  }
  remove(fn) {
      let pond = this.pond;
      pond.forEach((item, index) => {
          if(item === fn) {
              //提一下我在这里遇到的坑，这里如果写item=null是无效的
              //例子：let a = {name: funtion(){}};
              //let b = a.name;
              //这个时候操作b的值对于a的name属性是没有影响的
              pond[index] = null;
          }
      })
  }
  fire(...arg) {
      let pond = this.pond;
      for(let i = 0; i < pond.length; i++) {
          let item = pond[i];
          //如果itme为空了,最好把它删除掉
          if (item === null) {
              pond.splice(i, 1);
              //如果用了splice要防止数组塌陷问题，即删除了一个元素后，后面所有元素的索引默认都会减1
              i--;
              continue;
          }
          item(...arg);
      }
  }
}
globalThis.Subscribe = Subscribe;

// let subscribe = new Subscribe();
// let fn1 = function fn1(x, y) {
//     console.log(1, x, y);
// };
// let fn2 = function fn2() {
//     console.log(2);
// };
// let fn3 = function fn3() {
//     console.log(3);
//     subscribe.remove(fn1);
//     subscribe.remove(fn2);
// };
// let fn4 = function fn4() {
//     console.log(4);
// };

// subscribe.add(fn1);
// subscribe.add(fn1);
// subscribe.add(fn2);
// subscribe.add(fn1);
// subscribe.add(fn3);
// subscribe.add(fn4);
// setInterval(() => {
//     subscribe.fire(100, 200);
// }, 1000);


