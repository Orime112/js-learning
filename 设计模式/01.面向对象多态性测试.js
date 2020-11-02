/**
 * 通俗来讲，多态性就是针对同一命令，不同对象做出不同表现
 */

// 一个不多态的演示--->这个时候想要新增一种动物就要改动sound代码
function sound(obj){
  if(obj instanceof Duck){
    console.log('gagaga')
  }
  if(obj instanceof Dog){
    console.log('wangwangwang')
  }
}
function Duck(){}
function Dog(){}

sound(new Duck())
sound(new Dog())

// 一个多态的演示 ---> 这时候新加入一种动物的叫声只要新创建动物类就好了而无需更改chirp代码
function chirp(obj){
  obj.chirp()
}

function ChirpDuck(){}
ChirpDuck.prototype.chirp = () => console.log('嘎嘎嘎')
function ChirpDog(){}
ChirpDog.prototype.chirp = () => console.log('汪汪汪')

chirp(new ChirpDuck())
chirp(new ChirpDog())