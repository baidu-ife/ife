/*
*
*   构造器 Task 
*   就写了一个构造器
*   
*
*/
function Task() {
    this.inputTitle = $('.task-title');         //标题输入框
    this.inputDate = $('.task-date input');     //日期输入框
    this.inputTask = $('.task-input');          //内容输入框

    this.allTaskList = $('#allTaskList');       //所有任务
    this.finishList = $('#finishTask');         //完成
    this.unFinishList = $('#unFinishTask');     //未完成
  
}

Task.prototype.init = function(uesrSetting) {
     
    this.addTopMenu(); 
    this.clickActive();
    this.addTask();
    this.showTaskList();
    this.tabTaskList();
    this.selectTaskList();
    this.cancelHandle();
};

//单击目录分类
Task.prototype.clickActive = function() {
    var This = this;
    //左键在菜单栏目单击 选择当前菜单栏
    $('.task-category').onclick = function(ev) {
        var target = ev.target || ev.srcElement;
        var targetName = target.nodeName.toLowerCase();
        if (targetName == 'strong' || targetName == 'span' || targetName == 'div') {
            if (target.className == 'main-left') {
                return;
            }
            if (targetName == 'strong' || targetName == 'span') {
                var iNowmMenu = target.parentNode;
            } else {
                var iNowmMenu = target;            
            }
            //当正点击项 是选中项的父级 那么隐藏所有子项
            if (g.Validator.isParent(iNowmMenu.parentNode, g.currentActiveMenu.parentNode)) {
                removeClass(g.currentActiveMenu, 'active');
                g.currentActiveMenu = iNowmMenu;
                addClass(g.currentActiveMenu, 'active');
                This.hideChildMenu();
                g.onOff = true;
            }
            //重复点击了当前项 切换显示隐藏子项
            else if (iNowmMenu == g.currentActiveMenu) {
                if (g.onOff) {
                    This.showChildMenu();
                    g.onOff = false;
                } else {
                    This.hideChildMenu();
                    g.onOff = true;
                }
            } else {
                removeClass(g.currentActiveMenu, 'active');
                g.currentActiveMenu = iNowmMenu;
                addClass(g.currentActiveMenu, 'active');
                This.showChildMenu(g.currentActiveMenu);
            }
        }
        This.contextmenu();
    }
};

//鼠标在当前选择菜单栏  右击 自定义菜单
Task.prototype.contextmenu = function() {
    var that = this;
    g.currentActiveMenu.oncontextmenu = function(ev) {
        var ev = ev || window.event;
        if (this.id != 'default-menu') {
            showContextMenu(ev.clientX, ev.clientY);
         }
        ev.returnValue = false;
        ev.preventDefault();
        return false;
    }
    var showContextMenu = function (posX,posY) { //创建右键自定义菜单
        var oDiv = $('.context-menu');
        oDiv.style.display = 'block';
        oDiv.style.left = posX + 'px';
        oDiv.style.top = posY + 'px';
        var addMenuBtn = $('.context-menu .add-second-menus');
        var removeMenuBtn = $('.context-menu .remove-second-menus')
        //添加子分类
        addMenuBtn.onclick = function() {
            that.type = 'addChildMenu';
            that.createDialog();
            that.addChildMenu();
        };
        //删除分类
        removeMenuBtn.onclick = function() {
            that.type = 'removeMenu';
            that.createDialog();
            that.removeMenu();
        };
        document.onclick = function() {
            oDiv.style.display = 'none';
        };
    }
}

//创建弹窗
Task.prototype.createDialog = function() {
    this.oDialog = document.createElement('div');

    if (this.type == 'addChildMenu' || this.type == 'addTopMenu' ) {
        this.oDialog.innerHTML = "<p class=dialog-title>请输入您添加类目的名称（亲，鼠标右键可以添加子分类额！）</p><input type=text id=input-kind><button id=confirm>确认</button><button id=cancel>取消</button>";
    } else if (this.type == 'removeMenu') {
        this.oDialog.innerHTML = "<p class=info>您确定删除当前分类吗？</p><button id=confirm>确认</button><button id=cancel>取消</button>";
    } else {
        return false;
    }

    this.oDialog.id = 'dialog';
    document.body.appendChild(this.oDialog);
    this.createMask();
}

