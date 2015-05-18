/**
 * Created by xieyicheng on 2015/5/2.
 */

function changeEditorAble(flat){
    if(flat==true){
        $("#textarea").setAttribute("disabled","disabled");
        $("#title").setAttribute("disabled","disabled");
        $("#time").setAttribute("disabled","disabled");
    }
    else{
        $("#textarea").removeAttribute("disabled");
        $("#title").removeAttribute("disabled");
        $("#time").removeAttribute("disabled");
    }
}

function updateTaskView(obj){
    removeClass($(".task_info_end"),"hidden");
    removeClass($(".task_info_editor"),"hidden");
    addClass($(".task_info_save"),"hidden");
    $("#textarea").value = obj.content;
    $("#title").value = obj.title;
    $("#time").value = obj.date;
}

function parseDom(arg){
    var objE = document.createElement("div");
    objE.innerHTML = arg;
    return objE.childNodes[0];
}

function saveTask(){
    if(!golbal.secondType){
        alert("请选择分类")
        return;
    }

    var text =  $("#textarea").value;
    var title = $("#title").value;
    var date = $("#time").value;
    if(text!=""&&title!=""&&date!=""){
        if(/^\d{4}(\-)\d{1,2}\1\d{1,2}$/.test(date)){
            if(text.length>1000){
                alert("内容长度太长了");
                return;
            }

            if(confirm("确定要保存吗?")){
                var data;
                var typeData = store.findById(typeList,golbal.firstType_id);
                if(golbal.editing) {
                        if(golbal.currentTaskId){
                            data = store.findById(taskList,golbal.currentTaskId);
                            data.title = title;
                            data.content = text;
                            data.date = date;

                            store.modifyData(taskList,golbal.currentTaskId,data);
                        }
                        else{
                            alert("请选择任务")
                        }
                    golbal.editing = false;
                }
                else{
                    data = {
                        id:++golbal.baseTaskId,
                        name:"todo1",
                        date:date,
                        firstType_id:golbal.firstType_id,
                        secondType:golbal.secondType,
                        status:1,
                        title:title,
                        content:text
                    };
                    typeData.size++;
                    var secondType = typeData.taskList;
                    for (var i = 0; i < secondType.length; i++) {
                        var obj = secondType[i];
                        if(obj.secondType == golbal.secondType){
                            obj.todoSize++;
                        }
                    }
                    golbal.taskNum++;
                    taskTypeCtrl.updateAllTask();
                    store.modifyData(typeList,golbal.firstType_id,typeData);
                    store.addToArray(taskList,data);
                }
                store.setItem("taskList",taskList);
                store.setItem("typeList",typeList);
                store.setItem("golbal",golbal);
                taskTypeCtrl.refresh();
                var nav  = store.dataFilter(taskList,golbal.firstType_id,golbal.secondType);
                taskCtrl.initData(nav);
                each($("#task_item_wrap_nav li"), function (value) {
                    removeClass(value,"task_item_wrap_nav_active");
                });
                addClass($("#task_item_wrap_nav li")[0],"task_item_wrap_nav_active");
                changeEditorAble(true);
            }


        }
        else{
            alert("日期格式错误");
        }
    }
    else{
        alert("必填信息不能为空")
    }
}

