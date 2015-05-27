// Object constructor of App
function App() {

}

// Object constructor of Task
function Task(key,  title, date, content) {
    this.key = key;             // the key for save/load of a task object in localStorage
    this.title = title;         // the title of the task
    this.date = date;           // the date of the task
    this.content = content;     // the content of the task
    this.finished = 0;          // indicate if the task is finished yet
}

// Object constructor of Category
function Category(key, title, parent, child, task, nTaskUnfinished) {
    this.key = key;             // the key for save/load of a category object in localStorage
    this.title = title;         // the title of the category
    this.parent = parent;       // the parent category of this category
    this.child = child;         // the list of children categories
    this.task = task;           // the tasks under this category
    this.nTaskUnfinished = nTaskUnfinished;     // the number of unfinished tasks under this category
}

App.prototype.init = function(userSetting) {
    this.initialize();
    this.addCategorySetup();
    this.clickCategorySetup();
    this.addTaskSetup();
    this.clickTaskSetup();
};

/************************************** initialize ***************************************/

// initialization when the page is first loaded or refreshed
App.prototype.initialize = function() {
    this.setDisable();
    $('#task-complete-button').setAttribute("disabled", true);
    $('#task-edit-button').setAttribute("disabled", true);

    var categoryList = $('#category-list');
    var rootCategoryData =  Data.getItem('rootCategory');

    if(rootCategoryData === null) {
        var rootCategory = new Category('rootCategory', 'All Categories', null, ['defaultCategory'], [], 0);
        var defaultCategory = new Category('defaultCategory', 'Default category', 'rootCategory', [], [], 0);
   
        Data.setItem("rootCategory", rootCategory); 
        Data.setItem("defaultCategory", defaultCategory); 
        rootCategoryData = Data.getItem('rootCategory');
    }

    // construct the category tree
    function buildCategoryTree(key) {
        var ret = "";
        var task = Data.getItem(key);
        ret += "<div data-key=" + key + ">" + 
                "<span class='iconfont'>&#xe753;</span>&nbsp;&nbsp;&nbsp;&nbsp;" + 
                task.title + 
                "(<span class=unFinishNum>" + task.nTaskUnfinished + "</span>)" +
                "<span class='iconfont delete-icon'>&#xe632;</span>" + 
                "</div>";
        ret += "<ul style='display:none'>";
        for (var i = 0; i < task.child.length; ++i) {
            ret += "<li>";
            ret += buildCategoryTree(task.child[i]);
            ret += "</li>";
        }
        ret += "</ul>";
        return ret;
    }

    $('#all-task-unFinishNum').innerHTML = rootCategoryData.nTaskUnfinished;

    categoryList.innerHTML = buildCategoryTree("rootCategory");

    // expand the rootCategory 
    this.toggleCategory("rootCategory");

    // set the defaultCategory as active
    addClass($('[data-key=defaultCategory]'), "active");
    this.currentCategory = "defaultCategory";
    $("#new-category-button").setAttribute("disabled", true);
    this.taskState = 2;
    this.currentTask = null;
    this.displayTaskList();
};

/********************************* task operations ******************************************/


// initialize the task input section
App.prototype.initInput = function() {
    $('#title-input').value = "";
    $('#date-input').value = new Date().toISOString().slice(0, 10);
    $('#task-input').value = "";
};

// disable the task input section 
App.prototype.setDisable = function() {
    $('#title-input').setAttribute("disabled", true);
    $('#date-input').setAttribute("disabled", true);
    $('#task-input').setAttribute("disabled", true);
    $('#save-button').setAttribute("disabled", true);
    $('#cancel-button').setAttribute("disabled", true);

    $('#task-complete-button').removeAttribute("disabled");
    $('#task-edit-button').removeAttribute("disabled");
};

