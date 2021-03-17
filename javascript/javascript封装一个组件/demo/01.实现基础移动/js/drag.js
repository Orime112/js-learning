class Drag{
  constructor(ele){
    this.ele = ele
    ;['startX', 'startY', 'startLeft', 'startTop'].forEach(item => {
      this[item] = null
    })
    this.DOWN = this.down.bind(this)
    this.ele.addEventListener('mousedown', this.DOWN)
  }
  down(ev){
    this.startX = ev.clientX
    this.startY = ev.clientY
    this.startLeft = this.ele.offsetLeft
    this.startTop = this.ele.offsetTop

    this.MOVE = this.move.bind(this)
    this.UP = this.up.bind(this)
    document.addEventListener('mousemove', this.MOVE)
    document.addEventListener('mouseup', this.UP)
  }
  move(ev){
    console.log('start move')
    let ele = this.ele
    let curX = ev.clientX - this.startX + this.startLeft
    let curY = ev.clientY - this.startY + this.startTop
    console.log(curX, curY, ele.style.left, ele.style.top, ele)
    ele.style.left = curX + 'px'
    ele.style.top = curY + 'px'
  }
  up(ev){
    console.log('move end')
    document.removeEventListener('mousemove', this.MOVE)
    document.removeEventListener('mouseup', this.UP)
  }
}

globalThis.Drag = Drag