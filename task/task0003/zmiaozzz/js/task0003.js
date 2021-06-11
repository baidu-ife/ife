/**
 * @file task0003
 * @author zhangmiao
 */

/**
 * 全局变量
 */
//localStorage
var storage = window.localStorage;
//storage.clear();
//当前选中的分类
var target;
//选中的任务
var tarTask;
//默认分类
//type0表示是分类节点，type1表示是任务节点
var detail0 = {
    cname: '分类列表',
    clength: 1,
    type: 0
};
var detail01 = {
    cname: '默认分类',
    clength: 0,
    type: 0
};
if (!storage.getItem('0')) {
    storage.setItem('0', JSON.stringify(detail0));
}
if (!storage.getItem('0.1')) {
    storage.setItem('0.1', JSON.stringify(detail01));
}

//生成遮罩层、隐藏遮罩层
var mask = function () {
    var result;
    var maskDiv = document.createElement('div');
    maskDiv.className = 'mask';
    return function () {
        return result || (result = document.body.appendChild(maskDiv));
    }
};
function hiddenMask() {
    $('.panel-content input').value = '';
    $('.panel').style.display = 'none';
    var maskDiv = $('.mask');
    document.body.removeChild(maskDiv);
}

window.onload = function () {
    //显示分类列表
    showStorage('0');
    //默认选中“默认分类”
    target = $('#' + 0.1);
    addClass(target, 'active');
    //并在中间列显示默认分类下的所有任务
    addClass($('#all'), 'active');
    classify('0.1');
    //增加分类
    $.click('.category .add-wrap', displayPanel);
    //点击中间列表的tab菜单
    $.click('.task-tab', selectTask);

    //新增任务
    $.click('.task-list .add-wrap', displayInterface);

    $.on('.t-title', 'blur', titleVerify);
    $.on('.t-time', 'blur', timeVerify);
    $.on('.task-content', 'blur', contentVerify);
};
/**
 * 遍历localStorage中的内容
 * @param parent 上一级列表的key值
 */
function showStorage(parent) {
    var clist = '';
    clist += '<h2>所有任务';
    clist += '<span class="unfinished-num">(';
    clist += calculate('0');
    clist += ')<span>';
    clist += '</h2>';
    clist += '<h2>分类列表</h2>';
    function traverse(father) {
        clist += '<ul class="clist">';
        var obj = JSON.parse(storage.getItem(father));
        for (var i = 1; i <= obj.clength; i++) {
            var subObj = JSON.parse(storage.getItem(father + '.' + i));
            if (subObj.type === 0) {
                clist += '<li class="citem" >';
                clist += '<a id="' + father + '.' + i + '" ';
                clist += 'onclick="showTaskList(this);" ';
                clist += 'onmouseover="showDelete(this)" ';
                clist += 'onmouseout="hiddenDelete(this)">';
                if (father === '0' || subObj.clength > 0) {
                    clist += '<span class="folder"></span>';
                }
                else {
                    clist += '<span class="subfolder"></span>';
                }
                clist += '<span class="cname">';
                clist += subObj.cname;
                clist += '</span>';
                clist += '<span class="unfinished-num">(';
                clist += calculate(father + '.' + i);
                clist += ')</span>';
                clist += '<span class="delete" onclick="deleteCate(this)"></span>';
                clist += '</a>';
                traverse(father + '.' + i);
                clist += '</li>';
            }
        }
        clist += '</ul>';
    }

    traverse(parent);
    $('.clist-wrap').innerHTML = clist;
    //return clist;
}
function calculate(parent) {
    var unfTaskNum = 0;
    function traverseNum(parent) {
        var content = JSON.parse(storage.getItem(parent));
        for(var i = 1; i <= content.clength; i++) {
            var subKey = parent + '.' + i;
            var subContent = JSON.parse(storage.getItem(subKey));
            if(subContent.type === 1 && subContent.finished === 0) {
                unfTaskNum++;
            }
            else if (subContent.clength > 0) {
                traverseNum(subKey);
            }
        }
    }
    traverseNum(parent);
    return unfTaskNum;
}
/**
 * 增加分类
 */
