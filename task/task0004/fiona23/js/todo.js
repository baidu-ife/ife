(function () {
    var storage = window.localStorage;
    var categoryData = {
        category0: {id: 'category0', name: '默认分类', child:{
            'task0': {id: 'task0', name: '默认'},
            'task1': {id: 'task1', name: '默认哟'}
        }},
        category1: {id: 'category1', name: '学习', child:{'10': {id: '10', name: 'ife'}}},
        category2: {id: 'category2', name: '生活', child:{'20':{id: '20', name: '做饭'}}}
    }

    var taskdata = {
        'task0': {
            '000':{id: '000', name: '默认1', date: '2015/6/6'},
            '002':{id: '002', name: '默认1', date: '2015/6/6'},
            '003':{id: '003', name: '默认1', date: '2015/6/7'}
        },
        'task1': {
            '001':{id: '001', name: '默认哟1', date: '2015/6/8'}
        },
    };
    storage.setItem("categoryData", JSON.stringify(categoryData));
    storage.setItem("taskData", JSON.stringify(taskdata));
    var Init = function (clickCategory, clickTask) {
        var categoryList = $('#category');
        var TaskList = $('#task');
        var TaskDetail = $('#task-detail')
        return {
            showCategory: function () {
                for (var category in categoryData) {
                    var li = document.createElement('li');
                    li.innerHTML = categoryData[category].name;
                    li.id = categoryData[category].id;
                    categoryList.appendChild(li);
                }
            },
            showTask: function (clickCategory) {
                TaskList.innerHTML = '';
                var tasks = categoryData[clickCategory.id].child;
                for (var task in tasks) {
                    var li = document.createElement('li');
                    li.innerHTML = tasks[task].name;
                    li.id = tasks[task].id;
                    TaskList.appendChild(li)
                }
                categoryList.style.left = '-98%';
                TaskList.style.left = '2%';
                TaskDetail.style.left = '102%';
            },
            showTaskDetail: function (clickTask) {
                var task = taskdata[clickTask.id];
                var dateExist = ''
                for (var taskDetail in task) {
                    var date = task[taskDetail].date;
                    var dateReg = new RegExp(date);
                    //如果该日期的任务不存在
                    if (!dateReg.test(dateExist)) {
                        dateExist += task[taskDetail].date;
                        var newDateTask = document.createElement('div');
                        newDateTask.id = date;
                        newDateTask.innerHTML = '<p>'+date+'</p><ol class="task-detail-list"></ol>';
                        TaskDetail.appendChild(newDateTask);
                    }
                    var dateTask = document.getElementById(date);
                    var newTaskDetail = document.createElement('li');
                    newTaskDetail.innerHTML = task[taskDetail].name;
                    dateTask.getElementsByTagName('ol')[0].appendChild(newTaskDetail);
                    categoryList.style.left = '-198%';
                    TaskList.style.left = '-98%';
                    TaskDetail.style.left = '2%';
                }
            },
            backToTask: function () {
                categoryList.style.left = '-98%';
                TaskList.style.left = '2%';
                TaskDetail.style.left = '102%';
            },
            backToCategory: function () {
                categoryList.style.left = '0';
                TaskList.style.left = '100%';
                TaskDetail.style.left = '200%';
            }
        }
    }
    var init = new Init();
    init.showCategory();
    $.delegate('#category', 'li', 'click', function () {
        init.showTask(target)
    })
    $.delegate('#task', 'li', 'click', function () {
        init.showTaskDetail(target)
    })
    $.on('#category', 'click', function (e) {
        if (this.style.left !== '0' || '2%') {
            init.backToTask()
        };
    })
    $.on('#category', 'click', function (e) {
        if (this.style.left !== '0' || '2%') {
            init.backToCategory()
        };
    })
})()