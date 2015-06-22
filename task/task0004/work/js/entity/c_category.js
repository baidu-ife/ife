/*
 * collection-category.js
 */

define(function(require, exports, module) {
    var Category = require("./m_category");

    /**
     * 存储所有类别的集合,可以直接使用默认的集合
     * @Collection {CategoryList}
     */
    var CategoryList = Backbone.Collection.extend({
        model: Category,
        localStorage: new Backbone.LocalStorage("local-categorys"),
        comparator: "autoId",

        getNextAutoId: function() {
            if (!this.length) return 1;
            return this.last().get("autoId") + 1;
        },

        /**
         * 删除一个分类，如果该分类含有子类别和任务，也全部删除
         * @param  {int}  categoryId   类别id
         */
        removeCategory: function(categoryId) {
            this._removeCategory(categoryId);

            // @ques: 删除任务放在这里不是耦合了吗
            // Global_TaskList.removeByCategoryId(categoryId);
            
            this.sync();
        },
        _removeCategory: function (categoryId) {
            var curCate = this.findWhere({
                id: categoryId
            });
            var subCateIds=curCate.subIds,
                len=subCateIds.length;
            for(var i=0; i<len; i++) {
                this.removeCategory(subCateIds[i]);
            }
            this.remove(curCate);
        },
        addCategory: function (attrs) {
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

    module.exports = CategoryList;
});