function displayPanel() {
    //显示遮罩层和增加分类面板
    var createMask = mask();
    createMask();
    $('.panel').style.display = 'block';
    //点击确认，增加分类
    $.click('.confirm', addCategory);
    //点击取消，关闭面板
    $.click('.cancel', hiddenMask);
}
function addCategory() {
    //输入的类名
    var categoryName = $('.panel-content input').value.trim();
    //target是当前选中的分类
    var targetKey = target.id;
    var targetValue = JSON.parse(storage.getItem(targetKey));
    //新增类
    var itemKey;
    var itemConetent = {};
    //当前选中的不是默认分类，在选中分类下添加新子类
    if (target.id !== '0.1') {
        //新增类(target中的clength加1)
        var targetNewLen = targetValue.clength + 1;
        targetValue.clength = targetNewLen;
        storage.setItem(targetKey, JSON.stringify(targetValue));
        itemKey = targetKey + '.' + targetNewLen;
    }
    else {
        var rootContent = JSON.parse(storage.getItem('0'));
        var rootNewLen = rootContent.clength + 1;
        rootContent.clength = rootNewLen;
        storage.setItem('0', JSON.stringify(rootContent));
        itemKey = '0.' + rootNewLen;

    }
    itemConetent = {
        cname: categoryName,
        clength: 0,
        type: 0
    };
    storage.setItem(itemKey, JSON.stringify(itemConetent));
    hiddenMask();
    showStorage('0');
    target = $('#' + itemKey);
    addClass(target, 'active');
}
/**
 * 更改选中分类的样式，并在中间列表显示当前分类下的任务
 * @param element 当前选中分类
 * @param event
 */
function showTaskList(element, event) {
    var e = event || window.event;
    if (e.stopPropagation) {
        e.stopPropagation();
    }
    else {
        window.event.cancelBubble = true;
    }
    removeClass(target, 'active');
    target = element;
    //更改选中分类的样式
    addClass(target, 'active');

    //在中间列表显示当前分类下的任务
    //showStorageTask(element.id);
    var tabNodes = $('.task-tab').children;
    for (var i = 0; i < tabNodes.length; i++) {
        removeClass(tabNodes[i], 'active');
    }
    addClass($('.all-task'), 'active');
    classify(target.id);

}
function classify(parent, flag) {
    //当前分类下的所有任务
    var task = showTask(parent, flag);
    var tlist = '';
    if (task.length === 1) {
        tlist = display(task[0]);
    }
    if (task.length > 1) {
        var timeList = [];
        for (var i = 0; i < task.length; i++) {
            //将任务的时间转化为ms形式
            var time = task[i].time;
            //console.log(time);
            var timeArr = time.split('-');
            var taskTime = new Date();
            taskTime.setFullYear(timeArr[0], timeArr[1] - 1, timeArr[2]);
            taskTime.setHours(0, 0, 0, 0);
            taskTime = taskTime.getTime();
            //console.log(taskTime);
            timeList.push(taskTime);
        }
        //时间从小到大排序，任务按时间从小到大排序
        for (var i = 0; i < timeList.length; i++) {
            for (var j = i + 1; j < timeList.length; j++) {
                if (timeList[i] > timeList[j]) {
                    var temp = timeList[i];
                    timeList[i] = timeList[j];
                    timeList[j] = temp;

                    var tempObj = task[i];
                    task[i] = task[j];
                    task[j] = tempObj;
                }
            }
        }
        tlist = display(task, timeList)
    }
    //当前分类下的所有任务的时间集合
    $('.tlist-wrap').innerHTML = tlist;
}
function showTask(parent, flag) {
    var task = [];

    function traverse(father, flag) {
        //父分类的value
        var obj = JSON.parse(storage.getItem(father));

        if(!obj) {
            return;
        }
        if(obj.clength === 0) {
            return;
        }
        if(obj.clength > 0) {
            for (var i = 1; i <= obj.clength; i++) {
                var subObj = JSON.parse(storage.getItem(father + '.' + i));
                if (subObj.type === 0) {
                    traverse(father + '.' + i, flag);
                }
                if (subObj.type === 1) { //subObj是任务
                    //保存任务的key值
                    subObj.id = father + '.' + i;
                    if (flag) {
                        if (subObj.finished === parseInt(flag)) {
                            task.push(subObj);
                        }
                    }
                    else {
                        task.push(subObj);
                    }
                }
            }
        }

    }

    traverse(parent, flag);
    return task;
}
function display(task, timeList) {
    var tlist = '';
    if (timeList) {
        //tlist += '<ul>';
        var displayTask = (function () {
            var subList = '';
            var currentTime = timeList[0];
            subList += '<li class="titem">';
            subList += '<span>';
            subList += task[0].time;
            subList += '</span>';
            subList += '<ul class="task-wrap">';
            subList += '<li id="' + task[0].id + '" onclick="showDetail(this)"';
            if (task[0].finished === 0) {
                subList += ' class="unfinished" ';
            }
            subList += '>';
            subList += task[0].title;
            subList += '</li>';
            for (var i = 1; i < timeList.length; i++) {
                if (timeList[i] === currentTime) {
                    subList += '<li id="' + task[i].id + '" onclick="showDetail(this)"';
                    if (task[i].finished === 0) {
                        subList += ' class="unfinished" ';
                    }
                    subList += '>';
                    subList += task[i].title;
                    subList += '</li>';
                    if (timeList[i + 1] !== currentTime || !timeList[i + 1]) {
                        subList += '</ul>';
                        subList += '</li>';
                    }
                }
                else {
                    subList += '</ul>';
                    subList += '</li>';
                    currentTime = timeList[i];
                    subList += '<li class="titem">';
                    subList += '<span>';
                    subList += task[i].time;
                    subList += '</span>';
                    subList += '<ul class="task-wrap">';
                    subList += '<li id="' + task[i].id + '" onclick="showDetail(this)"';
                    if (task[i].finished === 0) {
                        subList += ' class="unfinished" ';
                    }
                    subList += '>';
                    subList += task[i].title;
                    subList += '</li>';
                }
            }
            return subList;
        })();
        tlist += displayTask;
        // tlist += '</ul>';
    }
    else {
        //tlist += '<ul>';
        tlist += '<li>';
        tlist += '<span>';
        tlist += task.time;
        tlist += '</span>';

        tlist += '<ul class="task-wrap">';
        tlist += '<li id="' + task.id + '" onclick="showDetail(this)"';
        if (task.finished === 0) {
            tlist += ' class="unfinished" ';
        }
        tlist += '>';
        tlist += task.title;
        tlist += '</li>';
        tlist += '</ul>';

        tlist += '</li>';
        //tlist += '</ul>';
    }
    return tlist;
}
/**
 * tab菜单筛选任务
 * @param event
 */
