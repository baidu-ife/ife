// todo: 禁止添加重复的分类名
// todo: 允许删除分类（鼠标hover显示删除按钮，需要confirm）
// todo: 允许更改任务状态
// todo: 任务根据日期进行排序

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
            var span = document.createElement('span');

            a.setAttribute('href', '#');
            a.setAttribute('data-index', categories[i].id);
            a.setAttribute('class', 'cat-left');
            a.innerHTML = categories[i].name;

            span.setAttribute('data-index', categories[i].id);
            span.setAttribute('class', 'cat-right');
            span.innerHTML = 'x';

            li.appendChild(a);
            li.appendChild(span);

            // add secondary categories
            if (categories[i].subCategories.length > 0) {
                var subul = document.createElement('ul');
                var j,
                    m;
                for (j = 0, m = categories[i].subCategories.length; j < m; j++) {
                    var subli = document.createElement('li');
                    var suba = document.createElement('a');
                    var sspan = document.createElement('span');

                    suba.setAttribute('href', '#');
                    suba.setAttribute('class', 'cat-left');

                    var subCategory = getCategoryById(parseInt(categories[i].subCategories[j]));
                    suba.setAttribute('data-index', subCategory.id);
                    suba.innerHTML = subCategory.name;

                    sspan.setAttribute('class', 'cat-right');
                    sspan.setAttribute('data-index', 'cat-right');
                    sspan.innerHTML = 'x';

                    subli.appendChild(suba);
                    subli.appendChild(sspan);
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
    id = parseInt(id);
    var category = storage.getItem(id);
    category = JSON.parse(category);

    var cat = new Category(category.name, category.parent);
    cat.id = category.id;
    cat.subCategories = category.subCategories;
    cat.tasks = category.tasks;
    return cat;

}

function getTaskById(id) {
    id = parseInt(id);
    var task = storage.getItem(id);
    task = JSON.parse(task);
    var tsk = new Task(task.title, task.category, task.date, task.content);
    tsk.id = task.id;
    tsk.status = task.status;
    return tsk;
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
 * @returns {Task} instance of Task object
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
            storage.setItem(category.id, JSON.stringify(category));
        }
    }

    storage.setItem(task.id, JSON.stringify(task)); // could be delete
    taskArray.push(task);

    storage.setItem('taskArray', JSON.stringify(taskArray));
    storage.setItem('categoryArray', JSON.stringify(categoryArray));

    buildTaskListByCategory(category.id); // refresh the task list

    return task;
}

function buildTaskListByCategory(categoryId) {
    var i,
        n;

    var taskList = $('#task-list');
    taskList.innerHTML = ''; // empty the task list

    var category = JSON.parse(storage.getItem(categoryId));
    
    if (category.tasks !== undefined) {

        for (i = 0, n = category.tasks.length; i < n; i++) {

            var li = document.createElement('li');
            var a = document.createElement('a');
            var span = document.createElement('span');

            a.setAttribute('href', '#');
            a.setAttribute('class', 'task-left');

            var task = JSON.parse(storage.getItem(category.tasks[i]));

            a.setAttribute('data-index', task.id);
            a.innerHTML = task.title;

            span.setAttribute('data-index', task.id);
            span.setAttribute('class', 'task-right');
            span.innerHTML = '删除';

            li.appendChild(a);
            li.appendChild(span);
            taskList.appendChild(li);
        }
    }
}

