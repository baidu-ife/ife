/**
 * Created by Fental on 15/5/16.
 */
//Controller
var controller = (function() {
    //公共方法 && 属性

    var gtd = new Gtd();

    //当前选中的分类
    var getActiveClassify = function() {
        var list = $('#list');
        if (document.getElementsByClassName) {
            return list.getElementsByClassName('active-classify')[0];
        }
        else {
            return getElementsByClassName(list, 'active-classify')[0];
        }
    };

    var getVisitTaskInfo = function(target) {
        return {
            name: target.textContent,
            date: target.parentNode.parentNode.getElementsByTagName('h1')[0].id
        };
    };
    //
    var updateList = function(type) {
        $('#all-task-num').innerHTML = parseInt(gtd.countAll());
        var list = $('#classify-list');
        list.innerHTML = '<h1 id="all-list-title" class="all-list-title">分类列表</h1>';
        var allClassifies = gtd.findAllClassifies();
        //console.log(allClassifies);
        var classify;
        var classifyContainer;
        var subClassifyContainer;
        for (var i = 0; i < allClassifies.length; i++) {
            classify = gtd.findClassify(allClassifies[i]);

            classifyContainer = document.createElement('div');
            if (i === allClassifies.length - 1) {
                classifyContainer.innerHTML = '<h2 class="active-classify" data-class="classify" data-name="' + classify.name + '"><span class="icon-folder-open"></span>' + classify.name + ' （<span class="cnt">' + gtd.countOutOfSub(classify) + '</span>）</h2>';
            }
            else {
                classifyContainer.innerHTML = '<h2 data-class="classify" data-name="' + classify.name + '"><span class="icon-folder-open"></span>' + classify.name + ' （<span class="cnt">' + gtd.countOutOfSub(classify) + '</span>）<span class="icon-cross"></span></h2>';
            }
            if (classify.allSubClassifies.length !== 0) {
                subClassifyContainer = document.createElement('ul');
                for (var j = 0; j < classify.allSubClassifies.length; j++) {
                    subClassifyContainer.innerHTML += '<li data-class="subClassify" data-parent = "' + classify.name +'" data-name="' + classify.allSubClassifies[j].name +'"><span class="icon-file-empty"></span>'
                        + classify.allSubClassifies[j].name + ' （<span class="cnt">' + gtd.countInSub(classify.allSubClassifies[j]) + '</span>）'
                        + '<span class="icon-cross"></span></li>';
                }
                classifyContainer.appendChild(subClassifyContainer);
            }
            //console.log(classifyContainer);
            list.appendChild(classifyContainer);
            //console.log(list.innerHTML);
        }
        if (type !== undefined) {


            removeClass($('.active-classify'), 'active-classify');
            var tmp;
            if (type === 'classify') {
                tmp = list.getElementsByTagName('h2');
                for (var k = 0; k < tmp.length; k++) {
                    if (tmp[k].getAttribute('data-name') === arguments[1]) {
                        addClass(tmp[k], 'active-classify');
                        break;
                    }
                }
            }
            else {
                tmp = list.getElementsByTagName('li');
                for (var l = 0; l < tmp.length; l++) {
                    if (tmp[l].getAttribute('data-parent') === arguments[1] && tmp[l].getAttribute('data-name') === arguments[2]) {
                        addClass(tmp[l], 'active-classify');
                        break;
                    }
                }
            }
        }
    };

    var updateTaskContainer = function(classifyType, showType, opt1, opt2) {
        //opt1 为数组，0：分类名；1：子分类名
        //opt2 为数组，0：任务名，1：任务时间，2：任务内容
        opt2 = opt2 || [null, null, null];
        //分类中任务的显示
        var taskPanel = $('#task-panel');
        removeClass($('.active-state'), 'active-state');
        var showTypeBtn = $('#' + showType);
        addClass(showTypeBtn, 'active-state');

        var allTasks = [];
        //console.log(classifyType);
        if (classifyType === 'classify') {
            allTasks = gtd.findAllTasksOutOfSub(opt1[0]);
        }
        else if (classifyType === 'subClassify') {
            allTasks = gtd.findAllTasksInSub(opt1[0], opt1[1]);
        }
        //console.log(allTasks);
        taskPanel.innerHTML = '';
        if (allTasks.length !== 0) {
            allTasks = bubbleSort(allTasks);
            //console.log('after quickSort');
            //console.log(allTasks);
            //task: title date content state
            var allSections = [];
            var section;
            var hadDone;
            var isVisit;
            for (var k = 0; k < allTasks.length; k++) {
                section = '';
                hadDone = '';
                isVisit = '';
                //时间过滤
                if (showType === 'no-complete') {
                    if (allTasks[k].state !== false) {
                        continue;
                    }
                }
                else if (showType === 'had-complete') {
                    if (allTasks[k].state !== true) {
                        continue;
                    }
                }
                if (allSections.indexOf(allTasks[k].date) === -1) {
                    allSections.push(allTasks[k].date);
                    if (allTasks[k].state) {
                        hadDone = ' had-done';
                    }
                    if (allTasks[k].name === opt2[0] && allTasks[k].subName === opt2[2] && allTasks[k].date === opt2[1]) {
                        isVisit = ' visit';
                    }
                    section += '<section>'
                        + '<h1 id="' + allTasks[k].date + '" class="task-date">' + allTasks[k].date + '</h1>'
                        + '<ul>'
                        + '<li class="task-title' + hadDone + isVisit + '" data-sub-classify="' + allTasks[k].subName +'">'
                        + allTasks[k].name
                        + '<span class="icon-cross"></span></li>'
                        + '</ul>'
                        + '</section>';
                    taskPanel.innerHTML += section;
                }
                else {
                    if (allTasks[k].state) {
                        hadDone = ' had-done';
                    }
                    if (allTasks[k].name === opt2[0] && allTasks[k].subName === opt2[2] && allTasks[k].date === opt2[1]) {
                        isVisit = ' visit';
                    }
                    section = $('#' + allTasks[k].date);
                    section.nextSibling.innerHTML += '<li class="task-title' + hadDone + isVisit + '" data-sub-classify="' + allTasks[k].subName +'">'
                        + allTasks[k].name
                        + '<span class="icon-cross"></span></li>';
                }
            }
        }

        if (isVisit === '') {
            if (taskPanel.innerHTML !== '') {
                addClass(taskPanel.getElementsByTagName('section')[0].getElementsByTagName('li')[0], 'visit');
            }
        }

    };

    var updateTask = function(activeClassify, target) {
        target = target || $('.visit');
        if (activeClassify.id !== 'all-list-title' && (target !== null && target !== undefined)) {
            var info = getVisitTaskInfo(target);
            var type = activeClassify.getAttribute('data-class');

            var currentTask;
            var tmp;

            if (type === 'classify') {
                if ((tmp = target.getAttribute('data-sub-classify')) !== '') {
                    currentTask = gtd.findTaskInSub(activeClassify.getAttribute('data-name'), tmp, info.name, info.date).currentTask;
                }
                else {
                    currentTask = gtd.findTaskOutOfSub(activeClassify.getAttribute('data-name'), info.name, info.date).currentTask;
                }
            }
            else if (type === 'subClassify'){
                //updateTaskContainer(type, target.id, activeClassify.getAttribute('data-parent'), target.getAttribute('data-name'));
                currentTask = gtd.findTaskInSub(activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name'), info.name, info.date).currentTask;
            }
            console.log(currentTask);


            if (currentTask.state) {
                //已完成
                $('#task-title').innerHTML = info.name;
            }
            else {
                //未完成
                $('#task-title').innerHTML = info.name + '<span class="icon-checkmark" id="check-mark"></span><span class="icon-pencil2" id="pencil"></span>';
            }
            $('#task-date').innerHTML = '任务日期：' + info.date;
            $('#task-content').innerHTML = currentTask.content;
        }
        else {
            $('#task-title').innerHTML = '';
            $('#task-date').innerHTML = '';
            $('#task-content').innerHTML = '';
        }
    };

    var showEdit = function() {
        removeClass($('#show-task'), 'active');
        addClass($('#edit-task'), 'active');
    };

    var cancelEdit = function() {
        $('#edit-title').value = '';
        $('#edit-date').value = '';
        $('#edit-content').value = '';
        removeClass($('#edit-task'), 'active');
        addClass($('#show-task'), 'active');
    };

    var confirmType = 'add';

    var checkEdit = function() {
        return $('.active').id === 'show-task';
    };

    var changeClassify = function(target) {
        //改变选中类别
        var lastActiveClassify = $('.active-classify');
        if (lastActiveClassify.tagName.toLowerCase() === 'h2') {
            if (lastActiveClassify.nextSibling !== null && lastActiveClassify.nextSibling.nodeType === 1) {
                lastActiveClassify.nextSibling.style.display = 'none';
            }
        }
        else if (lastActiveClassify.tagName.toLowerCase() === 'li') {
            lastActiveClassify.parentNode.style.display = 'none';
        }
        removeClass(lastActiveClassify, 'active-classify');

        if (target.nodeName.toLowerCase() === 'li') {

            addClass(target, 'active-classify');
            target.parentNode.style.display = 'block';
        }
        else if (target.nodeName.toLowerCase() === 'h2') {
            addClass(target, 'active-classify');
            if (target.nextSibling !== null && target.nextSibling.nodeType === 1) {
                target.nextSibling.style.display = 'block';
            }
        }
        else {
            addClass(target, 'active-classify');
        }
    };

    var checkInput = function(tName, tDate, tContent) {
        if (tName === '') {
            alert('请输入标题！');
            return false;
        }
        if (tDate === '') {
            alert('请输入时间！');
            return false;
        }
        if (tContent === '') {
            alert('请输入内容！');
            return false;
        }
        if (tName.replace(/[^\x00-\xff]/g, '__').length > 25) {
            alert('标题不允许超过25个字！');
            return false;
        }
        if (!trim(tDate).match(/^\d{4}-\d{2}-\d{2}$/)) {
            alert('时间格式错误，正确格式为YYYY-MM-DD');
            return false;
        }
        if (tContent.replace(/[^\x00-\xff]/g, '__').length > 400) {
            alert('内容不允许超过400字！');
            return false;
        }
        return true;
    };

    //
    var Controller = {
        init: function() {
            //gtd.addClassify('default-classify');
            gtd.init();
            updateList();
            updateTaskContainer('classify', 'all', ['默认分类']);
            updateTask(getActiveClassify());
        },

        delegateEvents: function() {
            var that = this;
            $.on('body', 'click', function(e) {
                var activeClassify = getActiveClassify();
                var target = getTarget(e);
                switch (target.id) {
                    //增加分类 || 子分类
                    case 'add-classify': {
                        if (checkEdit()) {
                            //        新增分类的时候需要看看当前被激活的是哪栏
                            if (activeClassify.getAttribute('data-name') === '默认分类') {
                                alert('选中“分类列表”可添加新分类！');
                            }
                            else if (activeClassify.getAttribute('data-class') === 'subClassify') {
                                alert('不能继续新增分类！');
                            }
                            else {
                                //增加新分类，根据tagName判断h1还是h2，确定子分类还是新分类
                                var name;
                                if (activeClassify.id === 'all-list-title') {
                                    if (name = prompt('请输入新分类的名称：')) {
                                        gtd.addClassify(name);
                                    }
                                    updateList();
                                    changeClassify(getActiveClassify());
                                }
                                else {
                                    //当前类别
                                    if (name = prompt('请输入子类别名称：')) {
                                        gtd.addSubClassify(activeClassify.getAttribute('data-name'), name);
                                    }
                                    updateList('classify', activeClassify.getAttribute('data-name'));
                                    changeClassify(getActiveClassify());
                                }
                            }
                        }
                        else {
                            alert('取消编辑后再新增分类！');
                        }
                    }
                        break;
                    //新增任务，打开编辑窗口
                    case 'add-task': {
                        if (activeClassify.id === 'all-list-title') {
                            alert('请先选中具体分类再增加任务！');
                        }
                        else {
                            confirmType = 'add';
                            showEdit();
                        }
                    }
                        break;
                    //确认增加任务
                    case 'confirm': {

                        var tName = $('#edit-title').value;
                        var tDate = $('#edit-date').value;
                        var tContent = $('#edit-content').value;
                        var tState = false;

                        if (confirmType === 'add') {
                            if (confirm('确认添加？')) {

                                if (checkInput(tName, tDate, tContent)) {

                                    //判断是哪个分类下的任务，根据activeClassify判断的class判断
                                    if (activeClassify.getAttribute('data-class') !== 'subClassify') {

                                        //console.log('in there');
                                        //分类下的任务
                                        gtd.addTaskOutOfSub(activeClassify.getAttribute('data-name'), tName, tDate, tContent);
                                        updateList('classify', activeClassify.getAttribute('data-name'));
                                        changeClassify(getActiveClassify());
                                        updateTaskContainer('classify', 'all', [activeClassify.getAttribute('data-name')]);
                                        updateTask(activeClassify);
                                    }
                                    else {
                                        console.log('in here');
                                        gtd.addTaskInSub(activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name'), tName, tDate, tContent);
                                        //console.log('after add');
                                        updateList('subClassify', activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name'));
                                        changeClassify(getActiveClassify());
                                        updateTaskContainer('subClassify', 'all', [activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name')]);
                                        updateTask(activeClassify);
                                    }

                                    cancelEdit();
                                }
                            }
                        }
                        else {
                            if (confirm('确认修改任务？')) {

                                var oName = $('#task-title').textContent;
                                var oDate = $('#task-date').textContent.match(/\d{4}-\d{2}-\d{2}/)[0];
                                console.log(oName, oDate);
                                var type;
                                var tmp;
                                var showType = $('.active-state').id;
                                var currentTask = $('.visit');
                                if (checkInput(tName, tDate, tContent)) {

                                    if ((type = activeClassify.getAttribute('data-class')) === 'subClassify') {
                                        gtd.editTaskInSub(activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name'), oName, oDate, tName, tDate, tContent);
                                        //updateList('subClassify', activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name'));
                                        updateTaskContainer(type, showType, [activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name')], [tName, tDate, activeClassify.getAttribute('data-name')]);
                                        $('#task-title').innerHTML = tName + '<span class="icon-checkmark" id="check-mark"></span><span class="icon-pencil2" id="pencil"></span>';
                                        $('#task-date').innerHTML = tDate;
                                        $('#task-content').innerHTML = tContent;
                                    }
                                    else {
                                        if ((tmp = currentTask.getAttribute('data-sub-classify')) !== '') {

                                            gtd.editTaskInSub(activeClassify.getAttribute('data-name'), tmp, oName, oDate, tName, tDate, tContent);

                                            //updateList('classify', activeClassify.getAttribute('data-name'));
                                            updateTaskContainer(type, showType, [activeClassify.getAttribute('data-name')], [tName, tDate, tmp]);

                                            $('#task-title').innerHTML = tName + '<span class="icon-checkmark" id="check-mark"></span><span class="icon-pencil2" id="pencil"></span>';
                                            $('#task-date').innerHTML = tDate;
                                            $('#task-content').innerHTML = tContent;
                                        }
                                        else {
                                            gtd.editTaskOutOfSub(activeClassify.getAttribute('data-name'), oName, oDate, tName, tDate, tContent);
                                            console.log('in here');
                                            //updateList('classify', activeClassify.getAttribute('data-name'));
                                            updateTaskContainer(type, showType, [activeClassify.getAttribute('data-name')], [tName, tDate, '']);

                                            $('#task-title').innerHTML = tName + '<span class="icon-checkmark" id="check-mark"></span><span class="icon-pencil2" id="pencil"></span>';
                                            $('#task-date').innerHTML = tDate;
                                            $('#task-content').innerHTML = tContent;
                                        }
                                    }

                                    cancelEdit();
                                }
                            }
                        }
                    }
                        break;
                    //取消编辑
                    case 'cancel': {
                        cancelEdit();
                    }
                        break;
                }
            });

            $.on('#classify-list', 'click', function(e) {
                //切换分类
                if (checkEdit()) {
                    var target = getTarget(e);
                    if (target.id === 'classify-list') {
                        return;
                    }

                    var isCross = false;
                    if (target.className === 'icon-cross') {
                        isCross = true;
                    }
                    //没有点到XX
                    target.tagName.toLowerCase() === 'span' ? target = target.parentNode : target;

                    //console.log(target);
                    changeClassify(target);

                    var type = target.getAttribute('data-class');
                    if (target.id !== 'all-list-title') {
                        if (type === 'classify') {
                            updateTaskContainer(type, 'all', [target.getAttribute('data-name')]);
                            updateTask(target);
                        }
                        else {
                            updateTaskContainer(type, 'all', [target.getAttribute('data-parent'), target.getAttribute('data-name')]);
                            updateTask(target);
                        }
                    }
                    else {
                        updateTaskContainer('all-list-title', 'all');
                        updateTask(target);
                    }
                    if (isCross) {
                        //删除分类
                        if (type === 'classify') {
                            if (confirm('确认删除该分类？')) {
                                gtd.removeClassify(target.getAttribute('data-name'));
                                that.init();
                            }
                        }
                        //删除子分类
                        else {
                            if (confirm('确认删除该子分类？')) {
                                gtd.removeSubClassify(target.getAttribute('data-parent'), target.getAttribute('data-name'));
                                //that.init();
                                updateList('classify', target.getAttribute('data-parent'));
                                changeClassify(getActiveClassify());
                                updateTaskContainer('classify', 'all', [target.getAttribute('data-parent')]);
                                updateTask(getActiveClassify());
                            }
                        }
                    }
                }
                else {
                    alert('取消编辑后再切换分类！');
                }
            });

            $.delegate('#task-classify', 'li', 'click', function(e) {
                var target = getTarget(e);

                var activeClassify = getActiveClassify();


                if (checkEdit()) {

                    if (activeClassify.id !== 'all-list-title') {
                        var type = activeClassify.getAttribute('data-class');
                        if (type === 'classify') {
                            updateTaskContainer(type, target.id, [activeClassify.getAttribute('data-name')]);
                            updateTask(activeClassify);
                        }
                        else {
                            updateTaskContainer(type, target.id, [activeClassify.getAttribute('data-parent'), target.getAttribute('data-name')]);
                            updateTask(activeClassify);
                        }
                    }
                    else {
                        alert('请在具体分类下切换！');
                    }
                }
                else {
                    alert('取消编辑后再切换任务状态！');
                }
            });


            $.on('#task-panel', 'click', function(e) {
                if (checkEdit()) {

                    var target = getTarget(e);
                    if (target.tagName.toLowerCase() === 'li' || target.tagName.toLowerCase() === 'span') {


                        var activeClassify = getActiveClassify();


                        if (activeClassify.id !== 'all-list-title') {
                            var isCross = false;
                            if (target.tagName.toLowerCase() === 'span') {
                                target = target.parentNode;
                                isCross = true;
                            }
                            //var tName = target.textContent;
                            //var tDate = target.parentNode.parentNode.getElementsByTagName('h1')[0].id;

                            var tInfo = getVisitTaskInfo(target);
                            var tName = tInfo.name;
                            var tDate = tInfo.date;
                            var lastVisit = $('.visit');
                            if (lastVisit !== null && lastVisit !== undefined) {
                                removeClass(lastVisit, 'visit');
                            }
                            addClass(target, 'visit');
                            updateTask(activeClassify, target);

                            if (isCross === true) {
                                var tmp;
                                var type;
                                var showType = $('.active-state').id;
                                var currentTask = $('.visit');
                                if (confirm('确认删除任务？')) {

                                    if ((type = activeClassify.getAttribute('data-class')) === 'subClassify') {
                                        gtd.removeTaskInSub(activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name'), tName, tDate);
                                        updateList('subClassify', activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name'));
                                        changeClassify(getActiveClassify());
                                        updateTaskContainer(type, showType, [activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name')], [tName, tDate, activeClassify.getAttribute('data-name')]);
                                        updateTask(activeClassify);
                                    }
                                    else {
                                        if ((tmp = currentTask.getAttribute('data-sub-classify')) !== '') {

                                            gtd.removeTaskInSub(activeClassify.getAttribute('data-name'), tmp, tName, tDate);

                                            updateList('classify', activeClassify.getAttribute('data-name'));
                                            changeClassify(getActiveClassify());
                                            updateTaskContainer(type, showType, [activeClassify.getAttribute('data-name')], [tName, tDate, tmp]);
                                            updateTask(activeClassify);
                                        }
                                        else {
                                            gtd.removeTaskOutOfSub(activeClassify.getAttribute('data-name'), tName, tDate);
                                            updateList('classify', activeClassify.getAttribute('data-name'));
                                            changeClassify(getActiveClassify());
                                            updateTaskContainer(type, showType, [activeClassify.getAttribute('data-name')], [tName, tDate, '']);
                                            updateTask(activeClassify);
                                        }
                                    }
                                }
                            }
                        }
                        else {
                            alert('请在具体分类下切换！');
                        }
                    }
                }
                else {
                    alert('取消编辑后再切换任务！');
                }
            });

            $.delegate('#task-title', 'span', 'click', function(e) {
                var target = getTarget(e);
                var activeClassify = getActiveClassify();
                var currentTask = $('.visit');

                var tName = currentTask.textContent;
                var tDate = currentTask.parentNode.parentNode.getElementsByTagName('h1')[0].id;

                var tmp;
                var type;

                console.log(currentTask);
                switch (target.id) {
                    case 'check-mark': {
                        if(confirm('确认完成？')) {
                            if ((type = activeClassify.getAttribute('data-class')) === 'subClassify') {
                                gtd.completeTaskInSub(activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name'), tName, tDate);
                                updateList('subClassify', activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name'));
                                changeClassify(getActiveClassify());
                                updateTaskContainer(type, 'had-complete', [activeClassify.getAttribute('data-parent'), activeClassify.getAttribute('data-name')], [tName, tDate, activeClassify.getAttribute('data-name')]);
                                updateTask(activeClassify);
                                //$('#task-title').innerHTML = tName;
                            }
                            else {
                                if ((tmp = currentTask.getAttribute('data-sub-classify')) !== '') {

                                    gtd.completeTaskInSub(activeClassify.getAttribute('data-name'), tmp, tName, tDate);

                                    updateList('classify', activeClassify.getAttribute('data-name'));
                                    changeClassify(getActiveClassify());
                                    updateTaskContainer(type, 'had-complete', [activeClassify.getAttribute('data-name')], [tName, tDate, tmp]);
                                    updateTask(activeClassify);
                                    //$('#task-title').innerHTML = tName;
                                }
                                else {
                                    gtd.completeTaskOutOfSub(activeClassify.getAttribute('data-name'), tName, tDate);
                                    updateList('classify', activeClassify.getAttribute('data-name'));
                                    changeClassify(getActiveClassify());
                                    updateTaskContainer(type, 'had-complete', [activeClassify.getAttribute('data-name')], [tName, tDate, '']);
                                    updateTask(activeClassify);
                                    //$('#task-title').innerHTML = tName;
                                }
                            }
                        }
                    }
                        break;
                    case 'pencil': {
                        confirmType = 'edit';
                        showEdit();
                        $('#edit-title').value = tName;
                        $('#edit-date').value = tDate;
                        $('#edit-content').value = $('#task-content').textContent;
                    }
                        break;
                    default: break;
                }
            });
        }
    };

    return Controller;
})();

window.onload = function() {
    //localStorage.clear();
    controller.init();
    controller.delegateEvents();
};