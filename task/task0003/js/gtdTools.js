/**
 * Created by Y2X on 2015/5/8.
 */

/*
我是这么理解需求的，最左栏是目录(catalog)和子目录(task)列表，
中间栏是task/默认分类下的具体的todo列表，也就是所谓的任务列表。

不足：
在最左栏中，catalog和task的上下文环境没有统一，导致操作变得很麻烦，这种麻烦贯穿了所有添加、删除操作。

额外优化：
从任务列表直接删除任务to-do
 */

/**
 * 定义catalog task todo 对象
 */






/**
 *“所有任务”“分类列表”展开/关闭
 */
var allCatalogBtn=document.getElementsByClassName("catalog-all-title")[0];
var allTaskBtn=document.getElementsByClassName("task-all-title")[0];
var allCatalog=document.getElementsByClassName("catalog-wrap")[0];
var allTask=document.querySelector(".task-wrap");/*只是最前面的.task-wrap，即“所有任务下的”*/


addEvent(allCatalogBtn,"click",function(){
    if(allCatalog.style.display=="none"){
        allCatalog.style.display="block";
        allCatalogBtn.style.background="#eee url('img/down.png') no-repeat left";
    }
    else{
        allCatalog.style.display="none";
        allCatalogBtn.style.background="#eee url('img/right.png') no-repeat left";
    }
});
addEvent(allTaskBtn,"click",function(){
    if(allTask.style.display=="none"){
        allTask.style.display="block";
        allTaskBtn.style.background="#eee url('img/down.png') no-repeat left";
    }
    else{
        allTask.style.display="none";
        allTaskBtn.style.background="#eee url('img/right.png') no-repeat left";
    }
});
//todo:合并两个方法


/**
 * catalog-task 选择任务(√)
 */
var chosen=document.getElementsByClassName("isChosen")[0];/*坑爹啊QAQ [0]，因为.classList的操作对象……*/
var catalogs=document.getElementsByClassName("catalog-name");//querySelectorAll("[data-catalog-no]");
var tasks=document.querySelectorAll("[data-task-no]");

for(var j=0;j<tasks.length;j++) {//选中子分类，该节点含有[data-task-no]
    addEvent(tasks[j], "click", choose);
}
for(var i=0;i<catalogs.length;i++){//选中分类名.catalog-name,其parentNode含有[data-catalog-no]
    addEvent(catalogs[i],"click", choose);
}

function choose(event){
        var item=event.target;
        if(item.parentNode.getAttribute("data-catalog-no")==null&&
            item.getAttribute("data-task-no")==null){//可能会选中.catalog-name或者[data-task-no]中的子节点
            item=item.parentNode;
        }
        if(chosen!=null)//如果chosen不是null,则先移除chosen
            removeClass(chosen,"isChosen");
        if(item==chosen){//如果本来就已经选中，则取消选择
            //removeClass(chosen,"isChosen");
            chosen=null;
        }
        else{//如果选中其他，则重置chosen以及其样式
            //removeClass(chosen,"isChosen");
            chosen=item;
            addClass(item,"isChosen");
        }
}
/*问题1（√）：因为用event.target定位，所以可能会定位到各种子元素……比如span .delete .catalog-name。所以最好在空白的地方点击
 * 优化（√）：两个addEvent应该可以合并
 * */

/**
 * 选择任务后todo列表变化
 */


/**
 * 删除分类/任务
 */
var deleteBtn=document.getElementsByClassName("delete");
for(var i=0;i<deleteBtn.length;i++){
    addClickEvent(deleteBtn[i],deleteItem);
}
function deleteItem(event){
    //console.log(event.target);
    var item=event.target;
    //console.log(item);
    while(item.parentNode.getAttribute("data-catalog-no")==null&&
        item.parentNode.getAttribute("data-task-no")==null){
        item=item.parentNode;
    }
    if(item.getAttribute("data-task-no")==null){//要删除的是catalog，需要再上去一层
        item=item.parentNode;
    }
    item.parentNode.removeChild(item);
}
//todo:“所有任务”中保持同步

