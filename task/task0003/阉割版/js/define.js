/**
 * 定义模型，集合，视图
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
    },
    /**
     * 计算一个分类的所有任务
     * @param  {int} id 分类的ID
     * @return {int}
     */
    calculateTaskNum: function(id) {

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
    filterTaskByStatus: function(status) {

    }

});



// 视图
// ==================================================

/**
 * 类别列表视图
 * @View {CategoryListView}
 */
var CategoryListView = View.extend({
    model: Category,
    /**
     * 添加dom结构，不添加到集合中，为完成
     * @param {Category} cateItem 一个分类model
     */
    addCategoryItem: function(cateItem, context) {
        if (!(cateItem instanceof this.model)) {
            cateItem = new this.model(cateItem);
        }

        var li = this.createElement(cateItem);

        if (cateItem.get("parId") == -1) {
            this.$(".categorys").appendChild(li);
        } else {

        }


    },
    createElement: function(cateItem) {
        var li = document.createElement("li");
        addClass(li, "level");
        li.innerHTML = '<a class="category-name" data-id="' + cateItem.get("id") + '">' + cateItem.get("name") + '(<span class="num">' + cateItem.get("number") + '</span>)</a>';
        (cateItem.id != 0) && (li.innerHTML += '<a class="del" data-id="' + cateItem.get("id") + '">&times;</a>');

        return li;
    },
    addCategorys: function(records) {
        var parIdGroup = {},
            fragmentContainer = document.createDocumentFragment();
        for (var i in records) {
            if (records.hasOwnProperty(i)) {
                var cateItem = records[i],
                    parId = cateItem.get("parId");
                parIdGroup[parId] || (parIdGroup[parId] = []);
                var li = this.createElement(cateItem);
                parIdGroup[parId].push({
                    dom: li,
                    category: cateItem
                });
                cateItem.dom = li;
            }
        }
        for (var i in parIdGroup) {
            if (parIdGroup.hasOwnProperty(i)) {
                var arr = parIdGroup[i];
                if (i == -1) {
                    for (var j = 0; j < arr.length; j++) {
                        addClass(arr[j].dom, "level-1");
                        fragmentContainer.appendChild(arr[j].dom);
                    }
                } else {
                    var ul = document.createElement("ul");
                    addClass(ul, "sub-category");
                    for (var j = 0; j < arr.length; j++) {
                        ul.appendChild(arr[j].dom);
                    }
                    var parLi = records[i].dom;
                    addClass(parLi, "has-sub-category");
                    parLi.appendChild(ul);
                }
            }

        }

        fragmentContainer && this.$(".categorys").appendChild(fragmentContainer);
    },
    setCurCategoryItemDom: function(cateItemDom) {
        this.curCategoryItemDom && removeClass(this.curCategoryItemDom, "z-active");
        addClass(cateItemDom, "z-active");
        if (hasClass(cateItemDom, "has-sub-category")) {
            toggleClass(cateItemDom, "z-open");
        }
        this.curCategoryItemDom = cateItemDom;
    }
});


/**
 * 任务列表视图
 * @type {TaskListView}
 */
var TaskListView = View.extend({
    model: Task,
    refresh: function() {
        var groups = this.groupByTime(),
            section,
            fragmentContainer = document.createDocumentFragment();

        for (var time in groups) {
            if (groups.hasOwnProperty(time)) {
                section = this.createSectionDom(time, groups[time]);
                fragmentContainer.appendChild(section);
            }
        }

        var tasksDom = this.$(".tasks");
        tasksDom.innerHTML = "";
        fragmentContainer.childNodes.length > 0 ? tasksDom.appendChild(fragmentContainer) : (tasksDom.innerHTML = '<p class="no-task-tip">还没有任务哦</p>');
    },
    addTaskDom:function (nTask) {
        this.curTaskArr(nTask);
        this.refresh();
    },
    createSectionDom: function(time, tasks) {
        var section = document.createElement("section");
        addClass(section, "time-node");
        section.innerHTML = '<p class="title">' + time + '</p>';
        section.innerHTML += this.createTaskItemDom(tasks);

        return section;
    },
    createTaskItemDom: function(tasks) {
        var res = "",
            item,
            className;
        for (var i = 0; i < tasks.length; i++) {
            item = tasks[i];
            className = item.get("status") == 1 ? "item done" : "item";
            res += '<a data-id="'+ item.get("id") +'" class="' + className + '">' + item.get("header") + '</a>';
        }
        return res;
    },
    groupByTime: function() {
        var curTaskArr;
        if (!(curTaskArr = this.curTaskArr)) return;

        var temp = {},
            taskItem,
            agroup;
        for (var i = 0; i < curTaskArr.length; i++) {
            taskItem = curTaskArr[i];
            temp[taskItem.get("time")] || (temp[taskItem.get("time")] = []);
            temp[taskItem.get("time")].push(taskItem);
        }

        return temp;
    },
    setCurTaskItemDom:function (taskItemDom) {
        this.curTaskItemDom && removeClass(this.curTaskItemDom, "z-active");
        addClass(taskItemDom, "z-active");
        this.curTaskItemDom = taskItemDom;
    }
});



var TaskDetailView = View.extend({
    model:Task,
    refresh:function () {
        var curTask,
            elements=this.elements;

        if(!(curTask=this.curTask)) return;

        elements.headerDom.innerHTML=curTask.get("header");
        elements.timeDom.innerHTML=curTask.get("time");
        elements.contentDom.innerHTML=curTask.get("content");
    },
    show:function () {
        this.visiable=!0;
    },
    hide:function () {
        this.visiable=!1;
    }
});


var TaskEditView = View.extend({
    model:Task,
    show:function (opt) {
        if(this.isUnSavedToCancel()) return false;

        this.curTask=opt.curTask;

        var elements=this.elements,
            curTask=this.curTask;

        if(curTask) {
            elements.headerDom.value=curTask.get("header");
            elements.timeDom.value=curTask.get("time");
            elements.contentDom.value=curTask.get("content");
        }

        addClass(this.root, "z-show");

        this.visiable=!0;

        return true;
    },
    hide:function () {
        if(this.isUnSavedToCancel()) return false;
        this.clear();
        removeClass(this.root, "z-show");
        this.visiable=!1;

        return true;
    },
    isUnSavedToCancel:function () {
        if(this.hasEdited){
            if(!window.confirm("有未保存的内容，确认关闭？")) 
                return true;
        }
        return false;
    },
    clear:function () {
        var elements=this.elements;

        elements.headerDom.value="";
        elements.timeDom.value="";
        elements.contentDom.value="";

        this.curTask=null;
        this.hasEdited=!1;//是否编辑过了
    }
});



