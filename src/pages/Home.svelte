<script>
    import axios from "axios";
    import Apis from "../utils/api.js";
    async function apitest(request) {
        // https://fragrant-waterfall-d607.ywbyl7722.workers.dev
        // await axios.post(
        //     `https://fragrant-waterfall-d607.ywbyl7722.workers.dev/item?id=2`,
        //     { id: 2, test: "test222" }
        // );
        // await axios.get(
        //     `https://fragrant-waterfall-d607.ywbyl7722.workers.dev/item/2`
        // );
        // await axios.delete(
        //     `https://fragrant-waterfall-d607.ywbyl7722.workers.dev/item/undefined`
        // );
        // await axios.get(
        //     `https://fragrant-waterfall-d607.ywbyl7722.workers.dev/list`
        // );
        // await axios.post(`https://test.cors.workers.dev/`);
    }

    apitest();

    var ws = {
        ws: null,
        init() {
            ws.ws = new WebSocket(
                "ws://white-morning-6a1d.ywbyl7722.workers.dev"
            )
        },
        addEvent() {
            ws.ws.addEventListener("open", function (event) {
                console.log("socket open--------- ");
                ws.ws.send("CLICK");
            });

            ws.ws.addEventListener("message", function (event) {
                console.log("socket message--------- ", event.data);
            });

            ws.ws.addEventListener("error", function (event) {
                console.log("socket error--------- ");
            });

            ws.ws.addEventListener("close", function (event) {
                console.log("socket close--------- ");
            });
        },
        send() {
            switch (ws.ws.readyState) {
                case WebSocket.CONNECTING:
                    // do something
                    break;
                case WebSocket.OPEN:
                    ws.ws.send("CLICK");
                    break;
                case WebSocket.CLOSING:
                    // do something
                    break;
                case WebSocket.CLOSED:
                    // do something
                    break;
                default:
                    // this never happens
                    break;
            }
        }
    };
    
    ws.init()
    ws.addEvent()

    // Apis.getCatImg("100")
    //     .then((res) => {
    //         // console.log("then----", res);
    //     })
    //     .catch((err) => {
    //         // console.log("catch----", err);
    //     });
    // Apis.test1("100")
    //     .then((res) => {
    //         console.log("then----", res);
    //     })
    //     .catch((err) => {
    //         console.log("catch----", err);
    //     });
    var list = {
        data: [],
        searchParams: {},
        params: {},
        getData() {},
        addItem(params) {
            var nowTime = +new Date();
            var itemn = {
                id: "T" + nowTime,
                tit: "ceshi2",
                content: "ceshi2" + nowTime,
                createTime: nowTime,
                updateTime: nowTime,
            };
            list.data = [...list.data, itemn];
        },
        removeItem(id) {
            list.data = list.data.filter((item) => item.id != id);
        },
        editItem(item) {
            var nowTime = +new Date();
            item.content = item.content + " new";
            item.updateTime = nowTime;
            list.data = list.data;
        },
        clear() {
            list.data = [];
        },
        changeStatus(item, status) {
            item.status = status;
            list.data = list.data;
        },
        init() {
            list.getData();
        },
        search() {},
        mapsShow(key, type) {
            switch (type) {
                case "status":
                    var maps = { 0: "未启用", 1: "已启用" };
                    return maps[key] || "未启用";
                    break;
                case "time":
                    var curDate = new Date(key);
                    var time = curDate.toLocaleString().replace(" ", "<br>");
                    return time;
                    break;
                default:
                    break;
            }
        },
    };

    list.init();
</script>

<div class="page-wrap">
    <div class="flex flex-row p-1 mt-2 items-center">
        <h1 class="flex-1 font-black">
            <!-- 待办事项(构建工具使用vite或者snowpack，待处理) -->
        </h1>
        <div on:click={ws.send} class="btn btn-blue mr-1">send</div>
        <div on:click={list.addItem()} class="btn btn-blue mr-1">添加</div>
        <div on:click={list.clear()} class="btn btn-red">清空</div>
    </div>
    <table class="text-center w-full">
        <tr class="border-b p-1">
            <td class="w-50">标题</td>
            <td class="flex-1">内容</td>
            <td class="w-50">创建时间</td>
            <td class="w-50">更新时间</td>
            <td class="w-50">状态</td>
            <td class="w-50">操作</td>
        </tr>
        {#each list.data as item}
            <tr class="border-b p-1">
                <td class="w-50">{item.tit}</td>
                <td class="flex-1">{item.content}</td>
                <td class="w-50">
                    {@html list.mapsShow(item.createTime, "time")}
                </td>
                <td class="w-50">
                    {@html list.mapsShow(item.updateTime, "time")}
                </td>
                <td class="w-50">{list.mapsShow(item.status, "status")}</td>
                <td class="w-50">
                    <div on:click={list.editItem(item)} class="btn btn-blue">
                        编辑
                    </div>
                    <div
                        on:click={list.removeItem(item.id)}
                        class="btn btn-red"
                    >
                        删除
                    </div>
                    <div
                        on:click={list.changeStatus(
                            item,
                            item.status == 1 ? 0 : 1
                        )}
                        class="btn {item.status == 1 ? 'btn-red' : 'btn-blue'} "
                    >
                        {item.status == 1 ? "停用" : "启用"}
                    </div>
                </td>
            </tr>
        {/each}
    </table>
    <div class="footer mt-2 text-right">共{list.data.length}项</div>
</div>

<style>
    h1 {
        cursor: pointer;
        color: red;
    }
</style>
