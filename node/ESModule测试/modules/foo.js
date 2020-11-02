export let name = 'foo.js'
export const age = 18

setTimeout(() => {
  name = 'aaaa'
}, 1000)

export function sayHello(){
  console.log('hello foo.js')
}