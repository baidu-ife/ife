/**
 * Created by Y2X on 2015/5/8.
 */

/*
我是这么理解需求的，最左栏是目录(catalog)和子目录(task)列表，
中间栏是task/默认分类下的具体的todo列表，也就是所谓的任务列表。
注：catalog里同级的task和todo只能选一个。请不要同时加啊！！！

不足：
在最左栏中，catalog和task的上下文环境没有统一，导致操作变得很麻烦，这种麻烦贯穿了所有添加、删除操作。


 */

/**
 * 定义catalog task todo 对象
 */
/*if(!localStorage.catalog){
    localStorage.c*/
var defaultCatalog=[
        {
            name:"默认分类",//default catalog
            todo:[
                {
                    name:"todo0",
                    date:"2015-05-16",
                    content:"i'm the first one",
                    state:"unfinished"
                }
            ],
            count:1
        },
        {
            name:"new",
            task:[
                {
                    name:"task0",
                    todo:[],
                    count:0
                }
            ],
            todo:[],
            count:0
        },
        {
            name:"new2",
            task:[],
            todo:[
                {
                    name:"todo1",
                    date:"2015-05-16",
                    content:"hello world",
                    state:"unfinished"
                }
            ],
            count:1
        }
    ];
/*}*/
localStorage.setItem("catalog",JSON.stringify(defaultCatalog));
//console.log(myCatalog[0].task[0].todo[0].date);
/*console.log(myCatalog.length);
console.log(myCatalog[1].task.length);*/
/*if(myCatalog[0].task[0].todo[0].date>"2015-05-12"){
    console.log("大于");
}*/
function Catalog(name){
    this.name=name;
    this.task=[];
    this.todo=[];
    this.count=0;
}
function Task(name){
    this.name=name;
    this.todo=[];
    this.count=0;
}
function Todo(name,date,content){
    this.name=name;
    this.date=date;
    this.content=content;
}


/**
 * 一些全局变量
 */
/*countAll  //所有未完成的todo
*/


/**
 * 载入所有数据
 */
var myCatalog=JSON.parse(localStorage.getItem("catalog"));
var countAll=myCatalog[0].count;//初始值为默认列表中的未完成的任务
for(var i=1;i<myCatalog.length;i++){//默认列表不需要重新载入
    //获取分类列表
    var catalogWrap=document.getElementById("catalog-wrap");

    //所有分类
    var ele=document.createElement("div");
    ele.setAttribute("data-catalog-no",i+"");
    var nameEle=document.createElement("div");
    addClass(nameEle,"catalog-name");
    nameEle.innerHTML="<span>" + myCatalog[i].name + "</span>"+
                   "（<span class='unfinished-count'>" + myCatalog[i].count + "</span>）" +
                   "<img class='delete' src='img/delete.png'/>";
    ele.appendChild(nameEle);
    if(myCatalog[i].task.length!=0){
        var taskEle=document.createElement("div");
        for(var j=0;j<myCatalog[i].task.length;j++){
            taskEle.setAttribute("data-task-no",j+"");
            taskEle.innerHTML="<span class='task-name'>"+myCatalog[i].task[j].name+"</span>"+
                              "（<span class='unfinished-count'>"+myCatalog[i].task[j].count+"</span>）"+
                              "<img class='delete' src='img/delete.png'/>";
            ele.appendChild(taskEle);
        }
    }
    catalogWrap.appendChild(ele);
    countAll+=myCatalog[i].count;
}
document.getElementById("unfinished-count-all").innerHTML=countAll+"";




var allCatalogBtn=document.getElementsByClassName("catalog-all-title")[0];
var allTaskBtn=document.getElementsByClassName("task-all-title")[0];
var allCatalog=document.getElementById("catalog-wrap");
var allTask=document.querySelector(".task-wrap");/*只是最前面的.task-wrap，即“所有任务下的”*/

/**
 *“所有任务”“分类列表”展开/关闭
 */
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
 * 删除分类/任务（√）
 */
