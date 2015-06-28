/*
* eventManager.js
* 事件机制
 */

define('eventManager',function (require, exports, module) {
    var slice = Array.prototype.slice,
        doc = document;
        
    var EventManager = {
        on: function(eveType, handler) {
            var callbacks = this.callbacks || (this.callbacks = {});
            var handlers = callbacks[eveType] || (callbacks[eveType] = []);
            handlers.push(handler);
        },
        off: function(eveType, handler) {
            var callbacks,
                handlers;
            if ((callbacks = this.callbacks) && (handlers = callbacks[eveType])) {
                if (!handler) {
                    handlers = [];
                    return;
                }
                for (var i = 0; i < handlers.length; i++) {
                    if (handlers[i] = handler) {
                        handlers.splice(i, 1);
                    }
                }
            }
        },
        trigger: function() {
            var args = slice.call(arguments, 0),
                eveType = args.shift();

            var callbacks,
                handlers;
            if ((callbacks = this.callbacks) && (handlers = callbacks[eveType])) {
                for (var i = 0; i < handlers.length; i++) {
                    handlers[i].apply(this, args);
                }
            }
        }
    };

    module.exports=EventManager;    

})
/*
* taskEditView.js
 */

define('taskEditView',['mvc','taskModel'],function (require, exports, module) {
    var _=require('mvc'),
        Task=require('taskModel').Model_Task;

    /**
     * 任务编辑视图
     * @type {TaskEditView}
     */
    var TaskEditView = _.View.extend({
        model:Task,
        initialize:function () {
            this.hasEditedUnSave=!1;//是否编辑过了
        },
        show:function (data) {
            var elements=this.elements;

            data || (data={
                header:"",
                time:"",
                content:""
            });

            elements.headerDom.value=data.header;
            elements.timeDom.value=data.time;
            elements.contentDom.value=data.content;

            addClass(this.root, "z-show");
        },
        hide:function () {
            this.clear();
            removeClass(this.root, "z-show");
        },
        hasChanged:function () {
            return this.hasEditedUnSave;
        },
        clear:function () {
            var elements=this.elements;

            elements.headerDom.value="";
            elements.timeDom.value="";
            elements.contentDom.value="";

            this.hasEditedUnSave=!1;//是否编辑过了
        }
    });
    
    module.exports=TaskEditView;
})
/*
* taskDetailView.js
 */

define('taskDetailView',['mvc','taskModel'],function (require, exports, module) {
    var _=require('mvc'),
        Task=require('taskModel').Model_Task;

    /**
     * 任务详细视图
     * @type {TaskDetailView}
     */
    var TaskDetailView = _.View.extend({
        model:Task,
        refresh:function (data) {
            var elements=this.elements;

            elements.headerDom.innerHTML=data.header;
            elements.timeDom.innerHTML=data.time;
            elements.contentDom.innerHTML=data.content;

            if(data.status==1){
                this.hideOperateBtns();
            }else{
                this.showOperateBtns();
            }
        },
        hideOperateBtns:function () {
            addClass(this.elements.operateBtnDom,"z-hide");
        },
        showOperateBtns:function () {
            removeClass(this.elements.operateBtnDom,"z-hide");
        }
    });
    
    module.exports=TaskDetailView;
})
/*
* mvc.js
 */

