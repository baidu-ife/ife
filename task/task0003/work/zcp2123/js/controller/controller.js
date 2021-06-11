/**
 * Created by zcp2123 on 2015/5/16.
 */
var task = new Task();

function makeCategoryList() {
    task.updateNum();
    $("#allTasks i").innerHTML = task.taskList.length;
    var html = "";
    for (var i = 0; i < task.categoryList.length; i++) {
        if (i == 0) {
            html += '<li>'
                    +   '<h3 onclick="categoryClick(this);"><span class="name">' + task.categoryList[i].name + '</span><i>(' + task.categoryList[i].num + ')</i></h3>'
                    +   '<ul class="item">';
        }  else {
            html += '<li>'
                    +   '<h3 onclick="categoryClick(this);"><span class="name">' + task.categoryList[i].name + '</span><i>(' + task.categoryList[i].num + ')</i><span class="delete" onclick="del(event, this)">X</span></h3>'
                    +   '<ul class="item">';
        }
        for (var j = 0; j < task.categoryList[i].child.length; j++) {
            var childNode = task.getObjByKey(task.categoryChildList, "id", task.categoryList[i].child[j]);
            if (i == 0 && j == 0) {
                html +=     '<li>'
                    +           '<h4 onclick="categoryClick(this);"><span class="name">' + childNode.name + '</span><i>(' + childNode.child.length + ')</i></h4>'
                    +       '</li>';
            } else {
                html +=     '<li>'
                    +           '<h4 onclick="categoryClick(this);"><span class="name">' + childNode.name + '</span><i>(' + childNode.child.length + ')</i><span class="delete" onclick="del(event, this)">X</span></h4>'
                    +       '</li>';
            }

        }
        html +=         '</ul>'
                  + '</li>';
    }
    $(".itemList").innerHTML = html;
    $("#allTasks").click();
    makeTaskList();
}

function makeTaskList() {
    var chooseEle = $(".typeList .choose");
    $('.taskStatus').click();
    var chooseEleTag = chooseEle.tagName.toLowerCase();
    var name = chooseEle.getElementsByClassName('name')[0].innerHTML;
    var taskIdArr = [];
    switch (chooseEleTag) {
        case "h2"://选中所有任务
            for (var i = 0; i < task.taskList.length; i++) {
                taskIdArr.push(task.taskList[i].id);
            }
            break;
        case "h3"://选中分类
            var categoryObj = task.getObjByKey(task.categoryList, 'name', name);
            for (var i = 0; i < categoryObj.child.length; i++) {
                var childObj = task.getObjByKey(task.categoryChildList, 'id', categoryObj.child[i]);
                for (var j = 0; j < childObj.child.length; j++) {
                    taskIdArr.push(childObj.child[j]);
                }
            }
            break;
        case "h4":
            var childObj = task.getObjByKey(task.categoryChildList, 'name', name);
            for (var i = 0; i < childObj.child.length; i++) {
                taskIdArr.push(childObj.child[i]);
            }
            break;
    }
    makeTaskById(taskIdArr);
    makeDetails();
}

function makeTaskById(taskIdArr) {
    var date = [];
    for (var i = 0; i < taskIdArr.length; i++) {
        var taskObj = task.getObjByKey(task.taskList, 'id', taskIdArr[i]);
        date.push(taskObj.date);
    }

    date = uniqArray(date);
    date = date.sort();

    var html = '';
    for (var i = date.length - 1; i >= 0; i--) {
        html += '<li><h5>' + date[i] + '</h5><ul class="item">';
        for (var j = 0; j < taskIdArr.length; j++) {
            var taskObj = task.getObjByKey(task.taskList, 'id', taskIdArr[j]);
            if (taskObj.date == date[i]) {
                if (taskObj.finish == true) {
                    html += '<li class="taskFinish" onclick="taskClick(this);">';
                } else {
                    html += '<li onclick="taskClick(this);">';
                }
                html += '<h6><span class="name">' + taskObj.name + '</span><span class="delete" onclick="del(event, this)">X</span></h6></li>';
            }
        }
        html += '</ul></li>';
    }

    $(".taskList").innerHTML = html;
}

function makeDetails() {
    var chooseEle = $('.taskList .choose');
    var info = $("#main span", false);
    if (chooseEle) {
        var name = chooseEle.getElementsByClassName("name")[0].innerHTML;
        var taskObj = task.getObjByKey(task.taskList, 'name', name);
        if (taskObj) {
            info[0].innerHTML = taskObj.name;
            info[1].innerHTML = taskObj.date;
            info[2].innerHTML = taskObj.content;
        } else {
            info[0].innerHTML = '';
            info[1].innerHTML = '';
            info[2].innerHTML = '';
        }
        $('.operates').style.display = 'inline';
    } else {
        info[0].innerHTML = '';
        info[1].innerHTML = '';
        info[2].innerHTML = '';
        $('.operates').style.display = 'none';
    }
}

//分类列表点击
function categoryClick(ele) {
    var choose = $(".typeList .choose");
    if (choose) {
        removeClass(choose, "choose");
    }
    addClass(ele, "choose");
    makeTaskList();
}

