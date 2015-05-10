/**
 * 定义模型，集合
 */


// Model
// ==================================================

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
var Category = Model.extend({});


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
var Task = Model.extend({});



// 集合
// ==================================================

/**
 * 存储所有类别的集合,可以直接使用默认的集合
 * @List {CategoryList}
 */
var CategoryList = List.extend({
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


/**
 * 存储所有任务的集合
 * @List {TaslList}
 */
var TaskList = List.extend({
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