define('mvc',['eventManager'],function (require, exports, module) {
    var slice = Array.prototype.slice,
        doc = document;

    var EventManager=require('eventManager');

    // 对浏览器做初始化处理，如兼容性问题
    (function initialize() {
        // Object.create
        if (typeof Object.create !== "function") {
            Object.prototype.create = function(par) {
                function F() {};
                F.prototype = par;
                return new F();
            }
        }

        // 该方法摘自《基于javascript的mvc富应用开发》
        Math.guid = function() {
            return ('xxxxxxxx-xxxx-4xxx-yxxx-xxxxxxxxxxxx'.replace(/[xy]/g, function(c) {
                var r = Math.random() * 16 | 0,
                    v = c == 'x' ? r : (r & 0x3 | 0x8);
                return v.toString(16);
            })).toUpperCase();
        }
    })();


    // 模型
    var Model = function(attrs) {
        attrs || (attrs = {});
        this.cid = Math.guid();
        this.id = typeof attrs.id !== "undefined" ? attrs.id : this.cid;
        this.attributes = {
            id: this.id
        };

        this.set(attrs);
        this.initialize.apply(this, arguments);
    };
    Model.prototype = {
        constructor: Model,
        initialize: function() {},
        set: function() {
            var attrs = arguments[0];
            for (var prop in attrs) {
                if (attrs.hasOwnProperty(prop)) {
                    this.attributes[prop] = attrs[prop];
                }
            }

            this.trigger("change");
        },
        get: function(name) {
            return this.attributes[name];
        },
        toJSON: function() {
            return this.attributes;
        },
        clone: function() {
            var constructor = this.constructor;
            var res = new constructor(this.attributes);
            return res;
        },
        save: function(name) { // 保存到服务器或localstroage
            localStorage.setItem(name || this.id, JSON.stringify(this));

            this.trigger("change");
        },
        fetch: function(name) { // 从服务器或localstroage中获取数据
            var res = JSON.parse(localStorage[name]);
            this.set(res);

            this.trigger("change");
        },
        destroy: function(name) {
            localStorage.removeItem(name || this.id);
        }
    };
    $.extend(Model.prototype, EventManager);


    // 集合
    var List = function(opts) {
        opts || (opts = {});
        opts.model && (this.model = opts.model);
        this.records = {};
        this.cid = Math.guid();
        this.id = typeof opts.id !== "undefined" ? opts.id : this.cid;

        this.initialize.apply(this, arguments);
    };
    List.prototype = {
        constructor: List,
        initialize: function() {},
        _getNextId: function() {
            var idArr = [];
            var records = this.records;
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    idArr.push(parseInt(records[i].id));
                }
            }
            if (idArr.length <= 0) return 0;
            var maxid = Math.max.apply(Math, idArr);
            return maxid + 1;
        },
        addItem: function(item) {
            if (item.constructor === this.model) {
                this.records[item.id] = item;
            } else {
                var constructor = this.model;
                var res = new constructor(item);
                this.records[item.id] = item;
            }
        },
        removeItem: function(item) {
            var records = this.records;
            if (typeof item === "object") {
                for (var i in records) {
                    if (records.hasOwnProperty(i)) {
                        if (records[i] === item) {
                            delete records[i];
                            return;
                        }
                    }
                }
            } else {
                records[item] && (delete records[item]);
            }
        },
        save: function(name) {
            var res = [],
                records = this.records;
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    res.push(records[i]);
                }
            }
            localStorage.setItem(name || this.id, JSON.stringify(res));

            this.trigger("change");
        },
        count: function() {
            var count = 0,
                records = this.records;
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    count++;
                }
            }
            return count;
        },
        fetch: function(name) {
            var res = JSON.parse(localStorage[name]);
            this.populate(res);

            this.trigger("change");
            this.trigger("fetch");
        },
        populate: function(items) {
            this.records = {};
            var constructor = this.model;

            for (var i = 0; i < items.length; i++) {
                this.records[items[i].id] = new constructor(items[i]);
            }
        },
        find: function(itemId) {
            var records = this.records;
            for (var i in records) {
                if (records.hasOwnProperty(i)) {
                    if (records[i].id == itemId) {
                        return records[i];
                    }
                }
            }
        },
        destroy: function(name) {
            localStorage.removeItem(name || this.id);

            this.records = {};
        }
    };
    $.extend(List.prototype, EventManager);


    // 控制器+视图
    var View = function(root, opts) {
        this.root = root;
        this.cid = Math.guid();
        this.id = typeof opts.id !== "undefined" ? opts.id : this.cid;
        this.events = opts.events;
        this.elements = opts.elements || {};

        opts.modelList && (this.modelList = opts.modelList);

        this.initialize.call(this, opts);
        opts.handlers && this.addEventHandler(opts.handlers);
        this.events && this.createEvent();
    };
    View.prototype = {
        constructor: View,
        eventSpliter: /^(\w+)\s*(.*)$/,
        initialize: function() {
            var opt = arguments[0];
            if (isFunction(opt.initialize)) {
                opt.initialize.call(this);
            }
        },
        $: function(selector) {
            return $(selector, this.root);
        },
        createEvent: function() {
            for (var key in this.events) {
                var methodName = this.events[key],
                    method = this.proxy(this[methodName]),
                    match = key.match(this.eventSpliter),
                    eventName = match[1],
                    selector = match[2];
                if (selector === "") {
                    $.on(this.root, eventName, method);
                } else {
                    $.delegate(this.root, selector, eventName, method);
                }
            }
        },
        addEventHandler: function(obj) {
            var fn = this.constructor.prototype;
            for (var i in obj) {
                if (obj.hasOwnProperty(i)) {
                    fn[i] = obj[i];
                }
            }
        },
        proxy: function(func) {
            var that = this;
            return function() {
                func.apply(that, arguments);
            }
        }
    };
    $.extend(View.prototype, EventManager);


    // @prama protoProps 添加到child的prototype的方法
    var extend = function(protoProps) {
        var parent = this,
            child;

        child = function() {
            parent.apply(this, arguments);
        };
        child.prototype = Object.create(parent.prototype);
        child.prototype.constructor = child;

        //方便调用父类的方法
        child.__super__ = parent.prototype;

        // 复制parent的静态属性到child中
        $.extend(child, parent);

        // 复制protoProps到child的prototype上
        if("initialize" in protoProps){
            var subInit=protoProps.initialize,
                supInit=child.__super__.initialize;
            protoProps.initialize=function () {
                supInit.apply(this,arguments);
                subInit.apply(this,arguments);
            };
        }
        $.extend(child.prototype, protoProps);

        

        return child;
    };


    // 继承某个对象
    Model.extend = View.extend = List.extend = extend;

    exports.Model = Model;
    exports.View = View;
    exports.List = List;

})
/*
* viewController.js
* mobile平台时的视图管理对象
 */

 define('viewController',function (require, exports, module) {
     var doc = document;
     var curView = null,
         views = {},
         queue = [],
         backBeforeViewBtn;

     var _createBackBtn = function() {
         var a = doc.createElement("a");
         addClass(a, "segue-view-btn");
         addClass(a, "z-hide");
         $.on(a, "click", function(e) {
             _popView();
         });

         $(".web-hd").appendChild(a);
         return a;
     };

     var segueView = function(view) {
         var actView;
         if (typeof view === "string" || typeof view === "number") {
             actView = views[view];
             if (!actView) return;
             removeClass(curView.root, "z-active");
             addClass(actView.root, "z-active");
             curView = actView;
         } else if (typeof view === "object") {
             actView = view;
             removeClass(curView.root, "z-active");
             addClass(actView.root, "z-active");
             curView = actView;
         }
     };

     var _addView = function(view, id) {
         views[id || Date.now()] = view;
     };

     var _pushView = function(view) {
         segueView(view);
         queue.push(view);
         removeClass(backBeforeViewBtn, "z-hide");
     };

     var _popView = function() {
         if (queue.length < 2) return;
         if (queue.length === 2) {
             addClass(backBeforeViewBtn, "z-hide");
         }
         var popView = queue.pop();
         var actView = queue[queue.length - 1];
         segueView(actView);
     };

     var viewControll = {
         init: function(_views, actView) {
             for (var i = 0; i < _views.length; i++) {
                 this.addView(_views[i], _views[i].id);
             }
             if (actView && typeof actView !== "object") {
                 actView = views[actView];
             }
             actView || (actView = _views[0]);
             addClass(actView.root, "z-active");
             curView = actView;
             queue.push(actView);

             backBeforeViewBtn = _createBackBtn();
         },
         addView: _addView,
         pushView: _pushView,
         popView: _popView
     };

     module.exports=viewControll;

 })
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
                addClass(that.tipDom, "in");
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
            removeClass(that.tipDom, "in");
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
            addClass(div, "tip");
            addClass(div, "fade");
            addClass(div, "out");
            return div;
        }
    };

    module.exports = tip;
})
/*
* taskInfoView.js
 */