function buildAllTaskLit() {

    var taskList = $('#task-list');
    taskList.innerHTML = '';

    var i,
        n;

    for (i = 0, n = storage.length; i < n; i++) {
        var li = document.createElement('li');
        var a = document.createElement('a');

        var key = storage.key(i);
        var value = JSON.parse(storage.getItem(key));
        if (value.title) {
            a.setAttribute('href', '#');
            a.setAttribute('data-index', value.id);
            a.innerHTML = value.title;
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

function taskItemClickHandler(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    var task = getTaskById(parseInt(target.dataset.index));
    displayTaskDetail(task);
}

function taskItemDeleteHandler(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    //var task = getTaskById(parseInt(target.dataset.index));
    //alert(target.dataset.index);
    if (confirm("是否删除该任务？")) {
        // delete the item
        deleteTaskById(target.dataset.index);
    } else {
        // cancel delete: do nothing
    }
}

function deleteTaskById(taskId) {
    taskId = parseInt(taskId);

    var taskArray = getTaskArray();
    var categoryArray = getCategoryArray();

    var i,  // loop index
        n;  // loop length

    // 1. delete the task in the category item

    var categoryId = parseInt(getTaskById(taskId).category);
    //var category = getCategoryById(categoryId);

    for (i = 0, n = categoryArray.length; i < n; i++) {
        // find the category in array
        if (categoryArray[i].id === categoryId) {
            var j,
                m;

            for (j = 0, m = categoryArray[i].tasks.length; j < m; j++) {
                if (taskId === categoryArray[i].tasks[j]) {
                    categoryArray[i].tasks.splice(j, 1);
                    storage.setItem(categoryArray[i].id, JSON.stringify(categoryArray[i]));
                    break;
                }
            }
            //break;
        }
    }
    storage.setItem('categoryArray', JSON.stringify(categoryArray));

    // 2. delete the task from taskArray
    for (i = 0, n = taskArray.length; i < n; i++) {
        if (taskArray[i].id = taskId) {
            taskArray.splice(i, 1);
            break;
        }
    }
    storage.setItem('taskArray', JSON.stringify(taskArray));

    // 3. delete the single item from localStorage
    storage.removeItem(taskId);

    // 4. refresh the task list menu
    buildTaskListByCategory(categoryId);
}

function categoryItemClickHandler(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);

    if (target.dataset.index === undefined) { // get attribute 'data-index'
        // do nothing
    } else if (target.dataset.index == 'all-tasks') {
        buildAllTaskLit();
    } else {
        storage.setItem('currentCategoryId', target.dataset.index);
        var category = getCategoryById(parseInt(target.dataset.index)); // by default, index is a string
        buildTaskListByCategory(category.id);
    }

    $.delegate('#task-list', 'a', 'click', taskItemClickHandler);
    $.delegate('#task-list', 'span', 'click', taskItemDeleteHandler)
}

function categoryItemDeleteHandler(event) {
    event = EventUtil.getEvent(event);
    var target = EventUtil.getTarget(event);
    if (confirm("是否删除该分类？")) {
        // delete the category
        deleteCategoryById(target.dataset.index);
    }
}

function deleteCategoryById(categoryId) {
    categoryId = parseInt(categoryId);

    var categoryArray = getCategoryArray();

    var i,  // loop index
        n;  // loop length


    // 1. delete all tasks in this category
    var category = getCategoryById(categoryId);

    for (i=0, n=category.tasks.length; i<n; i++) {
        deleteTaskById(category.tasks[i]);
    }

    // 2. remove category item in storage
    storage.removeItem(categoryId);

    // 3. update category array in storage
    for (i = 0, n = categoryArray.length; i < n; i++) {
        // find the category
        if (categoryArray[i].id === categoryId) {
            categoryArray.splice(i, 1);
            break;
        }
    }

    storage.setItem('categoryArray', JSON.stringify(categoryArray));
    buildCategoryMenu(); // refresh the category menu
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

$.click('#isModifyBtn', function (event) {
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
    for (i = 0, n = tasks.length; i < n; i++) {
        if (taskArray[i].id === parseInt(taskId)) {

            taskArray[i].title = title;
            taskArray[i].date = due;
            taskArray[i].content = content;

            storage.setItem(taskId, JSON.stringify(taskArray[i])); // replace the original single item
            displayTaskDetail(taskArray[i]);
        }
    }

    storage.setItem('taskArray', JSON.stringify(taskArray));
});

$.delegate('#navigation', 'a', 'click', categoryItemClickHandler);

$.delegate('#navigation', 'span', 'click', categoryItemDeleteHandler);

// App start
appInit();

setupCategoryDropdownMenu();

buildCategoryMenu(); // build the menu after page refresh