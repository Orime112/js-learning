// * 1、装饰器方案

export function measure(target: any, name: string, descriptor: any){
  const oldValue = descriptor.value;
  descriptor.value = async function () {
    console.time(name)
    const res = await oldValue.apply(this, arguments)
    console.timeEnd(name)
    return res
  }
  return descriptor
}

/**
* * 原理
 * function readonly(target, name, descriptor){
  // descriptor对象原来的值如下
  // {
  //   value: specifiedFunction,
  //   enumerable: false,
  //   configurable: true,
  //   writable: true
  // };
  descriptor.writable = false;
  return descriptor;
}

readonly(Person.prototype, 'name', descriptor);
// 类似于
Object.defineProperty(Person.prototype, 'name', descriptor);

 */

// * 测试用例

function longTimeFn(){
  return new Promise((resolve) => setTimeout(resolve, 3000))
}

@measure
async function create(){
  await longTimeFn()
}

// * 2、高阶函数方案

function calcRuntime(fn: Function){
  return async function(){
    console.time(fn.name)
    await fn.apply(this, arguments)
    console.timeEnd(fn.name)
  }
}

calcRuntime(longTimeFn)()