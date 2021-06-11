(function  () {
    //local storage
    var storage = window.localStorage;
    var data = {};
    var categoryData = {}
    if (storage.getItem("todoData")) {
        data = JSON.parse(storage.getItem("todoData"));
    }
    if (!storage.getItem('categoryData')) {
        categoryData['category0'] = {
            id: 'category0',
            name: '默认分类'
        }
        storage.setItem("categoryData", JSON.stringify(categoryData));
    }
    else  {
        categoryData = JSON.parse(storage.getItem('categoryData'))
    }
    //DOM selector
    var defaults = {
        cateL1Li: 'category-level1-list',
        cateL2Li: 'category-level2-list',
        cateL1: 'category-level1',
        cateL2: 'category-level2',
        addCategory: 'add-category',
        addCateSub: 'add-category-submit',
        addCateName: 'add-category-name',
        cateOverlay: 'add-category-overlay',
        addTask: 'add-task',
        taskName: 'task-name',
        datepicker: 'datepicker',
        taskDescription: 'task-description',
        sureCancle: 'sure-cancle',
        sure: 'sure',
        cancle: 'cancle',
        oneDayTask: 'one-day-task',
        editTask: 'edit',
        taskComplete: 'complete',
        pending: 'pending',
        completed: 'completed',
        rightBtn: 'right-mouse-btn',
        addCateL2: 'add-category-level2',
        delCateL2: 'delet-category-level2',
        addCateL2Overlay: 'add-category-level2-overlay',
        addCateL2Name: 'add-category-level2-name',
        addCateL2Sub: 'add-category-level2-submit',
        pendingBtn: 'pending-btn',
        completedBtn: 'completed-btn',
        allBtn: 'all-btn',
        allTaskNum: 'all-task-num',
        delCateBtn: 'delete-category-btn'
    }
    //convey pending and completed
    var codes = {
            "1" : "#pending",
            "2" : "#completed"
        };
    //show all local storage
    var init =  {
        //show category
        showCategory: function  () {
            $('#'+defaults.cateL1Li).innerHTML = ''
            for (var params in categoryData) {
                var cateLi = document.createElement('li');
                if (categoryData[params]['name'] === '默认分类') {
                    cateLi.innerHTML = '<div class="category-name">'+categoryData[params]['name']
                    + '(<span class="taskNumDivi"></span>)</div>' ;
                }
                else {
                    cateLi.innerHTML = '<div class="category-name">'+categoryData[params]['name']
                    + '(<span class="taskNumDivi"></span>)<p class="'
                    +defaults.delCateBtn+'"></p></div>';
                }
                cateLi.className = defaults.cateL1 + " " + categoryData[params]['id'];
                addClass(getByClass('category-name', cateLi)[0], categoryData[params]['id'])
                $('#'+defaults.cateL1Li).appendChild(cateLi)
                var ol = document.createElement('ol');
                ol.className = defaults.cateL2Li;
                cateLi.appendChild(ol);
                //显示子类
                if (categoryData[params]['child']) {
                    for (var childParams in categoryData[params]['child']){
                        var newCateL2 = document.createElement('li');
                        newCateL2.className = categoryData[params]['child'][childParams]['id'] + ' '
                        + defaults.cateL2 + ' ' + categoryData[params]['id'];
                        newCateL2.innerHTML = categoryData[params]['child'][childParams]['name'] ;
                        ol.appendChild(newCateL2);
                    }
                    //show amount of task
                    $('#'+defaults.allTaskNum).innerHTML = getByClass(defaults.cateL2).length;
                    }
                    getByClass('taskNumDivi', cateLi)[0].innerHTML = getByClass(defaults.cateL2, cateLi).length || 0
                };
                //add active task
                if ($('.'+defaults.cateL2)) {
                    addClass($('.'+defaults.cateL2), 'active')
                }

                var allTask = getByClass(defaults.cateL2);
                //add taskClick method to all task
                each(allTask, taskClick);
                function taskClick (ele) {
                    $.on(ele, 'click', function () {
                        //remove all objects' 'active' class
                        for (var i = allTask.length - 1; i >= 0; i--) {
                            removeClass(allTask[i], 'active')
                        };
                        //sub category click hightlight
                        addClass(ele, 'active')
                        //show the choosed task
                        var choosedClass = ele.className.split(' ')[0];
                        $('.task-wrapper').innerHTML = '<div id="pending"></div><div id="completed"></div>';
                        init.showTaskList();
                        //显示该分类下第一个任务
                        init.showTaskDetail();
                    })
                }
        },
        
        //show tasklist
        showTaskList: function (choosedClass) {
            //clear task
            $(codes['1']).innerHTML = '';
            $(codes['2']).innerHTML = ''
            for (var params in data){
            //get which category choosed
            var choosedClass = getByClass('active', $('#'+defaults.cateL1Li))[0].className.split(' ')[0];
            //append child by code
            if (data[params]['className'] === choosedClass) {
                var parent = $(codes[data[params]['code']]);
                //taskDetail is each task
                var taskDetail = document.createElement('li');
                taskDetail.id = data[params]['id'];
                taskDetail.innerHTML = data[params]['title'];
                if (data[params]['code'] === '1') {
                    addClass(taskDetail, defaults.pending)
                }
                else if (data[params]['code'] === '2'){
                    addClass(taskDetail, defaults.completed)
                }
                //get all task list by date
                var pendingTaskDateLi = getByClass(defaults.oneDayTask, $(codes['1']));
                var completedTaskDateLi = getByClass(defaults.oneDayTask, $(codes['2']));
                //判断pending 和 completed是否都存在
                var pendingTask = getByClass(defaults.pending);
                var completedTask = getByClass(defaults.completed);
                var condition;
                if ('#'+parent.id === codes['1']) {
                    condition = !pendingTask[0];
                    taskDateLi = pendingTaskDateLi;
                } else if ('#'+parent.id === codes['2']){
                    condition = !completedTask[0];
                    taskDateLi = completedTaskDateLi;
                }
                //如果还没有任务就先创建第一个任务
                if (condition) {
                    var newDayTask = document.createElement('div');
                    parent.appendChild(newDayTask);
                    //create p->date
                    newDayTask.innerHTML = '<p>' + data[params]['date'] + '</p>';
                    addClass(newDayTask, defaults.oneDayTask);
                    addClass(newDayTask, data[params]['className']);
                    //newDayTask.className = trim(newDayTask.className)
                    newDayTask.appendChild(document.createElement('ol'))
                    newDayTask.getElementsByTagName('ol')[0].appendChild(taskDetail)
                }
                else {
                    for (var length = taskDateLi.length, i = length - 1; i >= 0; i--) {
                        var dateText = new RegExp(data[params]['date']);
                        //if date exsit, add task to this div
                        if (dateText.test(taskDateLi[i].innerHTML)) {
                            taskDateLi[i].getElementsByTagName('ol')[0].appendChild(taskDetail);
                            break;
                        }
                        //if date doesnt exsit, create
                        else if(i==0) {
                                var newDayTask = document.createElement('div');
                                parent.appendChild(newDayTask);
                                newDayTask.innerHTML = '<p>' + data[params]['date'] + '</p>';
                                addClass(newDayTask, defaults.oneDayTask);
                                newDayTask.appendChild(document.createElement('ol'));
                                newDayTask.getElementsByTagName('ol')[0].appendChild(taskDetail);
                            }
                        }
                    }
                }
            }
        },
        
        //show task detail
        showTaskDetail: function () {
            //如果data为空
            $('#'+defaults.taskName).value = '';
            $('#'+defaults.datepicker).value = '';
            $('#'+defaults.taskDescription).value = '';
            for (var params in data){
            //get which category choosed
            var choosedClass = getByClass('active', $('#'+defaults.cateL1Li))[0].className.split(' ')[0];
                if (data[params]['className'] === choosedClass) {
                    $('#'+defaults.taskName).className = data[params]['id'];
                    $('#'+defaults.taskName).value = data[params]['title'];
                    $('#'+defaults.datepicker).value = data[params]['date'];
                    $('#'+defaults.taskDescription).value = data[params]['description'];
                    break;
                }
            }
            
        },

        // delegate click show task
        clickTask: function () {
            $.delegate('section', 'li', 'click', showClickTask);
            function showClickTask (target, e) {
                addClass(target, 'active-task')
                var id = target.id;
                $('#'+defaults.taskName).value = data[id]['title'];
                $('#'+defaults.datepicker).value = data[id]['date'];
                $('#'+defaults.taskDescription).value = data[id]['description'];
                //take id as task title's className
                $('#'+defaults.taskName).className = id;
            }
        }
    }//init  ends
    
    init.showCategory();
    //初始默认任务的第一个
    init.showTaskList();
    init.showTaskDetail();
    init.clickTask();
    
    //添加和删除分类
    var operateCategory = {
        addCategory: function () {
            var tempData = {}
            //显示浮层
            $('#' + defaults.cateOverlay).style.display = "block";
            //存储一个cateNum来区分命名所有的category
            if (!storage.getItem("cateNum")) {
                storage.setItem("cateNum", 0)
            }
            //点击确认以后提交
            $.on('#'+defaults.addCateSub, "click", function () {
                if ($('#'+defaults.addCateName)) {
                    storage.setItem('cateNum',parseInt(storage.getItem("cateNum"))+1)
                    var id = 'category' + storage.getItem("cateNum");
                    tempData.id = 'category' + storage.getItem("cateNum");
                    tempData.name = $('#' + defaults.addCateName).value;
                    categoryData[id] = tempData;
                    //save data
                    storage.setItem("categoryData", JSON.stringify(categoryData));
                    $('#' + defaults.cateOverlay).style.display = 'none';
                    $('#'+defaults.addCateName).value = ''
                    init.showCategory()
                    //移除绑定事件
                    $.un('#'+defaults.addCateSub, "click");

                }
                else {
                    //没有输入
                }
            })
        },
        deleteCategory: function (target, e) {
            var sure = confirm('删除目录，该目录下的所有任务也会被删除，确定吗');
            if (sure) {
                var needDelete = target.parentNode.parentNode;
                var id = needDelete.className.split(' ')[1];
                var dataId = categoryData[id]['child'];
                for (var params in dataId){
                    var needDelteTask = params;
                    break;
                }
                for (var task in data){
                    if (data[task]['className'] == needDelteTask) {
                        delete data[task]
                    }
                }
                delete categoryData[id];
                storage.setItem("categoryData", JSON.stringify(categoryData));
                storage.setItem("todoData", JSON.stringify(data));
                init.showCategory();
                init.showTaskList();
                init.showTaskDetail();
            }
        },
        addCategoryLevel2: function () {
            //如果有输入子类名称
            if ($('#'+defaults.addCateL2Name).value) {
                //将被点击的目录类名分割成数组
                var clsAttr = target.className.split(' ');
                for (var i = clsAttr.length - 1; i >= 0; i--) {
                    if (/^category[0-9]+$/.test(clsAttr[i])) {
                        var id = new Date().getTime();
                        if (!categoryData[clsAttr[i]].child) {
                            categoryData[clsAttr[i]].child = {}
                        };
                        categoryData[clsAttr[i]].child[id] = {
                            id: id,
                            name: $('#'+defaults.addCateL2Name).value
                        }
                        storage.setItem("categoryData", JSON.stringify(categoryData))
                        break;
                    }
                }
                $('#'+defaults.addCateL2Overlay).style.display = 'none';
                $('#'+defaults.addCateL2Name).value = ''
                init.showCategory();
            }
            else {
                //没有输入子类名称
            }
        },
        deleteCategoryLevel2: function () {
            var sure = confirm('删除目录，该目录下的所有任务也会被删除，确定吗');
            if (sure) {
                console.log(target)
                var needDeletetask = target.className.split(' ')[0];
                var needDeleteParent = target.className.split(' ')[2]
                delete categoryData[needDeleteParent]['child'][needDeletetask]
                for (var task in data){
                    if (data[task]['className'] == needDeletetask) {
                        delete data[task]
                    }
                }
                storage.setItem("categoryData", JSON.stringify(categoryData));
                storage.setItem("todoData", JSON.stringify(data));
                init.showCategory();
                init.showTaskList();
                init.showTaskDetail();
            }
        },
        showRightmenu: function (event) {
            var e = event || window.event;
            target = e.srcElement? e.srcElement : e.target;
            if (e.pageX || e.pageY) {
                posy = e.pageY
                posx = e.pageX
            } else {
                //IE没有pagex y 兼容
                posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
                posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
            }
            if (e.button === 2) {
                //右键菜单
                $('#'+defaults.rightBtn).style.display = 'block';
                $('#'+defaults.rightBtn).style.left = posx + 2 + 'px';
                $('#'+defaults.rightBtn).style.top = posy - 59 + 'px';
            }
            //不是按下的右键
            else {
                return false
            }
        }
    }

    var operateTask = {
        addTask: function () {
            var title = $('#' + defaults.taskName).value;
            var date = $('#' + defaults.datepicker).value;
            var description = $('#' + defaults.taskDescription).value;
            //判断左侧哪个子目录处于active状态
            var activeCate = $('.active')
            var className = activeCate.className.split(' ')[0]
            if (title && date && description) {
                if (testDate(date)) {
                    //以时间毫秒数给每个task加一个id
                    var id = new Date().getTime();
                    var tempData = {
                        id : id,
                        code: "1",
                        title: title,
                        date: date,
                        description: description,
                        className: className
                    }
                    data[id] = tempData;
                    //storage each task info
                    storage.setItem("todoData", JSON.stringify(data));
                    init.showTaskList();
                    $('#'+defaults.sureCancle).style.display = 'none';
                }
                else {
                    alert('日期格式错误，请按照YYYY/MM/DD格式填写')
                }
            }
            //信息填写不全
            else {
                alert('信息填写不全')
                return false
            }
        },
        editTask: function () {
            $('#'+defaults.sureCancle).style.display = 'block';
            changeInputState();
            $.on('#'+defaults.sure, 'click', function () {
                //update local storage
                var id = $('#' + defaults.taskName).className
                var title = $('#' + defaults.taskName).value;
                var date = $('#' + defaults.datepicker).value;
                var description = $('#' + defaults.taskDescription).value;
                data[id]['title'] = title;
                data[id]['date'] = date;
                data[id]['description'] = description;
                storage.setItem("todoData", JSON.stringify(data));
                init.showTaskList();
                $('#'+defaults.sureCancle).style.display = 'none';
            })
                //$('#'+defaults.sureCancle).style.display = 'none';
        },
        taskComplete: function () {
            var id = $('#' + defaults.taskName).className
            data[id]['code'] = '2';
            //update local storage
            storage.setItem("todoData", JSON.stringify(data));
            init.showTaskList();
        },
        cancleEditTask: function () {
            $('#'+defaults.sureCancle).style.display = 'none';
            //reset the task befor edit
            var id = $('#' + defaults.taskName).className
            $('#'+defaults.taskName).value = data[id]['title'];
            $('#'+defaults.datepicker).value = data[id]['date'];
            $('#'+defaults.taskDescription).value = data[id]['description'];
        },
        chooseCode: function () {
            var e = event || window.event;
            target = e.srcElement? e.srcElement : e.target;
            for (var i = getByClass('codes', $('#codes-line')).length - 1; i >= 0; i--) {
                removeClass(getByClass('codes', $('#codes-line'))[i], 'active')
            };
            addClass(target, 'active')
            var pending = new RegExp(defaults.pending)
            var completed = new RegExp(defaults.completed)
            if (pending.test(target.id)) {
                $('#'+defaults.pending).style.display = 'block'
                $('#'+defaults.completed).style.display = 'none'
            }
            else if (completed.test(target.id)) {
                $('#'+defaults.completed).style.display = 'block'
                $('#'+defaults.pending).style.display = 'none'
            } else {
                //show all task
                $('#'+defaults.pending).style.display = 'block';
                $('#'+defaults.completed).style.display = 'block'
            }
        }
    }

    //change input state from disabled to abled or versa
    function changeInputState(e) {
        var e = event || window.event;
        var target = e.srcElement? e.srcElement : e.target;
        var title = $('#' + defaults.taskName);
        var date = $('#' + defaults.datepicker);
        var description = $('#' + defaults.taskDescription);
        var form = [title, date, description];
        //while click add task, make input abled
        each(form, formOperate)
        function formOperate (ele) {
            //if click add task
            if (target.id === defaults.addTask) {
                //reset value
                ele.value = '';
                ele.removeAttribute('disabled')
            }
            //if click edit task
            else if (target.id === defaults.editTask){
                ele.removeAttribute('disabled')
            }
        }
    }

    function testDate (date) {
        //正则检查格式 不包含闰年检测 闰年检测用if语句完成
        if(/2\d{3}\/((0?[13578]|1[012])\/(0?[1-9]|[12][0-9]|3[01])|(0?[469]|11)\/(0?[1-9]|[12][0-9]|3[01])|0?2\/(0?[1-9]|[12][0-9]))$/.test(date)){
            console.log('a')
            var dateInputArr = date.split("/")//整理输入的时间为数组
            var inputYear = parseInt(dateInputArr[0]),//取得输入的年份
                inputMonth = parseInt(dateInputArr[1])-1,//-1是为了符合Date类型格式
                inputDay = parseInt(dateInputArr[2]);
            if ((inputYear%4 != 0 || inputYear%400 != 0) && inputMonth ==1 && inputDay == 29) {
                return false
            } else {
                return true
            }
        }
        else {
            return false
        }
    }


    //all event Listener
    function allbind () {
        //add category
        $.on('#' + defaults.addCategory, "click", operateCategory.addCategory)
        //hide right click while click anywhere
        $.on('body', 'click', function () {
            $('#'+defaults.rightBtn).style.display = 'none';
        })
        //点击添加子目录
        $.on('#'+defaults.addCateL2, 'click', function () {
            $('#'+defaults.addCateL2Overlay).style.display = 'block';
        })
        //点击删除子目录
        $.on('#'+defaults.delCateL2, 'click', operateCategory.deleteCategoryLevel2)
        //右键点击显示Menu
        $.on('#'+defaults.cateL1Li, 'mousedown', operateCategory.showRightmenu)
        //save sub category
        $.on('#'+defaults.addCateL2Sub, 'click', operateCategory.addCategoryLevel2)
        
        

        //add task
        $.on('#'+defaults.addTask, 'click', function () {
            //show sure and cancle btn
            $('#'+defaults.sureCancle).style.display = 'block';
            changeInputState();
            //save task
            $.on('#'+defaults.sure, 'click', operateTask.addTask);
            
        })
        //cancle edit/add task
        $.on('#'+defaults.cancle, 'click', operateTask.cancleEditTask)
        //edit task
        $.on('#'+defaults.editTask, 'click', operateTask.editTask)
        $.on('#'+defaults.taskComplete, 'click' ,function () {
            var sure = confirm("确定已经完成吗")
            if (sure == true) {
            operateTask.taskComplete();
            }
        })
        $.on('#'+defaults.pendingBtn, 'click', operateTask.chooseCode)
        $.on('#'+defaults.completedBtn, 'click', operateTask.chooseCode)
        $.on('#'+defaults.allBtn, 'click', operateTask.chooseCode)
        $.on(getByClass('cancle', $('#'+defaults.addCateL2Overlay))[0], 'click', function () {
             $('#'+defaults.addCateL2Overlay).style.display = 'none'
        })
        $.on(getByClass('cancle', $('#'+defaults.cateOverlay))[0], 'click', function () {
            $('#'+defaults.cateOverlay).style.display = 'none'
        })
        $.delegate('#'+defaults.cateL1Li, 'p', 'click', operateCategory.deleteCategory);

    }
    allbind();
})()

