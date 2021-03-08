//dragExtend.js
function extendDrag(drag) {
  //鼠标按下
  let stopAnimate = function stopAnimate(curEle) {
      clearInterval(curEle.flyTimer);
      curEle.speedFly = undefined;
      clearInterval(curEle.dropTimer);
  };
  //鼠标移动
  let computedFly = function computedFly(curEle) {
      if (!curEle.lastFly) {
          curEle.lastFly = curEle.offsetLeft;
          curEle.speedFly = 0;
          return;
      }
      curEle.speedFly = curEle.offsetLeft - curEle.lastFly;
      curEle.lastFly = curEle.offsetLeft;
  };
  //水平方向的运动
  let animateFly = function animateFly(curEle) {
      let minL = 0,
          maxL = document.documentElement.clientWidth - curEle.offsetWidth,
          speed = curEle.speedFly;
      curEle.flyTimer = setInterval(() => {
          speed *= .98;
          Math.abs(speed) <= 0.1 ? clearInterval(animateFly):null;
          let curT = curEle.offsetLeft;
          curT += speed;
          if (curT >= maxL) {
              curEle.style.left = maxL + 'px';
              speed *= -1;
              return;
          }
          if (curT <= minL) {
              curEle.style.left = minL + 'px';
              speed *= -1;
              return;
          }
          curEle.style.left = curT + 'px';
      }, 20);
  };
  //竖直方向的运动
  let animateDrop = function animateDrop(curEle) {
      let speed = 9.8,
          minT = 0,
          maxT = document.documentElement.clientHeight - curEle.offsetHeight;
      curEle.dropTimer = setInterval(() => {
          speed += 10;
          speed *= .98;
          Math.abs(speed) <= 0.1 ? clearInterval(animateFly):null;
          let curT = curEle.offsetTop;
          curT += speed;
          if (curT >= maxT) {
              curEle.style.top = maxT + 'px';
              speed *= -1;
              return;
          }
          if (curT <= minT) {
              curEle.style.top = minT + 'px';
              speed *= -1;
              return;
          }
          curEle.style.top = curT + 'px';
      }, 20);
  };
  drag.subDown.add(stopAnimate);
  drag.subMove.add(computedFly);
  drag.subUp.add(animateFly);
  drag.subUp.add(animateDrop);
}

globalThis.extendDrag = extendDrag;