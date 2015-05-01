/**
 * Created by Zhi_LI on 2015/4/27.
 */

var DATA,CTG,TSK,TIME,TITLE,contentFormated;
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
            doForm(DATA);

            init();
            //doFormCtgList(data);

            //console.log(typeof(responseText));
            //liDateList = daMatch(sgInputContent, responseText);
            //doShow(liDateList);
        }
    }
);

var init = function() {
    var t  = $('.ctg-taskList');
    //console.log(t[t.length - 1]);
    CTG =t.length - 1;
    TSK = t[t.length - 1].firstChild.innerHTML;

    formTask(TSK,CTG);
    autosize();
    //$("body")[0].addEventListener("resize",autosize);
};
var autosize = function (){
    var winHeight;
    var winWidth;
    var hdHeight;
    var sdWidth;
    var sdHeight;
    if (document.documentElement && document.documentElement.clientHeight && document.documentElement.clientWidth)
    {
        winHeight = document.documentElement.clientHeight;
        winWidth = document.documentElement.clientWidth;
    }
    hdHeight = $("header")[0].offsetHeight;
    sdWidth = $("#gtd-side")[0].offsetWidth;


    //$("#gtd-detail")[0].style.width = winWidth - sdWidth + "px";
    $("#gtd-detail")[0].style.height = winHeight - hdHeight  + "px";
    $("#ctg-content")[0].style.height = winHeight - hdHeight  -$("#ctg-newBtn")[0].offsetHeight+ "px";
    $("#tsk-content")[0].style.height = winHeight - hdHeight  -$("#tsk-newBtn")[0].offsetHeight+ "px";




};

var doForm = function (data) {
    formCtg(data);
    //console.log($("#ctg-newBtn")[0]);
    $("#ctg-newBtn").click(newTsk);
    $("#tsk-newBtn").click(newTd);
};

var newTsk = function (){
    var tskName = prompt("Please enter new TSK","");
    console.log(tskName);
    console.log(DATA[CTG]);
    if (tskName) {
        DATA[CTG]["task"].push({name: tskName, content: []});
    }
    console.log(DATA[CTG]);
    //formCtg(DATA);
    formCtg(DATA);

};

var newTd = function (){
    var tdName = prompt("Please enter new Todo","");
    console.log(TSK);
    console.log(DATA[CTG]["task"]);
    var tsk = DATA[CTG]["task"];
    for (var i=0; i<tsk.length; i++){
        if (tsk[i]["name"] == TSK){
            DATA[CTG]["task"][i]["content"].push({detail:"", status:"todo", time:"", todo:tdName})
        }
    }
    //if (tskName) {
    //    DATA[CTG]["task"].push({name: tskName, content: []});
    //}
    //console.log(DATA[CTG]);
    ////formCtg(DATA);
    //formCtg(DATA);
    formTask(TSK, CTG);

};

