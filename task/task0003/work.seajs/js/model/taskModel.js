/*
* model-task.js
 */

define(function (require, exports, module) {
    var _=require("../lib/mvc");

    /**
     * 任务模型
     * @Model {Task}
     *
     * @property {int} id 唯一ID
     * @property {string} header 任务名称
     * @property {int} status 任务状态
     * @property {date} time 任务时间
     * @property {string} content 任务内容
     * @property {int} categoryId 属于的类别ID
     */
    var Task = _.Model.extend({});

    /**
     * 存储所有任务的集合
     * @List {TaslList}
     */
    var TaskList = _.List.extend({
        model: Task,
        addTask: function(opt) {
            var constructor = this.model;
            var newTask = new constructor({
                id: this._getNextId(),
                header: opt.header,
                content: opt.content,
                time: opt.time,
                status: opt.status,
                categoryId: opt.categoryId
            });
            this.addItem(newTask);
            return newTask;
        },
        getTask:function (taskId) {
            return this.find(taskId) || null;
        },
        removeTask: function(taskId) {

        },
        removeTaskByCategoryId:function (categoryId) {
            var records = this.records;
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    if (records[i].get("categoryId") == categoryId) {
                        this.removeItem(records[i].get("id"));
                    }
                }
            }
        },
        filterTaskByCategoryId: function(categoryId) {
            var records = this.records,
                res = [];
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    if (records[i].get("categoryId") == categoryId) {
                        res.push(records[i]);
                    }
                }
            }
            return res;
        },
        getCountOfCategoryId:function (categoryId) {
            var res=this.filterTaskByCategoryId(categoryId);
            return res.length;
        },
        getTaskCount:function () {
            var records = this.records;
            var res=0;
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    if (records[i] instanceof this.model) {
                        res++;
                    }
                }
            }
            return res;
        }
    });

    exports.Model_Task=Task;
    exports.List_Task=TaskList;
})