/*
* model-category.js
 */

define(function (require, exports, module) {

    /**
     * 类别模型
     * @Model {Category}
     *
     * @property {int} id 唯一ID
     * @property {string} name 分类名称
     * @property {int} taskCount 一个分类下的任务数量
     * @property {array} subId 下一级的分类ID
     * @property {init} parId 父级分类ID
     */
    var Category = Backbone.Model.extend({
        defaults: function () {
            return {
                autoId: Global_CategoryList.getNextAutoId(),
                name: "no name",
                taskCount: 0,
                subIds: [],
                parId: -1
            };
        }
    });


    module.exports=Category;
});


