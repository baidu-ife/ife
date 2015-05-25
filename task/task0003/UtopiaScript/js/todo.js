//元素为对象的数组
var group;      //分组
var childGroup; //子分类
var todo;       //task

//初始化

function Group(id, name, child){
    this.id = id;
    this.name = name;
    this.child = child;
}

var group1 = new Group(0, "默认分类", []);
var group2 = new Group(1, "百度IFE项目", [0,1,2,3]);


var initial_group = [group1, group2];

function ChildGroup(id, name, father, child){
    this.id = id;
    this.name = name;
    this.father = father;
    this.child = child;
}

var childGroup1 = new ChildGroup(0, "task01", 1, [0]);
var childGroup2 = new ChildGroup(1, "task02", 1, [1]);
var childGroup3 = new ChildGroup(2, "task03", 1, [2,4]);
var childGroup4 = new ChildGroup(3, "task04", 1, [3]);

var initial_childGroup = [childGroup1, childGroup2, childGroup3, childGroup4];

function ToDo(id, name, father, finish, date, text){
    this.id = id;
    this.name = name;
    this.father = father;
    this.finish = finish;
    this.date = date;
    this.text = text;
}

var todo1 = new ToDo(0, "todo1", 0, true, "2015-05-01", "task0001");
var todo2 = new ToDo(1, "todo2", 1, true, "2015-05-10", "task0002");
var todo3 = new ToDo(2, "todo3", 2, true, "2015-05-20", "task0003");
var todo4 = new ToDo(3, "todo4", 3, false, "2015-05-30", "task0004");
var todo5 = new ToDo(4, "todo5", 2, false, "2015-06-10", "重构task0003");

var initial_todo = [todo1, todo2, todo3, todo4, todo5];

function save() {
    localStorage.group = JSON.stringify(group);
    localStorage.childGroup = JSON.stringify(childGroup);
    localStorage.todo = JSON.stringify(todo);
}

window.onload = function () {
    if (!localStorage.getItem('group')) {  // 页面之前没被访问过的情况，载入默认值
        localStorage.group = JSON.stringify(initial_group);
        localStorage.childGroup = JSON.stringify(initial_childGroup);
        localStorage.todo = JSON.stringify(initial_todo);
    }
    group = JSON.parse(localStorage.group);
    childGroup = JSON.parse(localStorage.childGroup);
    todo = JSON.parse(localStorage.todo);
    creatGroup();
    newGroup();
    newToDo();
}

function creatGroup () {
    var ul=document.getElementById("l-group");
    ul.innerHTML = "";  //每次调用函数先清空任务列表
    for (var i = 0; i < group.length; i++) {
        var li = document.createElement("li");
        var info = group[i].name;      
        var txt = document.createTextNode(info);    
        li.appendChild(txt);        
        ul.appendChild(li);
        li.setAttribute("class", "j-group");
        li.setAttribute("index", group[i].id);
        if(group[i].child.length!=0){
            var child_ul = document.createElement("ul");
            li.appendChild(child_ul);
        }
        for (var j = 0; j < childGroup.length; j++) {
            if(childGroup[j].father==group[i].id){
                var child_li = document.createElement("li");
                var child_info = childGroup[j].name;      
                var child_txt = document.createTextNode(child_info);
                child_li.appendChild(child_txt);
                child_ul.appendChild(child_li);
                child_li.setAttribute("class", "j-child-group");
                child_li.setAttribute("index", childGroup[j].id);
            }            
        }
    };
    creatToDo();
}

function newGroup () {
    var add_group =  document.getElementById("add-group");
    var close = document.getElementsByClassName("pop-close")[0];
    var pop = document.getElementById("pop"); 
    var masklayer = document.getElementById("masklayer");
    var select=document.getElementById("pop-s-parent");
    select.innerHTML = '<option value="-1">无</option>';
    for (var i = 1; i < group.length; i++) {
        var option = document.createElement("option");
        var info = group[i].name;      
        var txt = document.createTextNode(info);              
        option.appendChild(txt);        
        select.appendChild(option);
        option.value = group[i].id;
    };
    add_group.onclick = function() {
        pop.style.display = "block";
        masklayer.style.display = "block";
    }
    close.onclick = function(){
        pop.style.display = "none";
        masklayer.style.display = "none";
    }
    addGroup();
}

