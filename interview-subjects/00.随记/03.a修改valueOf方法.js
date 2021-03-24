var a = {
  index: 0,
  valueOf(){
    return this.valueList[this.index++]
  },
  valueList: [1, 12]
};
if(a == 1 && a == 12){
  console.log(a); // { index: 2, valueOf: [Function: valueOf], valueList: [ 1, 12 ] }
}