// todo: 禁止添加重复的分类名
// todo: 允许删除分类（鼠标hover显示删除按钮，需要confirm）
// todo: 允许更改任务状态

var storage = getLocalStorage(); // for compatibility

function getCategoryArray() {
    var categoryArray = storage.getItem('categoryArray');
    if (!categoryArray) {
        categoryArray = [];
        storage.setItem('categoryArray', JSON.stringify(categoryArray));
    } else {
        categoryArray = JSON.parse(categoryArray);
    }
    return categoryArray;
}

function getTaskArray() {
    var taskArray = storage.getItem('taskArray');
    if (!taskArray) {
        taskArray = [];
        storage.setItem('taskArray', JSON.stringify(taskArray));
    } else {
        taskArray = JSON.parse(taskArray);
    }
    return taskArray;
}

var categories = getCategoryArray();
var tasks = getTaskArray();

// now only support two level category
function buildCategoryMenu() {
    var i,
        n;
    var list = $('#categoryList');
    var categories = getCategoryArray();

    list.innerHTML = '';

    for (i = 0, n = categories.length; i < n; i++) {

        if (categories[i].parent === "") {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.setAttribute('href', '#');
            a.setAttribute('data-index', categories[i].id);
            a.innerHTML = categories[i].name;
            li.appendChild(a);

            // add secondary categories
            if (categories[i].subCategories.length > 0) {
                var subul = document.createElement('ul');
                var j,
                    m;
                for (j = 0, m = categories[i].subCategories.length; j < m; j++) {
                    var subli = document.createElement('li');
                    var suba = document.createElement('a');
                    suba.setAttribute('href', '#');

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
    var categories = getCategoryArray();

    select.innerHTML = '';

    var defaultOption = document.createElement('option');
    defaultOption.setAttribute('value', "");
    defaultOption.innerHTML = '无父类';
    select.appendChild(defaultOption);

    for (i = 0, n = categories.length; i < n; i++) {
        if (categories[i].parent === "") {
            var option = document.createElement('option');
            option.setAttribute('value', categories[i].id);
            option.innerHTML = categories[i].name;
            select.appendChild(option);
        }

    }
}

function getCategoryById(id) {
    var categories = getCategoryArray();

    var i,
        n;

    for (i = 0, n = categories.length; i < n; i++) {
        if (categories[i].id === id) {

            if (categories[i] instanceof Category) {
                return categories[i];
            } else {
                var cat = new Category(categories[i].name, categories[i].parent);
                cat.id = categories[i].id;
                cat.subCategories = categories[i].subCategories;
                cat.tasks = categories[i].tasks;
                return cat;
            }
        }
    }
}

function getTaskById(id) {
    var tasks = getTaskArray();

    var i,
        n;

    for (i = 0, n = tasks.length; i < n; i++) {
        if (tasks[i].id === id) {

            if (tasks[i] instanceof Task) {
                return tasks[i];
            } else {
                var tsk = new Task(tasks[i].title, tasks[i].category, tasks[i].date, tasks[i].content);
                tsk.id = tasks[i].id;
                tsk.status = tasks[i].status;
                return tsk;
            }
        }
    }
}

function addNewCategory(name, parentId) {
    var categoryArray = getCategoryArray();

    var superCategory;
    var category = new Category(name, parentId, 0);

    if (parentId != '') {

        // find super category
        superCategory = getCategoryById(parseInt(parentId));
        superCategory.addSubCategory(category.id);

        // update the parent category item
        storage.setItem(superCategory.id, JSON.stringify(superCategory));

        var i,
            n;

        for (i = 0, n = categoryArray.length; i < n; i++) {
            if (categoryArray[i].id === superCategory.id) {
                categoryArray[i].subCategories = superCategory.subCategories.slice(); // Array Copy
            }
        }
    }

    storage.setItem(category.id, JSON.stringify(category));
    categoryArray.push(category);

    storage.setItem('categoryArray', JSON.stringify(categoryArray));
}

/**
 * add new task to the specified category
 * @param title
 * @param categoryId
 * @param date
 * @param content
 * @returns {Task}
 */
function addNewTask(title, categoryId, date, content) {

    var taskArray = getTaskArray();
    var categoryArray = getCategoryArray();

    var task = new Task(title, categoryId, date, content);
    var category = getCategoryById(parseInt(categoryId));

    category.addTask(task.id);

    var i,
        n;

    for (i = 0, n = categoryArray.length; i < n; i++) {
        if (categoryArray[i].id === category.id) {
            categoryArray[i].tasks = category.tasks.slice(); // Array copy
        }
    }

    storage.setItem(task.id, JSON.stringify(task)); // could be delete
    taskArray.push(task);

    storage.setItem('taskArray', JSON.stringify(taskArray));
    storage.setItem('categoryArray', JSON.stringify(categoryArray));

    buildTaskListByCategory(category); // refresh the task list

    return task;
}

function buildTaskListByCategory(category) {
    var i,
        n;

    var taskList = $('#task-list');
    taskList.innerHTML = ''; // empty the task list

    if (category.tasks !== undefined) {
        for (i = 0, n = category.tasks.length; i < n; i++) {
            var li = document.createElement('li');
            var a = document.createElement('a');
            a.setAttribute('href', '#');

            var task = getTaskById(category.tasks[i]);

            a.setAttribute('data-index', task.id);
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
    $('#modifyTaskBtn').dataset.index = task.id;
}

function setupTaskListDelegate(selector) {
    var taskUl = $(selector);
    EventUtil.addHandler(taskUl, 'click', function (event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);
        var task = getTaskById(parseInt(target.dataset.index));
        displayTaskDetail(task);
    });
}

function setupMenuDelegate(selector) {
    var list = $(selector);
    EventUtil.addHandler(list, 'click', function (event) {
        event = EventUtil.getEvent(event);
        var target = EventUtil.getTarget(event);

        if (target.dataset.index === undefined) { // get attribute 'data-index'
            // do nothing
        } else if (target.dataset.index == 'all-tasks') {
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

$.click('#newCategoryBtn', function () {
    var form = $('#newCategoryForm');
    var name = form.elements['name'].value;

    var select = $('#parentInput');
    var parentId = select.options[select.selectedIndex].value;

    addNewCategory(name, parentId);

    buildCategoryMenu(); // refresh category menu
    setupCategoryDropdownMenu(); // refresh category select items
});

$.click('#addTaskBtn', function () {
    var form = $('#newTaskForm');
    var title = form.elements['title'].value;
    var due = form.elements['due'].value;
    var content = form.elements['content'].value;
    var categoryId = storage.getItem('currentCategoryId');

    var task = addNewTask(title, categoryId, due, content);
    displayTaskDetail(task);
});

$.click('#modifyTaskBtn', function (event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var taskId = target.dataset.index;

    var task = getTaskById(parseInt(taskId));

    var form = $('#modifyTaskForm');
    form.elements['title'].value = task.title;
    form.elements['due'].value = task.date;
    form.elements['content'].value = task.content;
    $('#isModifyBtn').dataset.index = task.id;


});

$.click('#isModifyBtn', function(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var taskId = target.parentElement.dataset.index;

    var form = $('#modifyTaskForm');
    var title = form.elements['title'].value;
    var due = form.elements['due'].value;
    var content = form.elements['content'].value;

    // save updated task to local storage
    var taskArray = getTaskArray();

    var i,
        n;
    for (i=0, n=tasks.length; i<n; i++) {
        if(taskArray[i].id === parseInt(taskId)) {

            taskArray[i].title = title;
            taskArray[i].date = due;
            taskArray[i].content = content;

            storage.setItem(taskId, JSON.stringify(taskArray[i])); // replace the original single item
            displayTaskDetail(taskArray[i]);
        }
    }

    storage.setItem('taskArray', JSON.stringify(taskArray));
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
    for (i = 0, n = categories.length; i < categories.length; i++) {
        console.log(categories[i]);
    }
}