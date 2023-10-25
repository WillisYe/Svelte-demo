<script>
  let start;
  var canvas;
  renderCanvas();

  function renderCanvas() {
    setTimeout(() => {
      // 五角星
      canvas = document.querySelector("canvas#canvas");
      if (canvas?.getContext) {
        var ctx = canvas.getContext("2d");
        draw(ctx, 5);
      }
      // 心形
      var paths = getHeart();
      drawPath(document.getElementById("canvas1"), paths);

      // 五角星动画，颜色渐变动画
      window.requestAnimationFrame(step);
    }, 500);
  }

  function step(timestamp) {
    if (start === undefined) start = timestamp;
    const elapsed = timestamp - start;

    //这里使用`Math.min()`确保元素刚好停在200px的位置。
    var x = 0.1 * elapsed;
    var zs = Math.floor(x / 200);
    var ys = x % 200;
    if (zs % 2) {
      x = 200 - ys;
    } else {
      x = ys;
    }
    canvas.style.transform = "translateX(" + x + "px)";

    var colorMax = 0xffffff;
    var base = colorMax / 200;
    var colorStr = Math.floor(base * (x + 1))
      .toString(16)
      .padStart(6, "0");
    var color_change = document.getElementById("color_change");
    if (color_change) {
      color_change.style.background = `#${colorStr}`;
    }

    window.requestAnimationFrame(step);
    // if (elapsed < 2000) {
    //   // 在两秒后停止动画
    //   window.requestAnimationFrame(step);
    //   console.log(x, x / 200, x % 200);
    // }
  }

  function draw(
    ctx,
    n = 5,
    r = 50,
    R = 150,
    x = 150,
    y = 150,
    rot = 0,
    borderWidth = 1,
    borderStyle = "pink",
    fillStyle = "yellow"
  ) {
    canvas.setAttribute("width", 2 * R + "");
    canvas.setAttribute("height", 2 * R + "");
    drawStar(ctx, n, r, R, x, y, rot, borderWidth, borderStyle, fillStyle);
  }

  /* 
  n n角形
  r,R 内外圈半径
  x,y 中心点坐标
  rot 旋转角度
  borderWidth borderStyle 边框宽度 颜色
  fillStyle 填充色
  */
  function drawStar(
    cxt,
    n = 5,
    r = 50,
    R = 150,
    x = 150,
    y = 150,
    rot = 0,
    borderWidth = 1,
    borderStyle = "pink",
    fillStyle = "yellow"
  ) {
    cxt.beginPath();
    var angle = 360 / n;
    var angle1 = 90 - angle;
    var angle2 = angle / 2 + angle1;
    for (var i = 0; i < n; i++) {
      cxt.lineTo(
        Math.cos(((angle1 + angle * i - rot) / 180) * Math.PI) * R + x,
        -Math.sin(((angle1 + angle * i - rot) / 180) * Math.PI) * R + y
      );
      cxt.lineTo(
        Math.cos(((angle2 + angle * i - rot) / 180) * Math.PI) * r + x,
        -Math.sin(((angle2 + angle * i - rot) / 180) * Math.PI) * r + y
      );
    }
    cxt.closePath();

    cxt.lineWidth = borderWidth;
    cxt.strokeStyle = borderStyle;
    cxt.fillStyle = fillStyle;

    cxt.fill();
    cxt.stroke();
  }

  function getHeart() {
    /* 
    参数方程：
    -pi<=t<=pi 或 0<=t<=2*pi
    x=a*(2*cos(t)-cos(2*t))
    y=a*(2*sin(t)-sin(2*t))
    */
    var cos = Math.cos;
    var sin = Math.sin;
    var offset = [100, 100];
    var a = 30;
    var arr = [];
    for (let index = 0; index < 2; index += 0.01) {
      var t = Math.PI * index;
      var x = a * (sin(2 * t) - 2 * sin(t));
      var y = a * (cos(2 * t) - 2 * cos(t));
      arr.push([x + offset[0], y + offset[1]]);
    }
    return arr;
  }

  function drawPath(
    node,
    paths,
    borderWidth = 1,
    borderStyle = "pink",
    fillStyle = "yellow"
  ) {
    if (node.getContext) {
      var cxt = node.getContext("2d");
      cxt.beginPath();

      for (const item of paths) {
        cxt.lineTo(item[0], item[1]);
      }

      cxt.closePath();

      cxt.lineWidth = borderWidth;
      cxt.strokeStyle = borderStyle;
      cxt.fillStyle = fillStyle;

      cxt.fill();
      cxt.stroke();
    }
  }
</script>

<!-- 五角星 -->
<canvas id="canvas" width="200" height="200" />

<div class="flex items-center">
  <!-- 背景色渐变动画 -->
  <div id="color_change" style="width: 100px; height: 100px;" />
  <!-- 心形 -->
  <canvas id="canvas1" width="200" height="200" />

  <div class="ball-wrap">
    <!-- 路径动画 -->
    <svg width="300px" height="175px" version="1.1">
      <path
        fill="transparent"
        stroke="#888888"
        stroke-width="1"
        d="M10 80 Q 77.5 10, 145 80 T 280 80"
        class="path"
      />
    </svg>
    <div class="ball" />
  </div>
</div>

<style lang="scss">
  #canvas1 {
    animation: heart 0.75s linear alternate infinite;
  }

  @keyframes heart {
    from {
      transform: scale(1);
    }
    to {
      transform: scale(0.8);
    }
  }

  .ball-wrap {
    position: relative;
  }

  svg {
    width: 300px;
    display: block;
  }
  .ball {
    position: absolute;
    top: 0;
    left: 0;
    width: 10px;
    height: 10px;
    background-color: red;
    border-radius: 50%;
    offset-path: path("M10 80 Q 77.5 10, 145 80 T 280 80");
    offset-distance: 0%;
    animation: red-ball 2s linear alternate infinite;
  }
  @keyframes red-ball {
    from {
      offset-distance: 0%;
    }
    to {
      offset-distance: 100%;
    }
  }
</style>
