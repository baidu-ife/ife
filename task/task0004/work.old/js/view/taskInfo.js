/*
 * taskInfo.js
 */

define(function(require, exports, module) {
    var TaskDetailView = require("./taskDetail"),
        TaskEditView = require("./taskEdit"),
        TaskModel = require("../entity/m_task"),
        Tip = require("../components/tip");

    var curView = null;

    var _events={};
    _events[touchEve.endEvent+" #completeTask"]="completeTask";
    _events[touchEve.endEvent+" #editTask"]="editTask";
    // 事件直接绑定在taskInfo视图上是因为：点击后要切换到另一个视图，但这两个视图没有联系的，所以绑定在父视图上
    _events[touchEve.endEvent+" #sure"]="saveChange";
    _events[touchEve.endEvent+" #cancel"]="cancelChange";
    _events["change input"]="valueChange";
    _events["change textarea"]="valueChange";

    var TaskInfoView = Backbone.View.extend({
        tagName: "div",
        id: "taskInfo",
        className: "task-info",
        events: _events,

        initialize: function(opts) {
            this.curTaskId = opts.curTaskId || -1;
            this.curCategoryId = opts.curCategoryId || -1;
            this.hasChange = false;

            this.detailView = null;
            this.editView = null;
        },
        render: function() {
            var _model;
            if (this.curTaskId == -1 && this.curCategoryId != -1) {
                this.model = new TaskModel({
                    categoryId: this.curCategoryId
                });
            } else {
                this.model = Global_TaskList.getTask(this.curTaskId);
            }

            _model = this.model;
            this.detailView = new TaskDetailView({
                model: _model
            });
            this.editView = new TaskEditView();

            this.$el.append(this.detailView.render().$el)
                .append(this.editView.render().$el);

            this.setEditViewStatus(this.curTaskId == -1); // 如果是新增则直接显示编辑按钮

            return this;
        },
        valueChange: function() {
            this.hasChange = true;
        },
        completeTask: function() {
            var flag = window.confirm("确定完成任务了吗？");
            if (!flag) return false;
            this.model.completeTask();
        },
        editTask: function() {
            this.setEditViewStatus(true);
        },
        updateTask: function() {
            if (!this.hasChange) {
                Tip.show("没有更改的内容");
                return;
            }

            var attr = this.editView.getValue();
            if (!this.validate(attr)) return false;

            this.model.save(attr);
            this.hasChange = false;
            Tip.show("保存成功");
        },
        validate: function(attr) {
            if (!attr.header) {
                Tip.show("请输入标题");
                return false;
            }
            if (!/^\d{4}-\d{1,2}-\d{1,2}$/.test(attr.time)) {
                Tip.show("时间不正确");
                return false;
            }
            if (!attr.content) {
                Tip.show("请输入内容");
                return false;
            }
            return true;
        },
        addNewTask: function() {
            var attr = this.editView.getValue();
            if (!this.validate(attr)) return false;

            attr.categoryId = this.curCategoryId;
            var nmodel = Global_TaskList.addTask(attr)[0];
            this.model = nmodel;
            this.curTaskId = nmodel.get("autoId");

            this.detailView.model = this.model;
            this.detailView.render();

            this.hasChange = false;
            Tip.show("添加成功");
        },
        saveChange: function() {
            if (this.curTaskId == -1 && this.curCategoryId != -1) {
                this.addNewTask();
            } else {
                this.updateTask();
            }
        },
        cancelChange: function() {
            var flag;
            if (this.hasChange) {
                flag = window.confirm("有未保存的内容，确定取消吗？");
                if (!flag) return;
            }
            if (this.curTaskId == -1 && this.curCategoryId != -1) {
                history.go(-1);
            } else {
                this.setEditViewStatus(false);
            }
        },
        refresh: function(id, isNew) {
            // 重置初始化
            this.curTaskId = isNew ? -1 : id;
            this.curCategoryId = isNew ? id : -1;
            this.hasChange = false;

            this.detailView.remove();
            this.editView.remove();

            this.render();
        },
        setEditViewStatus: function(type) {
            var data = _.clone(this.model.attributes);
            this.editView.setActive(type, data);
        }
    }, { viewId: "task-info-view" });

    TaskInfoView.initUI = function(id, isNew) {
        id = parseInt(id);
        var opt={};

        if(!isNew) {
            Global_TaskList.fetch();
            opt.curTaskId=id;
        }else{
            opt.curCategoryId=id;
        }

        if (curView) {
            curView.refresh(id, isNew);
            // $("#container").append(curView.$el);
        } else {
            curView = new TaskInfoView(opt);
            curView.render();
            // $("#container").append(curView.$el);
        }
        AppManager.pageIn($("#container"), curView.$el, "right");
    };
    TaskInfoView.release = function() {
        curView && curView.remove();
    };
    TaskInfoView.cache = function(pageOut) {
        if(pageOut === true) {
            AppManager.pageOut(curView.$el, "right", function () {
                curView && curView.$el.remove();
            });
        }else {
            curView && curView.$el.remove();
        }
    };

    module.exports = TaskInfoView;
});