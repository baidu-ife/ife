/**
 * Created by Dottie on 2015/5/14.
 */


/*-------------------------------------------------------任务导航获取和显示---------------------------------------------------------*/

var taskClasses = new taskClass();
var mytasks = new tasks();
//var mytask = new tasks();
var getClasses = function(){
    this.init();
};

getClasses.prototype = {
    init: function(){
        var that = this;
        this.isAll = false;
        this.statusSelected = 0;//0表示所有任务，-1表示未完成任务，1表示已完成任务
        this.curStatus = $(".todo-class .current");
        this.curTopClassId = taskClasses.classArr[0].id;
        this.curClassId = taskClasses.classArr[0].id;
        this.taskContainer = $(".date-list");
        this.todoContainer = $("#showBox");
        this.getClassNav();
        addClickEvent($("#isAll"), function(){
            that.isAll = true;
            that.statusSelected = 0;//0表示所有任务，-1表示未完成任务，1表示已完成任务
            removeClass(that.curStatus, "current");
            that.curStatus = $("#0");
            addClass(that.curStatus, "current");
            $(".task-c").style.display = "none";
            that.getTaskNav();
        });
        addClickEvent($("#classification"), function(){
            that.isAll = false;
            that.statusSelected = 0;//0表示所有任务，-1表示未完成任务，1表示已完成任务
            removeClass(that.curStatus, "current");
            that.curStatus = $("#0");
            addClass(that.curStatus, "current");
            that.curTopClassId = taskClasses.classArr[0].id;
            that.curClassId = taskClasses.classArr[0].id;
            $(".task-c").style.display = "block";
            that.getClassNav();
        });
        addClickEvent($("#addTaskBtn"), function(){
            if(that.addOrEdit == 0){
                that.addTask();
            }else{
                that.editTask();
            }
        });
        addClickEvent($("#returnBtn"), function(){
            $("#editBox").style.display = "none";
            $("#showBox").style.display = "block";
        });
        addClickEvent($("#edit-coin"), function(){
            that.addOrEdit = 1;//0表示是要添加任务，而1表示编辑任务
            $("#showBox").style.display = "none";
            that.showEdit();
            $("#editBox").style.display = "block";
        });
        addClickEvent($("#add-class"), function(){
			if(that.curTopClassId == 0){
				alert("系统不允许为’默认分类‘添加子分类，请选择其他分类作为上层分类！");
				return;
			}
            $("#addBox").style.display = "block";
        });
        addClickEvent($(".add-task"), function(){
            that.addOrEdit = 0;//0表示是要添加任务，而1表示编辑任务
            $("#taskName").value = "";
            $("#taskDate").value = "";
            $("#taskContent").value = "";
            $("#showBox").style.display = "none";
            $("#noContent").style.display = "none";
            $("#editBox").style.display = "block";
        });
        addClickEvent($(".close"), function(){
            $("#addBox").style.display = "none";
        });
        addClickEvent($("#sureAdd"), function(){
            that.addTaskClass();
        });
        addClickEvent($(".todo-class"), function(e){
            var e = e || window.event;
            var target = e.srcElement || e.target;
            if(target.tagName == "LI" && target != that.curStatus){
                removeClass(that.curStatus, "current");
                addClass(target, "current");
                that.curStatus = target;
                that.statusSelected = target.id;
            }
            that.getTaskNav();
        });
        addClickEvent($("#complete-coin"), function(){
            //that.selectedTodo.status = "1";
            var sureComp = confirm("您确定要将此任务状态设置为已完成吗？");
            if(sureComp){
                mytasks.completeTask(that.selectedTodo.id);
                that.statusSelected = 1;
                that.curStatus.className = "";
                that.curStatus = $("#" +  that.statusSelected, that.taskContainer);
                that.getTaskNav();
                addClass(that.curStatus, "current");
                that.selTop.childNodes[1].innerHTML = parseInt(that.selTop.childNodes[1].innerHTML) - 1;
                that.curClass.childNodes[1].innerHTML = parseInt(that.curClass.childNodes[1].innerHTML) - 1;
            }else{
                return;
            }
        });
        //addClickEvent();
    },
    getClassNav: function(){
        this.myClasses = taskClasses.classArr;
        this.topClasses = taskClasses.getTop();
        this.container = $(".task-c");
        this.topCountArr = [];
        var html = '';
        var classHtml = '';
        for(var i in this.topClasses){
            var curHtml;
            var subClasses = taskClasses.getSubClass(this.topClasses[i].id);
            var topCount = 0;
            if(i == 0){
                topCount = this.getByStatus(mytasks.getByClass(0), -1).length;

            }
            if(this.topClasses[i].id == this.curTopClassId){
                curHtml = '<li id="topC0'+ i +'">'
                    +      '<a class="class-name selected">' + this.topClasses[i].name+ '</a><span class="topCount">('+ topCount +')</span>';
            }else{
                curHtml = '<li id="topC0'+ i +'">'
                    +      '<a class="class-name">' + this.topClasses[i].name+ '</a><span class="topCount">('+ topCount +')</span>';
            }
            if(i != 0){
                curHtml += '<img src="img/delete_icon.jpg" class="delete">';
            }
            curHtml +=     '<ul class="task-i">';
            for(var i in  subClasses){
                //var subCount = mytasks.getByClass(subClasses[i].id).length;
                var subCount = 0;
                if(mytasks.getByClass(subClasses[i].id) != -1){
                    subCount = this.getByStatus(mytasks.getByClass(subClasses[i].id), -1).length;
                }
                topCount += subCount;
                var subHtml =  '<li id="class0'+ i +'" class="taskItem">'
                              +      '<a class="task-name">' + subClasses[i].name + '</a><span>（'+ subCount +'）</span>'
                              +      '<img src="img/delete_icon.jpg" class="delete">'
                              + '</li>';
                curHtml += subHtml;
            }
            curHtml +=     '</ul>';
            curHtml +=    '</li>';
            this.topCountArr.push(topCount);
            classHtml += curHtml;
        }
        html += classHtml;
        this.showClassNav(html);
    },
    showClassNav: function(html){
        var that = this;
        this.container.innerHTML = html;
        var countEle = $$("topCount");

        for(var i = 1; i < this.topClasses.length; i++){
            countEle[i].innerHTML = '('+ this.topCountArr[i]+')';
        }

        this.selTop = $(".selected");
        this.curTopClassId = taskClasses.classArr[taskClasses.getByName(this.selTop.innerHTML)].id;
        this.curTopClass = this.selTop.parentNode;
        this.curClass = simSelect(".taskItem", this.curTopClass);
        if(this.curClass){
            addClass(this.curClass, "current");
        }
        this.subShow = simSelect(".task-i", this.curTopClass);
        this.subShow.style.display = "block";
        var temp = simSelect("a", this.curClass).innerHTML;
        this.curClassId = taskClasses.classArr[taskClasses.getByName(temp)].id;
        var topClassItems = $$("class-name");
        for(var i= 0; i < topClassItems.length; i++){
            addClickEvent(topClassItems[i], function(e){
                var e = e || window.event;
                var target = e.srcElement || e.target;
                if(that.selTop == target){
                    return;
                }
                //that.isAll == false;
                removeClass(that.selTop, "selected");
                addClass(target, "selected");
                that.selTop = target;
                that.curTopClassId = taskClasses.classArr[taskClasses.getByName(that.selTop.innerHTML)].id;
                that.curTopClass = target.parentNode;
                that.subShow.style.display = "none";
                that.subShow = simSelect(".task-i", that.curTopClass);
                that.subShow.style.display = "block";
            });
            if(i > 0 && taskClasses.classArr[taskClasses.getByName(topClassItems[i].innerHTML)].id != this.curClassId){
                addEvent(topClassItems[i].parentNode, "mouseover", function(e){
                    var e = e || window.event;
                    var target = e.srcElement || e.target; if(target.tagName != "LI"){
                        target = target.parentNode;
                    }
                    var curDel = simSelect(".delete", target);
                    curDel.style.display = "inline";
                });
                addEvent(topClassItems[i].parentNode, "mouseout", function(){
                    var e = e || window.event;
                    var target = e.srcElement || e.target;
                    if(target.tagName != "LI"){
                        target = target.parentNode;
                    }
                    var curDel = simSelect(".delete", target);
                    curDel.style.display = "none";
                });
            }
        }

        var classItems = $$("taskItem");
        for(var i= 0; i < classItems.length; i++){
            var t = simSelect("a", classItems[i]);
            addClickEvent(t, function(e){
                var e =  e || window.event;
                var target = e.srcElement || e.target;
                var ele = target.parentNode;
                that.statusSelected = 0;
                that.curStatus.className = "";
                that.curStatus = $("#" +  that.statusSelected, that.taskContainer);
                addClass(that.curStatus, "current");
                stopEventBubble(e);
                var className = target.innerHTML;
                var now = taskClasses.getByName(className);
                if(that.curClass){
                    removeClass(that.curClass, "current");
                }
                addClass(ele, "current");
                that.curClass = ele;
                that.curClassId = that.myClasses[now].id;
                that.getTaskNav();
            });
            addEvent(classItems[i], "mouseover", function(e){
                var e = e || window.event;
                var target = e.srcElement || e.target;
                if(target.tagName != "LI"){
                    target = target.parentNode;
                }
                var curDel = simSelect(".delete", target);
                curDel.style.display = "inline";
            });
            addEvent(classItems[i], "mouseout", function(e){
                var e = e || window.event;
                var target = e.srcElement || e.target;
                if(target.tagName != "LI"){
                    target = target.parentNode;
                }
                var curDel = simSelect(".delete", target);
                curDel.style.display = "none";
            });
        }
        var delEle = $$("delete");
        for(var i= 0; i < delEle.length; i++){
            //console.log(delEle[i]);
            addClickEvent(delEle[i], function(e){
                var e = e || window.event;
                var sureDel = confirm("您确定要删除该分类吗？");
                if(sureDel){
                    that.deleteTaskClass(e);
                }else{
                    return;
                }
            });
        }
        this.getTaskNav();
    },
    addTaskClass: function(){
        var isTop = getRadioValue("istop");
        if(this.curTopClassId == 0 && isTop == 0){
            $("#addBox").style.display = "none";
            alert("系统不允许为“默认分类”添加子分类，请选择其他分类作为上层分类！");
            return;
        }
        var className = $("#taskClassName").value;
        $("#addBox").style.display = "none";
        var curTop = $(".selected");
        if(isTop == 1){
            taskClasses.addTaskClass(className);
            this.getClassNav();
        }else{
            taskClasses.addTaskClass(className,parseInt(this.curTopClassId));
        }
        this.getClassNav();
    },
    deleteTaskClass: function(e){
        var element = e.srcElement || e.target;
        var target = element.previousSibling.previousSibling;
        var className = target.innerHTML;
        if(this.curTopClassId == taskClasses.getByName(className, this.topClasses).id){
            this.curTopClassId = taskClasses.classArr[0].id;
            addClass($("#topC00"), "selected");
        }
        taskClasses.deleteTaskClass(className);
        this.getClassNav();
    },
    getTaskNav: function(){
        this.allCount = mytasks.myTaskArr.length;
        $("#allCount").innerHTML = '（'+ this.allCount +'）';
        if(this.isAll){
            this.taskArr = mytasks.myTaskArr;
        }else{
            var classId = this.curClassId;
            this.taskArr = mytasks.getByClass(classId);
        }
        var html = "";
        if(this.statusSelected != 0){
            this.taskArr = this.getByStatus(this.taskArr, this.statusSelected);
        }
        this.dateList = mytasks.clusterByDate(this.taskArr);
        for(var i in this.dateList){
            var dateList = '<li>'
                          + '<a class="date">' + i + '</a>'
                          + '<ul class="todo-list">';
            var now = this.dateList[i]
            for(var k in now){
                var taskList = '';
                if(now[k].status == 1){
                    taskList = '<li class="todo-item completed" id="todo'+ now[k].id +'"><a class="todo-name">' + now[k].name + '</a></li>';
                }else{
                    taskList = '<li class="todo-item" id="todo'+ now[k].id +'"><a class="todo-name">' + now[k].name + '</a></li>';
                }
                dateList += taskList;
            }
            dateList += '</ul>'
            html += dateList;
        }
        this.showTaskNav(html);
    },
    showTaskNav: function(html){
        var that = this;
        this.taskContainer.innerHTML = html;
        addClickEvent(this.taskContainer, function(e){
            var e = e || window.event;
            var target = e.srcElement || e.target;
            if(that.curTodo){
                removeClass(that.curTodo, "current");
            }
            if(target.className == "todo-item" ){
                that.curTodo = target;
                that.selectedTodo = mytasks.getByName(simSelect("a", that.curTodo).innerHTML, that.taskArr);
            }else if(target.className == "todo-name"){
                that.curTodo = target.parentNode;
                that.selectedTodo = mytasks.getByName(target.innerHTML, that.taskArr);
            }
            addClass(that.curTodo, "current");
            that.showTodo();

        });
    },
    addTask: function(){
        var classId = this.curClassId;
        var taskName = $("#taskName").value;
        var date = $("#taskDate").value;
        var content = $("#taskContent").value;
        mytasks.addTask(taskName, date, content, classId);
        this.statusSelected = -1;
        this.curStatus.className = "";
        this.curStatus = $("#" +  this.statusSelected, this.taskContainer);
        addClass(this.curStatus, "current");
        this.selTop.childNodes[1].innerHTML = parseInt(this.selTop.childNodes[1].innerHTML) + 1;
        this.curClass.childNodes[1].innerHTML = parseInt(this.curClass.childNodes[1].innerHTML) + 1;
        this.getTaskNav();
        this.selectedTodo = mytasks.getByName(taskName, this.taskArr);
        if(this.curTodo){
            this.curTodo.className = "";
        }
        this.curTodo = $("#todo" + this.selectedTodo.id, this.taskContainer);
        addClass(this.curTodo, "current");
        this.showTodo();
    },
    editTask: function(){
        //var classId = this.curClassId;
        var taskName = $("#taskName").value;
        var date = $("#taskDate").value;
        var content = $("#taskContent").value;
        mytasks.editTask(this.selectedTodo.id, taskName, date,content);
        this.getTaskNav();
        this.selectedTodo = mytasks.getByName(taskName, this.taskArr);
        if(this.curTodo){
            this.curTodo.className = "";
        }
        this.curTodo = $("#todo" + this.selectedTodo.id, this.taskContainer);
        addClass(this.curTodo, "current");
        this.showTodo();
    },
    getByStatus: function(arr, status){
        var result = [];
        for(var i in arr){
            if(arr[i].status == status){
                result.push(arr[i]);
            }
        }
        return result;
    },
    showTodo: function(){
        $("h1", this.todoContainer).innerHTML = this.selectedTodo.name;
        $(".task-date p", this.todoContainer).innerHTML = "任务日期：" + this.selectedTodo.date;
        $(".task-content p", this.todoContainer).innerHTML =  this.selectedTodo.content;
        $("#noContent").style.display = "none";
        $("#editBox").style.display = "none";
        this.todoContainer.style.display = "block";
        if(this.selectedTodo.status == 1){
            $("#complete-coin", this.todoContainer).style.display = "none";
			$("#edit-coin", this.todoContainer).style.display = "none";
        }else{
            $("#complete-coin", this.todoContainer).style.display = "";
			$("#edit-coin", this.todoContainer).style.display = "";
        }
    },
    showEdit: function(){
        $("#taskName", this.todoContainer).value = this.selectedTodo.name;
        $("#taskDate", this.todoContainer).value = this.selectedTodo.date;
        $("#taskContent", this.todoContainer).value = this.selectedTodo.content;
    },
    checkInput: function(){

    }
};

var showLeftNav = new getClasses();
//mystorage.removeItem("taskClass");
//mystorage.removeItem("tasks");