function selectTask(event) {
    var e = event || window.event;
    var tar = e.target || e.srcElement;
    var tabNodes = $('.task-tab').children;
    for (var i = 0; i < tabNodes.length; i++) {
        removeClass(tabNodes[i], 'active');
    }
    if (tar.id === 'all') {
        addClass($('#all'), 'active');
        classify(target.id);
    }
    else {
        addClass($('#' + tar.id), 'active');
        classify(target.id, tar.id);
    }
}

/**
 * 鼠标hover，显示删除分类图标
 * @param element 当前hover分类
 */
function showDelete(element) {
    //removeClass();
    $('#' + element.id + ' ' + '.delete').style.display = 'block';
    //addClass($('#' + element.id + ' ' + '.delete'), 'display');
}
/**
 * 鼠标移开，隐藏删除分类图标
 * @param element
 */
function hiddenDelete(element) {
    $('#' + element.id + ' ' + '.delete').style.display = 'none';
}

/**
 * 删除选中分类
 * @param element
 */
function deleteCate(element) {
    if(!confirm('确定删除该类？')) {
        return;
    }
    var deleteNode = element.parentNode;
    //
    var deleteKey = deleteNode.id;
    var location = deleteKey.substring(deleteKey.lastIndexOf('.') + 1);
    var parentKey = deleteKey.substring(0, deleteKey.lastIndexOf('.'));
    var parentContent = JSON.parse(storage.getItem(parentKey));


    for (var i = 1; i <= parentContent.clength; i++) {
        if (i === parseInt(location)) {
            removeCate(deleteKey);
        }
        else if (i > parseInt(location)) {
            changeCateKey(parentKey + '.' + i);
        }
    }

    //父分类的长度-1
    parentContent.clength = parentContent.clength - 1;
    storage.setItem(parentKey, JSON.stringify(parentContent));
    //
    showStorage('0');
    //默认选中“默认分类”
    target = $('#' + 0.1);
    addClass(target, 'active');
    //并在中间列显示默认分类下的所有任务
    addClass($('#all'), 'active');
    classify('0.1');

}
function removeCate(deleteKey) {
    var deleteContent = JSON.parse(storage.getItem(deleteKey));

    var len = deleteContent.clength;
    for (var i = 1; i <= len; i++) {
        var subCateKey = deleteKey + '.' + i;
        var subCateContent = JSON.parse(storage.getItem(deleteKey + '.' + i));
        if (subCateContent.clength > 0) {
            removeCate(subCateKey);
        }
        else {
            storage.removeItem(subCateKey);
        }
    }
    storage.removeItem(deleteKey);
}
function changeCateKey(currentKey) {
    var currentContent = JSON.parse(storage.getItem(currentKey));
    var a = currentKey.lastIndexOf('.') + 1;

    for (var i = 1; i <= currentContent.clength; i++) {
        var subCateKey = currentKey + '.' + i;
        var subCateContent = JSON.parse(storage.getItem(currentKey + '.' + i));
        if (subCateContent.clength > 0) {
            changeCateKey(subCateKey);
        }
        else {
            storage.removeItem(subCateKey);
            //var regExp = new RegExp(currentKey + '\\.(\\d+)\\.');
            var change = parseInt(subCateKey.substring(a, a + 1)) - 1;
            subCateKey = subCateKey.substring(0, a) + change + subCateKey.substring(a + 1);
            storage.setItem(subCateKey, JSON.stringify(subCateContent));
        }
    }
    storage.removeItem(currentKey);
    //var regExp = new RegExp(currentKey + '\\.(\\d+)\\.');
    var change = parseInt(currentKey.substring(a, a + 1)) - 1;
    currentKey = currentKey.substring(0, a) + change + currentKey.substring(a + 1);
    storage.setItem(currentKey, JSON.stringify(currentContent));
}