//任务列表点击
function taskClick(ele) {
    var choose = $(".taskList .choose");
    if (choose) {
        removeClass(choose, "choose");
    }
    addClass(ele, "choose");
    makeDetails();
}

//任务状态栏点击
function taskStatusClick(ele) {
    var choose = $("#taskStatus .choose");
    if (choose) {
        removeClass(choose, "choose");
    }
    addClass(ele, "choose");

    var li = $('.taskList li', false);
    switch (ele.innerHTML) {
        case '所有':
            each(li, function(ele){
                ele.style.display = 'inline';
            });
            break;
        case '已完成':
            each(li, function(ele){
                ele.style.display = 'none';
            });
            each(li, function(ele){
                if (hasClass(ele, "taskFinish")) {
                    ele.style.display = 'inline';
                    ele.parentNode.parentNode.style.display = 'inline';
                }
            });
            break;
        case '未完成':
            each(li, function(ele){
                ele.style.display = 'none';
            });
            each(li, function(ele){
                if (!hasClass(ele, "taskFinish") && hasClass(ele.parentNode, "item")) {
                    ele.style.display = 'inline';
                    ele.parentNode.parentNode.style.display = 'inline';
                }
            });
    }
}

function addNewCategory() {
    var name = $(".dialogInput input").value;
    var father = $(".dialogSelect select").value;
    var error = $(".dialog .error");

    if (name.replace(/\s*/, "") === "") {
        error.innerHTML = "不能够全为空白字符";
        return;
    }
    if (father === '-1' && task.getObjByKey(task.categoryList, 'name', name)) {
        error.innerHTML = "已有相同名称的分类";
        return;
    }
    if (father !== '-1' && task.getObjByKey(task.categoryChildList, 'name', name)) {
        error.innerHTML = "已有相同名称的子分类";
        return;
    }

    if (father === '-1') {             // 添加分类
        var newCate = {
            "id": task.categoryList[task.categoryList.length - 1].id + 1,
            "name": name,
            "num": 0,
            "child": []
        };
        task.categoryList.push(newCate);
        task.save();
    }
    else {                                 // 添加子分类
        var newChild = {
            "id": task.categoryChildList[task.categoryChildList.length - 1].id + 1,
            "name": name,
            "child": [],
            "father": task.categoryList[father].id
        };
        var fatherObj = task.getObjByKey(task.categoryList, 'id', newChild.father)   // 父节点对象
        fatherObj.child.push(newChild.id);                       // 在父节点中登记
        task.categoryChildList.push(newChild);
        task.save();
    }
    makeCategoryList();
    cancleAddNewCategory();
}

function cancleAddNewCategory() {

    var addDialog = $(".addDialog");
    addDialog.parentNode.removeChild(addDialog);
}
//进入编辑模式
function addNewTask() {
    $.un(".addTask", "click", arguments.callee);
    $.un(".taskCont .contSure", "click", addTaskSure);
    $.un(".taskCont .contSure", "click", editTaskSure);
    $.click(".taskCont .contSure", addTaskSure);

    $(".taskTitleInput").value = '';
    $(".taskDateInput").value = '';
    $(".taskContInput").value = '';
    each($("#main span", false), function(ele){
        ele.style.display = 'none';
    });
    $(".operates").style.display = 'none';
    $(".taskError").style.display = 'block';
    $(".taskTitleInput").style.display = 'inline';
    $(".taskDateInput").style.display = 'inline';
    $(".taskContInput").style.display = 'inline';
    each($(".taskCont button", false), function(ele){
        ele.style.display = 'inline';
    });

}

// 退出编辑模式，放弃添加新任务
function cancleAddNewTask() {
    $.click(".addTask", addNewTask);                                 // 重新绑定新建按钮的点击事件

    each($("#main span", false), function(ele){
        ele.style.display = 'inline';
    });
    $(".operates").style.display = 'inline';
    $(".taskError").style.display = 'none';
    $(".taskTitleInput").style.display = 'none';
    $(".taskDateInput").style.display = 'none';
    $(".taskContInput").style.display = 'none';
    each($(".taskCont button", false), function(ele){
        ele.style.display = 'none';
    });
    $('.taskError').innerHTML = '';
}

//确认添加
function addTaskSure() {
    var dateReg = /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    var title = $(".taskTitleInput").value;
    var date = $(".taskDateInput").value;
    var content = $(".taskContInput").value;

    if (title.replace(/\s*/, "") === "") {
        $(".taskError").innerHTML = "任务标题不能为空";
        return;
    } else if (date.replace(/\s*/, "") === "") {
        $(".taskError").innerHTML = "任务日期不能为空";
        return;
    } else if (!dateReg.test(date)) {
        $(".taskError").innerHTML = "任务日期格式错误";
        return;
    } else if (task.getObjByKey(task.taskList, 'name', title)) {
        $('.taskError').innerHTML = '检测到相同名称的任务已存在';
        return;
    }

    var categoryChoose = $(".typeList .choose");
    var categoryTag = categoryChoose.tagName.toLowerCase();
    var categoryName = categoryChoose.getElementsByTagName("span")[0].innerHTML;
    var father;

    switch (categoryTag) {
        case "h2":
            father = 0;
            break;
        case "h3":
            var categoryObj = task.getObjByKey(task.categoryList, "name", categoryName);
            if (categoryObj.child.length > 0) {
                father = categoryObj.child[0];
            } else {
                father = 0;
            }
            break;
        case "h4":
            father = task.getObjByKey(task.categoryChildList, "name", categoryName);
            break;
    }
    var newTask = {
        "id": task.taskList[task.taskList.length - 1].id + 1,
        "name": title,
        "father": father,
        "finish": false,
        "date": date,
        "content": content
    };

    task.taskList.push(newTask);
    var fatherObj = task.getObjByKey(task.categoryChildList, "id", father);
    fatherObj.child.push(newTask.id);

    task.save();
    makeCategoryList();
    cancleAddNewTask();

}

