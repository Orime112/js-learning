const wSet = new WeakSet()
const set = new Set()

let key = {a: 1}
wSet.add(key)
set.add(key)
console.log(set.has(key));
console.log(wSet.has(key));
console.log(set.size); // 1

// key = null
console.log(wSet.has(key));
console.log(set.has(key)); // ! false 虽然为 false，size长度仍然为1 
console.log(set.size); // 1

set.delete(key) // ! 设置 key 为 null 之后无法执行delete方法
console.log(set.size);

set.clear()
console.log(set.size);