var formCtg = function (data) {
    //console.log(data);
    var ctgNum = data.length;
    var ctgList = [];
    var ctgListAll = $("#ctg-listCtg")[0];
    var taskTotalNum = 0;
    //console.log(ctgListAll);
    for (var i=0; i< ctgNum; i++){
        ctgList.push(data[i]["ctg"]);
    }
    //console.log(ctgListAll);

    //ctgListAll.innerHTML = "<ul id='ctg-list'>";
    ctgListAll.innerHTML = "";
    for (var i = 0; i < ctgList.length; i ++){
        ctgListAll.innerHTML = ctgListAll.innerHTML +
            "<li class='ctg-ctgList'>"+
                "<div class='ctgP'><p>" +ctgList[i] + "</p><p class='dltBtn'>   -</p></div>"+
                "<div id="+"'" +"List" +i +"'" +"></div>" +
            "</li>";
    }
    ctgListAll.innerHTML ="<ul id='ctg-list'>"+ ctgListAll.innerHTML+ "</ul>";

    for (var i=0; i< ctgNum; i++){
        //console.log(ctgList[i]);
        //var task;
        var selector = "#"+"List"+i;
        var taskLi = $(selector)[0];
        var taskList = data[i]["task"];
        taskTotalNum = taskTotalNum + taskList.length;
        //console.log(taskLi);
        //taskLi.innerHTML = "<ol id='task-list'>";
        for (var j=0; j<taskList.length; j ++){
            taskLi.innerHTML = taskLi.innerHTML +"<li >" +taskList[j]["name"] + "</li>";
        }
        taskLi.innerHTML = "<ul class='ctg-taskList'>" +taskLi.innerHTML +"</ul>";

    }
    //console.log(taskTotalNum);
    $("#ctg-taskNum")[0].innerHTML = taskTotalNum;

    //console.log($(".task-list"));
    $(".ctg-taskList").click(selectTsk);
};
var formTask = function(taskName, ctgNum){
    var tskList = $("#tsk-list")[0];
    //console.log(taskSearch(data,taskName));
    //console.log(data[ctgNum]);
    var task = taskSearch(DATA[ctgNum],taskName);
    //console.log(task);
    //global content
    contentFormated = formatTask(task);
    //console.log(taskFormated);
    var todoLi;
    tskList.innerHTML = "";

    for (var i=0; i<contentFormated.length; i++){
        tskList.innerHTML = tskList.innerHTML + "<div>" + contentFormated[i]["time"] + "</div>"
        +"<div id='todoList"+i+"'"+"></div>";

        for (var j=0; j<contentFormated[i]["todo"].length; j++){
            todoLi = $("#todoList"+i)[0];
            todoLi.innerHTML = todoLi.innerHTML + "<li>" + contentFormated[i]["todo"][j]["todoTitle"] + "</li>"
        }
        todoLi.innerHTML = "<ul class='tsk-todo'>" + todoLi.innerHTML + "</ul>";
    }

    $(".tsk-todo").click(selectTd);

};
var formDetail = function(tdTitle, timeNum){
    //console.log(tdTitle);
    //console.log(contentFormated);
    //console.log(timeNum);
    var todoRslt = tdSearch(contentFormated[timeNum]["todo"],tdTitle);
    var todoDetail = todoRslt["todoDetail"];
    var todoTitle = todoRslt["todoTitle"];

    //console.log(todoDetail);
    var tdDetail = $("#todo-detail")[0];
    var tdTitle = $("#todo-title")[0];
    var tdTime = $("#todo-time")[0];

    tdDetail.value = todoDetail;
    TITLE = tdTitle.value = todoTitle;
    TIME = tdTime.value = contentFormated[timeNum]["time"];

    $(".todo-edit").each(function(){
        this.style.visibility = "visible";
    });
    $("#todo-editBtn").click(tdEdit);
    $("#todo-confirmBtn").click(tdConfirm);
};

var selectTsk = function (evt){
    hide();
    var target = window.event? evt.srcElement:  evt.target;

    var ctgNum = target.parentNode.parentNode.id;
    //console.log(ctgNum.charAt(ctgNum.length-1));
    ctgNum = ctgNum.charAt(ctgNum.length-1);
    ctgNum = parseInt(ctgNum);
    CTG =ctgNum;
    console.log(CTG);
    if (target.nodeName.toUpperCase() == "LI"){
        taskName = target.innerHTML;
        //console.log (taskName);
        TSK = taskName;
        console.log (TSK);
        ctgHighlight(target);
        formTask(taskName,ctgNum);
    }
};
var selectTd = function (evt){
    show();
    var target = window.event? evt.srcElement:  evt.target;

    var timeNum = target.parentNode.parentNode.id;
    //console.log(ctgNum.charAt(ctgNum.length-1));
    timeNum = timeNum.charAt(timeNum.length-1);
    timeNum = parseInt(timeNum);
    if (target.nodeName.toUpperCase() == "LI"){
        tdTitle = target.innerHTML;
        //console.log (taskName);
        //console.log (contentFormated);
        tdHighlight(target);
        formDetail(tdTitle, timeNum);
    }
};


