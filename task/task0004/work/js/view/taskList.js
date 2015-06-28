/*
 * taskList.js
 */

define(function(require, exports, module) {
    var TaskItemView = require("./taskItem");
    var mainTmpl = ['<header class="hd">',
        '                        <ul class="task-status-nav inline">',
        '                            <li class="inline-item item z-active"><a class="filter-item" data-status="-1">所有</a></li>',
        '                            <li class="inline-item item"><a class="filter-item" data-status="0">未完成</a></li>',
        '                            <li class="inline-item item"><a class="filter-item" data-status="1">已完成</a></li>',
        '                        </ul>',
        '                    </header>',
        '                    <section class="bd tasks">',
        '                        ',
        '                    </section>',
        '                    <footer class="ft">',
        '                        <a class="btn add-task">',
        '                            <i class="icon icon-add"></i>',
        '                            新增任务',
        '                        </a>',
        '                    </footer>'
    ].join("");

    var TimeGroup = function(el) {
        this.sectionList = {};
        this.el = el;
    };
    TimeGroup.prototype.append = function(time, el) {
        var temp;
        if (!this.exist(time)) {
            temp = this.sectionList[time] = this.createSectionEl(time);
            this.el.append(temp);
        } else {
            temp = this.sectionList[time];
        }

        temp.append(el);
    };
    TimeGroup.prototype.remove = function(time) {
        var t = this.sectionList[time];
        if (!t) return;
        if (t.children().length < 1) {
            $(t).remove();
        }
    };
    TimeGroup.prototype.exist = function(time) {
        return this.sectionList[time] != null;
    };
    TimeGroup.prototype.createSectionEl = function(time) {
        var section = $('<section class="time-node">');
        section.html('<p class="title">' + time + '</p>')
        return section;
    };
    TimeGroup.prototype.reset = function() {
        this.sectionList = {};
    };

    var _events = {};
    _events[touchEve.endEvent + " .filter-item"] = "statusChange";
    _events[touchEve.endEvent + " .add-task"] = "showAddTaskView";

    // @ques: TaskListView只需要Global_TaskList的一部分，这怎么搞
    var TaskListView = Backbone.MView.extend({
        tagName: "div",
        id: "taskList",
        className: "task-list",
        events: _events,

        template: _.template(mainTmpl),
        initialize: function(opts) {
            opts = opts || {};
            this.order = 2;
            this.curStatus = -1;
            this.curCategoryId = opts.curCategoryId || -1;

            this.listenTo(Global_TaskList, "add", this.addTask);
            this.listenTo(Global_TaskList, "destroy", this.removeTask);
            // this.listenTo(Global_TaskList, "sync", this.updataTipDom);
        },
        render: function() {
            var htm = this.template();
            this.$el.html(htm);

            this.tasksEl = this.$(".tasks");
            this.taskGroup = new TimeGroup(this.tasksEl);

            this.filterByCategoryId();

            return this;
        },
        showAddTaskView: function() {
            var href = "#newtask/" + this.curCategoryId;
            AppManager.appRouter.navigate(href, {
                trigger: true
            });
        },
        updataTipDom: function() {
            var filterList = Global_TaskList.filterByCategoryId(this.curCategoryId, this.curStatus);
            if (filterList.length < 1) {
                this.tasksEl.html('<p class="no-task-tip">还没有任务</p>');
                return;
            } else {
                this.$(".no-task-tip").remove();
            }
        },
        filterByCategoryId: function() {
            var filterList = Global_TaskList.filterByCategoryId(this.curCategoryId, this.curStatus);
            this.resetList(filterList);
        },
        statusChange: function(e) {
            var tar = e.target;
            this.$(".inline-item").removeClass("z-active");
            $(tar.parentNode).addClass("z-active");
            var type = $(tar).attr("data-status") || -1;
            this.curStatus = type;
            var filterList = Global_TaskList.filterByCategoryId(this.curCategoryId, type);
            this.resetList(filterList);
        },
        resetList: function(list) {
            this.taskGroup.reset();
            if (list.length < 1) {
                this.tasksEl.html('<p class="no-task-tip">还没有任务</p>');
                return;
            }
            this.tasksEl.html('');
            _.each(list, this.addTask, this);
        },
        removeTask: function(item) {
            if (item.get("categoryId") != this.curCategoryId) return;
            this.taskGroup.remove(model.get("time"));
        },
        addTask: function(item) {
            if (item.get("categoryId") != this.curCategoryId) return;
            var v = new TaskItemView({
                model: item
            });
            var t = item.get("time");

            this.taskGroup.append(t, v.render().$el);
        },
        setOptions: function(curCateId) {
            this.curCategoryId = parseInt(curCateId);
        }
    });

    module.exports = TaskListView;

});