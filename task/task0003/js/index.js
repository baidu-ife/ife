/**
 * Created by Zhi_LI on 2015/4/27.
 */

var DATA, CTG, TSK, TIME, TITLE, DETAIL, contentFormated;
var url = 'http://localhost:63342/in-1/task/task0003/server/gtd.json';
$.ajax(
    url,
    {
        data: {
            name: 'simon',
            password: '123456'
        },
        onsuccess: function (responseText, xhr) {
            //console.log(responseText);

            data = eval(responseText);
            DATA = data;
            DATA = formatData(DATA);
            //console.log(DATA)
            doForm(DATA);

            init();
        }
    }
);

var init = function () {
    var t = $('.ctg-taskList');
    var target;
    //console.log(t[t.length - 1]);
    CTG = t.length - 1;
    TSK = t[t.length - 1].firstChild.innerHTML;
    TSK = TSK.substring(0, TSK.indexOf('<'));
    //console.log(TSK);

    formTask(TSK, CTG);
    target = $("#List" + CTG)[0].firstChild.firstChild;
    //console.log(target)
    ctgHighlight(target);
    autosize();
    //$("body")[0].addEventListener("resize",autosize);
};


var doForm = function (data) {
    formCtg(data);
    //console.log($("#ctg-newBtn")[0]);
    $("#ctg-newBtn").click(newTsk);
    $("#tsk-newBtn").click(newTd);
    $("#tsk-filter").click(doFilter);

};
var doFilter = function (evt) {
    var target = window.event ? evt.srcElement : evt.target;
    //console.log(target.id);
    if (target.id == "filter-done"){
        formTask(TSK, CTG, "done");

    }else if(target.id == "filter-todo"){
        formTask(TSK, CTG, "todo");

    }else {
        formTask(TSK, CTG);

    }
};

var newTsk = function () {
    var tskName = prompt("Please enter new TSK", "");
    console.log(tskName);
    console.log(DATA[CTG]);
    if (tskName) {
        DATA[CTG]["task"].push({name: tskName, content: []});
    }
    //console.log(DATA[CTG]);
    //formCtg(DATA);
    formCtg(DATA);

};

var newTd = function () {
    var tdName = prompt("Please enter new Todo", "");
    console.log(TSK);
    console.log(DATA[CTG]["task"]);
    var tsk = DATA[CTG]["task"];
    for (var i = 0; i < tsk.length; i++) {
        if (tsk[i]["name"] == TSK) {
            DATA[CTG]["task"][i]["content"].push({detail: "", status: "todo", time: "", todo: tdName})
        }
    }

    formTask(TSK, CTG);

};

var formCtg = function (data) {
    //console.log(data);
    var ctgNum = data.length;
    var ctgList = [];
    var ctgListAll = $("#ctg-listCtg")[0];
    var taskTotalNum = 0;
    //console.log(ctgListAll);
    for (var i = 0; i < ctgNum; i++) {
        ctgList.push(data[i]["ctg"]);
    }
    //console.log(ctgListAll);

    //ctgListAll.innerHTML = "<ul id='ctg-list'>";
    ctgListAll.innerHTML = "";
    for (var i = 0; i < ctgList.length; i++) {
        ctgListAll.innerHTML = ctgListAll.innerHTML +
        "<li class='ctg-ctgList'>" +
        "<div>" + ctgList[i] + "</div>" +
        "<div id=" + "'" + "List" + i + "'" + "></div>" +
        "</li>";
    }
    ctgListAll.innerHTML = "<ul id='ctg-list'>" + ctgListAll.innerHTML + "</ul>";

    for (var i = 0; i < ctgNum; i++) {
        //console.log(ctgList[i]);
        //var task;
        var selector = "#" + "List" + i;
        var taskLi = $(selector)[0];
        var taskList = data[i]["task"];
        taskTotalNum = taskTotalNum + taskList.length;
        //console.log(taskLi);
        //taskLi.innerHTML = "<ol id='task-list'>";
        for (var j = 0; j < taskList.length; j++) {
            taskLi.innerHTML = taskLi.innerHTML + "<li class='ctg-ctgEle'>" + taskList[j]["name"] + "<span class='ctg-del'>删除</span></li>";
        }
        taskLi.innerHTML = "<ul class='ctg-taskList'>" + taskLi.innerHTML + "</ul>";

    }
    //console.log(taskTotalNum);
    $("#ctg-taskNum")[0].innerHTML = taskTotalNum;

    //console.log($(".task-list"));
    $(".ctg-taskList").click(selectTsk);
};
var formTask = function (taskName, ctgNum, filter) {
    if ($("#todo-edit").style){
        $("#todo-edit").style.visibility = "hidden";

    }
    var tskList = $("#tsk-list")[0];
    //console.log(taskSearch(data,taskName));
    //console.log(data[ctgNum]);
    var task = taskSearch(DATA[ctgNum], taskName);
    //console.log(task);
    //global content
    contentFormated = formatTask(task);
    //console.log(contentFormated);
    var todoLi;
    tskList.innerHTML = "";

    for (var i = 0; i < contentFormated.length; i++) {
        tskList.innerHTML = tskList.innerHTML + "<div>" + contentFormated[i]["time"] + "</div>" + "<div id='todoList" + i + "'" + "></div>";

        for (var j = 0; j < contentFormated[i]["todo"].length; j++) {
            todoLi = $("#todoList" + i)[0];

            if (filter){
                if (filter == "todo"){
                    if (contentFormated[i]["todo"][j]["todoStatus"] == "todo"){
                        todoLi.innerHTML = todoLi.innerHTML + "<li class='todo'>" + contentFormated[i]["todo"][j]["todoTitle"] + "</li>";
                    }
                }else if (filter == "done"){
                    if (contentFormated[i]["todo"][j]["todoStatus"] == "done"){
                        todoLi.innerHTML = todoLi.innerHTML + "<li class='done'>" + contentFormated[i]["todo"][j]["todoTitle"] + "</li>";

                    }
                }
            }else {
                if (contentFormated[i]["todo"][j]["todoStatus"] == "todo"){
                    todoLi.innerHTML = todoLi.innerHTML + "<li class='todo'>" + contentFormated[i]["todo"][j]["todoTitle"] + "</li>";

                }else {
                    todoLi.innerHTML = todoLi.innerHTML + "<li class='done'>" + contentFormated[i]["todo"][j]["todoTitle"] + "</li>";

                }
            }


        }
        todoLi.innerHTML = "<ul class='tsk-todo'>" + todoLi.innerHTML + "</ul>";
    }

    $(".tsk-todo").click(selectTd);

};


