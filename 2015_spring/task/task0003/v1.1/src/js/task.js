define(["min$", "util", "localStorage", "validator"], function($, _, store, validator) {

    function Task() {
        //任务标题 日期 内容输入框
        this.inputTitle = $('.task-title');
        this.inputDate = $('.task-date input')
        this.inputTask = $('.task-input');

        //任务列表 所有任务 未完成 已完成
        this.allList = $('#allTaskList');
        this.unDoneList = $('#unDoneTaskList');
        this.doneList = $('#doneTaskList');

        //保存任务类型 新增任务 or 保存编辑任务
        this.taskType = null;

        this.init();

    }

    Task.prototype = {
        constructor: Task,

        init: function() {
    
            this.addTask();
            
            //任务列表 选项卡切换
            this.tabTaskList();

            //点击任务列表，右侧显示相应任务信息
            this.selectTask();

            //修改编辑任务
            this.editTask();

            //保存任务
            this.saveTask();

            //取消修改 or 取消保存
            this.cancelSave();

            //任务完成
            this.doneTask();

        },

        //新增任务按钮
        addTask: function() {
            var that = this;
            _.event.addEvent($('.add-new-task'), 'click', function() {
                //初始化输入框
                that.initTaskInput();
                //进入编辑状态
                that.editing();
                
                that.taskType = 'newTask';

                if (_.isMobile()) {
                    window.location.hash = 'details';
                }
            });
        },

        //任务编辑状态
        editing: function() {
            _.show($('.task-btn'));
            this.inputTitle.removeAttribute('disabled');
            this.inputDate.removeAttribute('disabled');
            this.inputTask.removeAttribute('disabled');
            _.addClass(this.inputTitle, 'editing');
            _.addClass(this.inputDate, 'editing');
            this.inputTitle.focus();
        },

        //取消编辑状态
        cancelEditing: function() {
            _.hide($('.task-btn'));
            this.inputTitle.setAttribute('disabled', true);
            this.inputDate.setAttribute('disabled', true);
            this.inputTask.setAttribute('disabled', true);
            _.removeClass(this.inputTitle, 'editing');
            _.removeClass(this.inputDate, 'editing');
        },

        //初始化任务输入框，全置空
        initTaskInput: function() {
            this.inputTitle.value = '';
            this.inputDate.value = _.getFormatDate();
            this.inputTask.value = '';
        },

        //保存任务
        saveTask: function() {
            var that = this;
            var $saveBtn = $('.confirm-save');
            var $tip = $('.task-error-tip');
            _.event.addEvent($saveBtn, 'click', function() {
                if (!validator.title(that.inputTitle.value).status) {
                    $tip.innerHTML = validator.title(that.inputTitle.value).msg;
                    return;
                }
                if (!validator.date(that.inputDate.value).status) {
                    $tip.innerHTML = validator.date(that.inputDate.value).msg;
                    return;
                }
                if (!validator.taskContent(that.inputTask.value).status) {
                    $tip.innerHTML = validator.taskContent(that.inputTask.value).msg;
                    return;
                }
                if (that.taskType === 'newTask') {
                    var nowTime = (new Date()).getTime();
                    var parId = window.selected.getAttribute('data-id');
                    var taskData = {
                        id: nowTime,
                        title: that.inputTitle.value,
                        date: that.inputDate.value,
                        taskContent: that.inputTask.value,
                        parId: parId,
                        done: false
                    };

                    store.save(taskData);
                    store.updateParent(parId, 'taskId', taskData.id);

                    that.createNewTask(taskData.title, taskData.date, taskData.id);
                } else if (that.taskType === 'editTask') {
                    var taskData = store.get(that.currentTaskId);
                    taskData.title = that.inputTitle.value;
                    taskData.date = that.inputDate.value;
                    taskData.taskContent = that.inputTask.value;
                    store.save(taskData);
                }
                that.cancelEditing();
                $tip.innerHTML = '';
            });
        },

        //创建新任务 更新到所有任务列表中去
        createNewTask: function(title, date, id) {
            var that = this;
            //判断所有任务栏 当前是否有相同的日期
            function isDateEqual(date) { 
                var aDt = $('#allTaskList').getElementsByTagName('dt');
                for (var i = 0; i<aDt.length; i++) {
                    if (aDt[i].innerHTML == date) {
                        return aDt[i].parentNode;
                    }
                } 
                return false;
            }
            var parent = isDateEqual(date);
            if (parent) {
                //所有任务栏
                var oDd = document.createElement('dd');
                oDd.setAttribute('data-id',id);
                oDd.innerHTML = title;
                parent.appendChild(oDd);

                var uDd = oDd.cloneNode(true);
                that.unDoneList.appendChild(uDd);
            } else {
                var oDl = document.createElement('dl');
                oDl.innerHTML = '<dt>'+date+'</dt><dd data-id=\"'+id+'\">'+title+'</dd>';
                that.allList.appendChild(oDl);

                var uDl = oDl.cloneNode(true);
                that.unDoneList.appendChild(uDl);
            }
            this.updateDoneNum('newTask');
        },

        //任务列表 选项卡切换
        tabTaskList: function() {
            var aBtn = $('.tab-head').getElementsByTagName('button');
            var aCon = $('.tab-con').getElementsByTagName('div');
            for (var i = 0; i<aBtn.length; i++) {
                aBtn[i].index = i;
            }
            var current = 0;
            _.delegate($('.tab-head'), 'button', 'click', function() {
                if (!_.hasClass(this, 'active')) {
                    _.removeClass(aBtn[current], 'active');
                    _.removeClass(aCon[current], 'active');
                    current = this.index;
                    _.addClass(this, 'active');
                    _.addClass(aCon[current], 'active');
                }

            });  
        },

        //点击具体 任务列表 右侧显示相应的任务内容
        selectTask: function() {
            var current = null;
            var that = this;
            _.delegate($('.tab-con'), 'dd', 'click', function() {
                that.currentTaskId = this.getAttribute('data-id');
                if (current === this) {
                    return;
                }
                if (current) {
                    _.removeClass(current,'on');
                }
                that.showTaskCon();
                current = this;
                _.addClass(current, 'on');
            });
        },

        //显示任务详情
        showTaskCon: function() {
            var task = store.get(this.currentTaskId);
            this.inputTitle.value = task.title;
            this.inputDate.value = task.date;
            this.inputTask.value = task.taskContent;

            if (_.isMobile()) {
                window.location.href = '#details';
            }
        },

        //修改任务按钮
        editTask: function() {
            var that = this;
            _.event.addEvent($('.task-edit'), 'click', function() {
                that.editing();
                that.taskType = 'editTask';
            });
        },

        //取消修改 or 取消保存
        cancelSave: function() {
            var that = this;
            _.event.addEvent($('.cancel-save'), 'click', function() {
                that.cancelEditing();

                if (that.taskType === 'newTask') {
                    that.initTaskInput();
                } else if (that.taskType === 'editTask') {
                    that.showTaskCon();
                }
            });
        },

        doneTask: function() {
            var that = this;
            _.event.addEvent($('.task-done'), 'click', function() {
                var task = store.get(that.currentTaskId);
                if (!task.done) {
                    var result = window.confirm('您确认任务完成吗?');
                    if (result) {
                        
                        task.done = true;
                        store.save(task);

                        var oDl = document.createElement('dl');
                        oDl.innerHTML = '<dt>'+task.date+'</dt>'+
                                        '<dd data-id=\"'+task.id+'\">'+task.title+'</dd>';
                        that.doneList.appendChild(oDl);

                        that.updateDoneNum('doneTask');
                    }
                } else {
                    alert('此任务已完成！');
                }
            });
        },

        //更新目录中的 未完成任务数量 并更新本地存储
        updateDoneNum: function(type) {

            if (type == 'newTask') {
                update(1);
            } else if (type == 'doneTask') {
                update(-1);
            }

            function update(x) {
                var current = window.selected;
                do {
                    var num = current.querySelector('.unDoneNum');
                    var result = parseInt(num.innerHTML.match(/\d+/));
                    num.innerHTML = '('+(result + x)+')';
                    var id = current.getAttribute('data-id');
                    var data = store.get(id);
                    data.unDoneNum = data.unDoneNum + x;
                    store.save(data);
                    current = current.parentNode.parentNode;
                } while (current && current.nodeName.toUpperCase() === 'LI')
            }


        }
    }

    return Task;
    //var t = new Task();

    //t.init();

});