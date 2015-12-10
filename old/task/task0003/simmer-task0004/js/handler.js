define(['selectors','tool'],function (a,tool) {
    var classCont = $('.class-cont')[0];// 提升访问性能 注意必要时要进行更新
    var taskCont = $('.task-list-cont')[0];// 提升访问性能 注意必要时要进行更新
    return {
        classifyClickHandler : function (This) {// 左侧任务点击事件
            tool.makeSureCancel();// 如果点击的时候有编辑的任务未保存    
            if (This.className.split(' ')[0] == 'main-item') {
                var id = This.getAttribute('data-id');
                tool.updataTask(id,'all');//更新任务列表 
                $('.detail')[0].className = 'detail done';
                var len,i,parent;
                var childItems = classCont.getElementsByClassName('child-item');
                for (i = 0,len = childItems.length; i < len ; i++) {
                    childItems[i].style.display = 'none';
                    childItems[i].className = 'child-item';
                }
                parent = This.parentNode;
                var showItems = parent.getElementsByClassName('child-item');
                for (i =0,len = showItems.length; i < len ; i++) {
                    showItems[i].style.display = 'block';
                }
                var mainItems = classCont.getElementsByClassName('main-item');
                for (i =0,len = mainItems.length; i < len ; i++) {
                    mainItems[i].className = 'main-item';
                } 
                This.className = 'main-item active';
                $('#all-task').className = 'click';
                $('#unfinished-task').className = '';
                $('#done-task').className = '';
                /*--------show right task list by tag attribute data-id---------*/
                var dis = tool.getStyle($('edit')[0],'display');
                if (dis == 'none') {
                   tool.updataTask(id,'all');//更新任务列表  
                } 
            } else if (This.className.split(' ')[0] == 'child-item') {
                var id = This.getAttribute('data-id');
                tool.updataTask(id,'all');//更新任务列表 
                $('.detail')[0].className = 'detail done';
                var len,i,parent;
                parent = This.parentNode;
                parent.getElementsByClassName('main-item')[0].className = 'main-item';
                var childItems = parent.getElementsByClassName('child-item');
                for (i =0,len = childItems.length; i < len ; i++) {
                    childItems[i].className = 'child-item';
                }
                This.className = 'child-item active';
                $('#all-task').className = 'click';
                $('#unfinished-task').className = '';
                $('#done-task').className = '';
                /*--------show right task list by tag  attribute data-id---------*/
                 var dis = tool.getStyle($('edit')[0],'display');
                 if (dis == 'none') {
                   tool.updataTask(id,'all');//更新任务列表  
                }
            }
        },
        classifyDeleteHandler : function (This) {// 左侧delete点击事件
            var option = {
                class : 'alert',
                inner : '确认删除该分类下的所有的任务，删除后不可更改'
                };
                tool.maskHandler(option); 
                $('#alert-btn').innerHTML = '确定';
                $('#alert-btn').onclick = function () {
                    var deleteId = This.parentNode.getAttribute('data-id');// 获取要删除的分类id
                    var index = tool.storageOprate.getClassById(deleteId);
                    if ( window.classArray[index].canDelete == 'true') {
                        var classnames = This.parentNode.className.split(' ')[0];
                        var array;
                        var i,len;
                        if(This.parentNode.className.split(' ')[0] == 'child-item') {
                           tool.deleteNumberHandler(deleteId);// 删除子分类的时候候调用
                        }
                        tool.storageOprate.deleteClass(deleteId);// 这里有更新taskArray和calssArry
                        $('.window')[0].style.display = 'none';
                        $('.class-cont')[0].innerHTML = '';
                        array = window.classArray;
                        for(i = 0, len = array.length ; i < len ; i++ ) {
                            tool.domHandler.creatClass(array[i]);
                        };
                        $('.task-list-cont')[0].innerHTML = '';
                        tool.returnIndex();  
                        var number = tool.storageOprate.getAllTaskNumber();
                        $('.number')[0].innerHTML = number;
                    } 
                    else {
                        var option = {
                        class : 'alert',
                        inner : '抱歉，默认分类不可删除，请等待3S~'
                        };
                        tool.maskHandler(option);
                        setTimeout(function () {
                            $('.window')[0].style.display = 'none';
                        },3000);
                    } 
                }
        },
        taskListClickHandler : function (This) {// 中间任务列表点击事件
            var taskId = This.getAttribute('data-id');
            var taskObj = tool.storageOprate.getTaskById(taskId);
            if (This.className.split(' ')[1] == 'task-doing') {
                $('.detail')[0].className = 'detail doing';
            } else {
                $('.detail')[0].className = 'detail done';
            }
            $('.edit')[0].setAttribute('data-id',taskId);// 任务id
            $('.detail-title')[0].innerHTML = taskObj.title;
            $('.detail-date')[0].innerHTML = taskObj.date;
            $('.detail-cont')[0].innerHTML = taskObj.cont;
        },
        addClassHandler : function () {// 左侧下方添加分类点击事件
            var editElement = $('.edit')[0];// 处理任务未保存的话弹窗提醒
            var display = tool.getStyle(editElement,'display');
            if (display == 'block') {
                var option = {
                class : 'alert',
                inner : '任务未保存，确定现在退出吗？'
                };
                tool.maskHandler(option); 
                $('#alert-btn').onclick = function () {
                    $('.window')[0].style.display = 'none';
                    editElement.style.display = 'none';
                    $('.detail')[0].style.display = 'block';
                }
                return ;
            }
            var options = {
                class : 'addclass',
                selectoption : {}
            };
            tool.maskHandler(options);// 开启遮罩浮层
            /*这里要把selected进行更新*/
            tool.updataSele();
            var makeSure= $('#addclass-btn');
            makeSure.onclick = function (){// 确定按钮点击事件
                var name = $('#class-name').value;
                var select = $('#class-select');
                var index = select.selectedIndex;
                var parent = select.options[index].text;// 获取选择新建分类属于
                if (!name || !parent) {
                    $('.window-tips')[0].innerHTML = '请填写分类名！';
                 return;
                 }
                if (parent == '新建主分类') {
                    parent = null;
                    /*creat main class dom*/
                    var id = tool.creatTimestamp();// 获取时间戳
                    var options = {
                        type : 'main',
                        belong : 'MainItem',
                        name : name,
                        id : id,
                        tasknumber : 0
                    };
                    tool.domHandler.creatClass(options);// 创建主分类
                    tool.storageOprate.creatMainItem(options);// 存储任务
                    $('.window')[0].style.display = 'none';
                } else {
                    /*creat child dom*/
                    var index = select.selectedIndex;// 获取选中的option的索引
                    var id = tool.creatTimestamp();// 获取时间戳
                    var options = {
                        type : 'child',
                        belong : select.options[index].value,
                        name : name,
                        id : id,
                        tasknumber : 0
                    };
                    tool.domHandler.creatClass(options);// 创建子分类
                    tool.storageOprate.creatChildItem(options);// 存储任务
                    $('.window')[0].style.display = 'none';
                    }
                /*storage handler*/
            }
        },
        addTaskHandler : function () {// 中间下方添加新任务点击事件
            /*var options = {
                class : 'alert'
            };
            tool.maskHandler(options);*/
            //先清空编辑区的内容
            var editElement = $('.edit')[0];
            var display = tool.getStyle(editElement,'display');
            if (display == 'block') {
                var options = {
                class : 'alert',
                inner : '任务未保存，确定现在退出吗？'
                };
                tool.maskHandler(options); 
                $('#alert-btn').onclick = function () {
                    $('.window')[0].style.display = 'none';
                    editElement.style.display = 'none';
                    $('.detail')[0].style.display = 'block';
                }
            }
            $('#title').value = '';
            $('#date').value = '';
            $('#task-main-cont').value = '';
            var activeElement = $('.active')[0];
            var id = activeElement.getAttribute('data-id');
            var detailElement = $('.detail')[0]
            detailElement.style.display = 'none';
            var editElement = $('.edit')[0];
            editElement.style.display = 'block';
            editElement.setAttribute('data-id',id);// 更新正在编辑的dom data-id属性
        },
        finishedTaskHandler : function () {// 任务详情中完成任务按钮点击事件updataTask
            var options = {
                class : 'alert',
                inner :'确定要完成任务吗？完成后不可更改哦~'
            }
            tool.maskHandler(options);
            $('#alert-btn').onclick = function () {
                $('.window')[0].style.display = 'none';
                var taskId = $('.edit')[0].getAttribute('data-id');
                var classId = $('.active')[0].getAttribute('data-id')
                tool.storageOprate.setStorage(taskId,{finished : 'true' });
                tool.updataTask(classId,'all'); 
                $('.detail')[0].className = 'detail done';

            }
            
        },
        modificationTaskHandler : function () {//任务详情中修改任务按钮点击事件
            //dosomething here
            var editElement = $('.edit')[0];
            var id =editElement.getAttribute('data-id');
            var obj = tool.storageOprate.getTaskById(id);
            $('.detail')[0].style.display = 'none';
            $('#title').value = obj.title;
            $('#date').value = obj.date;
            $('#task-main-cont').value = obj.cont;
            editElement.style.display = 'block';
            window.modification = true;
        },
        saveTaskHandler : function ( ) {//编辑区确认任务保存点击事件

            var belongId = $('.edit')[0].getAttribute('data-id');
            var title = $('#title').value;
            var date = $('#date').value;
            var cont = $('#task-main-cont').value;
            var reg = /\d{4}-\d{2}-\d{2}$/i;;
            if (!title || !date ) {// 如果日期与标题未填写完全
                var options = {
                class : 'alert',
                inner : '请填写任务标题与日期！'
                };
                tool.maskHandler(options); 
                $('#alert-btn').onclick = function () {
                    $('.window')[0].style.display = 'none';
                }
                return ;
            }
            if (!reg.test(date)) {// 如果日期格式不正确
                var options = {
                class : 'alert',
                inner : '请注意日期的格式:xxxx-xx-xx！'
                };
                tool.maskHandler(options); 
                $('#alert-btn').onclick = function () {
                    $('.window')[0].style.display = 'none';
                }
                return ;
            }
            if (modification) {
                // do here
                var taskId = $('.edit')[0].getAttribute('data-id');
                var taskObj = tool.storageOprate.getTaskById(taskId);
                var a = {// 创建一个新的对象 包含了修改的内容
                title : title,
                date : date,
                cont : cont
                }
                tool.storageOprate.setStorage(taskId,a);
                var id = $('.active')[0].getAttribute('data-id');
                tool.updataTask(id,'all');   
            } else {// 新建立的任务
                var options = {// task参数
                belong : belongId,// id
                id : Date.parse(new Date),// 此id为时间戳
                finished : 'false',
                title : title,
                date : date,
                cont : cont
            }
            tool.storageOprate.creatTaskItem(options);
            tool.updataTaskNumber(belongId);// 包含了对task的更新
            var id = $('.active')[0].getAttribute('data-id');
            tool.updataTask(id,'all'); 
            }
            window.modification = false;
            //tool.storageOprate.creatTaskItem(options);
            // updata task list
            $('.edit')[0].style.display = 'none';
            $('.detail-title')[0].innerHTML = title;
            $('.detail-date')[0].innerHTML = date;
            $('.detail-cont')[0].innerHTML = cont;
            $('.detail')[0].style.display = 'block';
        },
        cancelTaskHandler : function () {// 编辑区取消任务保存事件
           tool.makeSureCancel();// 确认取消
        },
        confirmBtnClickHandler : function () {//弹窗警告中确认退出点击事件

        }
    }
});