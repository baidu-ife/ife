/**
 * Created by zcp2123 on 2015/5/14.
 */

function Task() {
    this.categoryList = this.getCategoryList();
    this.categoryChildList = this.getCategoryChildList();
    this.taskList = this.getTaskList();
}

Task.prototype.getCategoryList = function() {
    if (!localStorage.getItem('categoryList')) {
        var defaultData = [
            {
                "id": 0,
                "name": "默认分类",
                "child": [0]
            },
            {
                "id": 1,
                "name": "百度IFE项目",
                "child": [1, 3]
            }
        ];
        return defaultData;
    } else {
        return JSON.parse(localStorage.getItem("categoryList"));
    }
}

Task.prototype.getCategoryChildList = function() {
    if (!localStorage.getItem('categoryChildList')) {
        var defaultData = [
            {
                "id": 0,
                "name": "默认子分类",
                "child": [],
                "father": 0
            },
            {
                "id": 1,
                "name": "task0001",
                "child": [0, 1, 2],
                "father": 1
            },
            {
                "id": 3,
                "name": "task0002",
                "child": [3],
                "father": 1
            }
        ];
        return defaultData;
    } else {
        return JSON.parse(localStorage.getItem("categoryChildList"));
    }
}

Task.prototype.getTaskList = function() {
    if (!localStorage.getItem('taskList')) {
        var defaultData = [
            {
                "id": 0,
                "name": "to-d0 1",
                "father": 1,
                "finish": true,
                "date": "2015-05-28",
                "content": "任务task0001-1"
            },
            {
                "id": 1,
                "name": "to-d0 3",
                "father": 1,
                "finish": true,
                "date": "2015-05-30",
                "content": "任务task0001-3"
            },
            {
                "id": 2,
                "name": "to-d0 2",
                "father": 1,
                "finish": false,
                "date": "2015-05-29",
                "content": "任务task0001-2"
            },
            {
                "id": 3,
                "name": "to-d0 4",
                "father": 3,
                "finish": false,
                "date": "2015-06-29",
                "content": "任务task0002-4"
            }
        ];
        return defaultData;
    } else {
        return JSON.parse(localStorage.getItem("taskList"));
    }
}

Task.prototype.getObjByKey = function(obj, key, value) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][key] === value) {
            return obj[i];
        }
    }
}

Task.prototype.getIndexByKey = function(obj, key, value) {
    for (var i = 0; i < obj.length; i++) {
        if (obj[i][key] === value) {
            return i;
        }
    }
}

Task.prototype.updateNum = function() {
    var sum;
    for (var i = 0; i < this.categoryList.length; i++) {
        sum = 0;
        for (var j = 0; j < this.categoryList[i].child.length; j++) {
            var childNum = this.getObjByKey(this.categoryChildList, 'id', this.categoryList[i].child[j]).child.length;
            sum += childNum;
        }
        this.categoryList[i].num = sum;
    }
}

Task.prototype.save = function() {
    localStorage.setItem("categoryList", JSON.stringify(this.categoryList));
    localStorage.setItem("categoryChildList", JSON.stringify(this.categoryChildList));
    localStorage.setItem("taskList", JSON.stringify(this.taskList));
}