/**
 * 显示增加任务界面
 */
function displayInterface() {
    //显示增加任务的界面
    $('.task-info').style.display = 'block';

    if($('.title-warning')) {
        $('.title-wrap').removeChild($('.title-warning'));
    }
    if($('.time-warning')) {
        $('.time-wrap').removeChild($('.time-warning'));
    }
    if($('.content-warning')) {
        $('.task-info').removeChild($('.content-warning'));
    }


    var opButton = '';
    opButton += '<span class="complete">';
    opButton += '</span>';
    opButton += '<span class="close">';
    opButton += '</span>';

    if($('.operate-button')) {
        $('.operate-button').innerHTML = opButton;
    }
    else {
        var div = document.createElement('div');
        div.className = 'operate-button';
        div.innerHTML = opButton;
        $('.thead-wrap').appendChild(div);
    }

    $('.t-title').value = '';
    $('.t-time').value = '';
    $('.task-content').value = '';

    $('.t-title').removeAttribute('readOnly');
    $('.t-time').removeAttribute('readOnly');
    $('.task-content').removeAttribute('readOnly');

    //点击‘对勾’增加任务，点击‘×’关闭界面，取消增加任务
    $.click('.complete', addTask);
    $.click('.close', function () {
        $('.task-info').style.display = 'none';
    });
}
function addTask() {
    //输入任务的标题，时间和内容
    var title = $('.t-title').value;
    var time = $('.t-time').value;
    var content = $('.task-content').value;

    //选中分类的key和value值
    var cateKey = target.id;
    var cateContent = JSON.parse(storage.getItem(cateKey));

    //获得新增任务的key值，并将父元素的clength增1
    var newclength = cateContent.clength + 1;
    cateContent.clength = newclength;
    var taskKey = cateKey + '.' + newclength;
    storage.setItem(cateKey, JSON.stringify(cateContent));

    //console.log(storage);

    //新增任务的value值
    var taskContent = {
        title: title,
        time: time,
        content: content,
        clength: 0,
        type: 1,
        finished: 0
    };
    storage.setItem(taskKey, JSON.stringify(taskContent));
    classify(target.id);
    showDetail($('#' + taskKey));
}
/**
 * 显示任务的详细信息
 * @param element
 */