/**
 * 添加分类
 * 当前无选中(chosen==null)，添加【新分类】（.catalog-wrap下插入）
 * 如果当前选中“默认分类”（chosen.parent=defaultCatalog），则添加【新分类】（.catalog-wrap下插入）
 * 如果当前选中其他分类（chosen~=.catalog-name)，则添加【子分类】（*chosen的父节点下插入）
 * 当前选中子分类（chosen~=[data-task-no]），则添加【子分类】（*chosen的父节点下插入）
 */
var defaultCatalog=document.getElementById("default-catalog");
var addCatalog=document.querySelector("#catalog-task .add");

//chosen.parentNode.getAttribute("data-catalog-no")!=null //选中分类catalog（[data-catalog-no]下的.catalog-name）
//chosen.getAttribute("data-task-no")!=null //选中子分类task（[data-task-no]节点）

var catalogNo=2;
var taskNo=3;
addClickEvent(addCatalog,function(){
    var newName=prompt("输入新分类的名称","new");
    if(newName!=null&&newName!=""){
        var item;
        if(chosen==null||chosen.parentNode==defaultCatalog){
            //在列表最后添加新分类
            item=document.createElement("div");//构造节点
            item.setAttribute("data-catalog-no",catalogNo+"");
            item.innerHTML="<div class='catalog-name'>"+
                           "<span>"+newName+"</span>"+
                           "（<span class='unfinished-count'>0</span>）"+
                           "<img class='delete' src='img/delete.png'/></div>";
            //console.log(item);
            allCatalog.appendChild(item);//插入节点
            catalogNo++;//记号更新
        }
        else {
            //在该分类下添加新分类
            item=document.createElement("div");
            item.setAttribute("data-task-no",taskNo+"");
            item.innerHTML=" <span class='task-name'>"+newName+"</span>"+
                           "（<span class='unfinished-count'>0</span>）"+
                           "<img class='delete' src='img/delete.png'/>";
            //console.log(item);
            chosen.parentNode.appendChild(item);
            taskNo++;
        }
        addClickEvent(item,choose);//添加事件
        addClickEvent(item.getElementsByClassName("delete")[0],deleteItem);
    }
});
//todo：“所有任务”中保持同步（仅task)
//todo:标记当前data-catalog-no,data-task-no
//todo:存储数据


/**
 * todo列表状态选择（√）
 */
var currentState=document.getElementsByClassName("state-chosen")[0];/*太坑爹……[0]*/
var states=document.querySelectorAll("[data-task-state]");

for(var i=0;i<states.length;i++){
    addClickEvent(states[i],function(event){
        removeClass(currentState,"state-chosen");
        var item=event.target;
        addClass(item,"state-chosen");
        currentState=item;
    });
}

/**
 * todo状态变化，列表变化
 */


/**
 * 选择todo
 * */
var currentTodo=document.getElementsByClassName("todo-chosen")[0];
var todos=document.querySelectorAll("[data-todo-no]");

for(var i=0;i<todos.length;i++){
    addClickEvent(todos[i],function(event){
        removeClass(currentTodo,"todo-chosen");
        var item=event.target;
        addClass(item,"todo-chosen");
        currentTodo=item;
    });

    //右侧详细信息变化
    addClickEvent(todos[i],function(event){
        //先判断之前是否有任务在编辑
        if(content.classList.contains("new")){
            var cfm=confirm("确定放弃本次新增？");
            if(!cfm){
                return;
            }
        }
        else if(content.classList.contains("edit")){
            var cfm=confirm("确定放弃本次修改？");
            if(!cfm){
                return;
            }
        }
        var item=event.target;//即.todo-chosen
        //todo：填充数据
        tip.innerHTML="";
        content.style.display="block";
        removeClass(content,"edit");
        removeClass(content,"new");
    });
}



var content=document.getElementById("todo-content");

var todoContent=document.getElementById("todo-content-inner");
var todoDate=document.getElementById("todo-date");
var todoTitle=document.getElementById("todo-title");

/**
 * add,添加todo，最右侧更新编辑
 */
var addTask=document.querySelector("#task-list .add");

addClickEvent(addTask,function(){
    if(content.classList.contains("edit")){
        var cfm=confirm("确定放弃本次修改？");
        if(!cfm){
            return;
        }
    }
    //初始化一个编辑界面
    todoTitle.value="";
    todoDate.value="";
    todoContent.value="";
    tip.innerHTML="";
    contentAbled();
    content.style.display="block";
    addClass(content,"new");//表明当前在新增任务
});