//创建一个遮罩
Task.prototype.createMask = function() {
    this.oMask = document.createElement('div');
    this.oMask.id = 'mask';
    document.body.appendChild(this.oMask);
};

//删除分类
Task.prototype.removeMenu = function() {
    var This = this;
    this.cancelHandle();
    $('#confirm').onclick = function(){
        var name = g.currentActiveMenu.getAttribute('data-name');
        var json = g.Data.getItem(name);
        g.Data.removeStrong(json);
        g.Data.updateParent(json);
        var selfLi = g.currentActiveMenu.parentNode;
        selfLi.parentNode.removeChild(selfLi);
        removeClass(g.currentActiveMenu,'active');
        g.currentActiveMenu = $('#default-menu');
        addClass(g.currentActiveMenu,'active');
        This.removeDialog();
    }
}

//添加一级分类目录
Task.prototype.addTopMenu = function() {
    var This = this;
    var aAddMenus = $('.add-top-menus button');
    aAddMenus.onclick = function(){
        This.type = 'addTopMenu';
        This.createDialog();

        $('#confirm').onclick = function() {
            if (g.Validator.addMenu('mainBox')) {

                var value = $('#input-kind').value;
                var oLi = document.createElement('li');
                oLi.className = 'menus';
                var nowTime = new Date().getTime();
                var str = '<div class=menus-title data-name='+nowTime+'><span class=iconfont>&#xe622;</span><strong>'+value+'</strong>(<span class=unFinishNum>0</span>)</div>';
                oLi.innerHTML = str;
                $('#mainBox').appendChild(oLi);
                var selfData = {
                    name: nowTime,        //时间戳，作为键值
                    title: value,         //分类名
                    child: [],
                    parent: 'mainBox',
                    liClassName: 'menus',
                    divClassName: 'menus-title',
                    iconFontHtml: '<span class=iconfont>&#xe622;</span>',
                    unFinishNum: 0,       //未完成任务个数
                    task: []
                };
                g.Data.saveStroage(selfData);
                g.Data.addParentLocalStorage(selfData.parent, 'child', selfData.name);
                This.removeDialog();
            }
        };
        This.cancelHandle();
    }; 
};

//添加子分类
Task.prototype.addChildMenu = function() {
    this.cancelHandle();
    var This = this;
    $('#confirm').onclick = function() {
        var name = g.currentActiveMenu.getAttribute('data-name');
        if (g.Validator.addMenu(name)) {
            var value = $('#input-kind').value;     
            var oParent = g.currentActiveMenu.parentNode;
            var parentName = g.currentActiveMenu.getAttribute('data-name');
            var nowTime = new Date().getTime();
            var str = [];
            str.push('<li class=second-menus>');
            str.push('<div class=second-menus-title data-name='+nowTime+'>');
            str.push('<span class=iconfont>&#xe658;</span><strong>');
            str.push(value);
            str.push('</strong>(<span class=unFinishNum>0</span>)</div></li>');
            str = str.join('');    

        // 如果已经存在分类 从最后插入新子分类
        if (oParent.getElementsByTagName('ul')[0]) {
            var oLi = document.createElement('li');
            oLi.className = 'second-menus';
            var str2 = [];
            str2.push('<div class=second-menus-title data-name=');
            str2.push(nowTime);
            str2.push('><span class=iconfont>&#xe658;</span><strong>');
            str2.push(value);
            str2.push('</strong>(<span>0</span>)</div>');
            str2 = str2.join('');
            oLi.innerHTML = str2;
            oParent.getElementsByTagName('ul')[0].appendChild(oLi);
        }
        //新创建一个子分类
        else {
            var oUl = document.createElement('ul');
            oUl.innerHTML = str;
            oParent.appendChild(oUl);
        } 
        var selfData = {
            name: nowTime,      
            title: value,
            child: [],
            parent: parentName,
            liClassName: 'second-menus',
            divClassName: 'second-menus-title',
            iconFontHtml: '<span class=iconfont>&#xe658;</span>',
            unFinishNum: 0,
            task: []
        };
        g.Data.saveStroage(selfData);
        g.Data.addParentLocalStorage(parentName, 'child', selfData.name);
        This.removeDialog();
    }
    };
    
};

