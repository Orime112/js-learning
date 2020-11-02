const EventEmitter = require('events')

const emitter = new EventEmitter()

// once只监听一次
emitter.once('click', (args) => {
  console.log('监听到了1', args)
})
const listen2 = (args) => {
  console.log('监听到了2', args);
  
}
// prependListener最新被监听
emitter.prependListener('click', listen2)

setTimeout(() => {
  emitter.emit('click', '参数')
  emitter.off('click', listen2)
  emitter.emit('click', '参数')
})
console.log(arguments)
console.log(arguments[2] == module)