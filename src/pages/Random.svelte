<script>
  var jq = window.jQuery;
  setTimeout(() => {
    jq("#funnel").css({
      width: "270px",
      height: "270px",
      "background-image": `linear-gradient(
        180deg,
        #8964d6 0%,
        #8964d6 11%,
        #6d50be 11%,
        #6d50be 22%,
        #da55e2 22%,
        #da55e2 33%,
        #aa39bc 33%,
        #aa39bc 44%,
        #5acafa 44%,
        #5acafa 55%,
        #46a3c4 55%,
        #46a3c4 66%,
        #5f78f6 66%,
        #5f78f6 77%,
        #485fbf 77%,
        #485fbf 88%,
        #96a1f1 88%,
        #96a1f1 99%
      )`,
      "clip-path": `polygon(
        0px 0px,
        calc(5.5% * 18) calc(5.5% * 0),
        calc(5.5% * 17) calc(5.5% * 2),
        calc(5.5% * 12) calc(5.5% * 4),
        calc(5.5% * 16) calc(5.5% * 4),
        calc(5.5% * 15) calc(5.5% * 6),
        calc(5.5% * 11) calc(5.5% * 6),
        calc(5.5% * 14) calc(5.5% * 8),
        calc(5.5% * 13) calc(5.5% * 10),
        calc(5.5% * 10) calc(5.5% * 12),
        calc(5.5% * 12) calc(5.5% * 12),
        calc(5.5% * 11) calc(5.5% * 14),
        calc(5.5% * 8.5) calc(5.5% * 14),
        calc(5.5% * 10) calc(5.5% * 16),
        calc(5.5% * 9) calc(5.5% * 18),
        calc(5.5% * 8) calc(5.5% * 16),
        calc(5.5% * 8.5) calc(5.5% * 16),
        calc(5.5% * 7) calc(5.5% * 14),
        calc(5.5% * 6) calc(5.5% * 12),
        calc(5.5% * 9) calc(5.5% * 10),
        calc(5.5% * 5) calc(5.5% * 10),
        calc(5.5% * 4) calc(5.5% * 8),
        calc(5.5% * 6) calc(5.5% * 8),
        calc(5.5% * 3) calc(5.5% * 6),
        calc(5.5% * 2) calc(5.5% * 4),
        calc(5.5% * 7) calc(5.5% * 2),
        calc(5.5% * 1) calc(5.5% * 2),
        calc(5.5% * 0) calc(5.5% * 0)
      )`,
    });

    var options = {
      h_main: 4,
      h_sub: 2,
      colors: [
        "#8964d6",
        "#6d50be",
        "#da55e2",
        "#aa39bc",
        "#5acafa",
        "#46a3c4",
        "#5f78f6",
        "#485fbf",
        "#96a1f1",
      ],
    };
    options.c_main = Math.ceil(options.colors.length / 2);
    options.c_sub = Math.floor(options.colors.length / 2);
    options.c_total = options.c_main + options.c_sub;
    options.h_total =
      options.h_main * options.c_main + options.h_sub * options.c_sub;

    options.p = 100 / options.h_total;

    var linear = [...Array(options.colors.length * 2)].map((item, index) => {
      var i = Math.floor(index / 2);
      var j = Math.ceil(index / 2);
      var j1 = Math.floor(j / 2);
      var j2 = Math.ceil(j / 2);
      var str = `${options.colors[i]} ${
        options.p * (j1 * options.h_sub + j2 * options.h_main)
      }%`;
      return str;
    });
    var linearStr = `linear-gradient(180deg,${linear.join(",")})`;

    var paths = [...Array(options.colors.length)].map((item, index) => {
      var i = Math.floor(index / 2);
      var j = Math.ceil(index / 2);
      var x =
        options.p *
        (options.h_total - (i * options.h_sub + j * options.h_main) / 2);
      var y = -2 * x + 200;

      var str = `${x}% ${y}%`;
      return str;
    });
    for (let index = 0; index < options.colors.length; index++) {
      if (index == 0) {
        paths[options.colors.length + index] = `50% 100%`;
      } else {
        var str = paths[options.colors.length - index];
        var arr = str.replaceAll("%", "").split(" ");
        paths[options.colors.length + index] = `${100 - arr[0]}% ${arr[1]}%`;
      }
    }

    var paths_new = [...Array(options.colors.length * 3 - 1)].map(
      (item, index) => {
        var cs = Math.floor(index / 3);
        var ys = Math.floor(index % 3);

        var prev = paths[2 * cs + ys - 1];
        var next = paths[2 * cs + ys];
        var next2 = paths[2 * cs + ys + 1];
        var offset = Math.abs(index - (options.colors.length * 3 - 1) / 2);
        if (index < (options.colors.length * 3) / 2) {
          if (ys == 2) {
            if (index % 2) {
              // +arr[0] - offset * 1 * options.p
              var arr = prev.replaceAll("%", "").split(" ");
              return `${50}% ${arr[1]}%`;
            } else {
              var arr = next.replaceAll("%", "").split(" ");
              return `${50}% ${arr[1]}%`;
            }
            return `待定`;
          } else {
            return `${next}`;
          }
        } else {
          if (ys == 0) {
            if (index % 2) {
              // +arr[0] + offset * 1 * options.p
              var arr = next.replaceAll("%", "").split(" ");
              return `${50}% ${arr[1]}%`;
            } else {
              var arr = next2.replaceAll("%", "").split(" ");
              return `${50}% ${arr[1]}%`;
            }
            return `待定`;
          } else {
            return `${next}`;
          }
        }
        // `${index} ${cs} ${ys}`
      }
    );
    // console.log(JSON.stringify(paths_new, null, 2));
    // 技术后面插入点
    // console.log(paths.length)
    // console.log(JSON.stringify(paths, null, 2));
    var pathsStr = `polygon(0px 0px,${paths_new.join(",")})`;

    jq("#funnel1").css({
      width: "270px",
      height: "270px",
      "background-image": linearStr,
      "clip-path": pathsStr,
    });
  }, 100);
