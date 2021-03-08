//Drag.js
if (typeof Subscribe === 'undefined') {
  throw new ReferenceError('没有引入subscribe.js!');
}

class Drag {
  constructor(ele) {
      this.ele = ele;
      ['strX', 'strY', 'strL', 'strT', 'curL', 'curT'].forEach(item => {
          this[item] = null;
      });
      
      this.subDown = new Subscribe();
      this.subMove = new Subscribe();
      this.subUp = new Subscribe();

      //=>DRAG-START
      this.DOWN = this.down.bind(this);
      this.ele.addEventListener('mousedown', this.DOWN);
  }

  down(ev) {
      let ele = this.ele;
      this.strX = ev.clientX; // 鼠标按下距离左边屏幕边缘
      this.strY = ev.clientY; // 鼠标按下距离上边屏幕边缘
      this.strL = ele.offsetLeft; // 元素左边缘距离左边屏幕边缘
      this.strT = ele.offsetTop; // 元素上边缘距离上方屏幕边缘

      this.MOVE = this.move.bind(this);
      this.UP = this.up.bind(this);
      document.addEventListener('mousemove', this.MOVE);
      document.addEventListener('mouseup', this.UP);

      this.subDown.fire(ele, ev);
  }

  move(ev) {
      let ele = this.ele;
      this.curL = ev.clientX - this.strX + this.strL; // 左偏移 = (鼠标当前位置 - 鼠标刚开始点击位置)也就是滑动距离 + 原始偏移量
      this.curT = ev.clientY - this.strY + this.strT; // 右偏移 =  (鼠标当前位置 - 鼠标刚开始点击位置)也就是滑动距离 + 原始偏移量
      ele.style.left = this.curL + 'px';
      ele.style.top = this.curT + 'px';

      this.subMove.fire(ele, ev);
  }

  up(ev) {
      document.removeEventListener('mousemove', this.MOVE);
      document.removeEventListener('mouseup', this.UP);

      this.subUp.fire(this.ele, ev);
  }
}

window.Drag = Drag;