//取消按钮
Task.prototype.cancelHandle = function() {
    var that = this;
    
    if ($('#cancel')) {
        $('#cancel').onclick = function() {
            that.removeDialog();
        }    
    }
}

//删除弹窗和遮罩
Task.prototype.removeDialog = function() {
    document.body.removeChild($('#dialog'));
    document.body.removeChild($('#mask'));
}

//显示子分类
Task.prototype.showChildMenu = function() {
    this.showTaskList();

    var name = g.currentActiveMenu.getAttribute('data-name');
    var JSON = g.Data.getItem(name);
    var oUl = g.currentActiveMenu.parentNode.getElementsByTagName('ul')[0] || null;
    
    if (oUl) {
        oUl.style.display = 'block';
        return;
    }

    if (JSON.child.length) {
        var str = '';
        for (var i = 0; i<JSON.child.length; i++) {
            var childData = g.Data.getItem(JSON.child[i]);
            var arr = [];
            arr.push('<li class='+childData.liClassName+'>');
            arr.push('<div class="'+childData.divClassName+'" data-name='+childData.name+'>');
            arr.push(childData.iconFontHtml);
            arr.push('<strong>'+childData.title+'</strong>');
            arr.push('(<span class=unFinishNum>'+childData.unFinishNum+'</span>)</div></li>');
            arr = arr.join('')
            str += arr;
        }
        var oUl = document.createElement('ul');
        oUl.innerHTML = str;
        g.currentActiveMenu.parentNode.appendChild(oUl);
    }
}

 //隐藏子分类
Task.prototype.hideChildMenu = function() {
    var oUl = g.currentActiveMenu.parentNode.getElementsByTagName('ul') || null;
    //隐藏当前项所有子级
    if (oUl.length) {
        for (var i = 0; i<oUl.length; i++) {
            oUl[i].style.display = 'none';
        }
    }
}

//展示中间栏 任务列表
Task.prototype.showTaskList = function() {
    function getHtml(data,type) {
        var str = '';
        var obj = {};
        var arr = [];
        //遍历当前子分类下面的任务
        (function (data,type) {
            for (var i = 0; i<data.task.length; i++) {                
                var taskData = g.Data.getItem(data.task[i]);
                if (type == 1 && taskData.finish) {
                    continue;
                } else if (type == 2 && !taskData.finish) {
                    continue;
                }
                if (taskData.finish) { //如果任务完成，那么给一个完成class
                    var html = '<dd class="finish" data-name='+taskData.name+'>'+taskData.title+'</dd>';
                } else {
                    var html = '<dd data-name='+taskData.name+'>'+taskData.title+'</dd>'
                }
                if (!obj[taskData.date]) {
                    obj[taskData.date] = html; 
                    arr.push(taskData.date);
                } else {
                    obj[taskData.date] += html; 
                }
            }
            // //获取子分类的任务
            for (var i = 0; i<data.child.length; i++) {
                var dataChild = g.Data.getItem(data.child[i]);
                arguments.callee(dataChild,type);
            }
        })(data,type);
        arr.sort(function(a,b){ // 对日期排序
            a = new Date(a.split('-').toString()).getTime();
            b = new Date(b.split('-').toString()).getTime();
            return a>b?-1:1;
        });
        for (var i = 0; i<arr.length; i++) {
            str += '<dl><dt>'+arr[i]+'</dt>'+obj[arr[i]]+'</dl>';
        } 
        return str;
    }

    var data = g.Data.getItem(g.currentActiveMenu.getAttribute('data-name'));
    $('#allTaskList').innerHTML = getHtml(data);
    $('#unFinishTask').innerHTML = getHtml(data,1);
    $('#finishTask').innerHTML = getHtml(data,2);
    // this.showFinish();
};

