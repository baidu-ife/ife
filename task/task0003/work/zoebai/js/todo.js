// //object Category
function Category(title) {
    this.id = Date.now();
    this.name = title;
    this.children = [];
    this.tasks = [];
}
Category.prototype = {
     constructor: Category,
     addChild: function(subCategoryId) {
        this.children.push(subCategoryId);
     },
     removeChild: function(subCategoryId) {
        var index = this.children.getArrayIndex(subCategoryId);
        thie.children.splice(index,1);
     },
     addTask: function(taskId) {
        this.tasks.push(taskId); 
     },
     findMyTasks: function(){
        var tasksId = cloneObject(this.tasks);
        var tasksIdCopy = cloneObject(this.tasks);
        todo = JSON.parse(localStorage.tasks);
        //找到该分类下的todolist
        var taskList = [];
        for (var index = 0, len = todo.length; index < len; index++) {
            each(tasksId, function(ele, i){
                if(ele === todo[index].id){
                    taskList.push(todo[index]);
                    tasksIdCopy.splice(i,1);
                }
            });
            tasksId = tasksIdCopy;
            if (taskList.length === this.tasks.length){
                return taskList;
            }
        }
        if (taskList.length === this.tasks.length){
            return taskList;
        }else{
            console.log("data error in findMyTasks!");
        }
    },
    findMyChildren: function(){
        var subCatId = cloneObject(this.children);
        var subCatIdCopy = cloneObject(this.children);
        subCategories = JSON.parse(localStorage.subCategories);
        //找到该分类下的todolist
        var subCatList = [];
        for (var index = 0, len = subCategories.length; index < len; index++) {
            each(subCatId, function(ele, i){
                if(ele === subCategories[index].id){
                    subCatList.push(subCategories[index]);
                    subCatIdCopy.splice(i,1);
                }
            });
            subCatId = subCatIdCopy;
            if (subCatList.length === this.children.length){
                return subCatList;
            }
        }
        if (subCatList.length === this.children.length){
            return subCatList;
        }else{
            console.log("data error in findMyChildren!");
        }
    }
};
function SubCategory(title, categoryId) {
    this.id = Date.now();
    this.name = title;
    this.parent = categoryId;
    this.tasks = [];
}
SubCategory.prototype = Category.prototype;
SubCategory.prototype.constructor = SubCategory;

function Task(title, category, date, content){
    this.id = Date.now();
    this.name = title;
    this.parent = category;
    this.deadline = date;
    this.content = content;
    this.dataStatus = "unfinished";//unfinished or finished
}
Task.prototype = {
    constructor: Task,
    changeStatus: function(){
        if(this.dataStatus == "unfinished") {
            this.dataStatus = "finished";
        }
    },
    update: function(title, date, content) {
        this.name = title;
        this.deadline = date;
        this.content = content;
    }
};