define('taskInfoView',['mvc','taskDetailView','taskEditView','taskModel'],function (require, exports, module) {
    var _=require('mvc');
    var TaskDetailView=require('taskDetailView'),
        TaskEditView=require('taskEditView'),
        Task=require('taskModel').Model_Task;
    /**
     * 任务信息视图，包含任务详细和编辑视图
     * @type {TaskInfoView}
     */
    var TaskInfoView = _.View.extend({
        model:Task,
        initialize:function () {
            var that=this;

            this.detailView = new TaskDetailView($("#taskDetail"),{
                elements:{
                    headerDom:this.$(".header"),
                    contentDom:this.$(".content"),
                    timeDom:this.$(".time"),
                    operateBtnDom:this.$(".operates")
                },
                events:{
                    "click #completeTask":"completeTaskHandler",
                    "click #editTask":"editTaskHandler"
                },
                handlers:{
                    completeTaskHandler:function (e) {
                        if(!window.confirm("确定完成任务了吗？")) 
                            return false;

                        that.updateTask({
                            status:1
                        });

                        this.hideOperateBtns();
                    },
                    editTaskHandler:function (e) {
                        that.showEdit();
                    }
                }
            });

            this.editView = new TaskEditView($("#taskEdit"),{
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
                handlers:{
                    sureHandler:function (e) {
                        this.hasEditedUnSave=!1;

                        var elements=this.elements,
                            nHeader=elements.headerDom.value,
                            nContent=elements.contentDom.value,
                            nTime=elements.timeDom.value;

                        if(nHeader===""||nContent===""){
                            Tip.show("内容和标题不能为空");
                            return;
                        }

                        if(!/^\d{4}-\d{1,2}-\d{1,2}$/.test(nTime)){
                            Tip.show("日期格式不对");
                            return;
                        }

                        var attrs = {
                            header:nHeader,
                            content:nContent,
                            time:nTime
                        };

                        that.updateTask(attrs);
                    },
                    cancelHandler:function (e) {
                        if(this.hasChanged()){
                            if(!window.confirm("有未保存的内容，确认关闭？")) 
                                return false;
                        }
                        that.showDetail();
                    },
                    valueHasChangeHandler:function (e) {
                        this.hasEditedUnSave=!0;
                    }
                }
            });

            this.curTask = new Task();
            this.curContentView="detail";//detail或者edit
            this.curTaskIsNew = !1;
        },
        showEdit:function () {
            var attrs={
                header:this.curTask.get("header"),
                time:this.curTask.get("time"),
                content:this.curTask.get("content")
            };
            this.editView.show(attrs);
            this.curContentView="edit";

            return true;
        },
        showDetail:function () {
            var attrs={
                header:this.curTask.get("header"),
                time:this.curTask.get("time"),
                content:this.curTask.get("content"),
                status:this.curTask.get("status")
            };
            this.editView.hide();
            this.detailView.refresh(attrs);
            this.curContentView="detail";

            return true;
        },
        hasChanged:function () {
            return this.editView.hasChanged();  
        },
        updateTask:function (attrs) {
            if(this.isCreatingTask){
                // 因为要访问taskList集合，要添加到集合中去，但是在View里又访问不到，这种方式对不对？？
                this.trigger("addNewTask", {
                    attrs:attrs,
                    success:function (nTask) {
                        this.curTask=nTask;
                    }
                });
                
                this.isCreatingTask=false;
            }else{
                this.curTask.set(attrs);
                this.trigger("updateCurTask",{
                    theTask:this.curTask
                });
            }
        },
        willAddTask:function () {
            if(this.curContentView==="edit"){
                if(this.hasChanged()){
                    if(!window.confirm("有未保存的内容，确认关闭？")) 
                        return false;
                }
                // var oldTask=this.curTask.clone();
                this.editView.clear();
            }else{
                this.editView.show();
            }

            this.curContentView="edit";
            // this.curTask=null;
            this.isCreatingTask=true;
        },
        selectTaskItem:function (activeTask) {
            if(this.curContentView==="detail"){
                this.curTask=activeTask;
                this.showDetail();
                return true;
            }else if(this.curContentView==="edit"){
                if(this.hasChanged()){
                    if(!window.confirm("有未保存的内容，确认关闭？")) 
                        return false;
                }
                this.curTask=activeTask;
                this.showDetail();
                return true;
            }
        }
    });
    
    module.exports=TaskInfoView;
})
/*
* categoryListView.js
 */