// enable the task input section
App.prototype.removeDisable = function() {
    $('#title-input').removeAttribute("disabled");
    $('#date-input').removeAttribute("disabled");
    $('#task-input').removeAttribute("disabled");
    $('#save-button').removeAttribute("disabled");
    $('#cancel-button').removeAttribute("disabled");

    $('#task-complete-button').setAttribute("disabled", true);
    $('#task-edit-button').setAttribute("disabled", true);
};

// display one task in the task section
App.prototype.showOneTask = function(key) {
    if(!key) {
        $("#title-input").value = "";
        $("#date-input").value = "";
        $("#task-input").value = "";
        $('#task-complete-button').setAttribute("disabled", true);
        $('#task-edit-button').setAttribute("disabled", true);
    }
    else {
        var task = Data.getItem(key);
        $("#title-input").value = task.title;
        $("#date-input").value = task.date;
        $("#task-input").value = task.content;
    }
};

// setup event handler when a task is clicked in the middle task display section
App.prototype.clickTaskSetup = function() {
    var self = this;
    // event handler for when a task item is clicked in the middle task display section
    $('#task-list').onclick = function(ev) {
        self.setDisable();
        if(!self.currentTask) {
            $('#task-complete-button').removeAttribute("disabled");
            $('#task-edit-button').removeAttribute("disabled");
        }
        var ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (hasClass(target, "date-item")) return;

        var taskKey = target.getAttribute('data-key');
        self.showOneTask(taskKey);
        
        if(self.currentTask) {
            var selec = "[data-key=" + self.currentTask + "]";
            var oldTask = $(selec);
            if(oldTask) removeClass(oldTask, "active");
        }
        addClass(target, "active");
        self.currentTask = taskKey;
    };

    function removeTaskNavActive() {
        removeClass($("#task-all"), "active");
        removeClass($("#task-unfinished"), "active");
        removeClass($("#task-finished"), "active");
    }

    // event handler for when the navigation bar in the middle task display section is clicked
    $('#task-state-nav').onclick = function(ev) {
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        if (target.nodeName.toLowerCase() == "button") {
            removeTaskNavActive();
            addClass(target, "active");
            if(target.getAttribute("id") == "task-all") self.taskState = 2;
            else if(target.getAttribute("id") == "task-unfinished") self.taskState = 0;
            else self.taskState = 1;
            self.currentTask = null;
            self.displayTaskList();
        }
    }
};

// display task under current category
App.prototype.displayTaskList = function() {
    if(!this.currentCategory) {
        $('#task-list').innerHTML = "";
        return;
    }
    var category = Data.getItem(this.currentCategory);
    var taskListEle = $('#task-list');
    var str = "";
    var lastDate;
    for (var i = 0; i < category.task.length; ++i) {
        var task = Data.getItem(category.task[i]);

        if (this.taskState == 2 || this.taskState == task.finished) {
            if(!lastDate || task.date != lastDate) {
                var dateItem = "<li class='date-item'>" + 
                                task.date +
                                "</li>";
                str += dateItem;
                lastDate = task.date;
            }
            var taskStateClass = task.finished == 1 ? " taskFinished" : "";
            var taskItem = "<li class='task-item" + taskStateClass + "' data-key='" + task.key + "'>" + 
                            task.title + 
                            "</li>";
            str += taskItem;
        }
    }
    taskListEle.innerHTML = str;
    if(this.currentTask) addClass($("[data-key="+ this.currentTask + "]"), "active");
};

// update the number of unfinished tasks
App.prototype.updateTaskNum = function(key, delta) {
    while(key) {
        var div = $("[data-key=" + key + "]"); 
        var data = Data.getItem(key);
        data.nTaskUnfinished += delta;
        Data.setItem(data.key, data);
        if(key == "rootCategory") $('#all-task-unFinishNum').innerHTML = data.nTaskUnfinished;
        var spans = div.getElementsByTagName("span");
        spans[1].innerHTML = data.nTaskUnfinished;
        key = data.parent;
    }
};