//单例模式
var singleton = function(fn) {
    var result;
    return function(){
        if (result) {
            result.style.display = "block";
            if (result.style.opacity == 0) {
                result.style.opacity = 1;
            }
        }
        return result || ( result = fn.apply(this, arguments));
    }
};
var createMask = singleton( function(){
    var mask = document.createElement( "div");
    mask.id = "mask";
    return document.body.appendChild(mask);
});
var createPromptWindow = singleton( function(){
    var promptWindow = document.createElement("div");
    var html_body = "";
    html_body += '<div class = "windowHeader">新建分类<span class = "cancelBtn">x</span></div>';
    html_body += '<input type = "text" maxlength = "10" id = "newCategoryName" placeholder = "新分类名">';
    html_body += '<div class = "cancel cancelBtn">取消</div><div id = "comfirmAddBtn">确认</div>';
    promptWindow.innerHTML = html_body;
    promptWindow.id = "promptWindow";
    return document.body.appendChild(promptWindow);
});
var createWarn = singleton( function(){
    var warnword = document.createElement("p");
    warnword.id = "warnword";
    warnword.style.color = "#f00";
    warnword.style.textIndent = "2em";
    warnword.innerHTML = "您还未输入分类名！";
    return $("#promptWindow").insertBefore(warnword, $(".cancel")); 
});
//close newCategory window
function closePromptWindow(){
    var warnword = $("#warnword");    
    $("input").value = "";
    if (warnword) {
        warnword.style.opacity = 0;
        warnword.style.display = "none";
    }
    $("#promptWindow").style.display = "none";
    $("#mask").style.display = "none";
}
var handle = {
    saveTask: function(){
        var h2 = $("#details h2 span");
        var h3 = $("#details h3");
        var p = $("#details p"); 
        //save value in screen
        var new_task = $("[name=new_task]").value;
        var deadline = $("[name=deadline]").value;
        var words = $("[name=details]").value;
        h2.innerHTML = new_task;
        h3.innerHTML = deadline;
        p.innerHTML = words;
        
        //save data in JSON
        var status = $("#details").getAttribute("data-status");
        if (status == "edit"){
            var activeTask = getByClassName("active_task")[0];
            var task = pairs.dom2JSON(activeTask, 2);
            Task.prototype.update.apply(task, [new_task, deadline, words]);
            localStorage.tasks = JSON.stringify(todo);
            var parent = document.getElementById(task.parent);
            if (parent && parent.tagName.toLowerCase() == "li"){
                var item = pairs.dom2JSON(parent, 1);
            }
            else if(parent && parent.tagName.toLowerCase() == "ul"){
                var item = pairs.dom2JSON(parent, 0);
            }
        }else if(status == "new"){
            //new Task variable and save in localStorage
            var activeCategory = document.getElementsByClassName("active_category")[0];
            var activeSubCategory = document.getElementsByClassName("active_subcategory")[0];
            var parentId = activeSubCategory ? activeSubCategory.id : activeCategory.id;
            var newTask = new Task(new_task, parentId, deadline, words);
            todo.push(newTask);
            localStorage.tasks = JSON.stringify(todo);
            //update the related category variable
            var index, len;
            if (activeSubCategory){
                var item = pairs.dom2JSON(activeSubCategory, 1);
                SubCategory.prototype.addTask.call(item,newTask.id);
                localStorage.subCategories = JSON.stringify(subCategories);
            } else {
                var item = pairs.dom2JSON(activeSubCategory, 0);
                Category.prototype.addTask.call(item, newTask.id);
                localStorage.categories = JSON.stringify(categories);
            }
        }
        //update the tasks list in pages 
        updateTaskList(item);
        updateTaskView();
        $("#details").setAttribute("data-status", "view");
        // change icon
        changeIcon();
        var id = newTask ? newTask.id : activeTask.id;
        var activeTask = document.getElementById(id);
        addClass(activeTask, "active_task");
    },
    cancel: function(){
        var activeTask = getByClassName("active_task")[0];
        var item = pairs.dom2JSON(activeTask, 2);
        $("#details h2 span").innerHTML = item.name;
        $("#details h3").innerHTML = item.deadline;
        $("#details p").innerHTML = item.content; 
        $("#details").setAttribute("data-status",'view');
        changeIcon();
    },
    editTask : function(e){
        var element = e.srcElement ? e.srcElement : e.target;
        var h2 = $("#details h2 span");
        var h3 = $("#details h3");
        var p = $("#details p");
        if (element.id == "edit"){
            var h2_text = h2.innerText;
            var h3_text = h3.innerText;
            var p_text = p.innerText;
            $("#details").setAttribute("data-status","edit");
        }else{
            var h2_text = "";
            var h3_text = "";
            var p_text = "";
            $("#details").setAttribute("data-status","new");
        }
        //add edit zone in right col
        h2.innerHTML = '<input name = "new_task" placeholder = "新任务名">';
        h3.innerHTML = '<input name = "deadline" placeholder = "yyyy-mm-dd">';
        p.innerHTML = '<textarea name = "details" maxlength = "300" placeholder = "任务内容">';
        changeIcon();
        $("[name=new_task]").value = h2_text;
        $("[name=deadline]").value = h3_text;
        $("[name=details]").value = p_text;  
    },
    finishedTask: function(element){
        var editBtn = $("#edit");
        editBtn.id = "non-edit";
        element.id = "done";
        var activeTask = getByClassName("active_task")[0];
        activeTask.setAttribute("data-status", "finished");
        updateTaskView();
        var item = pairs.dom2JSON(activeTask, 2);
        Task.prototype.changeStatus.apply(item);
        localStorage.tasks = JSON.stringify(todo);
    }
};
function changeIcon(){
    var firstNode = $("#details h2 i");
    var secondNode = firstNode.nextSibling;
    var status = $("#details").getAttribute("data-status");
    if (status == "edit" || status == "new"){
        firstNode.className = "lnr lnr-checkmark-circle";
        firstNode.id = "saveTask";
        secondNode.className = "lnr lnr-cross-circle";
        secondNode.id = "cancel";
    }else if (status == "view"){
        firstNode.className = "lnr lnr-thumbs-up";
        firstNode.id = "finished";
        secondNode.className = "lnr lnr-pencil";
        secondNode.id = "edit";
    }
}
function sizer(e){
    var element = e.srcElement ? e.srcElement : e.target;
    var previousSelected = $("#tasks .selected");
    if (element != previousSelected){
        var result = previousSelected && removeClass(previousSelected, "selected");
        addClass(element, "selected");
        updateTaskView();   
    }
}
//add category
$.click("#addCategoryBtn", function(){
    //create mask
    createMask();
    // create proto window
    createPromptWindow();
    //listen click event
    $.click("#promptWindow .cancelBtn", closePromptWindow);
    $.click("#promptWindow .cancel", closePromptWindow);
    $.click("#comfirmAddBtn", function(){
        //save json data
        var newCategoryName = $("input").value;
        //var selected = $("selected");
        if(newCategoryName == "") {
            if(document.getElementById("promptWindow").style.display == "block"){
                createWarn();
            }           
        } else {
            var categoryId, newCategory;
            var active_category = document.getElementsByClassName("active_category")[0];
            if (active_category) {
                categoryId = active_category.id;
                //create & save subCategory
                newCategory = new SubCategory(newCategoryName, categoryId); 
                subCategories.push(newCategory);
                localStorage.subCategories = JSON.stringify(subCategories);
                //
                var item = pairs.dom2JSON(active_category, 0);
                var subCategoryId = newCategory.id;
                Category.prototype.addChild.call(item, subCategoryId);
                localStorage.categories = JSON.stringify(categories);
            } else {
                newCategory = new Category(newCategoryName);
                categories.push(newCategory);
                localStorage.categories = JSON.stringify(categories);
            }            
            //close window
            closePromptWindow();
            //update category list
            updateCatList.addCategory(newCategory);
        }        
    });
});
//add task
$.click("#addTaskBtn", handle.editTask);
$.delegate("#categories", "h3", "click", captureCat);
$.delegate("#categories", "li", "click", captureSubCat);
$.delegate("#taskList", "li", "click", captureTask);
$.delegate("#details h2", "i", "click", taskHandle);
$.delegate("#tasks h2", "span", "click", sizer);