function addGroup(){
    var error = document.getElementById("pop-error");
    var button = document.getElementById("pop-confirm");
    button.onclick = function(){
        var name = document.getElementById("pop-group-name").value;
        var father_name = document.getElementById("pop-s-parent").value;
        if(name.length === 0){
            error.innerHTML = "不为空";
            return;
        }
        if(father_name==="-1"){
            error.innerHTML = "";
            var new_group = new Group(group.length, name, []);
            group.push(new_group);
            save();
        }
        else{
            error.innerHTML = "";
            var new_childGroup = new ChildGroup(childGroup.length, name, father_name, []);
            group[father_name].child.push(childGroup.length);
            childGroup.push(new_childGroup);
            save();
        }
        creatGroup();
        newGroup();
        pop.style.display = "none";
        masklayer.style.display = "none";
    }  
}

function creatToDo () {
    var j_group = document.getElementsByClassName("j-group");
    var j_child_group = document.getElementsByClassName("j-child-group");
    for (var i = 0; i < j_child_group.length; i++) {
        j_child_group[i].onclick = function(){
            for (var k = 0; k < j_child_group.length; k++) {
                j_child_group[k].removeAttribute("id");
            };
            this.setAttribute("id","childGroup-selected");
            var id = this.getAttribute("index");            
            var list_wrapper = document.getElementById("list-wrapper");
            list_wrapper.innerHTML = "";
            for(var j=0, len=childGroup[id].child.length; j<len; j++){                
                var info = todo[childGroup[id].child[j]].name;
                var li = document.createElement("li");
                var txt = document.createTextNode(info);              
                li.appendChild(txt);        
                list_wrapper.appendChild(li);
                li.setAttribute("class", "j-todo");
                li.setAttribute("index", todo[childGroup[id].child[j]].id);
                showToDo();
            }
        }
    };
}

function newToDo () {
    var show = document.getElementsByClassName("show");
    var edit = document.getElementsByClassName("edit");
    var add_task = document.getElementById("add-task");
    var cancel = document.getElementById("todo-cancel");
    var confirm = document.getElementById("todo-confirm");
    var error = document.getElementById("todo-error");
    add_task.onclick = function(){
        for (var i = 0; i < show.length; i++) {
            show[i].style.display = "none";
        };
        for (var i = 0; i < edit.length; i++) {
            edit[i].style.display = "inline";
        };
    }
    cancel.onclick = function() {
        for (var i = 0; i < show.length; i++) {
            show[i].style.display = "inline";
        };
        for (var i = 0; i < edit.length; i++) {
            edit[i].style.display = "none";
        };
    }
    confirm.onclick = function(){
        if(edit[0].value!=="" && edit[1].value!=="" &&edit[2].value!==""){
            for (var i = 0; i < show.length; i++) {
                show[i].style.display = "inline";
            };
            for (var i = 0; i < edit.length; i++) {
                edit[i].style.display = "none";
            };
            var father_item = document.getElementById("childGroup-selected");
            var father = father_item.getAttribute("index");
            var newtodo = new ToDo(todo.length, edit[0].value, father, false, edit[1].value, edit[2].value);
            childGroup[father].child.push(todo.length);
            todo.push(newtodo);
            save();
            addGroup();
            error.innerHTML = ""
        }else{          
            error.innerHTML = "内容不能为空！"
        }
    }
}

function showToDo () {
    var j_todo = document.getElementsByClassName("j-todo");
    var show = document.getElementsByClassName("show");
    console.log(j_todo);
    for (var i = 0; i < j_todo.length; i++) {
        j_todo[i].onclick = function(){
            for (var k = 0; k < j_todo.length; k++) {
                j_todo[k].removeAttribute("id");
            };
            this.setAttribute("id","todo-selected");
            var index = this.getAttribute("index");
            show[0].innerHTML = todo[index].name;
            show[1].innerHTML = todo[index].date;
            show[2].innerHTML = todo[index].text;
        }
    };
}