/**
function People() {
    //        
}
let people = new People();

people.say('hi 1').sleep(10).say('hi 2')

hi 1
等待10 s
hi 2

 */

function People() {
   this.say = function(message){
    console.log(message)
    return this
  }
  this.sleep = function(delay) {
    const now = +new Date()
    while(new Date() -now <= delay*1000){}
    return this
  }
}
let people = new People();
  
people.say('hi 1').sleep(10).say('hi 2')
  
  // hi 1
  // 等待10 s
  // hi 2