/**
 * categoryList.js
 */


var CATEGORY_LOCALSTORAGE_NAME = "CategoryRecord",
    TASK_LOCALSTORAGE_NAME = "TaskRecord";


// 集合只能与对应的视图有耦合，视图之间的耦合通过发布订阅模式关联
// ============================================================
var categoryList = new CategoryList(); // 所有分类
var taskList = new TaskList(); // 所有任务


var taskDetailView = new TaskDetailView($("#taskDetail"),{
    elements:{
        headerDom:this.$(".header"),
        contentDom:this.$(".content"),
        timeDom:this.$(".time")
    },
    events:{
        "click #completeTask":"completeTaskHandler",
        "click #editTask":"editTaskHandler"
    },
    initialize:function () {
        this.curTask=null;
        this.curTaskId=-1;
        this.visiable=!0;//显示还是隐藏

        this.on("selectedTaskChange", function (e) {
            var taskId=e.taskId;
            if(this.curTaskId==taskId) return;
            (typeof e.success == "function") || (e.success=function(){});
            if(taskId == null) return;

            var callback=function () {
                this.curTask=taskList.getTask(taskId);
                this.curTaskId=taskId;
                this.refresh();
                e.success();
            };

            if(!this.visiable){
                taskEditView.hide() && callback.call(this);
            }else{
                callback.call(this);
            }

        })
    },
    handlers:{
        completeTaskHandler:function (e) {
            
        },
        editTaskHandler:function (e) {
            if(!this.curTask) return;
            taskEditView.show({
                curTask:this.curTask
            });
            this.hide();
        }
    }
});


var taskEditView = new TaskEditView($("#taskEdit"),{
    elements:{
        headerDom:this.$("#inputHeader"),
        contentDom:this.$("#inputContent"),
        timeDom:this.$("#inputTime")
    },
    events:{
        "click #sure":"sureHandler",
        "click #cancel":"cancelHandler",
        "change input":"valueHasChangeHandler",
        "change textarea":"valueHasChangeHandler"
    },
    initialize:function (e) {
        this.curTask=null;
        this.visiable=!1;//显示还是隐藏
        this.hasEdited=!1;//是否编辑过了
        this.curTaskIsNew=!1;

    },
    handlers:{
        sureHandler:function (e) {
            this.hasEdited=!1;

            var elements=this.elements,
                curTask=this.curTask,
                nHeader=elements.headerDom.value,
                nContent=elements.contentDom.value,
                nTime=elements.timeDom.value;

            if(!/\d{4}-\d{1,2}-\d{1,2}/.test(nTime)){
                alert("日期格式不对");
                return;
            }

            curTask.set({
                header:nHeader,
                content:nContent,
                time:nTime
            });

            this.hide();

            if(this.curTaskIsNew){
                taskListView.addTaskDom(curTask);
                taskList.addTask({
                    header:curTask.get("header"),
                    content:curTask.get("content"),
                    status:curTask.get("status"),
                    time:curTask.get("time"),
                    categoryId:curTask.get("categoryId")
                });

                taskDetailView.curTask=curTask;
                taskDetailView.refresh();
            }else{
                taskDetailView.refresh();
            }

        },
        cancelHandler:function (e) {
            this.hide() && taskDetailView.show();
        },
        valueHasChangeHandler:function (e) {
            this.hasEdited=!0;
        }
    }
})


var taskListView = new TaskListView($("taskList"), {
    events: {
        "click .fileter-item": "filterByStatusHandler",
        "click .add-task": "addTaskHandler",
        "click .item": "selectTaskHandler"
    },
    initialize: function() {
        this.curTaskId = null;
        this.curTaskItemDom = null;

        this.on("selectedCategoryChange", function(e) {
            var cateId = e.categoryId;
            if (cateId == null) return;

            this.curTaskArr = taskList.filterTaskByCategoryId(cateId);
            this.refresh();
        })
    },
    handlers: {
        filterByStatusHandler: function(e) {

        },
        addTaskHandler: function(e) {
            var newTask=new Task({
                header:"",
                content:"",
                status:0,
                time:"",
                categoryId:this.categoryId
            });
            taskEditView.show({
                curTask:newTask,
                isNew:true
            });
        },
        selectTaskHandler: function(e) {
            e=e||window.event;
            var tarDom=e.target||e.srcElement,
                taskId=tarDom.getAttribute("data-id"),
                that=this;

            taskDetailView.trigger("selectedTaskChange", {
                taskId: taskId,
                success:function () {
                    that.curTaskId = taskId;
                    that.setCurTaskItemDom(tarDom);
                }
            });

        }
    }
});

