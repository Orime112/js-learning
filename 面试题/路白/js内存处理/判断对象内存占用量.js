function calcMemory(target){
  const dataType = typeof target
  if(dataType === 'string') {
    return target.length * 2
  }
  if(dataType === 'number') {
    return 8
  }
  if(dataType === 'boolean') {
    return 4
  }
  if(dataType === 'object' && dataType !== null){
    if(Array.isArray(target)){
      return target.map(calcMemory).reduce((pre, cur) => pre + cur, 0)
    } else {
      // * 对象的处理
    }
  }
}