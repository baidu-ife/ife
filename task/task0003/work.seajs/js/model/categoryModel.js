/*
* model-category.js
 */

define(function (require, exports, module) {
    var _=require("../lib/mvc");

    /**
     * 类别模型
     * @Model {Category}
     *
     * @property {int} id 唯一ID
     * @property {string} name 分类名称
     * @property {int} taskCount 一个分类下的任务数量
     * @property {int} subId 下一级的分类ID
     * @property {init} parId 父级分类ID
     */
    var Category = _.Model.extend({});

    /**
     * 存储所有类别的集合,可以直接使用默认的集合
     * @List {CategoryList}
     */
    var CategoryList = _.List.extend({
        model: Category,
        /**
         * 添加一个分类，ID自增
         * @param {string} name 分类名称
         * @param {init} parId 父级分类的ID
         */
        addCategoryItem: function(name, parId) {
            var constructor = this.model;
            var newCate = new constructor({
                id: this._getNextId(),
                name: name,
                number: 0,
                parId: parId
            });
            this.addItem(newCate);
            return newCate;
        },
        /**
         * 删除一个分类，如果该分类含有子类别，也全部删除
         * @param  {int}  categoryId   类别id
         * @param  {bool} isDelSubCate 是否删除子类别
         */
        removeCategoryItem: function(categoryId, isDelSubCate) {
            if (isDelSubCate) {
                var records = this.records;
                for (var i in records) {
                    if (records.hasOwnProperty(i) && records[i].get("parId") == categoryId) {
                        this.removeCategoryItem(i, isDelSubCate);
                    }
                }

                this.removeItem(categoryId);
            } else {
                this.removeItem(categoryId);
            }
        },
        /**
         * 获得下一级分类
         * @param  {int} id 分类的ID
         * @return {Category|null}
         */
        getCategoryItem: function(id) {
            return this.find(id) || null;
        }
    });

    exports.Model_Category=Category;
    exports.List_Category=CategoryList;
})