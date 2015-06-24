/*
 * app.js
 *
 * 所有模块加载前，加载app.js
 */

define(function (require, exports, module) {
    var CategoryList=require("./entity/c_category"),
        TaskList=require("./entity/c_task");

    /*在这里定义这两个全局集合：
    1.模型集合都是以模块形式定义的，在init里用不了
    2.所有模块加载前，加载app模块，这样就能保证这里定义的变量在其他文件一定能访问到了*/
    window.Global_TaskList=new TaskList();
    window.Global_CategoryList=new CategoryList();

    // localStorage.clear();

});