var formDetail = function (tdTt, timeNum) {
    var tdDetail = $("#todo-detail")[0];
    var tdTitle = $("#todo-title")[0];
    var tdTime = $("#todo-time")[0];
    var cpltBtn = $("#todo-cpltBtn")[0];

    cpltBtn.style.visibility = "hidden";

    if (timeNum || tdTt){
        var todoRslt = tdSearch(contentFormated[timeNum]["todo"], tdTt);
        var todoDetail = todoRslt["todoDetail"];
        var todoTitle = todoRslt["todoTitle"];
        var todoStatus = todoRslt["todoStatus"];

        if (todoStatus == "todo"){
            cpltBtn.style.visibility = "visible";
        }

        TITLE = tdTitle.value = todoTitle;
        TIME = tdTime.value = contentFormated[timeNum]["time"];
        DETAIL = tdDetail.value = todoDetail;


    }else{
        tdTime.value = TIME;
        tdTitle.value = TITLE;
        tdDetail.value = DETAIL;
    }

    $("#todo-edit")[0].style.visibility = "visible";

    $("#todo-editBtn").click(tdEdit);
    $("#todo-confirmBtn").click(tdConfirm);
    $("#todo-cancelBtn").click(tdCancel);

    $("#todo-cpltBtn").click(doCplt);
    initialDetail(true);
};
var doCplt = function () {
    console.log(TSK);
    console.log(CTG);
    console.log(TITLE);
    console.log(TIME);

    console.log('complete');
    var tdDetail = $("#todo-detail")[0];
    var tdTitle = $("#todo-title")[0];
    var tdTime = $("#todo-time")[0];
    var r = confirm("完成任务？");
    if (r == true) {
        doChange(tdDetail.value, tdTime.value, tdTitle.value, "done");
    }
};
var selectTsk = function (evt) {
    hide();
    var target = window.event ? evt.srcElement : evt.target;
    var ctgNum = 0;
    //console.log(CTG);

    if (target.nodeName.toUpperCase() == "LI") {
        ctgNum = target.parentNode.parentNode.id;
        //console.log(ctgNum.charAt(ctgNum.length-1));
        ctgNum = ctgNum.charAt(ctgNum.length - 1);
        ctgNum = parseInt(ctgNum);
        CTG = ctgNum;

        taskName = target.innerHTML;
        //console.log (taskName);
        taskName = taskName.substring(0, taskName.indexOf('<'));

        TSK = taskName;
        //console.log (TSK);
        ctgHighlight(target);
        formTask(taskName, ctgNum);
    } else if (target.nodeName.toUpperCase() == "SPAN") {
        //target = target.parentNode;
        var r = confirm("确定删除？");
        if (r == true) {
            doDel(target);

        }

    }
};
var selectTd = function (evt) {
    show();
    var target = window.event ? evt.srcElement : evt.target;

    var timeNum = target.parentNode.parentNode.id;
    //console.log(ctgNum.charAt(ctgNum.length-1));
    timeNum = timeNum.charAt(timeNum.length - 1);
    timeNum = parseInt(timeNum);
    if (target.nodeName.toUpperCase() == "LI") {
        tdTitle = target.innerHTML;
        tdHighlight(target);
        formDetail(tdTitle, timeNum);

    }
};


