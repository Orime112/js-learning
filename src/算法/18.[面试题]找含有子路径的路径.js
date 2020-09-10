/** */
var findSonPath = function(paths) {
  // 如果后面的路径中以前面开头则push到结果集中
  const result = []
  for(let i = 0; i < paths.length; i++){
    for(let j = 1; j < paths.length; j++){
      let a = paths[i], b = paths[j]
      if(a !== b && b.includes(a) && b.startsWith(a) && !result.includes(a)) result.push(a)
    }
  }
  return result
}

let pathsTest1 = ['/a', '/a/b', '/a/c', '/b/c', '/b/c/d', '/b/cf']
let pathsTest2 = ['/a/c', '/a/d', '/x/y/z/b', '/x/y/z', '/x/y']
console.log(findSonPath(pathsTest1))
console.log(findSonPath(pathsTest2))