function del(e, ele) {
    window.event ? window.event.cancelBubble = true : e.stopPropagation();  // 阻止事件冒泡

    var con = confirm("删除操作不可逆，确定要删除吗？");
    if (!con) {
        return;
    }

    var ele = ele.parentNode;
    var tag = ele.tagName.toLowerCase();
    var index;
    var name = ele.getElementsByTagName('span')[0].innerHTML;
    switch (tag) {
        case 'h3':                                                          // 删除一个分类
            index = task.getIndexByKey(task.categoryList, 'name', name);

            for (var i = 0; i < task.categoryList[index].child.length; i++) {            // 删除该分类下的所有子分类及任务
                var childIndex = task.getIndexByKey(task.categoryChildList, 'id', task.categoryList[index].child[i]);
                for (var j = 0; j < task.categoryChildList[childIndex].child.length; j ++) {
                    var taskIndex = task.getIndexByKey(task.taskList, 'id', task.categoryChildList[childIndex].child[j])
                    task.taskList.splice(taskIndex, 1);
                }
                task.categoryChildList.splice(childIndex, 1);
            }
            task.categoryList.splice(index, 1);
            break;
        case 'h4':                                                          // 删除一个子分类
            index = task.getIndexByKey(task.categoryChildList, 'name', name);

            for (var i = 0; i < task.categoryChildList[index].child.length; i++) {       // 删除该子分类下的所有任务
                var taskIndex = task.getIndexByKey(task.taskList, 'id', task.categoryChildList[index].child[i])
                task.taskList.splice(taskIndex, 1);
            }

            var fatherObj = task.getObjByKey(task.categoryList, 'id', task.categoryChildList[index].father);  // 删除父节点中的记录
            fatherObj.child.splice(fatherObj.child.indexOf(task.categoryChildList[index].id), 1);
            task.categoryChildList.splice(index, 1);
            break;
        case 'h6':
            index = task.getIndexByKey(task.taskList, 'name', name);

            var fatherObj = task.getObjByKey(task.categoryChildList, 'id', task.taskList[index].father);  // 删除父节点中的记录
            fatherObj.child.splice(fatherObj.child.indexOf(task.taskList[index].id), 1);
            task.taskList.splice(index, 1);
            break;
    }
    task.save();
    makeCategoryList();
}

// 设置任务为已完成状态
function finishTask() {

    var taskName = $('.taskTitle span').innerHTML;
    var taskObj = task.getObjByKey(task.taskList, 'name', taskName);
    if (taskObj.finish) {
        alert('任务已经完成了!');
        return;
    }
    var con = confirm("确定要设置任务为已完成状态吗？");
    if (!con) {
        return;
    }
    taskObj.finish = true;
    makeTaskList();
}

// 修改已有的任务
function editTask() {
    $.un(".addTask", "click", arguments.callee);
    $.un(".taskCont .contSure", "click", addTaskSure);
    $.un(".taskCont .contSure", "click", editTaskSure);
    $.click(".taskCont .contSure", editTaskSure);

    $(".taskTitleInput").value = '';
    $(".taskDateInput").value = '';
    $(".taskContInput").value = '';
    $(".taskDate span").style.display = 'none';
    $(".taskCont span").style.display = 'none';

    $(".operates").style.display = 'none';
    $(".taskError").style.display = 'block';
    $(".taskDateInput").style.display = 'inline';
    $(".taskContInput").style.display = 'inline';
    each($(".taskCont button", false), function(ele){
        ele.style.display = 'inline';
    });

    $(".taskDateInput").value = $('.taskDate span').innerHTML;
    $(".taskContInput").value = $('.taskCont span').innerHTML;

}

// 保存修改
function editTaskSure() {
    var dateReg = /\d{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/;
    var name = $('.taskTitle span').innerHTML;
    var taskObj = task.getObjByKey(task.taskList, 'name', name);
    var date = $(".taskDateInput").value;
    var content = $(".taskContInput").value;

    if (date.replace(/\s*/, "") === "") {
        $(".taskError").innerHTML = "任务日期不能为空";
        return;
    } else if (!dateReg.test(date)) {
        $(".taskError").innerHTML = "任务日期格式错误";
        return;
    }

    taskObj.date = date;
    taskObj.content = content;

    task.save();
    makeTaskList();
    cancleAddNewTask();
}