var ctgHighlight = function (target) {
    //var ctgList = $("#List"+ctg)[0];
    var list = $("li");
    for (var i = 0; i < list.length; i++) {
        if (list[i].parentNode.className == "ctg-taskList") {
            list[i].style.backgroundColor = "";
        }
    }
    //console.log(list);
    target.style.backgroundColor = "red";
};
var tdHighlight = function (target) {
    var list = $("li");
    for (var i = 0; i < list.length; i++) {
        if (list[i].parentNode.className == "tsk-todo") {
            list[i].style.backgroundColor = "";
        }
    }
    //console.log(list);
    target.style.backgroundColor = "red";
};


var tdEdit = function () {
    console.log('edit');

    initialDetail(false);

    $(".todo-editArea").each(function () {
        this.style.border = "1px solid";
    });
    $(".todo-editBtn").each(function () {
        this.style.visibility = "visible";
    });

    $(".todo-editArea").on("keyup",doInputCheck);

};

var doInputCheck = function (evt) {
    var target = window.event ? evt.srcElement : evt.target;
    //console.log(target.id)
    if (target.id == "todo-title"){
        if (target.value.length >= 10){
            //target.readOnly = true;
            $("#todo-titleAlert")[0].innerHTML = "标题最多十个字";
            $("#todo-confirmBtn")[0].disabled=true;
        }else {
            //target.readOnly = false;
            $("#todo-titleAlert")[0].innerHTML = "";
            $("#todo-confirmBtn")[0].disabled=false;
        }
    }else if(target.id == "todo-time"){
        if (target.value.match(/^((?:19|20)\d\d)-(0[1-9]|1[012])-(0[1-9]|[12][0-9]|3[01])$/)){
            //target.readOnly = false;
            $("#todo-timeAlert")[0].innerHTML = "";
            $("#todo-confirmBtn")[0].disabled=false;

        }else {
            //target.readOnly = true;
            $("#todo-timeAlert")[0].innerHTML = "日期YYYY-MM-DD";
            $("#todo-confirmBtn")[0].disabled=true;

        }
    }else if(target.id == "todo-detail"){
        if (target.value.length > 200){
            //target.readOnly = true;
            $("#todo-detailAlert")[0].innerHTML = "内容最多200字";
            $("#todo-confirmBtn")[0].disabled=true;

        }else {
            //target.readOnly = false;
            $("#todo-detailAlert")[0].innerHTML = "";
            $("#todo-confirmBtn")[0].disabled=false;

        }
    }
};
var tdConfirm = function () {
    console.log('confirm');
    var tdDetail = $("#todo-detail")[0];
    var tdTitle = $("#todo-title")[0];
    var tdTime = $("#todo-time")[0];
    doChange(tdDetail.value, tdTime.value, tdTitle.value);

    initialDetail(true);

};

var tdCancel = function () {
    formTask(TSK, CTG);
    initialDetail(true);
    console.log(TITLE);
    console.log(TIME);
    formDetail();

};

var initialDetail = function (bl) {
    $(".todo-editArea").each(function () {
        this.readOnly = bl;
        if (bl == true){
            this.style.border = "none";
        }else {
            this.style.border = "1px solid"
        }
    })
};
var doChange = function (Detail, Time, Title, Status) {
    var dataTask = DATA[CTG]["task"];
    var tskContent;
    for (var i = 0; i < dataTask.length; i++) {
        if (dataTask[i]["name"] == TSK) {
            tskContent = dataTask[i]["content"];
            for (var j = 0; j < tskContent.length; j++) {
                if (tskContent[j]["time"] == TIME && tskContent[j]["todo"] == TITLE) {
                    DATA[CTG]["task"][i]["content"][j]["detail"] = Detail;
                    DATA[CTG]["task"][i]["content"][j]["time"] = Time;
                    DATA[CTG]["task"][i]["content"][j]["todo"] = Title;
                    if (Status){
                        DATA[CTG]["task"][i]["content"][j]["status"] = Status;

                    }

                }
            }

        }
    }
    DATA = formatData(DATA);
    formTask(TSK, CTG);


};

