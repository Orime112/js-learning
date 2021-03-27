console.time('render')
const total = 100000
const once = 20
let loopCount = Math.ceil(total / once)
const originCount = loopCount
let countOfRender = 0
const ul = document.querySelector('ul')

const start = document.getElementById('start')
const stop = document.getElementById('stop')

function add() {
  const fragment = document.createDocumentFragment()
  for (let i = 0; i < once; i++) {
    const li = document.createElement('li')
    li.innerText = Math.floor(Math.random() * total)
    fragment.appendChild(li)
  }
  ul.appendChild(fragment)
  countOfRender += 1
  loop()
}

function loop() {
  if (countOfRender < loopCount) {
    // window.requestAnimationFrame(add)
    add()
  }
}


// * 开始
start.addEventListener('click', () => {
  loopCount = originCount
  loop()
})

stop.addEventListener('click', () => {
  loopCount = countOfRender
})
console.timeEnd('render')