var deleteBtn=document.getElementsByClassName("delete");
for(var i=0;i<deleteBtn.length;i++){
    addClickEvent(deleteBtn[i],deleteItem);
}
function deleteItem(event){
    var cfm=confirm("确定要删除该任务？");
    if(cfm==false){
        return;
    }

    /*获取元素以及编号*/
    //myCatalog=localStorage.getItem("catalog");
    var item=event.target;//console.log(item);
    var current=null;//item in myCatalog
    if(item.parentNode.getAttribute("data-task-no")!=null){//选中task下的delete
        item=item.parentNode;//item:[data-task-no]
        current=myCatalog[item.parentNode.getAttribute("data-catalog-no")].task[item.getAttribute("data-task-no")];
        //console.log("delete "+item.parentNode.getAttribute("data-catalog-no")+"-"+item.getAttribute("data-task-no")+":"+current.name);
        myCatalog[item.parentNode.getAttribute("data-catalog-no")].count-=current.count;
    }
    else{//选中catalog下的delete
        item=item.parentNode.parentNode;
        current=myCatalog[item.getAttribute("data-catalog-no")];
        //console.log("delete "+item.getAttribute("data-catalog-no")+":"+current.name);
    }

    /*界面变化&相关变量变化*/
    //catalog栏
    document.getElementById("unfinished-count-all").innerHTML=String(countAll-current.count);//所有任务--未完成总数
    item.parentNode.removeChild(item);    //在catalog栏中消失
    //todo栏,content栏
    if(item==chosen||chosen.parentNode==item){    //如果删除的任务正在todo栏中显示，则todo栏清空，且content栏清空
        chosen=null;
        //console.log("删除的内容正在todo栏中显示，清空todo栏");
        document.getElementsByClassName("todo-wrap")[0].innerHTML="";
        chosenTodo=null;
        //console.log("清空content栏");
        //todo:目前的实现不是标准的清空
        content.style.display="none";
    }//否则chosen,todo栏,chosenTodo,content栏都不变


    /* 更改myCatalog,并存储*/
    current=null;//如何删除？（此处暂时处理为设为空）
    //console.log(myCatalog);//不因此↑而变?
    //console.log(current);//console.log(current.name);
    localStorage.setItem("catalog",JSON.stringify(myCatalog));

}

//不足：程序可读性有点差
//BUG(√):点击delete后会自动调用chooseItem，出现异常

/**
 * 添加分类
 * 当前无选中(chosen=null)，添加【新分类】（#catalog-wrap下插入）
 * 如果当前选中“默认分类”（data-catalog-no=0），则添加【新分类】（#catalog-wrap下插入）
 * 如果当前选中其他分类（data-catalog-no)，则添加【子分类】（*chosen的下插入）
 * 当前选中子分类（data-task-no），则添加【子分类】（*chosen的父节点下插入）
 */
var defaultCatalog=document.getElementById("default-catalog");
var addCatalog=document.querySelector("#catalog-task .add");

//chosen.parentNode.getAttribute("data-catalog-no")!=null //选中分类catalog（[data-catalog-no]下的.catalog-name）
//chosen.getAttribute("data-task-no")!=null //选中子分类task（[data-task-no]节点）


addClickEvent(addCatalog,function(){
    //myCatalog=localStorage.getItem("catalog");
    var newName=prompt("输入新分类的名称","new");
    if(newName!=null&&newName!=""){
        var item;//for html DOM
        var obj={};//for myCatalog
        var wrap;//插入新节点的相应父节点
        var index;//标记编号

        if(chosen==null||chosen.getAttribute("data-catalog-no")==0){//添加新分类
            wrap=allCatalog;
            index=myCatalog.length+"";
            item=document.createElement("div");//构造节点
            item.setAttribute("data-catalog-no",index);
            item.innerHTML="<div class='catalog-name'>"+
                           "<span>"+newName+"</span>"+
                           "（<span class='unfinished-count'>0</span>）"+
                           "<img class='delete' src='img/delete.png'/></div>";
            //console.log(item);

            //更改myCatalog
            obj=new Catalog(newName);
            myCatalog.push(obj);
        }
        else {//添加子分类
            //在该分类下添加子分类
            wrap=chosen;
            if(chosen.getAttribute("data-catalog-no")==null){//choose task
                wrap=chosen.parentNode;
            }
            var tmp=Number(wrap.getAttribute("data-catalog-no"));
            index=myCatalog[tmp].task.length;
            item=document.createElement("div");
            item.setAttribute("data-task-no",index);
            item.innerHTML=" <span class='task-name'>"+newName+"</span>"+
                           "（<span class='unfinished-count'>0</span>）"+
                           "<img class='delete' src='img/delete.png'/>";
            //console.log(item);

            //更改myCatalog
            obj=new Task(newName);
            myCatalog[tmp].task.push(obj);
        }


        wrap.appendChild(item);//插入节点
        addClickEvent(item,chooseItem);//添加选择事件
        addClickEvent(item.getElementsByClassName("delete")[0],deleteItem);//添加删除事件
        localStorage.setItem("catalog",JSON.stringify(myCatalog));
    }
});
//BUG（√）:新添加的分类下再添加的子分类不能被选中！因为直接对item添加选中事件，实际上根据catalog和task应该对不同的元素进行添加