var taskTypeCtrl = {
    typeHTML:"<li class='first_type'><%=typeName> (<span><%=typeSize></span>) <span class='delete_type'>X</span></li>",
    secondTypeHTML:"<li class='second_type'><%=secondType> (<span><%=taskSize></span>)</li>",
    taskWrap:"<ul class='task_type_inner_ul hidden'></ul>",
    initData: function(data){
        for (var i = 0; i < data.length; i++) {
            var temple = taskTypeCtrl.typeHTML;
            var obj = data[i];
            temple = temple.replace("<%=typeName>",obj.name);
            temple = temple.replace("<%=typeSize>",obj.size);
            var li = parseDom(temple);
            var id = obj.id;
            li.setAttribute("data-id",id);
            var taskWrap = parseDom(taskTypeCtrl.taskWrap);
            for (var j = 0; j < obj.taskList.length; j++) {
                var task = obj.taskList[j];
                var taskTemple = taskTypeCtrl.secondTypeHTML;
                taskTemple = taskTemple.replace("<%=secondType>",task.secondType);
                taskTemple = taskTemple.replace("<%=taskSize>",task.todoSize);
                task_li = parseDom(taskTemple);
                task_li.setAttribute("data-id",id);
                task_li.setAttribute("data-type",task.secondType);
                taskWrap.setAttribute("data-id",id);
                taskWrap.setAttribute("data-type",task.secondType);
                taskWrap.appendChild(task_li);

            }
            li.appendChild(taskWrap);
            $("#task_type_wrap_ul").appendChild(li);

        }
    },
    addTaskType: function (taskName) {
        var temple = taskTypeCtrl.typeHTML;
        temple = temple.replace("<%=typeName>",taskName);
        temple = temple.replace("<%=typeSize>",0);
        var li = parseDom(temple);
        var taskWrap = parseDom(taskTypeCtrl.taskWrap);
        $("#task_type_wrap_ul").appendChild(li);
        var newData = {
            id:++golbal.baseTypeId,
            name:taskName,
            size:0,
            taskList:[
            ]
        };
        store.addToArray(typeList,newData);
        store.setItem("typeList",typeList);
        taskWrap.setAttribute("data-id",golbal.baseTypeId);
        store.setItem("golbal",golbal);
        li.appendChild(taskWrap);

    },
    addSecondType:function(element,taskName){
        var id = element.getAttribute("data-id");
        if(id == 0){
            alert("默认分类不能添加子分类");
            return;
        }
        var type = element.getAttribute("data-type");
        var taskTemple = taskTypeCtrl.secondTypeHTML;
        taskTemple = taskTemple.replace("<%=secondType>",taskName);
        taskTemple = taskTemple.replace("<%=taskSize>",0);
        var addedElement = parseDom(taskTemple);
        addedElement.setAttribute("data-id",id);
        addedElement.setAttribute("data-type",taskName);
        element.appendChild(addedElement);
        var firstType = store.findById(typeList,id);
        var newData = {
            secondType:taskName,
            todoSize:0
        };
        firstType.taskList.push(newData);
        store.modifyData(typeList,firstType.id,firstType);
        store.setItem("typeList",typeList);

    },
    removeTask: function (element) {
        element.parentNode.removeChild(element);
    },
    updateAllTask: function () {
        $("#allTask").innerText = golbal.taskNum;
    },
    refresh: function () {
        $("#task_type_wrap_ul").innerHTML = "";
        taskTypeCtrl.initData(typeList);
    }
};

var taskCtrl = {
    taskHTML:"<ul class='task_item_inner_ul'></ul>",
    tempTime:null,
    initData: function (data) {
        $("#task_item_ul").innerHTML="";
        var li;
        var taskInnerUl;
        for (var i = 0; i < data.length; i++) {
            var obj = data[i];
            if(taskCtrl.tempTime!=obj.date){
                li = document.createElement("li");
                taskInnerUl = parseDom(taskCtrl.taskHTML);
                li.innerHTML = obj.date;
            }
            var taskItem = document.createElement("li");
            taskItem.innerHTML = obj.title;
            taskItem.setAttribute("data-id",obj.id);
            taskItem.setAttribute("data-status",obj.status);
            taskInnerUl.appendChild(taskItem);
            if(taskCtrl.tempTime!=obj.date){
                li.appendChild(taskInnerUl);
                taskCtrl.tempTime = obj.date;
                $("#task_item_ul").appendChild(li);
            }
        }
        each($("[data-status=0]"), function (value) {
            addClass(value,"status_0");
        });
        taskCtrl.tempTime = null;
    },
    refresh: function () {
        taskCtrl.initData( store.dataFilter(taskList,golbal.firstType_id,golbal.secondType));
    }
};

