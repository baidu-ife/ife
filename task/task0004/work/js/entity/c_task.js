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
            // this.remove(tasks); // @ques: 模型本身需不需要destroy

            for(var i=0, len=tasks.length; i<len; i++) {
                // this.sync("delete", tasks[i]);
                // 在模型上触发 "destroy" 事件，该事件将会冒泡到任何包含这个模型的集合中
                // 也就是说集合上保存的数据也会删除
                tasks[i].destroy();
            }
        },
        filterByCategoryId: function(categoryId, status) {
            status=parseInt(status);
            var s_arr=[0, 1];
            var filter={ categoryId: categoryId };
            s_arr.indexOf(status) != -1 && (filter.status=status);  

            var tasks=this.where(filter);
            return tasks || [];
        },
        getCountByCategoryId: function(categoryId) {
            var res=this.filterByCategoryId(categoryId);
            return res.length;
        },
        getTask: function (id) {
            return this.findWhere({ autoId: id });
        },
        getCount:function () {
            return this.models.length;
        },
        addTask: function (attrs) {
            var res=[];
            var arr=attrs;
            if(!$.isArray(attrs)) {
                arr=[attrs];
            }
            for(var i=0; i<arr.length; i++) {
                var temp=arr[i];
                temp.autoId=this.getNextAutoId();
                var n=this.create(temp);
                res.push(n);
            }
            return res;
        }
    });

    module.exports=TaskList;

});