function showDetail(element) {
    if (tarTask) {
        removeClass(tarTask, 'active');
    }
    tarTask = $('#' + element.id);
    addClass(tarTask, 'active');
    var currentContent = JSON.parse(storage.getItem(tarTask.id));

    $('.task-info').style.display = 'block';

    $('.t-title').value = currentContent.title;
    $('.t-time').value = currentContent.time;
    $('.task-content').value = currentContent.content;

    $('.t-title').readOnly = 'readonly';
    $('.t-time').readOnly = 'readonly';
    $('.task-content').readOnly = 'readonly';

    if(currentContent.finished === 0) {

        var opButton = '';
        opButton += '<span class="complete">';
        opButton += '</span>';
        opButton += '<span class="edit">';
        opButton += '</span>';

        if(!$('.operate-button')) {
            var div = document.createElement('div');
            div.className = 'operate-button';
            div.innerHTML = opButton;
            $('.thead-wrap').appendChild(div);
        }
        else {
            $('.operate-button').innerHTML = opButton;
        }
        $.click('.complete', completeTask);
        $.click('.edit', editTask);
    }
    else {
        if($('.operate-button')) {
            $('.operate-button').innerHTML = '';
        }
    }

    function completeTask() {
        if(!confirm('确定完成任务？')) {
            return;
        }
        currentContent.finished = 1;
        storage.setItem(tarTask.id, JSON.stringify(currentContent));
    }

    function editTask() {
        $('.t-title').removeAttribute('readOnly');
        $('.t-time').removeAttribute('readOnly');
        $('.task-content').removeAttribute('readOnly');

        var opButton = '';
        opButton += '<span class="complete">';
        opButton += '</span>';
        opButton += '<span class="close">';
        opButton += '</span>';

        if($('.operate-button')) {
            $('.operate-button').innerHTML = opButton;
        }
        else {
            var div = document.createElement('div');
            div.className = 'operate-button';
            div.innerHTML = opButton;
            $('.thead-wrap').appendChild(div);
        }

        $.click('.complete', confirmEdit);
        $.click('.close', function () {
            var opButton = '';
            opButton += '<span class="complete">';
            opButton += '</span>';
            opButton += '<span class="edit">';
            opButton += '</span>';

            if(!$('.operate-button')) {
                var div = document.createElement('div');
                div.className = 'operate-button';
                div.innerHTML = opButton;
                $('.thead-wrap').appendChild(div);
            }
            else {
                $('.operate-button').innerHTML = opButton;
            }
            $('.t-title').value = currentContent.title;
            $('.t-time').value = currentContent.time;
            $('.task-content').value = currentContent.content;

            $('.t-title').readOnly = 'readonly';
            $('.t-time').readOnly = 'readonly';
            $('.task-content').readOnly = 'readonly';

            $.click('.complete', completeTask);
            $.click('.edit', editTask);
        });
    }
    function confirmEdit() {
        if(!confirm('确认修改？')) {
            return;
        }
        currentContent.title = $('.t-title').value;
        currentContent.time = $('.t-time').value;
        currentContent.content = $('.task-content').value;

        storage.setItem(tarTask.id, JSON.stringify(currentContent));
    }
}


function getTaskNum(cateKey) {
    var itemContent = JSON.parse(storage.getItem(cateKey));
    for (var i = 1; i < itemContent.clength; i++) {
        if (itemContent.type === 1) {
            num++;
        }
        else {
            getTaskNum(cateKey + '.' + i);
        }
    }
}


function titleVerify() {
    var title = $('.t-title').value;
    var span = document.createElement("span");
    span.className = 'title-warning';
    if(title.length <= 0) {
        if($('.title-warning')) {
            $('.title-warning').innerHTML = '请输入标题！';

        }
        else {
            span.innerHTML = '请输入标题！';
            $('.title-wrap').appendChild(span);
        }
    }
    else if(title.length > 10) {
        if($('.title-warning')) {
            $('.title-warning').innerHTML = '输入字数请不要超过10！';
        }
        else {
            span.innerHTML = '输入字数请不要超过10！';
            $('.title-wrap').appendChild(span);
        }
    }
    else if(title.length < 10 && $('.title-warning')) {
        $('.title-wrap').removeChild($('.title-warning'));
    }
}

function timeVerify() {
    var span = document.createElement("span");
    span.className = 'time-warning';
    var time = $('.t-time').value;
    var regExp = /^\d{4}\-\d{2}\-\d{2}$/;
    if(!regExp.test(time)) {
        if($('.time-warning')) {
            $('.time-warning').innerHTML = '请输入正确的日期格式：YYYY-MM-DD！';
        }
        else {
            span.innerHTML = '请输入正确的日期格式：YYYY-MM-DD！';
            $('.time-wrap').appendChild(span);
        }
    }
    else if(regExp.test(time) && $('.time-warning')) {
        $('.time-wrap').removeChild($('.time-warning'));
    }
}
function contentVerify() {
    var content = $('.task-content').value;
    var span = document.createElement("span");
    span.className = 'content-warning';
    if(content.length <= 0) {
        if($('.content-warning')) {
            $('.content-warning').innerHTML = '请输入内容！';
        }
        else {
            span.innerHTML = '请输入内容！';
            $('.task-info').appendChild(span);
        }
    }
    else if(content.length > 500) {
        if($('.content-warning')) {
            $('.content-warning').innerHTML = '输入字数请不要超过500！';
        }
        else {
            span.innerHTML = '输入字数请不要超过500！';
            $('.task-info').appendChild(span);
        }
    }
    else if(content.length < 500 && $('.content-warning')) {
        $('.task-info').removeChild($('.content-warning'));
    }
}