/**
 * catalog-task 选择任务(√)
 */

var chosen=document.getElementsByClassName("isChosen")[0];//注意其实是Elements！！！
var catalogs=document.getElementsByClassName("catalog-name");//点击catalog-name被选中
var tasks=document.querySelectorAll("[data-task-no]");
for(var j=0;j<tasks.length;j++) {//选中子分类，该节点含有[data-task-no]
    addEvent(tasks[j], "click", chooseItem);
}
for(var i=0;i<catalogs.length;i++){//选中分类名.catalog-name,其parentNode含有[data-catalog-no]
    addEvent(catalogs[i],"click", chooseItem);
}

function chooseItem(event){
    var item=event.target;
    while(item.getAttribute("data-catalog-no")==null&&
    item.getAttribute("data-task-no")==null){//可能会选中.catalog-name或者[data-task-no]中的子节点
        item=item.parentNode;
    }

    //↓something strange!!
    //按下delete后依然会触发chooseItem，此时此处仍然可以找到item([data-task-no]),但是delete元素的父元素却为null
    //console.log(item);
    //console.log(item.parentNode);//->null
    if(item.parentNode==null){
        return;
    }

    //deal with style(class) change
    if(chosen!=null){//如果chosen不是null,则先移除chosen
        removeClass(chosen,"isChosen");
    }
    if(item===chosen){//如果本来就已经选中，则取消选择
        //removeClass(chosen,"isChosen");
        chosen=null;
        return;
    }
    else{//如果选中其他，则重置chosen以及其样式
        //removeClass(chosen,"isChosen");
        chosen=item;
        addClass(item,"isChosen");

        //todo栏
        chosenTodo=null;
        //content栏
        content.style.display="none";
    }

    //deal with todobar
    var current=findChosenInCatalog();//chosen在myCatalog中的位置
    showTodo(current.todo);//+currentState

}
/*问题1（√）：因为用event.target定位，所以可能会定位到各种子元素……比如span .delete。所以最好在空白的地方点击
 * 优化（√）：两个addEvent应该可以合并
 * */
//todo:更改todo栏状态时，是否需要判断todo栏选择的todo状态？
//todo:是否需要将更改todo栏独立出一个方法？

/**
 * 找到chosen的在myCatalog中的编号（位置）
 */
function findChosenInCatalog(){
    var current;
    if(chosen==null) return {};
    if(chosen.getAttribute("data-catalog-no")!=null){//choose catalog
        // if catalog contains todos(suppose catalog can only contains todos or tasks)
        current=myCatalog[chosen.getAttribute("data-catalog-no")];
    }
    else{
        current=myCatalog[chosen.parentNode.getAttribute("data-catalog-no")].task[chosen.getAttribute("data-task-no")];
    }
    return current;
}

/**
 * 给一组排好序的数组(arr)，
 * 根据当前选择的todo状态(currentState.getAttribute("data-task-state")),
 * 输出todo列表
 */
function showTodo(arr){
    if(arr==null) return;

    //进行状态过滤
    switch (currentState.getAttribute("data-task-state")){
        case "all":
            break;
        case "finished":
        case "unfinished":
            arr=arr.filter(function(value){
                return value.state==currentState.getAttribute("data-task-state");
            });
            break;
    }

    //输出html
    var todoWrap=document.getElementsByClassName("todo-wrap")[0];
    todoWrap.innerHTML="";
    if(arr.length!=0){
        for(var i=0;i<arr.length;i++){
            var todoItem=document.createElement("div");
            addClass(todoItem,"todo-each-day");
            var str="";
            if(i==0||arr[i].date!=arr[i-1].date){
                str+="<div class='todo-date'>" + arr[i].date + "</div>";
            }
            todoItem.innerHTML=str+ "<div data-todo-no='"+i+"'>" + arr[i].name + "</div>";
            addClickEvent(todoItem,chooseTodo);
            todoWrap.appendChild(todoItem);
            //console.log("append new ");

        }
    }
}

