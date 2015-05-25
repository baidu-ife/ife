//设置全局变量
var title = document.getElementById('input-title');
var date = document.getElementById('input-date');
var data = document.getElementById('input-data');
var finish = document.getElementById('finish-task');
var edit = document.getElementById('edit-task');
var confirmBtn = document.getElementById('confirm');
var cancleBtn = document.getElementById('cancle');

//右侧页面为编辑任务状态
function editTask() {

    data.className = 'edit';
    confirmBtn.style.display = 'block';
    cancleBtn.style.display = 'block';

    //确认任务输入完成
    confirmBtn.onclick = function () {
        var i = confirm('确认提交吗？');
        if (i == true) {
            //检测标题长度
            var checkTitle = title.value.split(/[\n\s\t,;，；、]*/);
            if (checkTitle.length == 0) {
                alert('请输入标题');
            } else if (checkTitle.length >= 10) {
                alert('标题长度不要超过10个字符哈~')
            } else {
                //检测日期格式
                var checkVal = date.value.split("-");
                var checkDate = (/\d{4}-\d{2}-\d{2}/).exec(date.value);
                if (checkDate==null || checkDate==undefined) {
                    alert("请按照提示格式重新输入日期！");
                }
                else if (checkVal[1]>12 || checkVal[1]<1) {
                    alert("请输入1-12之前的月份！");
                }
                else if (checkVal[2]<1 || checkVal[2]>30) {
                    alert("请输入1-30之间的日期！");
                }
                else {
                    data.className = '';
                    confirmBtn.style.display = 'none';
                    cancleBtn.style.display = 'none';
        
                    title.readOnly = 'readonly';
                    date.readOnly = 'readonly';
                    data.readOnly = 'readonly';
                }
            }
        }
    };

    cancleBtn.onclick = function () {
        data.className = '';
        confirmBtn.style.display = 'none';
        cancleBtn.style.display = 'none';
    }
    
}

//新增分类操作
document.getElementById('add-new-cate').addEventListener('click', function () {
    for (;true;) {
        var newCateName = prompt('请输入新分类的名称', '新分类');
        if (newCateName === null) {
            return ;
        } else if (newCateName.length > 8) {
            alert('分类名称不能超过8个字符！');
        } else {
            break;
        }
    }

    //这办法真是要笨死了，而且还有bug
    var newCate = document.createElement('li');
    var newCateContent = document.createElement('p');
    newCateContent.innerHTML = newCateName;
    newCate.appendChild(newCateContent);
    newCate.className = 'cate';
    var del = document.createElement('img');
    del.src = './img/icon-delete.png';
    del.className = 'delete';
    newCate.appendChild(del);
    var cateList = document.getElementById('cate-list');
    cateList.appendChild(newCate);
}, false);

//切换任务列表
document.getElementById('task-nav').addEventListener('click', function () {
    var taskNav = document.getElementById('task-nav');
    var taskCate = taskNav.getElementsByTagName('span');

    var taskList = document.getElementById('task-list');
    var tasks = taskList.getElementsByTagName('li');

    for (var i = 0; i < taskCate.length; i++) {
        taskCate[i].index = i;
        taskCate[i].onclick = function() {
            for (var n = 0; n < taskCate.length; n++) {
                taskCate[n].className = '';
            }
            for (var m = 0; m < tasks.length; m++) {
                tasks[m].style.display = 'none';
            }
            this.className = 'active';
            if (this.id == 'all-tasks') {
                for (var m = 0; m < tasks.length; m++) {
                    tasks[m].style.display = 'block';
                }
            } else if (this.id == 'not-yet') {
                for (var m = 0; m < tasks.length; m++) {
                    if (tasks[m].className == 'notyet') {
                        tasks[m].style.display = 'block';
                    }
                }
            } else {
                for (var m = 0; m < tasks.length; m++) {
                    if (tasks[m].className == 'finished') {
                        tasks[m].style.display = 'block';
                    }
                }
            }
        }
    };
}, false);


//新增任务操作
document.getElementById('add-new-task').addEventListener('click', function () {

    for (;true;) {
        var newTaskName = prompt('请输入新任务的标题', '新任务');
        if (newTaskName === null) {
            return ;
        } else if (newTaskName.length >10) {
            alert('任务名称不要超过10个字符哟~');
        } else {
            finish.style.display = 'block';
            edit.style.display = 'block';
            break;
        }
    }

    //其实好像是应该把新任务（或者新分类）设置成object的，然后给它们的属性赋值
    var newTask = document.createElement('li');
    newTask.innerHTML = newTaskName;
    newTask.className = 'notyet';
    var taskList = document.getElementById('task-list');
    taskList.appendChild(newTask);

    //右侧页面变为编辑状态
    editTask();

    //我天，写不下去了。。。

}, false);

//完成任务确认
document.getElementById('finish-task').addEventListener('click', function () {
    
    var complete = confirm('完成的任务将无法继续编辑，确认完成任务吗？');
    if (complete == true) {
        title.readOnly = 'readonly';
        date.readOnly = 'readonly';
        data.readOnly = 'readonly';

        data.className = '';

        finish.style.display = 'none';
        edit.style.display = 'none';

        confirmBtn.style.display = 'none';
        cancleBtn.style.display = 'none';
    } else {
        return ;
    }
}, false);

//编辑任务
document.getElementById('edit-task').addEventListener('click', function() {
    
    title.readOnly = '';
    date.readOnly = '';
    data.readOnly = '';

    editTask();
    //由于没能联系localStorage，所以这部分先空下来

}, false);