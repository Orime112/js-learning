const originAll = [
  {id: 1, name: 'a', age: 13},
  {id: 2, name: 'b', age: 13},
  {id: 3, name: 'c', age: 13},
  {id: 4, name: 'd', age: 13},
  {id: 5, name: 'e', age: 13},
  {id: 6, name: 'f', age: 13},
]

const originLeave = [
  {id: 1, position: '产品经理', salary: 13},
  {id: 2, position: '前端', salary: 13},
  {id: 3, position: '后端', salary: 13},
]

const leaveObj = {}
for(let v of originLeave){
  leaveObj[v.id] = v
}

const resObj = []
for(let v of originAll){
  if(leaveObj[v.id]){
    resObj.push({...v, ...leaveObj[v.id]})
  } else {
    resObj.push(v)
  }
}

console.log(resObj)