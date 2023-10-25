<script>
  // 崩溃日志已禁用
  import Apis from "../utils/api.js";
  var years = Array(100)
    .fill(1)
    .map((item, index) => index + 2000);

  function getDays(n) {
    // 获取最近n天的日期数组
    var now = +new Date();
    var timeOneDay = 24 * 60 * 60 * 1000;
    var days = Array(n)
      .fill(1)
      .map((item, index) => {
        var start = now - index * timeOneDay;
        var str = new Date(start).toLocaleDateString();
        var dateArr = str.split("/");
        dateArr = dateArr.map((i) => (i.length == 1 ? "0" + i : i));
        var dateStr = dateArr.join("-");
        return dateStr;
      });
    return days;
  }
  // 崩溃日志只能查2021-03-12之后的，只能查最近一个月的?
  var days = getDays(30);
  // days = [];

  var list = {
    keys: [],
    keysShow: ["time", "md", "os", "eurl", "carsh_info", "lineno", "count"],
    data: [],
    dataShow: [],
    count: {
      all: 0,
      H5: 0,
      APP: 0,
      third: 0,
    },
    getData() {
      var ps = days.map((item) => Apis.test(item));
      Promise.allSettled(ps)
        .then((res) => {
          var dataAll = "";
          console.log('res======')
          console.log(res)
          for (const r of res) {
            if (r?.value?.data) {
              dataAll += "\n" + r?.value?.data;
            }
          }
          var arr_temp = dataAll.split("\n");
          arr_temp = arr_temp.filter((item) => {
            var year = item.slice(0, 4);
            return years.includes(+year);
          });
          var arr = arr_temp.map((item) => {
            var timeStr = item.split("[crash]")[0];
            var otherStr =
              item
                .split("[crash]")[1]
                .replaceAll("lineno", " lineno")
                .replaceAll("variable:", "variable")
                .replaceAll("TypeError:", "TypeError")
                .replaceAll("ReferenceError:", "ReferenceError") + " ";
            var obj = {
              time: timeStr.trim(),
            };
            var keys = otherStr.match(/\w+(?<!(http|https)):.*?/g);
            for (const key of keys) {
              var keyn = key.replace(":", "");
              if (!list.keys.includes(keyn)) {
                list.keys.push(keyn);
              }
              obj[keyn] = list.getValue(key, otherStr);
            }
            return obj;
          });
          console.log(arr);
          console.log(list.keys);
          var data = [];
          for (const item of arr) {
            // NSGenericException异常会有多行报错信息，只保留异常名称；
            item.carsh_info = item.carsh_info || "NSGenericException";
            if (item.eurl.startsWith("file:///")) {
              // 本机路径名较长，缩减
              item.eurl = "file:///www/view.umd.min.js";
            }
            if (item.eurl.startsWith("https://h5.shinetour.com")) {
              // 移除时间戳
              item.eurl = item.eurl.split("?")[0];
            }
            var cur = data.find(
              (i) => i.carsh_info == item.carsh_info && i.eurl == item.eurl
              // && i.lineno == item.lineno
              // && i.os == item.os
              // && i.md == item.md
            );
            if (cur && false) {
              cur.count += 1;
            } else {
              data.push({ ...item, count: 1 });
            }
          }
          data = data.sort((prev, cur) => cur.count - prev.count);
          list.data = data;
          console.log('list.data')
          console.log(list.data)
          list.dataShow = JSON.parse(JSON.stringify(list.data));
          list.count = {
            all: list.filter("all").length,
            H5: list.filter("H5").length,
            APP: list.filter("APP").length,
            third: list.filter("third").length,
          };
        })
        .catch((err) => {
          console.log(err);
        });
    },
    init() {
      list.getData();
    },
    getValue(key, str) {
      if (key.includes("eurl")) {
        // debugger
      }
      var valStr = str.split(key)[1];
      valStr = valStr.replace("://", "&maohao;//");
      valStr = valStr.split(":")[0];
      valStr = valStr.split(" ");
      valStr.pop();
      var val = valStr.join(" ").trim();
      val = val.replace("&maohao;//", "://");
      return val;
    },
    filter(type) {
      var data = JSON.parse(JSON.stringify(list.data));
      switch (type) {
        case "H5":
          data = data.filter((item) =>
            item.eurl.includes("https://h5.shinetour.com")
          );
          break;
        case "APP":
          data = data.filter(
            (item) => !item.eurl || item.eurl.includes("file://")
          );
          break;
        case "third":
          data = data.filter(
            (item) =>
              !item.eurl.includes("https://h5.shinetour.com") &&
              item.eurl.startsWith("http")
          );
          break;
        default:
          data = data;
          break;
      }
      return data || [];
    },
    changeType(type) {
      list.dataShow = list.filter(type);
    },
  };

  list.init();
</script>

<div class="page-wrap p">
  <div class="flex flex-row p-1 mt-2 items-center">
    <h1 class="flex-1 font-black">uniApp崩溃日志数据分析</h1>
    <button on:click={list.changeType("H5")} class="btn btn-blue mr-1">
      只看H5({list.count.H5})
    </button>
    <button on:click={list.changeType("APP")} class="btn btn-blue mr-1">
      只看APP({list.count.APP})
    </button>
    <button on:click={list.changeType("third")} class="btn btn-blue mr-1">
      只看第三方({list.count.third})
    </button>
    <button on:click={list.changeType("all")} class="btn btn-blue">
      查看全部({list.count.all})
    </button>
  </div>
  <div class="mb-2">
    <p class="page-wrap-p">
      NSGenericException这个异常最容易出现在foreach操作中，在for
      in循环中如果修改所遍历的数组，无论你是add或remove，都会出错;
    </p>
    <!-- <p>暂定解决方案，直接更改Array.prototype上的foreach方法；<a href="https://developer.mozilla.org/zh-CN/docs/Web/JavaScript/Reference/Global_Objects/Array/forEach">采用MDN上的Polyfill；</a></p> -->
  </div>

  {#if list.dataShow.length}
    <table class="text-center w-full break-all">
      <tr class="border-b">
        {#each list.keysShow as itemKey}
          <td>
            <div class="cell">{itemKey}</div>
          </td>
        {/each}
      </tr>
      {#each list.dataShow as item}
        <tr class="border-b">
          {#each list.keysShow as itemKey}
            <td>
              <div class="cell" title={item[itemKey]}>
                {#if itemKey == "time"}
                  <a
                    href="http://resource-aliyun.dcloud.net.cn/r/crash/__UNI__E9B6D54/i/{item[
                      itemKey
                    ]
                      .slice(0, 10)
                      .replaceAll('/', '-')}.log"
                    target="_blank">{item[itemKey]}</a
                  >
                {:else}
                  {item[itemKey]}
                {/if}
              </div>
            </td>
          {/each}
        </tr>
      {/each}
    </table>
  {/if}
  <div class="footer mt-2 text-right">共{list.dataShow.length}项</div>
</div>

<style lang="postcss">
  :root {
    --mainColor: #ff0000ff;
  }
  td {
    max-width: 300px;
  }
  td .cell {
    padding: 3px;
    display: -webkit-box;
    overflow: hidden;
    -webkit-line-clamp: 2;
    -webkit-box-orient: vertical;
    text-overflow: ellipsis;
  }
  .page-wrap {
    p {
      color: var(--mainColor);
    }
  }
</style>
