/*
 * model-task.js
 */

define(function(require, exports, module) {

    Date.prototype.parse = function(pattern) {
        var y = this.getFullYear();
        var m = this.getMonth() + 1;
        var d = this.getDate();

        var res = pattern;
        res = res.replace("yyyy", y);
        res = res.replace("mm", m);
        res = res.replace("dd", d);

        return res;
    };

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
        defaults: function() {
            return {
                autoId: -1,
                header: "",
                status: 0,
                time: (new Date()).parse("yyyy-mm-dd"),
                content: "",
                categoryId: -1
            };
        },
        completeTask: function() {
            this.set("status", 1);
            this.save();
        }
    });


    module.exports = Task;

});