window.onload = function(){
    todo = [];
    categories = [];
    subCategories = [];
    if (localStorage.categories){
        init();
    }else{
        var intialCat = new Category("百度IFE项目");
        categories.push(intialCat);
        document.getElementsByClassName("active_category")[0].id = intialCat.id;
        localStorage.categories = JSON.stringify(categories);
        localStorage.subCategories = JSON.stringify(subCategories);
        localStorage.tasks = JSON.stringify(todo);
    }

};
function init(){
    updateCatList.initCategory();
}
function taskHandle(e){
    var element = e.srcElement ? e.srcElement : e.target;
    var operator = element.id;
    switch(operator){
        case "finished":
            handle.finishedTask(element);
            break;
        case "edit":
            handle.editTask(e);
            break;
        case "cancel":
            handle.cancel();
            break;
        case "saveTask":
            handle.saveTask(e);
            break;
    }
}
function updateTaskList(element){
    var hash = {}, ele;
    var taskList = SubCategory.prototype.findMyTasks.apply(element);
    for (var i = 0, len = taskList.length; i < len; i++){
        ele = taskList[i].deadline;
        if (!hash[ele]) {
            hash[ele] = [];
            hash[ele].push(taskList[i]);
        }
        else {
            hash[ele].push(taskList[i]);
        }
    }
    //形成DOM节点进行前端显示   
    var fragment = document.createDocumentFragment();
    for (var i in hash) {
        var p = document.createElement("p");
        p.className = "deadline";
        var pTxt = document.createTextNode(i);
        p.appendChild(pTxt);
        fragment.appendChild(p);
        var u = document.createElement("ul");
        u.className = "taskName";
        for (var j = 0; j < hash[i].length; j++) {
            u.innerHTML += "<li id = " + hash[i][j].id + " data-status=" + hash[i][j].dataStatus + ">" + hash[i][j].name + "</li>";
        }
        fragment.appendChild(u);
    }
    var list = document.getElementById("taskList"); 
    list.innerHTML = "";
    list.appendChild(fragment);
}
function updateTaskView(){
    var type = $(".selected").getAttribute("data-name");
    var taskList = getByClassName("taskName");
    switch(type){
        case "all":
            var list = convertToArray(getByClassName("hidden"));
            if (list.length > 0){
                each(list, function(item, i){
                    removeClass(item, "hidden");
                });
            }
            break;
        case "unfinished":
            var finishedList = convertToArray(getByClassName("hidden"));
            if (finishedList.length > 0){
                each(finishedList, function(item, i){
                    removeClass(item, "hidden");
                });
            }
            for(var i = 0, len = taskList.length; i < len; i++){
                var children =  convertToArray(taskList[i].children);
                var length = children.length;
                var num = 0;
                each(children, function(item, i){
                    if(item.getAttribute("data-status") == "finished"){
                        addClass(item, "hidden");
                        num++;
                    }          
                });
                if(num == length){
                    addClass(taskList[i].previousSibling,"hidden");
                }
            }
            break;
        case "finished":
            var unfinishedList = convertToArray(getByClassName("hidden"));
            if (unfinishedList.length > 0){
                each(unfinishedList, function(item, i){
                    removeClass(item, "hidden");
                });
            }
            for(var i = 0, len = taskList.length; i < len; i++){
                var children =  convertToArray(taskList[i].children);
                var length = children.length;
                var num =0;
                each(children, function(item, i){
                    if(item.getAttribute("data-status") == "unfinished"){
                        addClass(item,"hidden");
                        num++;
                    }
                });
                if(num == length){
                    addClass(taskList[i].previousSibling,"hidden");
                }
            }
            break;
    }
}
function updateTaskContent(element){
    $("#details").setAttribute("data-status", "view");
    changeIcon();
    var task = pairs.dom2JSON(element, 2);
    if(task.dataStatus == "finished"){
        var firstNode = $("#details h2 i");
        var secondNode = firstNode.nextSibling;
        firstNode.id = "done";
        secondNode.id = "non-edit";
    }    
    $("#details h2 span").innerHTML = task.name;
    $("#details h3").innerHTML = task.deadline;
    $("#details p").innerHTML = task.content;

}
function captureCat(e){
    var element = e.srcElement ? e.srcElement : e.target;
    var previousActive = getByClassName("active_category")[0];
    var parentNode = element.parentNode;
    if (parentNode != previousActive ) {
        var result = previousActive && removeClass(previousActive, "active_category");
        result = (!parentNode.className) && (parentNode.className = "");
        addClass(parentNode, "active_category");
        var previousSubActive = getByClassName("active_subcategory")[0];
        var result = previousSubActive && removeClass(previousSubActive, "active_subcategory");
    }
}
function captureSubCat(e){
    captureCat(e);
    var element = e.srcElement ? e.srcElement : e.target;
    var previousActive = getByClassName("active_subcategory")[0];
    if (element != previousActive) {
        var result = previousActive && removeClass(previousActive, "active_subcategory");
        result =  (!element.className) && (element.className = "");
        addClass(element, "active_subcategory");
        if (element.parentNode.id != "default"){
            //找出该category对应的task
            var subCat = pairs.dom2JSON(element, 1);        
            updateTaskList(subCat);
            updateTaskView();
        }else{

        }
    }   
}
function captureTask(e){
    var element = e.srcElement ? e.srcElement : e.target;
    var previousActive = getByClassName("active_task")[0];
    if (element != previousActive){
        var result = previousActive && removeClass(previousActive, "active_task");
        addClass(element, "active_task");
        updateTaskContent(element);
    }
}
var updateCatList = {
    addCategory: function(category){
        var newCategory;
        if (!category.parent) {
            newCategory = document.createElement("ul");
            newCategory.id = category.id;
            newCategory.innerHTML = "<h3 class='lnr lnr-menu'>   " + category.name + "  (<i>0</i>)<i class='lnr lnr-cross'></i></h3>";
            document.getElementById("categories").appendChild(newCategory);
        } else {
            var parentCat = document.getElementById(category.parent); 
            newCategory = document.createElement("li");
            newCategory.id = category.id;
            newCategory.innerHTML = "<span class='lnr lnr-file-empty'></span>   " + category.name + "   (<i>0</i>)<i class='lnr lnr-cross'></i>";
            parentCat.appendChild(newCategory);
        }
    },
    initCategory: function(){
        categories = JSON.parse(localStorage.categories);
        var fragment = document.createDocumentFragment();
        for(var i = 0,len = categories.length; i < len; i++){
            var category = categories[i];
            var newCategory = document.createElement("ul");
            newCategory.id = category.id;
            newCategory.innerHTML = "<h3 class='lnr lnr-menu'>   " + category.name + "  (<i>0</i>)<i class='lnr lnr-cross'></i></h3>";
            var children = Category.prototype.findMyChildren.apply(category);
            for (var j = 0, len1 = children.length; j < len1; j++){
                var subCat = children[j];
                var newSubCategory = document.createElement("li");
                newSubCategory.id = subCat.id;
                newSubCategory.innerHTML = "<span class='lnr lnr-file-empty'></span>   " + subCat.name + "   (<i>0</i>)<i class='lnr lnr-cross'></i>";
                newCategory.appendChild(newSubCategory);
            }
            fragment.appendChild(newCategory);
        }
        document.getElementById("categories").appendChild(fragment);
    },
    deleteCategory: function(){}
};
var pairs = {
    //find the JSON object related to DOM node
    json2DOM: function(jsonString, flag){
        switch (flag) {
            case 0:
                categories = JSON.parse(jsonString); 
                break;
            case 1: break;
            case 2: 
        } 
    },
    //find the DOM node relate to JSON object
    //find the JSON object related to DOM node
    dom2JSON: function( element, flag ){
        var eleId = element.id;
        var i, len;
        switch (flag){
            case 0:
                categories = JSON.parse(localStorage.categories);
                for (i = 0, len = categories.length; i < len; i++){
                    if (categories[i].id == eleId){
                        return categories[i];
                    }
                }
                break;
            case 1:
                subCategories = JSON.parse(localStorage.subCategories);
                for (i = 0, len = subCategories.length; i < len; i++){
                    if (subCategories[i].id == eleId){
                        return subCategories[i];
                    }
                }
                break;
            case 2:
                todo = JSON.parse(localStorage.tasks);
                for (i = 0, len = todo.length; i < len; i++){
                    if (todo[i].id == eleId){
                        return todo[i];
                    }
                }
                break;
            default:
                console.log("invalid flag!");
        }
    }
}
function convertToArray(nodes){
    var array = null;
    try{
        array = Array.prototype.slice.call(nodes,0);
    } catch (ex) {
        array = new Array();
        for(var i=0, len = nodes.length; i < len; i++){
            array.push(nodes[i]);
        }
    }
    return array;
}