/**
 * 点击btn-save完成新增/编辑todo，并保存
 */

var btnSave=document.getElementById("btn-save");
addClickEvent(btnSave,function(){
    if(!qualified()) return;
    contentDisabled();
    //todo:更新todo内容
    if(content.classList.contains("new")){
        //todo：在任务列表添加新任务
        var wrap=document.getElementsByClassName("todo-wrap")[0];
        var item=document.createElement("div");
        /*wrap.appendChild(item);
        removeClass(content,"new");*/
    }
});

/**
 * 点击btn-cancel,取消添加或修改todo（√）
 */
var btnCancel=document.getElementById("btn-cancel");
addClickEvent(btnCancel,function(){
    var cfm=confirm("取消当前新增/修改任务？");
    if(cfm){
        content.style.display="none";
    }
});

/**
 * 点击btn-edit,编辑todo（√）
 */
var btnEdit=document.getElementById("btn-edit");
addClickEvent(btnEdit,contentAbled);


/**
 * 点击btn-ok按钮完成任务，保存状态
 */
var state=document.getElementById("todo-content").getAttribute("data-state");
//console.log(state);
var btnOk=document.getElementById("btn-ok");
addClickEvent(btnOk,function(){
    if(state=="unfinished"){
        btnOk.src="img/finished.png";
        state="finished";
    }
    else{
        btnOk.src="img/unfinished.png";
        state="unfinished";
    }
    document.getElementById("todo-content").setAttribute("data-state",state);//暂时先这样
    //todo:在数据库中更新todo状态
});
addClickEvent(btnOk,contentDisabled);




/**
 * 标题、日期、内容是否符合规格(√）
 */

var tip=document.getElementById("tip");

function qualified(){
    var curTitle=todoTitle.value;
    var curDate=todoDate.value;
    var curContent=todoContent.value;

    tip.innerHTML="";

    if(curTitle==null||curTitle==""||curContent==null||curContent==""||curDate==null||curDate==""){
        tip.innerHTML="未完成输入";
        return false;
    }
    //标题
    if(curTitle.length>=10){
        tip.innerHTML="标题超过10个字"
        return false;
    }
    if(curContent.length>=200){
        tip.innerHTML="内容超过200个字"
        return false;
    }
    //日期
    if(curDate.search(/^\d{4}-\d{2}-\d{2}$/)!=-1){//格式匹配，包括是否是数字
        var tmp=curDate.split("-");
        var year=Number(tmp[0]);
        var month=Number(tmp[1]);
        var date=Number(tmp[2]);

        //console.log(year+" "+month+" "+date);
        //判断是否是真实存在的某天
        var leapYear=false;
        var dateExist=true;
        if(year%100==0&&year%400==0){
            leapYear=true;
        }
        else if(year%100!=0&&year%4==0){//非纪元年则整除4
            leapYear=true;
        }
        switch (month) {
            case 1:
            case 3:
            case 5:
            case 7:
            case 8:
            case 10:
            case 12:
                dateExist=(date>0 && date<=31)? true:false;//大月
                break;
            case 4:
            case 6:
            case 9:
            case 11:
                dateExist=(date>0 && date<=30)? true:false;//小月
                break;
            case 2:
                if(leapYear)
                    dateExist=(date>0 && date<=29)? true:false;
                else
                    dateExist=(date>0 && date<=28)? true:false;
                break;
            default:
                dateExist=false;
                break;
        }
        if(!dateExist){
            tip.innerHTML="日期不存在";
            return false;
        }
    }
    else{
        tip.innerHTML="日期格式错误";
        return false;
    }
    //console.log(todoContent.value)  ;
    //console.log(document.getElementById("todo-content-inner").value);
    return true;
}


/**
 * content两种状态（√）
 */
function contentAbled(){
    todoContent.disabled=false;
    todoDate.disabled=false;
    todoTitle.disabled=false;
    addClass(content,"edit");
}
function contentDisabled(){
    todoContent.disabled="disabled";
    todoDate.disabled="disabled";
    todoTitle.disabled="disabled";
    removeClass(content,"edit");
}