var doDel = function (target) {
    //console.log(TSK)
    //console.log(CTG)
    console.log(target.parentNode);
    var taskName;
    var ctgNum;

    taskName = target.parentNode.innerHTML;
    taskName = taskName.substring(0, taskName.indexOf('<'));
    console.log(taskName);

    ctgNum = target.parentNode.parentNode.parentNode.id;
    ctgNum = ctgNum.charAt(ctgNum.length - 1);
    ctgNum = parseInt(ctgNum);

    console.log(DATA[ctgNum]);
    for (var i = 0; i < DATA[ctgNum]["task"].length; i++) {
        if (DATA[ctgNum]["task"][i]["name"] == taskName) {
            console.log(DATA[ctgNum]["task"][i]);
            DATA[ctgNum]["task"].remove(DATA[ctgNum]["task"][i]);
        }
    }
    console.log(DATA);
    doForm(DATA);
    init();

};

var taskSearch = function (obj, selector) {
    //for (var i = 0; i < obj.length; i++){
    var task = obj["task"];
    //console.log(task);
    for (var j = 0; j < task.length; j++) {
        if (task[j]["name"] == selector) {
            return task[j];
        }
    }
    //}

};

var tdSearch = function (obj, selector) {
    //for (var i = 0; i < obj.length; i++){
    //console.log(task);
    for (var j = 0; j < obj.length; j++) {
        if (obj[j]["todoTitle"] == selector) {
            return obj[j];
        }
    }
    //}

};

var hide = function () {
    var tdDetail = $("#todo-detail")[0];
    var tdTitle = $("#todo-title")[0];
    var tdTime = $("#todo-time")[0];
    tdDetail.style.visibility = "hidden";
    tdTime.style.visibility = "hidden";
    tdTitle.style.visibility = "hidden";
};

var show = function () {
    var tdDetail = $("#todo-detail")[0];
    var tdTitle = $("#todo-title")[0];
    var tdTime = $("#todo-time")[0];
    tdDetail.style.visibility = "visible";
    tdTime.style.visibility = "visible";
    tdTitle.style.visibility = "visible";
};

var autosize = function () {
    var winHeight,winWidth,hdHeight,sdWidth,sdHeight;

    var miniHeight = 600, miniWidth = 800;

    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth) {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
    hdHeight = $("header")[0].offsetHeight;
    sdWidth = $("#gtd-side")[0].offsetWidth;


    //$("#gtd-detail")[0].style.width = winWidth - sdWidth + "px";
    $("#gtd-detail")[0].style.height = winHeight - hdHeight + "px";
    $("#ctg-content")[0].style.height = winHeight - hdHeight - $("#ctg-newBtn")[0].offsetHeight + "px";
    $("#tsk-content")[0].style.height = winHeight - hdHeight - $("#tsk-newBtn")[0].offsetHeight + "px";

    $(".todo-editArea").each(function () {
       this.style.width =  winWidth - sdWidth - 10 + "px";
    });



};

var formatData = function (data) {
    var ctgEle, tskEle, tdEle;
    var tempTime = [];
    var tempTd, tempTsk, tempCtg;

    for (var i = 0; i < data.length; i++) {
        ctgEle = data[i];
        for (var j = 0; j < ctgEle["task"].length; j++) {
            tskEle = ctgEle["task"][j];
            tempTime = [];
            for (var k = 0; k < tskEle["content"].length; k++) {
                tdEle = tskEle["content"][k];
                tempTime.push([parseTime(tdEle.time), tdEle]);
            }
            tempTime.sort(function (x, y) {
                return x[0] - y[0];
            });
            //console.log(tempTime);
            for (var k = 0; k < tskEle["content"].length; k++) {
                tskEle["content"][k] = tempTime[k][1];
            }

            ctgEle["task"][j] = tskEle;
        }
        data[i] = ctgEle;

    }
    return data;


};
var parseTime = function (timeStr) {
    var timeArr = timeStr.split("-");
    var timeInt;

    timeInt = timeArr[0] * 365 * 12 * 30 + timeArr[1] * 12 + timeArr[2];
    return timeInt;
};

var formatTask = function (task) {
    var time = [];
    //console.log(task);

    var content = [];
    var newContent = [];
    var temp = {};

    content = task["content"];

    //console.log(content);

    for (var i = 0; i < content.length; i++) {
        time.push(content[i]["time"]);
    }
    time = time.unique();
    //console.log(time);
    for (var i = 0; i < time.length; i++) {
        temp = {time: "", todo: []};
        temp.time = time[i];
        temp.todo = [];
        for (var j = 0; j < content.length; j++) {
            if (content[j]["time"] == temp.time) {
                temp.todo.push({
                    todoTitle: content[j]["todo"],
                    todoStatus: content[j]["status"],
                    todoDetail: content[j]["detail"]
                });
            }
        }
        //console.log(temp);
        newContent.push(temp);

    }
    //console.log(newContent);
    return newContent;
};