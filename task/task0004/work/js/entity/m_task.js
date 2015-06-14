/*
* model-task.js
 */

define(function (require, exports, module) {

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
    var Task = Backbone.Model.extend({
        defaults: function () {
            return {
                autoId: Global_TaskList.getNextAutoId(),
                header: "no header",
                status: 0,
                time: new Date(),
                content: "no content",
                categoryId: -1
            };
        }
    });


    module.exports=Task;

});