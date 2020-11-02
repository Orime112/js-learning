/**
10进制转2进制就是将给定的数除以2取余数，余数存入栈中，而商不为0的情况下一直除以二，最终从栈顶到栈底的排列即为十进制转2进制的结果
 */
function decimalToBinary(decNumber){
  const remStack = []
  let [number, rem, binaryString] = [decNumber, null, '']
  while(number > 0){
    rem = Math.floor(number % 2)
    remStack.push(rem)
    number = Math.floor(number/2)
  }
  while(remStack.length){
    binaryString += remStack.pop().toString()
  }
  return binaryString
}

console.log(decimalToBinary(10))