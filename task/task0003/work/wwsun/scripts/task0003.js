// todo: 使用 localStorage 保存当前操作的分类和任务
// todo: 禁止添加重复的分类名

// init: mock data
var categories = [];

var tasks = [];

var storage = getLocalStorage(); // for compatibility

// now only support two level category
function buildCategoryMenu() {
    var i,
        n;
    var list = $('#categoryList');

    list.innerHTML = '';

    for (i=0, n=categories.length; i<n; i++) {

        if(categories[i].parent==="") {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.setAttribute('href','#');
            a.setAttribute('data-index', categories[i].id);
            a.innerHTML = categories[i].name;
            li.appendChild(a);

            // add secondary categories
            if(categories[i].subCategories.length > 0) {
                var subul = document.createElement('ul');
                var j,
                    m;
                for (j=0, m=categories[i].subCategories.length; j<m; j++) {
                    var subli = document.createElement('li');
                    var suba = document.createElement('a');
                    suba.setAttribute('href','#');

                    var subCategory = getCategoryById(parseInt(categories[i].subCategories[j]));
                    suba.setAttribute('data-index', subCategory.id);
                    suba.innerHTML = subCategory.name;

                    subli.appendChild(suba);
                    subul.appendChild(subli);
                }
                li.appendChild(subul);
            }

            list.appendChild(li);
        }

    }
}

function setupCategoryDropdownMenu() {
    var i,
        n;

    var select = $('#parentInput');

    select.innerHTML = '';

    var defaultOption = document.createElement('option');
    defaultOption.setAttribute('value',"");
    defaultOption.innerHTML = '无父类';
    select.appendChild(defaultOption);

    for (i=0, n=categories.length; i<n; i++) {
        if(categories[i].parent==="") {
            var option = document.createElement('option');
            option.setAttribute('value', categories[i].id);
            option.innerHTML = categories[i].name;
            select.appendChild(option);
        }

    }
}

function getCategoryById(id) {
    var i,
        n;

    for (i=0, n=categories.length; i<n; i++) {
        if(categories[i].id === id) {
            return categories[i];
        }
    }
}

function getTaskById(id) {
    var i,
        n;

    for (i=0, n=tasks.length; i<n; i++) {
        if(tasks[i].id === id) {
            return tasks[i];
        }
    }
}

function addNewCategory(name, parentId) {
    var category = new Category(name, parentId, 0);
    if (parentId != '') {

        // find super category
        var superCategory = getCategoryById(parseInt(parentId));
        superCategory.addSubCategory(category.id);

    }
    categories.push(category);
}

function addNewTask(title, categoryId, date, content) {
    var task = new Task(title, categoryId, date, content);
    var category = getCategoryById(parseInt(categoryId));
    category.addTask(task.id);
    tasks.push(task);

    buildTaskListByCategory(category); // refresh the task list

    return task;
}

function buildTaskListByCategory(category) {
    var i,
        n;

    var taskList = $('#task-list');
    taskList.innerHTML = ''; // empty the task list

    if (category.tasks !== undefined) {
        for (i=0, n=category.tasks.length; i<n; i++) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.setAttribute('href','#');

            var task = getTaskById(category.tasks[i]);

            a.setAttribute('data-index',task.id);
            a.innerHTML = task.title;
            li.appendChild(a);
            taskList.appendChild(li);
        }
    }

}

function displayTaskDetail(task) {
    $('#todo-title').innerHTML = task.title;
    $('#todo-date').innerHTML = task.date;
    $('#todo-content').innerHTML = task.content;
}

function setupTaskListDelegate(selector) {
    var taskUl = $(selector);
    EventUtil.addHandler(taskUl, 'click', function(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        var task = getTaskById(parseInt(target.dataset.index));

        displayTaskDetail(task);
    });
}

function setupMenuDelegate(selector) {
    var list = $(selector);
    EventUtil.addHandler(list, 'click', function(event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        if (target.dataset.index === undefined) { // get attribute 'data-index'
            // do nothing
        } else if(target.dataset.index == 'all-tasks') {
            // todo: buildAllTasks();
        } else {
            storage.setItem('currentCategoryId', target.dataset.index);
            var category = getCategoryById(parseInt(target.dataset.index)); // by default, index is a string
            buildTaskListByCategory(category);
        }
    });

    setupTaskListDelegate('#task-list');
}

function appInit() {
    categories = [];
    var cat2 = new Category('默认分类', '');
    categories.push(cat2);
    storage.setItem('currentCategoryId', 'all-tasks');//set it as the default selected category
}

// event binding

$.click('#newCategoryBtn', function() {
    var form = $('#newCategoryForm');
    var name = form.elements['name'].value;

    var select = $('#parentInput');
    var parentId = select.options[select.selectedIndex].value;

    addNewCategory(name, parentId);

    buildCategoryMenu(); // refresh category menu
    setupCategoryDropdownMenu(); // refresh category select items
});

$.click('#addTaskBtn', function() {
    var form = $('#newTaskForm');
    var title = form.elements['title'].value;
    var due = form.elements['due'].value;
    var content = form.elements['content'].value;
    var categoryId = storage.getItem('currentCategoryId');

    var task = addNewTask(title, categoryId, due, content);
    displayTaskDetail(task);
});

// App start

appInit();

setupMenuDelegate('#navigation');

setupCategoryDropdownMenu();

buildCategoryMenu();
//refreshCategoryList();

// App test

function print() {
    var i, n;
    for (i=0, n=categories.length; i<categories.length; i++) {
        console.log(categories[i]);
    }
}