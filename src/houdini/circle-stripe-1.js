registerPaint('circle-stripe-1', class {
  static get inputProperties() {
    return [
      '--stripe-count',
      '--stripe-color',
      '--stripe-radius',
    ];
  }

  paint(ctx, size, styleMap) {
    let counts = styleMap.getAll('--stripe-count');  // 条纹的数量
    let count = 2 * counts[0]
    let colors = styleMap.getAll('--stripe-color');
    let stripeRadius = styleMap.getAll('--stripe-radius');

    let radius = Math.min(size.width, size.height, stripeRadius[0]) / 2;

    let angle = 2 * Math.PI / count

    ctx.translate(size.width / 2, size.height / 2);  // 将原点移动到画布的中心

    for (let i = 0; i < count; i++) {
      var [x1, y1] = getPoint(radius, i, angle, 0)
      var [x2, y2] = getPoint(radius, i, angle, 1)
      var [x3, y3] = getPointCtrl(x1, y1, getPoint(radius, i, angle, 2, true))
      var [x4, y4] = getPointCtrl(x2, y2, getPoint(radius, i, angle, 3, true))

      ctx.beginPath();
      ctx.moveTo(0, 0);
      ctx.quadraticCurveTo(x3, y3, x1, y1);
      ctx.lineTo(x2, y2);
      ctx.quadraticCurveTo(x4, y4, 0, 0);
      ctx.lineTo(0, 0);
      ctx.closePath();

      // 根据 i 的奇偶性选择颜色
      ctx.fillStyle = i % 2 == 0 ? colors[0] || 'black' : colors[1] || 'white';
      ctx.fill();
    }
  }
});

function getPoint(radius, i, angle, index, ctrl) {
  if (ctrl) {
    radius = radius * .4
    return [radius * Math.cos(angle * (i + index)), radius * Math.sin(angle * (i + index))]
  } else {
    return [radius * Math.cos(angle * (i + index)), radius * Math.sin(angle * (i + index))]
  }

}
function getPointCtrl(x, y, point) {
  var arr = []
  var xn = point[0]
  if (y == 0) {
    arr = [xn, 0]
  } else {
    var k = -x / y
    var b = (y / 2) - (x / 2) * k
    var yn = k * xn + b
    arr = [xn, yn]
    console.log(y / 2 == (x / 2) * k + b)
  }
  console.log(x, y, JSON.stringify(arr))
  return point
  return arr
}