//增加任务按钮操作
Task.prototype.addTask = function() {
    var that = this;
    var oAddTaskBtn = $('.add-task button');
    //保存按钮
    var oTaskSave = $('.add-save button'),
        oTaskCancel = $('.cancel-save button');
    
    oAddTaskBtn.onclick = function() { //新增任务
        that.removeDisable();
        that.initInput();
        that.saveTask();
        that.cancelSave();

        that.inputTitle.focus();
        that.inputDate.value = g.getFormatDate();
        that.inputTitle.onblur = function() {
           if (!g.Validator.title(this.value)) {
                $('.title-tip').innerHTML = '标题字数不能小于2个字或者大约15字';
                this.style.border = "1px solid red";
                this.style.background = '#fff';
           } else {
                $('.title-tip').innerHTML = '';
                this.style.border = "1px solid #7d999d";
           }
        };
        that.inputDate.onblur = function() {
            if (!g.Validator.date(this.value)) {
                $('.date-tip').innerHTML = '请输入正确日期！格式2015-05-10';
                this.style.border = "1px solid red";
            } else {
                $('.date-tip').innerHTML = '';
                this.style.border = "1px solid #7d999d";
            }
        };
       
        that.inputTask.onblur = function() {
            var result = g.Validator.task(this.value);
            if (result == 1) {
                this.style.border = '1px solid red';
                alert('输入值不能为空~');
            } else if (result == 2) {
                this.style.border = '1px solid red';
                alert('输入值不能超过200字符~');
            } else {
                this.style.border = '1px solid #000';
            }
        };
       
    }
}

//初始化页面三个输入框
Task.prototype.initInput = function() {
    this.inputTask.value = '';
    this.inputDate.value = '';
    this.inputTitle.value = '';
}

Task.prototype.removeDisable = function() {
    this.inputTask.removeAttribute('disabled');
    this.inputDate.removeAttribute('disabled');
    this.inputTitle.removeAttribute('disabled');
}

Task.prototype.setDisable = function() {
    this.inputTitle.setAttribute("disabled",true);
    this.inputDate.setAttribute("disabled",true);
    this.inputTask.setAttribute("disabled",true);
}

//保存任务按钮操作
Task.prototype.saveTask = function() {
    var that = this;
    var oTaskSave = $('.add-save button');

    oTaskSave.onclick = function() {
            
       if (that.inputTask.getAttribute('disabled') === null) {  //当文本框是disabled状态 不可添加新任务
            if (g.Validator.title(that.inputTitle.value) 
                &&g.Validator.date(that.inputDate.value) 
                &&g.Validator.task(that.inputTask.value) ==3) {

                var nowTime = new Date().getTime();
                var parentName = g.currentActiveMenu.getAttribute('data-name');
                var data = {
                    name: nowTime,
                    title: that.inputTitle.value,
                    date: that.inputDate.value,
                    taskContent: that.inputTask.value,
                    parent: parentName,
                    finish: false
                };
                var parentData = g.Data.getItem(parentName);
                parentData.task.push(nowTime);
                g.Data.saveStroage(parentData);
                g.Data.saveStroage(data);
                createNewTask(data.title, data.date, data.name);
                that.setDisable();
                that.edit(data);
                g.Data.updateUnFinishNum(parentData, 'add');
                that.updateUnFinishNum(parentData);
                function createNewTask (title,date,name) {
                    if (g.Validator.isDateEqual(date)) { //判断是否有相同日期 

                        var oDd = document.createElement('dd');
                        oDd.setAttribute('data-name',name);
                        oDd.innerHTML = title;
                        g.Validator.isDateEqual(date).appendChild(oDd);

                        var uDd = document.createElement('dd');
                        uDd.setAttribute('data-name',name);
                        uDd.innerHTML = title;
                        that.unFinishList.appendChild(uDd);
                    } else {
                        var oDl = document.createElement('dl');
                        oDl.innerHTML = '<dt>'+date+'</dt><dd data-name='+name+'>'+title+'</dd>';
                        that.allTaskList.appendChild(oDl);
                        var uDl = document.createElement('dl');
                        uDl.innerHTML = '<dt>'+date+'</dt><dd data-name='+name+'>'+title+'</dd>';
                        that.unFinishList.appendChild(uDl);
                    }
                }
            }
        }  
    }
};

