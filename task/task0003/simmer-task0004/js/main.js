require.config({
    paths: {
    }
});
require(['selectors','tool','handler'],function (a,tool,handler) {
    if(!window.localStorage)  {// 如果不支持localstorage的话则返回
        alert("don't support localStorage rightnow");
    }
    //window.localStorage.clear();
    tool.init(); // 初始化函数 包括装载
    /*----------变量声明/配置-----------------*/
    var classBox = $('.class-cont')[0];
    var taskBox = $('.task-list-cont')[0];
    window.modification = false;// 标记当前是修改任务还是新建的任务
    //tool.storageOprate.creatMainItem('study',null,tool.creatTimestamp());
    //tool.storageOprate.creatMainItem('study-ife','main',tool.creatTimestamp());
    /*-------------点击事件------------------------*/
     /* 
    事件代理
    左侧类名为child-item的点击事件
    作用：更新右侧任务列表
    payattension！此处只是传递函数名，后面不加括号
    */
    tool.delegateEvent(classBox,'child-item','click',handler.classifyClickHandler);
    /* 
    事件代理
    左侧类名为main-item的点击事件
    作用：更新右侧任务列表
    payattension！此处只是传递函数名，后面不加括号
    */
    tool.delegateEvent(classBox,'main-item','click',handler.classifyClickHandler);
     /* 
    事件代理
    左侧类名为delete-icon的点击事件
    作用：删除分类
    payattension！此处只是传递函数名，后面不加括号
    */
    tool.delegateEvent(classBox,'delete-icon','click',handler.classifyDeleteHandler);
     /* 
    事件代理
    中间类名为item的点击事件
    作用：更新右侧任务详情
    payattension！此处只是传递函数名，后面不加括号
    */
    tool.delegateEvent(taskBox,'item','click',handler.taskListClickHandler);
    /*
    新增分类按钮点击事件
    */
    var addClass = $('#creatclass');
    tool.eventUtil.on(addClass,'click',handler.addClassHandler);
    /*
    新增任务按钮点击事件
    */
    var addTask = $('#creattask');
    tool.eventUtil.on(addTask,'click',handler.addTaskHandler);
    /*
    完成任务按钮点击事件
    */
    var taskDoneBtn = $('#task-done-btn');
    tool.eventUtil.on(taskDoneBtn,'click',handler.finishedTaskHandler);
    /*
    修改任务按钮点击事件
    */
    var taskModiBtn = $('#task-modification-btn');
    tool.eventUtil.on(taskModiBtn,'click',handler.modificationTaskHandler);
    /*
    编辑区确认保存任务按钮点击事件
    */
    var saveBtn = $('#save');
    tool.eventUtil.on(saveBtn,'click',handler.saveTaskHandler);
    /*
    编辑区取消保存任务按钮点击事件
    */
    var cancelBtn = $('#cancel');
    tool.eventUtil.on(cancelBtn,'click',handler.cancelTaskHandler);
    /*
    弹窗确定按钮点击事件
    */
    var alertBtn = $('#alert-btn');
    tool.eventUtil.on(alertBtn,'click',handler.confirmBtnClickHandler);
    /*
    遮罩关闭按钮点击事件
    */
    var windowClose = $('.close')[0]
    windowClose.onclick= function () {
        $('##alert-btn').innerHTML = '确定';
        $('.window')[0].style.display = 'none';
    }
    /*
    中间任务列表切换
    */
    var all = $('#all-task');
    all.onclick = function () {
        done.className = '';
        doing.className = '';
        all.className = 'click';
        var id = $('.active')[0].getAttribute('data-id');
        tool.updataTask(id,'all');
    }
    var doing = $('#unfinished-task');
    doing.onclick = function () {
        done.className = '';
        doing.className = 'click';
        all.className = '';
        var id = $('.active')[0].getAttribute('data-id');
        tool.updataTask(id,'doing');
    }
    var done = $('#done-task');
    done.onclick = function () {
        done.className = 'click';
        doing.className = '';
        all.className = '';
        var id = $('.active')[0].getAttribute('data-id');
        tool.updataTask(id,'done');
    }
    

})