// setup the event handler for when a new task is added
App.prototype.addTaskSetup = function() {
    var self = this;
    $('#save-button').onclick = function() {
        var title = $('#title-input').value;
        var date = $('#date-input').value;
        var content = $('#task-input').value;
        //验证一下
        var task;
        if(self.currentTask == "newTask") {
            // if saving a new task
            var key = new Date().getTime();
            task = new Task(key, title, date, content);
            Data.setItem(key, task);
            self.currentTask = key;
            Data.addTask(self.currentCategory, key); 
            self.updateTaskNum(self.currentCategory, 1);
        } else {
            // if saving a existing task
            task = Data.getItem(self.currentTask);
            task.title = title;
            task.date = date;
            task.content = content;
            Data.setItem(task.key, task);
        }
        self.displayTaskList();         
        self.setDisable(); 
    };
    $('#cancel-button').onclick = function() {
        if (self.currentTask == "newTask") {
            self.initInput();      
            $('#task-complete-button').setAttribute("disabled", true);
            $('#task-edit-button').setAttribute("disabled", true);
            self.currentTask = null;
        }
        else {
            self.showOneTask(self.currentTask);
        }
        self.setDisable();
        self.isEditing = false;
    };
    $('#new-task-button').onclick = function() {
        self.initInput();
        self.removeDisable();
        self.currentTask = "newTask";
        self.isEditing = true;
    }
    $('#task-edit-button').onclick = function() {
        self.removeDisable();
        self.isEditing = true;
    }
    $('#task-complete-button').onclick = function() {
        var task = Data.getItem(self.currentTask);
        task.finished = 1;
        Data.setItem(self.currentTask, task);
        self.updateTaskNum(self.currentCategory, -1);
        self.displayTaskList();
    }
    //validate title input
    $('#title-input').onblur = function() {
        var value = $('#title-input').value;
        if(value < 1) {
            $("#title-tip").innerHTML = "Title can't be empty, please input again!"
        }
        else {
            $("#title-tip").innerHTML = "";
        }
    }
    // validate content input
    $('#task-input').onblur = function() {

    }  
};



/*************************************** category opertions **********************************/

App.prototype.belongsTo = function(task, category) {
    var taskObj = Data.getItem(task);
    var categoryObj = Data.getItem(category);
    if (task in categoryObj.task) return true;
    var parent = task.parent;
    while(parent) {
        var parentObj = Data.getItem(parent);
        if (parent in categoryObj.child) return true;
        parent = parentObj.parent;
    }
    return false;
}