</script>

<div class="btn-wrap">
  <div class="btn rect">rect</div>
  <div class="btn circle">circle</div>
  <div class="btn parallelogram">Parallelogram</div>
  <div class="btn trapezoid">Trapezoid</div>
  <div class="btn notching">notching</div>
  <div class="btn clip-notching">notching</div>
  <div class="btn arrow">arrow</div>
  <div class="btn arrow1">arrow1</div>
  <div class="btn inset-circle">inset-circle</div>
  <div class="btn mask-inset-circle">inset-circle</div>
  <div class="btn skew">Skew</div>
  <div class="btn outside-circle">outside-circle</div>
</div>

<div class="test-outer">
  <div class="test-wrap" />
  <img
    class="test-wrap2"
    src="https://interactive-examples.mdn.mozilla.net/media/examples/balloon-small.jpg"
    alt=""
  />
  <div id="funnel" />
  <div id="funnel1" />
</div>

<style lang="scss">
  .test-wrap {
    width: 270px;
    height: 270px;
    background-image: linear-gradient(
      180deg,
      #8964d6 0%,
      #8964d6 11%,
      #6d50be 11%,
      #6d50be 22%,
      #da55e2 22%,
      #da55e2 33%,
      #aa39bc 33%,
      #aa39bc 44%,
      #5acafa 44%,
      #5acafa 55%,
      #46a3c4 55%,
      #46a3c4 66%,
      #5f78f6 66%,
      #5f78f6 77%,
      #485fbf 77%,
      #485fbf 88%,
      #96a1f1 88%,
      #96a1f1 99%
    );
    clip-path: polygon(
      0px 0px,
      calc(5.5% * 18) calc(5.5% * 0),
      calc(5.5% * 17) calc(5.5% * 2),
      calc(5.5% * 12) calc(5.5% * 4),
      calc(5.5% * 16) calc(5.5% * 4),
      calc(5.5% * 15) calc(5.5% * 6),
      calc(5.5% * 11) calc(5.5% * 6),
      calc(5.5% * 14) calc(5.5% * 8),
      calc(5.5% * 13) calc(5.5% * 10),
      calc(5.5% * 10) calc(5.5% * 12),
      calc(5.5% * 12) calc(5.5% * 12),
      calc(5.5% * 11) calc(5.5% * 14),
      calc(5.5% * 8.5) calc(5.5% * 14),
      calc(5.5% * 10) calc(5.5% * 16),
      calc(5.5% * 9) calc(5.5% * 18),
      calc(5.5% * 8) calc(5.5% * 16),
      calc(5.5% * 8.5) calc(5.5% * 16),
      calc(5.5% * 7) calc(5.5% * 14),
      calc(5.5% * 6) calc(5.5% * 12),
      calc(5.5% * 9) calc(5.5% * 10),
      calc(5.5% * 5) calc(5.5% * 10),
      calc(5.5% * 4) calc(5.5% * 8),
      calc(5.5% * 6) calc(5.5% * 8),
      calc(5.5% * 3) calc(5.5% * 6),
      calc(5.5% * 2) calc(5.5% * 4),
      calc(5.5% * 7) calc(5.5% * 2),
      calc(5.5% * 1) calc(5.5% * 2),
      calc(5.5% * 0) calc(5.5% * 0)
    );
  }
  .test-wrap2 {
    width: 200px;
    height: 200px;
    background-image: linear-gradient(
      0deg,
      cyan 0%,
      cyan 33%,
      lightblue 33%,
      lightblue 66%,
      lightgreen 66%,
      lightgreen 100%
    );
    clip-path: polygon(0px 0px, 100% 0, 50% 100%);
  }
  .test-wrap,
  .test-wrap2,
  #funnel,
  #funnel1 {
    display: inline-block;
    vertical-align: middle;
  }
  .btn {
    margin: 10px;
    flex-shrink: 0;
    width: 160px;
    height: 64px;
    display: inline-flex;
    align-items: center;
    justify-content: center;
  }

  .rect {
    background: #f6ed8d;
  }

  .circle {
    border-radius: 64px;
    background: #7de3c8;
  }

  .parallelogram {
    position: relative;
    width: 160px;
    height: 64px;

    &::before {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      bottom: 0;
      right: 0;
      background: #03f463;
      transform: skewX(15deg);
    }
  }

  .trapezoid {
    position: relative;
    width: 160px;
    height: 64px;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      right: 0;
      bottom: 0;
      left: 0;
      transform: perspective(40px) rotateX(10deg);
      transform-origin: bottom;
      background: #ff9800;
    }
  }

  .notching {
    background: linear-gradient(135deg, transparent 10px, #ff1493 0) top left,
      linear-gradient(-135deg, transparent 10px, #ff1493 0) top right,
      linear-gradient(-45deg, transparent 10px, #ff1493 0) bottom right,
      linear-gradient(45deg, transparent 10px, #ff1493 0) bottom left;
    background-size: 50% 50%;
    background-repeat: no-repeat;
  }

  .clip-notching {
    background: linear-gradient(45deg, #f9d9e7, #ff1493);
    clip-path: polygon(
      15px 0,
      calc(100% - 15px) 0,
      100% 15px,
      100% calc(100% - 15px),
      calc(100% - 15px) 100%,
      15px 100%,
      0 calc(100% - 15px),
      0 15px
    );
  }

  .arrow {
    background: linear-gradient(
          -135deg,
          transparent 22px,
          #04e6fb 22px,
          #65ff9a 100%
        )
        top right,
      linear-gradient(-45deg, transparent 22px, #04e6fb 22px, #65ff9a 100%)
        bottom right;
    background-size: 100% 50%;
    background-repeat: no-repeat;
  }

  .arrow1 {
    background: linear-gradient(45deg, #04e6fb, #65ff9a);
    clip-path: polygon(
      0 0,
      30px 50%,
      0 100%,
      calc(100% - 30px) 100%,
      100% 50%,
      calc(100% - 30px) 0
    );
  }

  .inset-circle {
    background-size: 70% 70%;
    background-image: radial-gradient(
        circle at 100% 100%,
        transparent 0,
        transparent 12px,
        #2179f5 13px
      ),
      radial-gradient(
        circle at 0 0,
        transparent 0,
        transparent 12px,
        #2179f5 13px
      ),
      radial-gradient(
        circle at 100% 0,
        transparent 0,
        transparent 12px,
        #2179f5 13px
      ),
      radial-gradient(
        circle at 0 100%,
        transparent 0,
        transparent 12px,
        #2179f5 13px
      );
    background-repeat: no-repeat;
    background-position: right bottom, left top, right top, left bottom;
  }

  .mask-inset-circle {
    background: linear-gradient(45deg, #2179f5, #e91e63);
    mask: radial-gradient(
        circle at 100% 100%,
        transparent 0,
        transparent 12px,
        #2179f5 13px
      ),
      radial-gradient(
        circle at 0 0,
        transparent 0,
        transparent 12px,
        #2179f5 13px
      ),
      radial-gradient(
        circle at 100% 0,
        transparent 0,
        transparent 12px,
        #2179f5 13px
      ),
      radial-gradient(
        circle at 0 100%,
        transparent 0,
        transparent 12px,
        #2179f5 13px
      );
    mask-repeat: no-repeat;
    mask-position: right bottom, left top, right top, left bottom;
    mask-size: 70% 70%;
  }

  .skew {
    position: relative;
    width: 120px;

    &::after {
      content: "";
      position: absolute;
      top: 0;
      left: 0;
      right: 0;
      bottom: 0;
      border-radius: 10px;
      background: orange;
      transform: skewX(15deg);
    }
    &::before {
      content: "";
      position: absolute;
      top: 0;
      right: -13px;
      width: 100px;
      height: 64px;
      border-radius: 10px;
      background: orange;
    }
  }

  .outside-circle {
    position: relative;
    background: #e91e63;
    border-radius: 10px 10px 0 0;

    &::before {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      left: -20px;
      bottom: 0;
      background: #000;
      background: radial-gradient(
        circle at 0 0,
        transparent 20px,
        #e91e63 21px
      );
    }
    &::after {
      content: "";
      position: absolute;
      width: 20px;
      height: 20px;
      right: -20px;
      bottom: 0;
      background: #000;
      background: radial-gradient(
        circle at 100% 0,
        transparent 20px,
        #e91e63 21px
      );
    }
  }
</style>
