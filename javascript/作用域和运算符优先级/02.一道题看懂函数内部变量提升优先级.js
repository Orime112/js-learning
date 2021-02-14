function sum(a, b){
  console.log(a)
  var a = 12
  console.log(a)
}

sum(1) //* 1, 12，说明 arguments 优先级 > var优先级

function sum1(a, b){
  console.log(a)
  function a(){
    let b = 0
  }
  console.log(a)
}

sum1(1) //* [Function: a]和[Function: a]，说明函数声明优先级 > arguments 优先级