// setup the event handler for when a category in the category section is clicked
App.prototype.clickCategorySetup = function() {
    var self = this;
    $("#category-list").onclick = function(ev) {
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        var targetName = target.nodeName.toLowerCase();

        // delete a category
        if (hasClass(target, "delete-icon")) {
            var categoryDiv = target.parentNode;
            var deleteKey = categoryDiv.getAttribute("data-key");
            var category = Data.getItem(deleteKey);

            self.createDialog("deleteCategory", category.title);
            $("#confirm").onclick = function() {
                self.updateTaskNum(deleteKey, (-1) * category.nTaskUnfinished);
                var li = categoryDiv.parentNode;
                li.parentNode.removeChild(li);
                Data.removeCategory(deleteKey);
                self.removeDialog();

                // if the task list section is currently displaying the to-be-deleted category
                // clear it
                if(deleteKey == self.currentCategory) {
                    self.currentCategory = null;
                    $("#new-category-button").setAttribute("disabled", true);
                    $("#new-task-button").setAttribute("disabled", true);
                    self.displayTaskList();
                }
            };
            $('#cancel').onclick = function() {
                self.removeDialog();
            } ;  
            return;
        }

        if(targetName == "span") target = target.parentNode;
        var key = target.getAttribute("data-key");

        if (key == "defaultCategory") $("#new-category-button").setAttribute("disabled", true);
        else $("#new-category-button").removeAttribute("disabled");
        $("#new-task-button").setAttribute("disabled", true);

        $("#new-task-button").removeAttribute("disabled");
        if (self.currentCategory == key) {
            self.toggleCategory(key);
        }
        else {
            removeClass($("[data-key=" + self.currentCategory + "]"), "active");
            addClass(target, "active");
            self.currentCategory = key;
            self.currentTask = null;
            self.showOneTask(self.currentTask);
            self.displayTaskList();
        }
    };

    $("#category-list").onmouseover = function(ev) {
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        var targetName = target.nodeName.toLowerCase();
        if(targetName == "span") target = target.parentNode;
        var key = target.getAttribute("data-key");
        if( key != "defaultCategory" && key != "rootCategory") {
            target.getElementsByTagName("span")[2].style.visibility = "visible";
        }
    };  

    $("#category-list").onmouseout = function(ev) {
        ev = ev || window.event;
        var target = ev.target || ev.srcElement;
        var targetName = target.nodeName.toLowerCase();
        if(targetName == "span") target = target.parentNode;
        var key = target.getAttribute("data-key");
        if(key != "defaultCategory" || key != "rootCategory") {
            target.getElementsByTagName("span")[2].style.visibility = "hidden";
        }
    };
};
// set the event handler for when adding a new category
App.prototype.addCategorySetup = function() {
    var self = this;
    $('#new-category-button').onclick = function () {
        self.createDialog("addCategory");
        $('#confirm').onclick = function() {
            if(true) {
                var inputValue = $('#popDialog-input').value;
                var li = document.createElement('li');
                var key = new Date().getTime();
                var str =   "<div data-key='" + key + "'>" + 
                            "<span class='iconfont'>&#xe753;</span>&nbsp;&nbsp;&nbsp;&nbsp;" + 
                            inputValue + 
                            "(<span class=unFinishNum>0</span>)" + 
                            "<span class='iconfont delete-icon'>&#xe632;</span>" + 
                            "</div>" + 
                            "<ul></ul>";
                li.innerHTML = str;
                $("[data-key=" + self.currentCategory +"]").nextSibling.appendChild(li);
                var newCategory = new Category(key, inputValue, self.currentCategory, [], [], 0);
                Data.setItem(newCategory.key, newCategory);
                Data.addSubCat(newCategory.parent, newCategory.key);
                self.removeDialog();
            }
        };
        $('#cancel').onclick = function() {
            self.removeDialog();
        };
    }
};

// toggle to display/hide all the subcategories under a category
App.prototype.toggleCategory = function(key) {
    var div = $("[data-key=" + key + "]")
    var ul = div.nextSibling;
    if (ul.style.display == "") ul.style.display = "none";
    else ul.style.display = "";
};

// remove the popup dialog
App.prototype.removeDialog = function() {
    document.body.removeChild($("#popDialog"));
    document.body.removeChild($("#mask"));
};

// create the popup dialog
App.prototype.createDialog = function (type, category) {
    this.popDialog = document.createElement('div');
    this.popDialog.id = "popDialog"
    if (type == 'addCategory') {
        this.popDialog.innerHTML =  "<p>Please input the title of the new category:</p>" + 
                                    "<input type='text' id='popDialog-input'>" +
                                    "<button id='confirm'>Confirm</button>" + 
                                    "<button id='cancel'>Cancel</button>";
    }
    else if (type == "deleteCategory") {
        this.popDialog.innerHTML =  "<p>Are you sure you want to delete category:" + category + " ?</p>" +
                                    "<button id='confirm'>Confirm</button>" +
                                    "<button id='cancel'>Concel</button>";
    }
    else {
        throw new Error("Error in create popup dialog");
    }
    document.body.appendChild(this.popDialog);  
    this.createMask();  
};

// create a mask
App.prototype.createMask = function() {
    this.mask = document.createElement('div');
    this.mask.id = 'mask';
    document.body.appendChild(this.mask);
};


/*********************************** create an instance *******************************/
var ins = new App();
ins.init();