//选项卡tab切换 所有任务 完成 未完成 
Task.prototype.tabTaskList = function() {
    var oTab = $('.task-tab-head'),
        aTabHead = oTab.getElementsByTagName('button'),
        aTabCon = $('.task-tab-con').getElementsByTagName('div');

    for (var i = 0; i<aTabHead.length; i++) {
        aTabHead[i].index = i;
        aTabHead[i].onclick = function() {
            for (var j = 0; j<aTabHead.length; j++) {
                aTabHead[j].className = '';
                removeClass(aTabCon[j], 'active');
            }
            this.className = 'active';
            addClass(aTabCon[this.index], 'active');
        }
    } 
};

//单击选择某一项任务
Task.prototype.selectTaskList = function() {
    var that = this;
    $('.task-tab-con').onclick = function(ev) {
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() == 'dd') {
            var name = target.getAttribute('data-name');
            var attr = '[data-name='+name+']';
            var aElem = getQueryAttr(attr, 'dd', this);
            var json = g.Data.getItem(name);
            if (g.iCurentDd.length) {
                for (var i = 0; i<aElem.length; i++) {
                    if (g.iCurentDd[i] == target) return;
                }
                for (var i = 0; i<aElem.length; i++) {
                    addClass(aElem[i], 'on');
                    removeClass(g.iCurentDd[i],'on');
                    g.iCurentDd[i] = aElem[i];
                }
                that.showTaskContent(target);
            } else {
                for (var i = 0; i<aElem.length; i++) {
                    addClass(aElem[i], 'on')
                    g.iCurentDd.push(aElem[i]);
                }
                that.showTaskContent(target);
            }
            that.finishTask(g.Data.getItem(name));
        }
    }
}

//右侧展示具体任务
Task.prototype.showTaskContent = function(target) {
    var json = g.Data.getItem(target.getAttribute('data-name'));
    this.inputTitle.value = json.title;
    this.inputDate.value = json.date;
    this.inputTask.value = json.taskContent;
    this.edit(json);
};

//修改任务按钮操作
Task.prototype.edit = function(json) {
    var that = this;
    var oTaskSave = $('task-edit');
    $('.task-edit').onclick = function() {
        that.inputTitle.removeAttribute('disabled');
        that.inputDate.removeAttribute('disabled');
        that.inputTask.removeAttribute('disabled');
        that.inputTitle.focus();
        that.saveEdit(json);
        that.cancelSave(json);
    }
}

//保存修改任务按钮
Task.prototype.saveEdit = function(json) {
    var oTaskSave = $('.add-save button');
    var that = this;
    oTaskSave.onclick = function() {

        var name = json.name;
        var attr = '[data-name='+name+']';
        var aElem = getQueryAttr(attr, 'dd', $('.task-tab-con'));
        for (var i = 0; i<aElem.length; i++) {
            aElem[i].innerHTML = that.inputTitle.value;
        }
        json.title = that.inputTitle.value;
        json.date = that.inputDate.value;
        json.taskContent = that.inputTask.value;
        g.Data.saveStroage(json);
        that.setDisable();
    }
}

//取消修改
Task.prototype.cancelSave = function(json) { //取消修改
    var that = this;
    $('.cancel-save').onclick = function() {
        if (json) {
            that.inputTitle.value = json.title;
            that.inputDate.value = json.date;
            that.inputTask.value = json.taskContent;
        } else {
            that.inputTitle.value = '';
            that.inputDate.value = '';
            that.inputTask.value = '';
        }
        that.setDisable();
    }
}

//完成任务按钮
Task.prototype.finishTask = function(json) {
    var that = this;
    $('.task-finish').onclick = function() {
        alert('任务完成！');
        json.finish = true;
        g.Data.updateUnFinishNum(json,"sub");
        g.Data.saveStroage(json);
        that.showTaskList(json);
        that.updateUnFinishNum(g.Data.getItem(json.parent));
    }
}

//更新目录分类旁 小数字（未完成任务数量）
Task.prototype.updateUnFinishNum = function(json) {
    while (json) {
        var attr = '[data-name='+json.name+']';
        var oDiv = getQueryAttr(attr,'div',document)[0];
        var num = oDiv.getElementsByTagName('span')[1];
        num.innerHTML = json.unFinishNum;
        json = g.Data.getItem(json.parent);
    }
}
var t1 = new Task();
    t1.init();    