taskTypeCtrl.initData(typeList);
taskCtrl.initData( store.dataFilter(taskList,golbal.firstType_id,golbal.secondType));
taskTypeCtrl.updateAllTask();
changeEditorAble(true);
(function () {
    //删除分类
    $.delegate("#task_type_wrap_ul",".delete_type","click",function(e){
        var clicked = getTarget(e);
        var li = clicked.parentNode;
        var ul = li.parentNode;
        var isDelete = confirm("确定要删除这个分类吗");
        if(isDelete){
            ul.removeChild(li);
            var id = li.getAttribute("data-id");
            var data = store.findById(typeList,id);
            store.removeById(typeList,id);
            store.setItem("typeList",typeList);
        }
    });
    //新增分类
    $.click(".task_add_type", function (e) {
        $("#addTaskType").value = "";
        removeClass($(".addTaskType_wrap"),"hidden");
    });
    //确认新增分类
    $.click("#addTaskType_submit", function () {
        var text = $("#addTaskType").value;
        var select,ul;
        if(text!=""){
           addClass($(".addTaskType_wrap"),"hidden");
           select = $(".first_select");
           if(select){
               ul = select.getElementsByTagName("ul")[0];
               taskTypeCtrl.addSecondType(ul,text);
           }
           else{
               taskTypeCtrl.addTaskType(text);
           }
       }
    });
    //取消新增分类
    $.click("#addTaskType_close", function () {
        addClass($(".addTaskType_wrap"),"hidden");
    });
    //查看任务
    $.delegate("#task_item_ul","li","click", function (e) {
        var target = getTarget(e);
        var id = target.getAttribute("data-id");
        if(id){
            changeEditorAble(true);
            golbal.currentTaskId = id;
            each($("#task_item_ul li"), function (value) {
              removeClass(value,"task_active");
            });
            addClass(target,"task_active");
            updateTaskView(store.findById(taskList,id))
        }
    });
    //已完成 未完成的切换
    $.click("#task_item_wrap_nav li", function (e) {
        var target = getTarget(e);
        var status = target.getAttribute("data-status");
        golbal.status = status;
        var data;
        if(status>1){
            data =  store.dataFilter(taskList,golbal.firstType_id,golbal.secondType);
        }
        else{
            data = store.dataFilter(taskList,golbal.firstType_id,golbal.secondType,golbal.status);
        }
        taskCtrl.initData(data);
        each($("#task_item_wrap_nav li"), function (value) {
            removeClass(value,"task_item_wrap_nav_active");
        });
        addClass(target,"task_item_wrap_nav_active");

    });

    //二级分类点击
    $.delegate("#task_type_wrap_ul",".second_type","click",function(e){
        var target = getTarget(e);
        var id = target.getAttribute("data-id");
        var type = target.getAttribute("data-type");
        var nav_li = $("#task_item_wrap_nav li");
        each($("#task_type_wrap_ul .second_type"), function (value) {
            removeClass(value,"task_type_active");
        });
        addClass(target,"task_type_active");
        golbal.firstType_id = id;
        golbal.secondType = type;
        each(nav_li, function (value) {
            removeClass(value,"task_item_wrap_nav_active");
        });
        addClass(nav_li[0],"task_item_wrap_nav_active");
        taskCtrl.refresh();

    });
    //一级分类的点击
    $.delegate("#task_type_wrap_ul",".first_type","click",function(e){
        var target = getTarget(e);
        var ul = target.getElementsByTagName("ul")[0];
        if(hasClass(target,"first_select")){
            removeClass(target,"first_select");
        }
        else{
            each($("#task_type_wrap_ul .first_type"), function (value) {
                removeClass(value,"first_select");
            });
            addClass(target,"first_select");

        }
        each($("#task_type_wrap_ul ul"), function (value) {
            addClass(value,"hidden");
        });
        if(hasClass(target,"first_select")){
            removeClass(ul,"hidden");
        }
        else{
            addClass(ul,"hidden");
        }

    });

    //确认保存
    $.click(".task_info_end", function () {
        var save = confirm("确定完成了这个任务了吗?");
        if(save){
            var data = store.findById(taskList,golbal.currentTaskId);
            if(data){
                data.status = 0;
                store.modifyData(taskList,data.id,data);
                store.setItem("taskList",taskList);
                taskCtrl.refresh()
            }
        }
    });

    //新建任务
    $.click(".task_add_task", function () {
        changeEditorAble(false);
        updateTaskView({content:"",title:"",date:""});
        addClass($(".task_info_end"),"hidden");
        addClass($(".task_info_editor"),"hidden");
        removeClass($(".task_info_save"),"hidden");
    });

    //保存新任务
    $.click(".task_info_save", function () {
        saveTask();
    });

    //编辑
    $.click(".task_info_editor", function () {
        if(!golbal.editing){
            if(confirm("确定要修改吗?")){
                golbal.editing = true;
                changeEditorAble(false);
            }
        }
        else{
            saveTask();
        }
    })
})();