require.config({
    baseUrl: "js",
    paths: {
       
    },
    shim: {
    }
});

require(["init", "catalog", "task", "router"], function(init, Catalog, Task) {

    //实例化 目录构造函数 并初始化
    var c = new Catalog();

    //实例化 任务构造函数 并初始化
    var t = new Task();
});