var ctgHighlight = function (target) {
    //var ctgList = $("#List"+ctg)[0];
    var list = $("li");
    for (var i=0; i<list.length; i++){
        if(list[i].parentNode.className == "ctg-taskList"){
            list[i].style.backgroundColor = "";
        }
    }
    //console.log(list);
    target.style.backgroundColor = "red";
};
var tdHighlight = function (target) {
    var list = $("li");
    for (var i=0; i<list.length; i++){
        if(list[i].parentNode.className == "tsk-todo"){
            list[i].style.backgroundColor = "";
        }
    }
    //console.log(list);
    target.style.backgroundColor = "red";
};


var tdEdit = function () {
    console.log('edit');
    var tdDetail = $("#todo-detail")[0];
    var tdTitle = $("#todo-title")[0];
    var tdTime = $("#todo-time")[0];
    tdTitle.removeAttribute("readonly");
    tdTime.removeAttribute("readonly");
    tdDetail.removeAttribute("readonly");

    //console.log(data);



};

var tdConfirm = function () {
    console.log('confirm');
    var tdDetail = $("#todo-detail")[0];
    var tdTitle = $("#todo-title")[0];
    var tdTime = $("#todo-time")[0];
    doChange(tdDetail.value,tdTime.value , tdTitle.value);

    tdTitle.setAttribute("readonly","");
    tdTime.setAttribute("readonly","");
    tdDetail.setAttribute("readonly","");
    //tdDetail.value;
    //tdTitle.value;
    //tdTime.value;


};
var doChange = function (Detail, Time, Title) {
    var dataTask = DATA[CTG]["task"];
    var tskContent;
    for (var i=0; i<dataTask.length; i++){
        if (dataTask[i]["name"] == TSK){
            tskContent = dataTask[i]["content"];
            for (var j=0; j<tskContent.length; j++){
                if (tskContent[j]["time"] == TIME && tskContent[j]["todo"] == TITLE){
                    DATA[CTG]["task"][i]["content"][j]["detail"] = Detail;
                    DATA[CTG]["task"][i]["content"][j]["time"] = Time;
                    DATA[CTG]["task"][i]["content"][j]["todo"] = Title;

                }
            }

        }
    }
    console.log(DATA);
    formTask(TSK, CTG);



};
var formatTask = function(task){
    var time = [];
    //console.log(todoObj);

    var content = [];
    var newContent = [];
    var temp = {};
    var temptemp = {};

    content = task["content"];

    //console.log(content);

    for (var i = 0; i < content.length; i++){
        time.push(content[i]["time"]);
    }
    time = time.unique();
    //console.log(time);
    for (var i = 0; i< time.length; i++){
        temp = {time:"",todo:[]};
        temp.time = time[i];
        temp.todo = [];
        for (var j = 0; j < content.length; j++){
            if(content[j]["time"] == temp.time){
                temp.todo.push({todoTitle: content[j]["todo"], todoStatus: content[j]["status"], todoDetail:content[j]["detail"]});
            }
        }
        //console.log(temp);
        newContent.push(temp);

    }
    //console.log(newContent);
    return newContent;
};

var taskSearch = function(obj, selector){
    //for (var i = 0; i < obj.length; i++){
    var task = obj["task"];
    //console.log(task);
    for (var j = 0; j < task.length; j++){
        if(task[j]["name"] == selector){
            return task[j];
        }
    }
    //}

};

var tdSearch = function(obj, selector){
    //for (var i = 0; i < obj.length; i++){
    //console.log(task);
    for (var j = 0; j < obj.length; j++){
        if(obj[j]["todoTitle"] == selector){
            return obj[j];
        }
    }
    //}

};

var hide = function(){
    var tdDetail = $("#todo-detail")[0];
    var tdTitle = $("#todo-title")[0];
    var tdTime = $("#todo-time")[0];
    tdDetail.style.visibility = "hidden";
    tdTime.style.visibility = "hidden";
    tdTitle.style.visibility = "hidden";
};

var show = function(){
    var tdDetail = $("#todo-detail")[0];
    var tdTitle = $("#todo-title")[0];
    var tdTime = $("#todo-time")[0];
    tdDetail.style.visibility = "visible";
    tdTime.style.visibility = "visible";
    tdTitle.style.visibility = "visible";
}