/**
 * todo列表状态选择（√）
 */
var currentState=document.getElementsByClassName("state-chosen")[0];/*太坑爹……[0]*/
var states=document.querySelectorAll("[data-task-state]");

for(var i=0;i<states.length;i++){
    addClickEvent(states[i],function(event) {

        //change state
        removeClass(currentState, "state-chosen");
        var item = event.target;
        currentState = item;
        addClass(currentState, "state-chosen");


        //根据状态选择，todo列表产生变化
        var current=findChosenInCatalog();
        showTodo(current.todo);
});
}



var content=document.getElementById("todo-content");

var todoContent=document.getElementById("todo-content-inner");
var todoDate=document.getElementById("todo-date");
var todoTitle=document.getElementById("todo-title");


/**
 * 选择todo
 * chosenTodo==null---->chosenTodo=item.taget,右侧显示
 * chosenTodo!=null---->先处理chosenTodo,再↑
 * */
var chosenTodo=document.getElementsByClassName("todo-chosen")[0];//当前选中
var todos=document.querySelectorAll("[data-todo-no]");

for(var i=0;i<todos.length;i++) {
    addClickEvent(todos[i], chooseTodo);
}

function chooseTodo(event){
    if(chosenTodo!=null) {//当前有选中，先处理当前todo
        //右侧详细信息变化
        //先判断之前是否有任务在编辑
        if(!giveUpTodo()) //不放弃当前编辑，那什么都不会发生哟~\(≧▽≦)/~啦啦啦
            return;
        else
            removeClass(chosenTodo,"todo-chosen");
    }
    //chosenTodo==null || 当前不在编辑状态 || 直接放弃编辑
    var item=event.target;//更新chosenTodo
    chosenTodo=item;
    addClass(chosenTodo,"todo-chosen");

    //todo:填充新chosenTodo的content栏数据
    content.style.display="block";
    //console.log(chosen);
    //console.log(chosenTodo);
    var current=findChosenInCatalog().todo[chosenTodo.getAttribute("data-todo-no")];//
    //console.log(current);
    fillContent(current);
    /*
    tip.innerHTML="";
    todoTitle.value=current.name;
    todoDate.value=current.date;
    todoContent.value=current.content;
    content.setAttribute("data-state",current.state);*/
}

/**
 * 查看当前content状态，
 * 如果正在编辑/新增，则选择是否放弃当前正在修改的todo
 * `return true/false
 */
function giveUpTodo(){
    if (content.classList.contains("new")) {
        var cfm = confirm("确定放弃本次新增？");
        if (!cfm) {
            return false;
        }
        else {
            removeClass(content,"edit");
            removeClass(content,"new");
            console.log("a new todo generate");
            //todo:更新myCatalog,new一个新的todo
        }
    }
    else if (content.classList.contains("edit")) {
        var cfm = confirm("确定放弃本次修改？");
        if (!cfm) {
            return false;
        }
        else {
            removeClass(content,"edit");
            console.log("update myContent");
            //todo:更新myCatalog，更新当前todo
        }
    }
    return true;
}
//不足:classList不兼容ie8

/**
 * 根据传入的todo对象显示content
 */
function fillContent(item){
    if(item==null){
        tip.innerHTML="";
        todoTitle.value="";
        todoDate.value="";
        todoContent.value="";
        content.setAttribute("data-state","unfinished");
        console.log("clear");
    }
    else{
        tip.innerHTML="";
        todoTitle.value=item.name;
        todoDate.value=item.date;
        todoContent.value=item.content;
        content.setAttribute("data-state",item.state);
        console.log("use current todo fill content");
    }
}

/**
 * add,添加todo，最右侧更新编辑
 */
var addTask=document.querySelector("#task-list .add");

addClickEvent(addTask,function(){
    if(!giveUpTodo()){
        return;
    }
    //初始化一个编辑界面
    content.style.display="block";
    /*
    todoTitle.value="";
    todoDate.value="";
    todoContent.value="";
    tip.innerHTML="";*/
    fillContent();
    contentAbled();
    addClass(content,"new");//表明当前在新增任务
});
//todo：“所有任务”中保持同步（仅所有未完成数量)

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
addClickEvent(btnCancel,function(){/*
    var cfm=confirm("取消当前新增/修改任务？");
    if(cfm){
        content.style.display="none";
    }*/
    if(giveUpTodo()){
        content.style.display="none";
    }
    else{
        return;
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
