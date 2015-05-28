initAll();

function initAll() {
    initDataBase(); //初始化数据表
    initCates(); //初始化分类

    listAllStorage();
    // addChildCate(1, "fuck");
    // listAllStorage();
    // addCate("newCATE");
    // listAllStorage();
    // localStorage.clear();
    // listAllStorage();
}

//*******数据库设计************

/**
 *
 * 使用数据库的思想，构建3张表。
 * cateJson 分类
 * childCateJson 子分类
 * taskJson 任务
 *
 * 分类表 cate
 * ----------------------
 * id* | name | child(fk)
 * ----------------------
 *
 * 子分类表 childCate
 * ----------------------------
 * id* | pid | name | child(fk)
 * ----------------------------
 *
 * 任务表 task
 * ------------------------------------------
 * id* | pid | finish | name | date | content
 * ------------------------------------------
 */
function initDataBase() {
    if (!localStorage.cate || !localStorage.childCate || !localStorage.task) {

        var cateJson = [{
            "id": 0,
            "name": "默认分类",
            "child": []
        }, {
            "id": 1,
            "name": "工作",
            "child": [0, 1]
        }];

        var childCateJson = [{
            "id": 0,
            "pid": 1,
            "name": "前端",
            "child": [0, 1],
        }, {
            "id": 1,
            "pid": 1,
            "name": "服务端",
            "child": [],
        }];

        var taskJson = [{
            "id": 0,
            "pid": 1,
            "finish": true,
            "name": "task1",
            "date": "2015-05-10",
            "content": "百度ife任务1",
        }, {
            "id": 1,
            "pid": 1,
            "finish": false,
            "name": "Sass",
            "date": "2015-05-31",
            "content": "学习慕课网的视频Sass",
        }];

        // DataBase init
        localStorage.cate = JSON.stringify(cateJson);
        localStorage.childCate = JSON.stringify(childCateJson);
        localStorage.task = JSON.stringify(taskJson);
    }
}

// *********query*************
/**
 * 查询所有分类
 * @return {Array} 对象数组
 */
function queryCates() {
    return JSON.parse(localStorage.cate);
}

/**
 * 通过id查询分类  暂时没用到
 * @param  {number} id
 * @return {Object}    一个分类对象
 */
function queryCateById(id) {
    var cate = JSON.parse(localStorage.cate);
    for (var i = 0; i < cate.length; i++) {
        if (cate[i].id == id) {
            return cate[i];
        }
    }
}
// console.log(queryCateById(1));
/**
 * 根据 id 查找子分类
 * @param  {number} id
 * @return {Object}    一个子分类对象
 */
function queryChildCatesById(id) {
    var childCate = JSON.parse(localStorage.childCate);
    for (var i = 0; i < childCate.length; i++) {
        if (childCate[i].id == id) {
            return childCate[i];
        }
    }
}
// console.log("queryChildCatesById----->" + queryChildCatesById(0));
// console.log(queryChildCatesById(0));

// console.log("queryChildCatesByIdArray---->" + queryChildCatesByIdArray([0, 1]));
// console.log(queryChildCatesByIdArray([0, 1]));
/**
 * 根据一个 id 数组查询子分类
 * @param  {Array} idArr id 数组
 * @return {Array}       子分类对象数组
 */
function queryChildCatesByIdArray(idArr) {
    if (isArray(idArr)) {
        var cateArr = [];
        for (var i = 0; i < idArr.length; i++) {
            cateArr.push(queryChildCatesById(idArr[i]));
        }
        return cateArr;
    }
}

/**
 * 查询所有任务
 * @return {Array} 任务对象数组
 */
function queryAllTasks() {
    return JSON.parse(localStorage.task);
}

/**
 * 添加分类
 * @param {String} name 分类名称
 */
function addCate(name) {
    if (!name) {
        console.log("name is undefined");
    } else {
        var cateJsonTemp = JSON.parse(localStorage.cate);
        var newCate = {};
        newCate.id = cateJsonTemp[cateJsonTemp.length - 1].id + 1;
        newCate.name = name;
        newCate.child = [];
        cateJsonTemp.push(newCate);
        localStorage.cate = JSON.stringify(cateJsonTemp);
        console.log(cateJsonTemp);
        console.log(newCate);
    }
}

