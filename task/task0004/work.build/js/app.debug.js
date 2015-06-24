/*
 * taskList.js
 */

define('taskList',['taskItem'],function(require, exports, module) {
    var TaskItemView = require('taskItem');
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
/*
 * taskItem.js
 */

define('taskItem',function(require, exports, module) {

    var TaskListItem=Backbone.View.extend({
        tagName: "a",
        className: "item",

        initialize: function () {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);  
        },
        render: function () {
            var jsonModel=JSON.stringify(this.model);
            jsonModel=JSON.parse(jsonModel);

            if(jsonModel.status==1) this.$el.addClass("done");
            this.$el.html(jsonModel.header).attr("href", "#task/"+jsonModel.autoId);

            return this;
        }
    })

    module.exports = TaskListItem;

});
/*
 * taskInfo.js
 */

define('taskInfo',['taskDetail','taskEdit','m_task','tip'],function(require, exports, module) {
    var TaskDetailView = require('taskDetail'),
        TaskEditView = require('taskEdit'),
        TaskModel = require('m_task'),
        Tip = require('tip');

    var _events = {};
    _events[touchEve.endEvent + " #completeTask"] = "completeTask";
    _events[touchEve.endEvent + " #editTask"] = "editTask";
    // 事件直接绑定在taskInfo视图上是因为：点击后要切换到另一个视图，但这两个视图没有联系的，所以绑定在父视图上
    _events[touchEve.endEvent + " #sure"] = "saveChange";
    _events[touchEve.endEvent + " #cancel"] = "cancelChange";
    _events["change input"] = "valueChange";
    _events["change textarea"] = "valueChange";

    var TaskInfoView = Backbone.MView.extend({
        tagName: "div",
        id: "taskInfo",
        className: "task-info",
        events: _events,

        initialize: function(opts) {
            opts=opts || {};
            this.order=3;
            this.curTaskId = opts.curTaskId || -1;
            this.curCategoryId = opts.curCategoryId || -1;
            this.hasChange = false;

            this.detailView = null;
            this.editView = null;
        },
        render: function() {
            var _model, isNew = false;
            if (this.curTaskId == -1 && this.curCategoryId != -1) {
                isNew = true;
                _model = this.model = new TaskModel({
                    categoryId: this.curCategoryId
                });
            } else {
                _model = this.model = Global_TaskList.getTask(this.curTaskId);
            }

            this.detailView = new TaskDetailView({
                model: _model
            });
            this.editView = new TaskEditView(); // 编辑视图不绑定模型，操作简单点

            this.$el.append(this.detailView.render().$el)
                .append(this.editView.render().$el);

            this.setEditViewStatus(isNew); // 如果是新增则直接显示编辑按钮
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
        setOptions: function(id, isNew) {
            id = parseInt(id);
            this.curTaskId = -1;
            this.curCategoryId = -1;
            this.hasChange = false;

            isNew ? (this.curCategoryId = id) : (this.curTaskId = id);
        },
        setEditViewStatus: function(type) {
            var data = _.clone(this.model.attributes);
            this.editView.setActive(type, data);
        }
    });

    module.exports = TaskInfoView;
});
/*
 * taskEdit.js
 */

define('taskEdit',function(require, exports, module) {
    var tmpl = ['<header class="hd">',
        '                <input type="text" name="" value="" placeholder="输入标题" class="input-header" id="inputHeader">',
        '                <div class="operates">',
        '                    <a href="javascript:void(0);" id="sure" class="btn btn-sure">确认</a>',
        '                    <a href="javascript:void(0);" id="cancel" class="btn btn-cancel">取消</a>',
        '                </div>',
        '            </header>',
        '            <div class="task-time">',
        '                任务时间：<input type="text" value="" placeholder="日期格式：2015-04-02" name="" class="input-time" id="inputTime">',
        '            </div>',
        '            <div class="bd">',
        '                <div class="content">',
        '                    <textarea name="" class="input-content" id="inputContent" cols="30" rows="10"></textarea>',
        '                </div>',
        '            </div>'
    ].join("");

    var TaskEditView = Backbone.View.extend({
        tagName: "div",
        id: "taskEdit",
        className: "edit-bd",
        template: _.template(tmpl),

        render: function() {
            var htm = this.template();
            this.$el.html(htm);
            this.headerEl = this.$(".input-header");
            this.timeEl = this.$('.input-time');
            this.contentEl = this.$('.input-content');
            return this;
        },
        setActive: function(type, data) {
            var setValue = function() {
                this.headerEl.val(data["header"]);
                this.timeEl.val(data["time"]);
                this.contentEl.val(data["content"]);
            };

            type ? (setValue.call(this), this.$el.addClass("z-show")) : this.$el.removeClass("z-show");
        },
        getValue: function() {
            var hd = this.headerEl.val() || "";
            var time = this.timeEl.val() || "";
            var content = this.contentEl.val() || "";
            return {
                header: hd,
                time: time,
                content: content
            };
        }
    });

    module.exports = TaskEditView;

});
/*
 * taskDetail.js
 */

define('taskDetail',function(require, exports, module) {
    var tmpl = ['<header class="hd">',
        '                <h4 class="header"><%= header %></h4>',
        '                <% if(status == 0) { %>',
        '                    <div class="operates">',
        '                        <a href="javascript:void(0);" id="completeTask" class="icon icon-done btn btn-done"></a>',
        '                        <a href="javascript:void(0);" id="editTask" class="icon icon-edit btn btn-edit"></a>',
        '                    </div>',
        '                <% } %>',
        '            </header>',
        '            <div class="task-time">',
        '                任务时间：<span class="time"><%= time %></span>',
        '            </div>',
        '            <div class="bd">',
        '                <article class="content">',
        '                    <%= content %>',
        '                </article>',
        '            </div>'
    ].join("");

    var TaskDetailView = Backbone.View.extend({
        tagName: "div",
        id: "taskDetail",
        className: "detail-bd",
        template: _.template(tmpl),

        initialize: function() {
            this.listenTo(Global_TaskList, "change", this.render);
        },
        render: function() {
            var jsonModel = JSON.stringify(this.model);
            jsonModel = JSON.parse(jsonModel);
            var htm = this.template(jsonModel);
            this.$el.html(htm);
            return this;
        }
    });

    module.exports = TaskDetailView;

});
/*
 * index.js
 */

define('index',['categoryItem'],function(require, exports, module) {
    var CategoryItemView = require('categoryItem');
    var mainTmpl = ['<header class="hd">',
        '                        所有任务 (<span class="all-task-num num">0</span>)',
        '                    </header>',
        '                    <section class="bd">',
        '                        <h4 class="title">分类列表</h4>',
        '                        <ul class="categorys">',
        '                            ',
        '                        </ul>',
        '                    </section>',
        '                    <footer class="ft">',
        '                        <a class="btn add-category">',
        '                            <i class="icon icon-add"></i>',
        '                            新增分类',
        '                        </a>',
        '                    </footer>'
    ].join("");

    var _events = {};
    _events[touchEve.endEvent + " .add-category"] = "toastInputPopup";

    var Index = Backbone.MView.extend({
        tagName: "div",
        id: "categoryList",
        className: "category-list",
        events: _events,

        template: _.template(mainTmpl),
        initialize: function() {
            this.order = 1;
            this.listenTo(Global_CategoryList, "add", this.addCategory);
            this.listenTo(Global_TaskList, "all", this.updateTaskNum);
        },
        // 注意：必须render才能fetch，因为他的字元素没有生成
        render: function() {
            var htm = this.template();
            this.$el.html(htm);

            this.categorysEl = this.$(".categorys");
            this.allTaskNumEl = this.$(".all-task-num");
            this.updateTaskNum();

            /*
             * 不依靠集合的fetch引发的add事件去添加一项是因为：
             * 1. 如果集合已经fetch过了，再去fetch一次，已经存在的model不会触发add事件
             * 2. render函数会经常调用，但用不着每次也去fetch一遍，因为绑定了集合的其他事件，如add事件，会自动执行相应的操作
             */
            this.addAll();

            return this;
        },
        updateTaskNum: function(e) {
            this.allTaskNumEl.html(Global_TaskList.length);
        },
        addAll: function() {
            this.categorysEl.html("");
            Global_CategoryList.each(this.addCategory, this);
        },
        toastInputPopup: function() {
            var _name = window.prompt("添加分类");
            if (_name == "" || _name == null) return;
            var attr = {
                name: _name
            };
            var nmodel = Global_CategoryList.addCategory(attr)[0];
        },
        addCategory: function(item) {
            var v = new CategoryItemView({
                model: item
            });
            this.categorysEl.append(v.render().$el);
        }
    });

    /*
     * @ques: 去掉initUI，生成视图实例的代码放在了外面，有什么好处呢
     * 降低耦合性?? index这个视图肯定就一个，不需要重用啊？
     */
    // Index.initUI = function() {
    //     // clearData();
    //     createData();
    //     if(!curView) {
    //         curView=new Index();
    //         curView.render();
    //     }
    //     AppManager.pageIn($("#container"), curView.$el, "right");

    //     // @ques: 什么时候fetch
    //     Global_TaskList.fetch();
    //     Global_CategoryList.fetch();
    // };

    module.exports = Index;

});
/*
 * header.js
 * header的渲染如果直接在主视图里完成，就方便多了，能跟随视图一起滑动
 */

define('header',function(require, exports, module) {
    var tmpl = ['<% if(isIndex) { %>',
        '            <span>GTD Tools</span><small>@by ych</small>',
        '        <% }else { %>',
        '            <a class="pull-left segue-view-btn back"><%= title %></a>',
        '        <% } %>'
    ].join("");

    var _events = {};
    _events[touchEve.endEvent + " .back"] = "back";

    var Header=Backbone.View.extend({
        el: $(".web-hd").get(0), // .get(0), 是util.js的问题
        events: _events,
        template: _.template(tmpl),

        initialize: function () {
            this.isIndex=true;
            this.title="返回";
        },
        render: function () {
            var data={};
            if(this.isIndex) {
                data={isIndex: true};
            }else{
                data={
                    isIndex: false,
                    title: this.title || "返回"
                };
            }

            var htm=this.template(data);
            this.isIndex ? this.$el.html(htm).show(220) : this.$el.html(htm);
            return this;
        },
        back: function () {
            history.back();
        },
        setOptions: function (isIndex, title) {
            this.isIndex=isIndex;
            title && (this.title=title);
            return this;
        }
    })

    module.exports = Header;

});
/*
 * init.js
 */

define('categoryItem',function(require, exports, module) {

    var cateTmpl = [
        '    <a class="category-name" href="<% print(\'#category/\' + autoId) %>" data-autoid="<%= autoId%>"><%= name %>(<span class="num"><%= num %></span>)</a>',
        '    <% if(name != "默认分类"){ %>',
        '        <a class="del" data-autoid="<%= autoId%>">×</a>',
        '    <% } %>'
    ].join("");

    var _events = {};
    _events[touchEve.endEvent + " .del"] = "removeItem"; // 不要直接使用视图的remove，应该通过删除模型触发事件告诉模型对应的视图，然后视图在删除自己

    var CateItem = Backbone.View.extend({
        tagName: "li",
        className: "level",
        template: _.template(cateTmpl),
        // @ques: 这种事件是绑定在item上还是list上呢
        events: _events,

        initialize: function() {
            this.listenTo(this.model, "change", this.render);
            this.listenTo(this.model, "destroy", this.remove);

            this.listenTo(Global_TaskList, "add", this.updateNum);
            this.listenTo(Global_TaskList, "remove", this.updateNum);
        },
        render: function() {
            var jsonModel = JSON.stringify(this.model);
            jsonModel = JSON.parse(jsonModel);
            var taskLen = Global_TaskList.getCountByCategoryId(jsonModel.autoId);
            jsonModel.num = taskLen;
            var htm = this.template(jsonModel);
            this.$el.html(htm);
            this.numEl = this.$(".num");

            this.handlerSub(jsonModel.subIds);
            return this;
        },
        updateNum: function(item) {
            if (item.get("categoryId") != this.model.get("autoId")) return;
            var num = Global_TaskList.getCountByCategoryId(this.model.get("autoId"));
            this.numEl.html(num);
        },
        handlerSub: function(subIds) {
            if (subIds.length < 1) return;
            this.$el.addClass("has-sub-category");
            var ul = $('<ul class="sub-category">');
            for (var i = 0; i < subIds.length; i++) {
                var _model = Global_CategoryList.where({
                    autoId: subIds[i]
                });
                var _view = new CateItem({
                    model: _model
                });
                ul.append(_view.$el);
            }
            this.$el.append(ul);
        },
        removeItem: function() {
            Global_TaskList.removeByCategoryId(this.model.get("autoId"));
            this.model.destroy();
        }
    });


    module.exports = CateItem;
});
/*
 * slidePage.js
 * 视图滑动, 现在只支持右侧进入，左侧滑出
 */

define('slidePage',function(require, exports, module) {
    $.fn.slideIn=function (drection, doneCallback) {
        that=this;
        that.css("z-index", 99).addClass("pageshow-anim");
        setTimeout(function () {
            var delClass="pageshow-anim "+drection+"-in "+drection+"-in-posi";
            that.removeClass(delClass).css("z-index", null);
            doneCallback();
        }, 520);
        that.addClass(drection+"-in-posi");
        that.get(0).clientLeft;
        that.addClass(drection+"-in");
    };

    $.fn.slideOut=function (drection, doneCallback) {
        that=this;
        that.addClass("pageshow-anim").css("z-index", 99);
        setTimeout(function () {
            var delClass="pageshow-anim "+drection+"-out "+drection+"-out-posi";
            that.removeClass(delClass).css("z-index", null);
            doneCallback();
        }, 520);
        that.addClass(drection+"-out-posi");
        that.get(0).clientLeft;
        that.addClass(drection+"-out");
    };
});
/*
 * Tip.js
 * 提示组件
 */

define('tip',function(require, exports, module) {
    var timer1, timer2, timer3;
    var doc = document;

    var tip = {
        tipDom: null,
        show: function(txt) {
            var that = this;
            if (this.tipDom == null) {
                this.tipDom = this.createElement(txt);
                doc.body.appendChild(this.tipDom);
            } else {
                this.tipDom.innerHTML = txt;
            }

            if (timer1) {
                clearTimeout(timer1);
            }
            timer1 = setTimeout(function() {
                // addClass(that.tipDom, "in");
                $(that.tipDom).addClass("in");
            }, 10);
            if (timer2) {
                clearTimeout(timer2);
            }
            timer2 = setTimeout(function() {
                that.hide();
            }, 3000);
        },
        hide: function() {
            var that = this;
            // removeClass(that.tipDom, "in");
            $(that.tipDom).removeClass("in");
            if (timer3) {
                clearTimeout(timer3);
            }
            timer3 = setTimeout(function() {
                doc.body.removeChild(that.tipDom);
                that.tipDom = null;
            }, 410);
        },
        createElement: function(txt) {
            var div = doc.createElement("div");
            div.innerHTML = txt;
            var wid = txt.length * 12 + 30; // 12: 字体大小，30: 左右padding， box-sizing: border-box
            $(div).addClass("tip fade out").css("width", wid);
            return div;
        }
    };

    module.exports = tip;
});
/*
* collection-task.js
 */

define('c_task',['m_task'],function (require, exports, module) {
    var Task=require('m_task');
    
    /**
     * 存储所有任务的集合
     * @Collection {TaslList}
     */
    var TaskList = Backbone.Collection.extend({
        model: Task,
        localStorage: new Backbone.LocalStorage("local-tasks"),
        comparator: "autoId",

        getNextAutoId: function() {
            if (!this.length) return 1;
            return this.last().get("autoId") + 1;
        },
        
        removeByCategoryId:function (categoryId) {
            var tasks=this.where({
                categoryId: categoryId
            });
            // this.remove(tasks); // @ques: 模型本身需不需要destroy

            for(var i=0, len=tasks.length; i<len; i++) {
                // this.sync("delete", tasks[i]);
                // 在模型上触发 "destroy" 事件，该事件将会冒泡到任何包含这个模型的集合中
                // 也就是说集合上保存的数据也会删除
                tasks[i].destroy();
            }
        },
        filterByCategoryId: function(categoryId, status) {
            status=parseInt(status);
            var s_arr=[0, 1];
            var filter={ categoryId: categoryId };
            s_arr.indexOf(status) != -1 && (filter.status=status);  

            var tasks=this.where(filter);
            return tasks || [];
        },
        getCountByCategoryId: function(categoryId) {
            var res=this.filterByCategoryId(categoryId);
            return res.length;
        },
        getTask: function (id) {
            return this.findWhere({ autoId: id });
        },
        getCount:function () {
            return this.models.length;
        },
        addTask: function (attrs) {
            var res=[];
            var arr=attrs;
            if(!$.isArray(attrs)) {
                arr=[attrs];
            }
            for(var i=0; i<arr.length; i++) {
                var temp=arr[i];
                temp.autoId=this.getNextAutoId();
                var n=this.create(temp);
                res.push(n);
            }
            return res;
        }
    });

    module.exports=TaskList;

});


/*
 * model-task.js
 */

define('m_task',function(require, exports, module) {

    Date.prototype.parse = function(pattern) {
        var y = this.getFullYear();
        var m = this.getMonth() + 1;
        var d = this.getDate();

        var res = pattern;
        res = res.replace("yyyy", y);
        res = res.replace("mm", m);
        res = res.replace("dd", d);

        return res;
    };

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
    var Task = Backbone.Model.extend({
        defaults: function() {
            return {
                autoId: -1,
                header: "",
                status: 0,
                time: (new Date()).parse("yyyy-mm-dd"),
                content: "",
                categoryId: -1
            };
        },
        completeTask: function() {
            this.set("status", 1);
            this.save();
        }
    });


    module.exports = Task;

});
/*
 * collection-category.js
 */

define('c_category',['m_category'],function(require, exports, module) {
    var Category = require('m_category');

    /**
     * 存储所有类别的集合,可以直接使用默认的集合
     * @Collection {CategoryList}
     */
    var CategoryList = Backbone.Collection.extend({
        model: Category,
        localStorage: new Backbone.LocalStorage("local-categorys"),
        comparator: "autoId",

        getNextAutoId: function() {
            if (!this.length) return 1;
            return this.last().get("autoId") + 1;
        },

        /**
         * 删除一个分类，如果该分类含有子类别和任务，也全部删除
         * @param  {int}  categoryId   类别id
         */
        removeCategory: function(categoryId) {
            this._removeCategory(categoryId);

            // @ques: 删除任务放在这里不是耦合了吗
            // Global_TaskList.removeByCategoryId(categoryId);
            
            this.sync();
        },
        _removeCategory: function (categoryId) {
            var curCate = this.findWhere({
                id: categoryId
            });
            var subCateIds=curCate.subIds,
                len=subCateIds.length;
            for(var i=0; i<len; i++) {
                this.removeCategory(subCateIds[i]);
            }
            this.remove(curCate);
        },
        addCategory: function (attrs) {
            var res=[];
            var arr=attrs;
            if(!$.isArray(attrs)) {
                arr=[attrs];
            }
            for(var i=0; i<arr.length; i++) {
                var temp=arr[i];
                temp.autoId=this.getNextAutoId();
                var n=this.create(temp);
                res.push(n);
            }
            return res;
        }
    });

    module.exports = CategoryList;
});
/*
* model-category.js
 */

define('m_category',function (require, exports, module) {

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



/*
 * app.js
 *
 * 所有模块加载前，加载app.js
 */

define('app',['m_category','c_category','m_task','c_task','tip','slidePage','categoryItem','header','index','taskDetail','taskEdit','taskInfo','taskItem','taskList','c_category','c_task','header','slidePage'],function (require, exports, module) {
    // 加载所有依赖，方便gulp合并
    // var app=require("./app"), //app模块自己不用在加载
    var _m_category=require('m_category'),
        _c_category=require('c_category'),
        _m_task=require('m_task'),
        _c_task=require('c_task'),

        _tip=require('tip'),
        _slidePage=require('slidePage'),

        _categoryItem=require('categoryItem'),
        _header=require('header'),
        _index=require('index'),
        _taskDetail=require('taskDetail'),
        _taskEdit=require('taskEdit'),
        _taskInfo=require('taskInfo'),
        _taskItem=require('taskItem'),
        _taskList=require('taskList');


    // ==================================================
    var CategoryList=require('c_category'),
        TaskList=require('c_task'),
        HeaderView=require('header'),
        slidePage=require('slidePage'); // 视图都依赖slidePage，所以直接在这里写了

    /*
    在这里定义这两个全局集合：
    1.模型集合都是以模块形式定义的，在init里用不了
    2.所有模块加载前，加载app模块，这样就能保证这里定义的变量在其他文件一定能访问到了
    */
    window.Global_TaskList=new TaskList();
    window.Global_CategoryList=new CategoryList();

    // @ques: 什么时候fetch, 在哪里fetch
    // 所有模块加载前都去fetch，不只在加载首页时fetch，是因为，怕用户直接进入其他页面，集合里面没有元素
    Global_TaskList.fetch();
    Global_CategoryList.fetch();

    // 暴露header视图
    window.HeaderView=HeaderView;


    function createData () {
        if(localStorage["isNotFirstIn"] != null) return;
        localStorage["isNotFirstIn"]=1;

        setTimeout(function () {
            Global_CategoryList.addCategory([{ name: "默认分类" }, { name: "百度ife项目" }]);
            
            Global_TaskList.addTask([{
                header: "测试1",
                content: "测试1 content",
                status: 0,
                time: "2015-5-11",
                categoryId: 1
            }, {
                header: "测试2",
                content: "测试2 content",
                status: 1,
                time: "2015-5-12",
                categoryId: 1
            }]);
            
        });
    }
    // createData();
    
    function clearData () {
        localStorage.clear();
    }
    // clearData();

});
