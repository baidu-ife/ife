/*
* collection-task.js
 */

define(function (require, exports, module) {
    var Task=require("./m_task");
    
    /**
     * 存储所有任务的集合
     * @Collection {TaslList}
     */
    var TaskList = Backbone.Collection.extend({
        model: Task,
        localStorage: new Backbone.LocalStorage("local-tasks"),
        comparator: "autoId",

        getNextAutoId: function() {
            if (!this.length) return 1;
            return this.last().get("autoId") + 1;
        },
        
        removeByCategoryId:function (categoryId) {
            var tasks=this.where({
                categoryId: categoryId
            });
            this.remove(tasks); // @ques: 模型本身需不需要destroy

            this.sync();
        },
        filterByCategoryId: function(categoryId) {
            var tasks=this.where({
                categoryId: categoryId
            });
            return tasks || [];
        },
        getCountByCategoryId:function (categoryId) {
            var res=this.filterByCategoryId(categoryId);
            return res.length;
        },
        getCount:function () {
            return this.models.length;
        }
    });

    module.exports=TaskList;

});

