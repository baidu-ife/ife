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
     * @property {array} subId 下一级的分类ID
     * @property {init} parId 父级分类ID
     */
    var Category = Backbone.Model.extend({
        defaults: function () {
            return {
                // @ques: autoId 有没有更好的方式，不想在这里依赖全局变量
                // 不加入到集合中的autoId为什么要给他实现autoId呢？
                // autoId: Global_CategoryList.getNextAutoId(),
                autoId: -1,
                name: "no name",
                subIds: [],
                parId: -1
            };
        }
    });


    module.exports=Category;
});


