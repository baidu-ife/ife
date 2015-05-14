/**
 * app.js
 * 集合只能与对应的视图有耦合，视图之间的耦合通过发布订阅模式关联
 */


var Tip=function () {
    var timer1, timer2, timer3;

    var obj={
        tipDom:null,
        show:function (txt) {
            var that=this;
            if(this.tipDom==null){
                this.tipDom=this.createElement(txt);
                document.body.appendChild(this.tipDom);
            }else{
                this.tipDom.innerHTML=txt;
            }
            
            if(timer1){
                clearTimeout(timer1);
            }
            timer1 = setTimeout(function () {
                addClass(that.tipDom,"in");
            },10);
            if(timer2){
                clearTimeout(timer2);
            }
            timer2 = setTimeout(function () {
                that.hide();
            },3000);
        },
        hide:function () {
            var that=this;
            removeClass(that.tipDom,"in");
            if(timer3){
                clearTimeout(timer3);
            }
            timer3 = setTimeout(function () {
                document.body.removeChild(that.tipDom);  
                that.tipDom=null;
            },410);
        },
        createElement:function (txt) {
            var div=document.createElement("div");
            div.innerHTML=txt;
            addClass(div,"tip");
            addClass(div,"fade");
            addClass(div,"out");
            return div;
        }
    };
    return obj;
}();


(function () {
    var CATEGORY_LOCALSTORAGE_NAME = "CategoryRecord",
        TASK_LOCALSTORAGE_NAME = "TaskRecord";

    var categoryList = new CategoryList(); // 所有分类
    var taskList = new TaskList(); // 所有任务

    function createData () {
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

        if (localStorage[CATEGORY_LOCALSTORAGE_NAME]) {
            categoryList.fetch(CATEGORY_LOCALSTORAGE_NAME);
        } else {
            categoryList.addCategoryItem("默认分类", -1);
            categoryList.addCategoryItem("百度ife项目", -1);
            categoryList.addCategoryItem("毕业设计", -1);
            categoryList.addCategoryItem("社团活动", -1);

            categoryList.save(CATEGORY_LOCALSTORAGE_NAME);
            categoryList.fetch(CATEGORY_LOCALSTORAGE_NAME);
        }
    }

    var taskInfoView=new TaskInfoView($("#taskInfo"),{
        initialize:function () {
            this.on("selectedTaskChange", function (e) {
                var taskId=e.taskId,
                    activeTask;
                // if(!this.curTask || this.curTask.get("id") == taskId) return;
                activeTask=taskList.getTask(taskId);

                (typeof e.success == "function") || (e.success=function(){});

                if(this.selectTaskItem(activeTask)){
                    e.success();
                }
            });

            this.on("updateCurTask", function (e) {
                var theTask=e.theTask;
                if(!theTask) return;

                taskList.save(TASK_LOCALSTORAGE_NAME);
                taskListView.updateTaskDom(theTask);

                Tip.show("保存成功");
            });

            this.on("addNewTask", function (e) {
                var opts=e.attrs;
                if(!opts) return;

                opts.categoryId=parseInt(categoryListView.curCategoryId);
                if(opts.categoryId == -1){
                    Tip.show("请先选择分类");
                    return;
                }
                opts.status=0;

                var nTask=taskList.addTask(opts);

                // 更新集合
                taskList.save(TASK_LOCALSTORAGE_NAME);

                // 更新视图
                taskListView.addTaskDom(nTask);
                categoryListView.addNewTaskToUpdateNum();

                e.success && e.success.call(this,nTask);

                Tip.show("添加成功");
            });
        }
    });

    var taskListView = new TaskListView($("#taskList"), {
        events: {
            "click .fileter-item": "filterByStatusHandler",//将事件处理程序绑定在li上，点击在a事件没有冒泡到li，这是为啥？
            "click .add-task": "addTaskHandler",
            "click .item": "selectTaskHandler"
        },
        initialize: function() {
            this.curTaskId = null;
            this.curTaskItemDom = null;
            this.curTaskArr=[];
            this.allTaskArr=[];
            this.curFilterStatus="all";

            this.on("selectedCategoryChange", function(e) {
                var cateId = e.categoryId;
                if (cateId == null) return;

                this.allTaskArr = taskList.filterTaskByCategoryId(cateId);
                this.curTaskArr=this.filterByStatus(this.curFilterStatus);
                this.refresh();

                // 默认选择第一条
                this.selectTaskHandler({
                    target:getElementsByClassName($(".tasks"),"item")[0]||null
                });
            })
        },
        handlers: {
            filterByStatusHandler: function(e) {
                e=e||window.event;
                var tar=e.target||e.srcElement;
                tar=tar.parentNode;

                var items=getElementsByClassName(this.root,'inline-item');
                for(var i=0; i<items.length; i++){
                    removeClass(items[i],'z-active');
                }
                addClass(tar, "z-active");

                this.curFilterStatus=tar.getAttribute("data-value");
                this.curTaskArr=this.filterByStatus(this.curFilterStatus);
                this.refresh();
            },
            addTaskHandler: function(e) {
                taskInfoView.willAddTask();
            },
            selectTaskHandler: function(e) {
                e=e||window.event;
                var tarDom=e.target||e.srcElement;
                if(!tarDom) return;
                var taskId=tarDom.getAttribute("data-id"),
                    that=this;

                taskInfoView.trigger("selectedTaskChange", {
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
            "click .category-name": "selectCategoryItemHandler",
            "click .bd": "removeCurCategoryIdHandler"
        },
        initialize: function() {
            this.curCategoryItemDom = null; //这些应该在继承的时候就添加进去而不是在生成实例的时候
            this.curCategoryId = -1;

            this.taskList=taskList;
            this.taskList.localStorageName=TASK_LOCALSTORAGE_NAME;
            this.categoryList=categoryList;
            this.categoryList.localStorageName=CATEGORY_LOCALSTORAGE_NAME;

            var that=this;

            categoryList.on("fetch", function(e) {
                that.$("#allTaskNum").innerHTML=taskList.getTaskCount();

                that.$(".categorys").innerHTML = "";
                that.addCategorys(this.records);

                // 默认选择“默认分类”
                that.selectCategoryItemHandler({
                    target:that.$(".categorys").firstChild
                });
            });
        },
        handlers: {
            addCategoryHandler: function(e) {
                var parId = this.curCategoryId || -1;
                if(parId==0) {
                    Tip.show('不能给“默认分类”添加子级分类');
                    return;
                }
                var _name = window.prompt("请输入类别名称");
                if (!_name) return;

                this.addCategoryItem(_name,parId);
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
                this.setCurCategoryItemDom(hasClass(tarDom,"level") ? tarDom : tarDom.parentNode);

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
                    isDel = window.confirm("删除所有子类别及其任务，确定删除吗");
                    isDelSubCate = !0;
                } else {
                    isDel = window.confirm("同时删除该分类下的所有任务，确定删除吗");
                }
                if (!isDel) return;

                var cateId = tarDom.getAttribute("data-id");
                if (cateId == null) return;

                this.removeCategoryItem(cateId,isDelSubCate,tarDom.parentNode);
            }
        }
    });

    // 填数据
    createData();

})();
