/*
* app.js
 */

define(function (require, exports, module) {
    var CategoryList=require("./model/categoryModel").List_Category,
        TaskList=require("./model/taskModel").List_Task,
        TaskListView=require("./view/taskListView"),
        CategoryListView=require("./view/categoryListView"),
        TaskInfoView=require("./view/taskInfoView"),
        Tip=require("./components/tip"),
        viewControll=require("./components/viewController");

    var CATEGORY_LOCALSTORAGE_NAME = "CategoryRecord",
        TASK_LOCALSTORAGE_NAME = "TaskRecord";

    var categoryList = new CategoryList(); // 所有分类
    var taskList = new TaskList(); // 所有任务

    var taskInfoView = new TaskInfoView($("#taskInfo"), {
        initialize: function() {
            this.on("selectedTaskChange", function(e) {
                var taskId = e.taskId,
                    activeTask;
                // if(!this.curTask || this.curTask.get("id") == taskId) return;
                activeTask = taskList.getTask(taskId);

                (typeof e.success == "function") || (e.success = function() {});

                if (this.selectTaskItem(activeTask)) {
                    e.success();
                }
            });

            this.on("updateCurTask", function(e) {
                var theTask = e.theTask;
                if (!theTask) return;

                taskList.save(TASK_LOCALSTORAGE_NAME);
                taskListView.updateTaskDom(theTask);

                Tip.show("保存成功");
            });

            this.on("addNewTask", function(e) {
                var opts = e.attrs;
                if (!opts) return;

                opts.categoryId = parseInt(categoryListView.curCategoryId);
                if (opts.categoryId == -1) {
                    Tip.show("请先选择分类");
                    return;
                }
                opts.status = 0;

                var nTask = taskList.addTask(opts);

                // 更新集合
                taskList.save(TASK_LOCALSTORAGE_NAME);

                // 更新视图
                taskListView.addTaskDom(nTask);
                categoryListView.addNewTaskToUpdateNum();

                e.success && e.success.call(this, nTask);

                Tip.show("添加成功");
            });
        }
    });

    var taskListView = new TaskListView($("#taskList"), {
        events: {
            "click .fileter-item": "filterByStatusHandler", //将事件处理程序绑定在li上，点击在a事件没有冒泡到li，这是为啥？
            "click .add-task": "addTaskHandler",
            "click .item": "selectTaskHandler"
        },
        initialize: function() {
            this.curTaskId = null;
            this.curTaskItemDom = null;
            this.curTaskArr = [];
            this.allTaskArr = [];
            this.curFilterStatus = "all";

            this.on("selectedCategoryChange", function(e) {
                var cateId = e.categoryId;
                if (cateId == null) return;

                this.allTaskArr = taskList.filterTaskByCategoryId(cateId);
                this.curTaskArr = this.filterByStatus(this.curFilterStatus);
                this.refresh();

                if (window.os.phone !== 1) {
                    // 在pc平台上默认选择第一条
                    this.selectTaskHandler({
                        target: getElementsByClassName($(".tasks"), "item")[0] || null
                    });
                }
            })
        },
        handlers: {
            filterByStatusHandler: function(e) {
                e = e || window.event;
                var tar = e.target || e.srcElement;
                tar = tar.parentNode;

                var items = getElementsByClassName(this.root, 'inline-item');
                for (var i = 0; i < items.length; i++) {
                    removeClass(items[i], 'z-active');
                }
                addClass(tar, "z-active");

                this.curFilterStatus = tar.getAttribute("data-value");
                this.curTaskArr = this.filterByStatus(this.curFilterStatus);
                this.refresh();
            },
            addTaskHandler: function(e) {
                taskInfoView.willAddTask();

                if (window.os.phone === 1) {
                    viewControll.pushView(taskInfoView);
                }
            },
            selectTaskHandler: function(e) {
                e = e || window.event;
                var tarDom = e.target || e.srcElement;
                if (!tarDom) return;
                var taskId = tarDom.getAttribute("data-id"),
                    that = this;

                taskInfoView.trigger("selectedTaskChange", {
                    taskId: taskId,
                    success: function() {
                        that.curTaskId = taskId;
                        that.setCurTaskItemDom(tarDom);
                    }
                });

                if (window.os.phone === 1) {
                    viewControll.pushView(taskInfoView);
                }

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
            this.curCategoryItemDom = null; //这些应该在继承的时候就添加进去而不是在生成实例的时候！？？
            this.curCategoryId = -1;

            this.taskList = taskList;
            this.taskList.localStorageName = TASK_LOCALSTORAGE_NAME;
            this.categoryList = categoryList;
            this.categoryList.localStorageName = CATEGORY_LOCALSTORAGE_NAME;

            var that = this;

            categoryList.on("fetch", function(e) {
                that.$("#allTaskNum").innerHTML = taskList.getTaskCount();

                that.$(".categorys").innerHTML = "";
                that.addCategorys(this.records);

                if (window.os.phone !== 1) {
                    // 在pc平台上默认选择“默认分类”
                    that.selectCategoryItemHandler({
                        target: that.$(".categorys").firstChild
                    });
                }
            });
        },
        handlers: {
            addCategoryHandler: function(e) {
                var parId = this.curCategoryId || -1;
                if (parId == 0) {
                    Tip.show('不能给“默认分类”添加子级分类');
                    return;
                }
                var _name = window.prompt("请输入类别名称");
                if (!_name) return;

                this.addCategoryItem(_name, parId);
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
                this.setCurCategoryItemDom(hasClass(tarDom, "level") ? tarDom : tarDom.parentNode);

                taskListView.trigger("selectedCategoryChange", {
                    categoryId: cateId
                });

                if (window.os.phone === 1) {
                    viewControll.pushView(taskListView);
                }
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

                this.removeCategoryItem(cateId, isDelSubCate, tarDom.parentNode);
            }
        }
    });

    // 填数据
    function createData() {
        if (localStorage[TASK_LOCALSTORAGE_NAME]) {
            taskList.fetch(TASK_LOCALSTORAGE_NAME);
        } else {
            taskList.addTask({
                header: "说明",
                content: ['<h4>To Do App ------ by 叶喽喽</h4>',
                    '<p style="margin:10px 0;">耦合，耦合，严重耦合！！一定是我MV*的姿势用的不对！</p>',
                    '<h5>实现说明：</h5>',
                    '<ul style="padding-left:15px">界面：',
                    '    <li>1. 3栏布局；</li>',
                    '    <li>2. 自适应宽高（border-box真实太好用了）；</li>',
                    '    <li>3. 加号的实现，没有使用加号符；</li>',
                    '    <li>4. 多级列表的样式；</li>',
                    '    <li>5. 界面响应移动设备；</li>',
                    '    <li>6. 不兼容ie8</li>',
                    '</ul>',
                    '<ul style="padding-left:15px">功能：',
                    '    <li>1. 尝试MV*的设计模式开发，MV*库的实现参考简化backbone；</li>',
                    '    <li>2. 存储－localStorage；</li>',
                    '    <li>3. 多级列表的加载；</li>',
                    '    <li>4. 没有依赖任何第三方库；</li>',
                    '    <li>5. js行数：1800上下</li>',
                    '</ul>',
                    '<blockquote style="margin:10px 0 25px;">具体实现信息请参考总结</blockquote>',
                    '<p style="font-weight:bold">多看代码少装逼！</p>'
                ].join(""),
                status: 1,
                time: "2015-5-11",
                categoryId: 0
            });
            taskList.addTask({
                header: "更新及其他",
                content: ['<h4 style="margin-bottom:5px">更新日志</h4>',
                    '<p>2015.5.16 － 模块化</p>',
                    '<p>2015.5.14 － 简单的响应移动端</p>',
                    '<p>2015.5.10 － 初版发布</p>',
                    '<br><br>',
                    '<h4 style="margin-bottom:5px">其他</h4>',
                    '<ul>',
                    '    <li><a style="color:blue;" href="https://github.com/yyzych/Blog/issues/6">项目总结</a></li>',
                    '    <li><a style="color:blue;" href="https://github.com/yyzych/Blog/issues/6">问题提交</a></li>',
                    '</ul>'
                ].join(""),
                status: 1,
                time: "2015-5-8",
                categoryId: 0
            });
            taskList.addTask({
                header: "to do 4",
                content: "to do 4 content",
                status: 0,
                time: "2015-5-11",
                categoryId: 1
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
    createData();

    if (window.os.phone === 1) {
        viewControll.init([categoryListView, taskListView, taskInfoView]);
    }
})