/**
 * 添加子分类
 * @param {number} pid  父节点 id
 * @param {String} name 子分类名称
 */
function addChildCate(pid, name) {
    if (!pid || !name) {
        console.log("pid or name is undefined");
    } else {
        var childCateJsonTemp = JSON.parse(localStorage.childCate);
        var newChildCate = {};
        newChildCate.id = childCateJsonTemp[childCateJsonTemp.length - 1].id + 1;
        newChildCate.pid = pid;
        newChildCate.name = name;
        newChildCate.child = [];

        childCateJsonTemp.push(newChildCate);
        localStorage.childCate = JSON.stringify(childCateJsonTemp);

        //同时将父分类中的 child 添加数字
        updateCateChild(pid,newChildCate.id);

    }
}

/**
 * 更新分类的 child 字段
 * 添加一个 childId 到 这个 id 的分类对象里
 * @param  {number} id      要更新的分类的 id
 * @param  {number} childId 要添加的 childId
 * @return {[type]}         [description]
 */
function updateCateChild(id, childId) {
    if (!id || !childId) {
        console.log("id or childId is undefined");
    } else {
        var cate = JSON.parse(localStorage.cate);
        for (var i = 0; i < cate.length; i++) {
            if (cate[i].id == id) {
                cate[i].child.push(childId);
            }
        }
        localStorage.cate = JSON.stringify(cate);
    }
}

/**
 * 列举所有存储内容 测试时使用
 * @return {[type]} [description]
 */
function listAllStorage() {
    console.log("=============listAllStorage==============");
    for (var i = 0; i < localStorage.length; i++) {
        var name = localStorage.key(i);
        var value = localStorage.getItem(name);
        console.log("name----->" + name);
        console.log("value---->" + value);
        console.log("---------------------");
    }
    console.log("======End=======listAllStorage==============");
}



//**********页面控制**************



//初始化分类
function initCates() {

    var cate = queryCates(); //查出所有分类
    var tempStr = '<ul>';

    for (var i = 0; i < cate.length; i++) {
        var liStr = "";
        if (cate[i].child.length === 0) {
            if (i === 0) {
                liStr = '<li><h2 onclick="clickCate(this)"><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + cate[i].child.length + ')</h2></li>';
            } else {
                liStr = '<li><h2 onclick="clickCate(this)"><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + cate[i].child.length + ')<i class="fa fa-trash-o" onclick="del(event,this)"></i></h2></li>';
            }
        } else {
            liStr = '<li><h2 onclick="clickCate(this)"><i class="fa fa-folder-open"></i><span>' + cate[i].name + '</span> (' + cate[i].child.length + ')<i class="fa fa-trash-o" onclick="del(event,this)"></i></h2><ul>';
            var childCateArr = queryChildCatesByIdArray(cate[i].child);
            for (var j = 0; j < childCateArr.length; j++) {
                var innerLiStr = "";
                innerLiStr = '<li><h3 onclick="clickCate(this)"><i class="fa fa-file-o"></i><span>' + childCateArr[j].name + '</span> (' + childCateArr[j].child.length + ')<i class="fa fa-trash-o" onclick="del(event,this)"></i></h3></li>';
                liStr += innerLiStr;
            }
            liStr += '</ul></li>';
        }
        tempStr += liStr;
    }
    tempStr += '</ul>';
    //写入列表内容区
    $("#listcontent").innerHTML = tempStr;
    //设置所有任务个数
    $(".list-title span").innerHTML = queryAllTasks().length;
}

/**
 * 点击垃圾桶图标
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
function del(e, element) {
    //这里要阻止事件冒泡
    window.event ? window.event.cancelBubble = true : e.stopPropagation();
    console.log("=====del======");
    console.log(element);
    console.log("element.parentNode");
    console.log(element.parentNode);
}

/**
 * 点击分类
 * @param  {[type]} element [description]
 * @return {[type]}         [description]
 */
function clickCate(element) {
    console.log("=======clickCate=======");
    console.log(element);
}

/**
 * 添加分类
 */
function clickAddCate() {
    console.log("=========clickAddCate===========");
}