define('categoryListView',['mvc','categoryModel'],function (require, exports, module) {
    var _=require('mvc'),
        Category=require('categoryModel').Model_Category;

    /**
     * 类别列表视图
     * @View {CategoryListView}
     */
    var CategoryListView = _.View.extend({
        model: Category,
        /**
         * 添加dom结构，不添加到集合中，为完成
         * @param {string} name 分类名称
         * @param {int} parId 分类父级ID
         */
        addCategoryItem: function(name, parId) {
            var categoryList=this.categoryList;
            var nCateItem = categoryList.addCategoryItem(name, parId);
            var parCateDom;

            var nli=this.createElement(nCateItem);

            if(parId==-1){
                this.$(".categorys").appendChild(nli);
            }else if(parCateDom=this.curCategoryItemDom){
                addClass(parCateDom,"has-sub-category");
                addClass(parCateDom,"z-open");
                var ul;
                parCateDom.lastChild.tagName.toLowerCase() == "ul" ? (ul=parCateDom.lastChild) : (ul=document.createElement("ul"), addClass(ul,"sub-category"));
                ul.appendChild(nli);
                parCateDom.appendChild(ul);
            }

            categoryList.save(categoryList.localStorageName);        
        },
        removeCategoryItem:function (cateId, isDelSubCate,cateItemDom) {
            var categoryList=this.categoryList;
            var taskList=this.taskList;

            categoryList.removeCategoryItem(cateId, isDelSubCate);
            taskList.removeTaskByCategoryId(cateId);

            taskList.save(taskList.localStorageName);
            categoryList.save(categoryList.localStorageName);

            if(cateItemDom===this.curCategoryItemDom){
                var nextDom = getNextSiblingElement(cateItemDom);
                if(!nextDom) {
                    nextDom=cateItemDom.parentNode.firstChild;
                }
                if(nextDom===cateItemDom){
                    nextDom=cateItemDom.parentNode.parentNode;
                }

                if(window.os.phone !== 1){
                    this.selectCategoryItemHandler({
                        target:nextDom
                    });
                }
            }

            var parDom=cateItemDom.parentNode;
            if(hasClass(parDom, "sub-category") && parDom.childNodes.length <= 1){
                var parDom2=parDom.parentNode;
                parDom2.removeChild(parDom);
            }else{
                parDom.removeChild(cateItemDom);
            }

            this.$("#allTaskNum").innerHTML=taskList.getTaskCount();
        },
        createElement: function(cateItem) {
            var li = document.createElement("li");
            var id=cateItem.get("id");
            li.setAttribute("data-id",id);
            addClass(li, "level");
            li.innerHTML = '<a class="category-name" data-id="' + id + '">' + cateItem.get("name") + '(<span class="num">' + this.getTaskCountOfCategoryId(id) + '</span>)</a>';
            (cateItem.id != 0) && (li.innerHTML += '<a class="del" data-id="' + id + '">&times;</a>');

            return li;
        },
        getTaskCountOfCategoryId:function (id) {
            var taskList=this.taskList;
            var num=taskList.getCountOfCategoryId(id);
            return num;
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
        },
        addNewTaskToUpdateNum:function () {
            var taskList=this.taskList;
            if(this.curCategoryItemDom){
                var numDom=getElementsByClassName(this.curCategoryItemDom, "num")[0];
                var num = parseInt(numDom.innerHTML);
                num++;
                numDom.innerHTML=num;

                this.$("#allTaskNum").innerHTML=taskList.getTaskCount();
            }
        }
    });

    module.exports=CategoryListView;
})
/*
* taskListView.js
 */