var categoryListView = new CategoryListView($("#categoryList"), {
    id: 1,
    events: {
        "click .add-category": "addCategoryHandler",
        "click .del": "removeCategoryItemHandler",
        // "click .level": "selectCategoryItemHandler" //绑定在.level上，事件没冒泡？为什么？
        "click .category-name": "selectCategoryItemHandler",
        "click .bd": "removeCurCategoryIdHandler"
    },
    initialize: function() {
        this.curCategoryItemDom = null; //这些应该在继承的时候就添加进去而不是在生成实例的时候
        this.curCategoryId = -1;

        categoryList.on("change", function(e) {
            categoryListView.$(".categorys").innerHTML = "";

            categoryListView.addCategorys(this.records);
        });
    },
    handlers: {
        addCategoryHandler: function(e) {
            var _name = window.prompt("请输入类别名称");
            if (!_name) return;
            var parId = this.curCategoryId || -1;

            var nCateItem = categoryList.addCategoryItem(_name, parId);
            categoryList.save(CATEGORY_LOCALSTORAGE_NAME);

        },
        removeCurCategoryIdHandler: function() {
            this.curCategoryId = -1;
            this.curCategoryItemDom && removeClass(this.curCategoryItemDom, "z-active");
        },
        selectCategoryItemHandler: function(e) {
            e = e || window.event;
            var tarDom = e.target || e.srcElement;
            var cateId = tarDom.getAttribute("data-id");

            this.curCategoryId = cateId;
            this.setCurCategoryItemDom(tarDom.parentNode);


            taskListView.trigger("selectedCategoryChange", {
                categoryId: cateId
            });
        },
        removeCategoryItemHandler: function(e) {
            e = e || window.event;
            var tarDom = e.target || e.srcElement,
                isDel,
                isDelSubCate = !1;

            if (hasClass(tarDom.parentNode, "has-sub-category")) {
                isDel = window.confirm("该分类含有子类别，确定删除吗");
                isDelSubCate = !0;
            } else {
                isDel = window.confirm("确定删除吗");
            }
            if (!isDel) return;

            var cateId = tarDom.getAttribute("data-id");
            if (cateId == null) return;

            categoryList.removeCategoryItem(cateId, isDelSubCate);
            categoryList.save(CATEGORY_LOCALSTORAGE_NAME);
        }
    }
});



// 填数据
$.on(window, "load", function(e) {

    if (localStorage[CATEGORY_LOCALSTORAGE_NAME]) {
        categoryList.fetch(CATEGORY_LOCALSTORAGE_NAME);
    } else {
        categoryList.addCategoryItem("默认分类", -1);
        categoryList.addCategoryItem("百度ife项目", -1);
        categoryList.addCategoryItem("毕业设计", -1);
        categoryList.addCategoryItem("社团活动", -1);

        categoryList.save(CATEGORY_LOCALSTORAGE_NAME);
    }

    if (localStorage[TASK_LOCALSTORAGE_NAME]) {
        taskList.fetch(TASK_LOCALSTORAGE_NAME);
    } else {
        taskList.addTask({
            header: "to do 1",
            content: "to do 1 content",
            status: 0,
            time: "2015-5-7",
            categoryId: 0
        });
        taskList.addTask({
            header: "to do 2",
            content: "to do 2 content",
            status: 1,
            time: "2015-5-8",
            categoryId: 0
        });
        taskList.addTask({
            header: "to do 3",
            content: "to do 3 content",
            status: 0,
            time: "2015-5-10",
            categoryId: 1
        });
        taskList.addTask({
            header: "to do 4",
            content: "to do 4 content",
            status: 0,
            time: "2015-5-11",
            categoryId: 0
        });

        taskList.save(TASK_LOCALSTORAGE_NAME);
    }
});

