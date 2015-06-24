/*
 * app.js
 *
 * 所有模块加载前，加载app.js
 */

define(function (require, exports, module) {
    // 加载所有依赖，方便gulp合并
    // var app=require("./app"), //app模块自己不用在加载
    var _m_category=require('./entity/m_category'),
        _c_category=require('./entity/c_category'),
        _m_task=require('./entity/m_task'),
        _c_task=require('./entity/c_task'),

        _tip=require('./components/tip'),
        _slidePage=require('./components/slidePage'),

        _categoryItem=require('./view/categoryItem'),
        _header=require('./view/header'),
        _index=require('./view/index'),
        _taskDetail=require('./view/taskDetail'),
        _taskEdit=require('./view/taskEdit'),
        _taskInfo=require('./view/taskInfo'),
        _taskItem=require('./view/taskItem'),
        _taskList=require('./view/taskList');


    // ==================================================
    var CategoryList=require("./entity/c_category"),
        TaskList=require("./entity/c_task"),
        HeaderView=require("./view/header"),
        slidePage=require("./components/slidePage"); // 视图都依赖slidePage，所以直接在这里写了

    /*
    在这里定义这两个全局集合：
    1.模型集合都是以模块形式定义的，在init里用不了
    2.所有模块加载前，加载app模块，这样就能保证这里定义的变量在其他文件一定能访问到了
    */
    window.Global_TaskList=new TaskList();
    window.Global_CategoryList=new CategoryList();

    // @ques: 什么时候fetch, 在哪里fetch
    // 所有模块加载前都去fetch，不只在加载首页时fetch，是因为，怕用户直接进入其他页面，集合里面没有元素
    Global_TaskList.fetch();
    Global_CategoryList.fetch();

    // 暴露header视图
    window.HeaderView=HeaderView;


    function createData () {
        if(localStorage["isNotFirstIn"] != null) return;
        localStorage["isNotFirstIn"]=1;

        setTimeout(function () {
            Global_CategoryList.addCategory([{ name: "默认分类" }, { name: "百度ife项目" }]);
            
            Global_TaskList.addTask([{
                header: "测试1",
                content: "测试1 content",
                status: 0,
                time: "2015-5-11",
                categoryId: 1
            }, {
                header: "测试2",
                content: "测试2 content",
                status: 1,
                time: "2015-5-12",
                categoryId: 1
            }]);
            
        });
    }
    createData();
    
    function clearData () {
        localStorage.clear();
    }
    // clearData();

});