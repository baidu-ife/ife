/*
 * app.js
 *
 * 所有模块加载前，加载app.js
 */

define(function (require, exports, module) {
    var CategoryList=require("./entity/c_category"),
        TaskList=require("./entity/c_task");

    window.Global_TaskList=new TaskList();
    window.Global_CategoryList=new CategoryList();

    // localStorage.clear();

});