define('taskListView',['mvc','taskModel'],function (require, exports, module) {
    var _=require('mvc'),
        Task=require('taskModel').Model_Task;

    /**
     * 任务列表视图
     * @type {TaskListView}
     */
    var TaskListView = _.View.extend({
        model: Task,
        refresh: function() {
            var groups = this.groupByTime(),
                section,
                timeSortArr=[],
                fragmentContainer = document.createDocumentFragment();

            for (var time in groups) {
                if (groups.hasOwnProperty(time)) {
                    timeSortArr.push(time);
                }
            }

            timeSortArr.sort(function (bef,aft) {
                bef=bef.split('-'), aft=aft.split('-');
                var befDate=new Date(bef[0],bef[1],bef[2]),
                    aftDate=new Date(aft[0],aft[1],aft[2]);

                return (aftDate-befDate);
            });

            var time;
            for(var i=0; i<timeSortArr.length; i++){
                time=timeSortArr[i];
                section = this.createSectionDom(time, groups[time]);
                fragmentContainer.appendChild(section);
            }

            var tasksDom = this.$(".tasks");
            tasksDom.innerHTML = "";
            fragmentContainer.childNodes.length > 0 ? tasksDom.appendChild(fragmentContainer) : (tasksDom.innerHTML = '<p class="no-task-tip">还没有任务哦</p>');
        },
        addTaskDom:function (nTask) {
            this.allTaskArr.push(nTask);
            this.curFilterStatus !== "done" && this.curTaskArr.push(nTask);
            this.refresh();
        },
        updateTaskDom:function (uTask) {
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
        },
        filterByStatus:function (type) {
            var filterRes=[];
            var temp;

            switch(type){
                case "all":
                    for(var i=0; i<this.allTaskArr.length; i++){
                        filterRes.push(this.allTaskArr[i]);
                    }
                    return filterRes;
                case "done":
                    temp=1;
                    break;
                case "undone":
                    temp=0;
                    break;
            }

            for(var i=0; i<this.allTaskArr.length; i++){
                if(this.allTaskArr[i].get("status")==temp){
                    filterRes.push(this.allTaskArr[i]);
                }
            }

            return filterRes;
        }
    });


    module.exports=TaskListView;
})
/*
* model-task.js
 */

define('taskModel',['mvc'],function (require, exports, module) {
    var _=require('mvc');

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
    var Task = _.Model.extend({});

    /**
     * 存储所有任务的集合
     * @List {TaslList}
     */
    var TaskList = _.List.extend({
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

    exports.Model_Task=Task;
    exports.List_Task=TaskList;
})
/*
* model-category.js
 */

define('categoryModel',['mvc'],function (require, exports, module) {
    var _=require('mvc');

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
/*
* app.js
 */

define('app',['categoryModel','taskModel','taskListView','categoryListView','taskInfoView','tip','viewController'],function (require, exports, module) {
    var CategoryList=require('categoryModel').List_Category,
        TaskList=require('taskModel').List_Task,
        TaskListView=require('taskListView'),
        CategoryListView=require('categoryListView'),
        TaskInfoView=require('taskInfoView'),
        Tip=require('tip'),
        viewControll=require('viewController');

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
