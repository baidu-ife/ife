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
                $('#section-cate').style.left = '-100%';
                $('#section-task').style.left = '0';
                $('#section-detail').style.left = '100%';
            },
            showTaskDetail: function (clickTask) {
                TaskDetail.innerHTML=''
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
                    $('#section-cate').style.left = '-200%';
                    $('#section-task').style.left = '-100%';
                    $('#section-detail').style.left = '0';
                }
            },
            backToTask: function () {
                console.log('a')
                $('#section-cate').style.left = '-100%';
                $('#section-task').style.left = '0';
                $('#section-detail').style.left = '100%';
            },
            backToCategory: function () {
                $('#section-cate').style.left = '0';
                $('#section-task').style.left = '100%';
                $('#section-detail').style.left = '200%';
            }
        }
    }
    var init = new Init();
    init.showCategory();
    $.delegate('#category', 'li', 'touchstart', function () {
        init.showTask(target)
    })
    $.delegate('#task', 'li', 'touchstart', function () {
        init.showTaskDetail(target)
    })
    $.on('#side-cate', 'touchstart', function () {
            init.backToCategory()
    })
    $.on('#side-task', 'touchstart', function () {
            init.backToTask()
    })
    gesture();
    function gesture () {
        var startPosX;
        var endPosX;
        var isMove = false;
        $.on('#section-task','touchstart', function (event) {
        var touch = event.touches[0];
        startPosX = touch.pageX;
    })

    function swip (ele, func) {
        $.on(ele,'touchmove', function (event) {
            isMove = true;
        })
        var timer = setInterval(function () {
            if (isMove) {
                clearInterval(timer);
                $.on(ele,'touchend', function (event) {
                    var touch = event.changedTouches[0];
                    endPosX = touch.pageX;
                    console.log(endPosX)
                    if (endPosX > startPosX) {
                            func();
                    }
                })
            }
        },1)
    }
    
    swip('#section-task', init.backToCategory);
    swip('#section-detail', init.backToTask)

    }
    
})()