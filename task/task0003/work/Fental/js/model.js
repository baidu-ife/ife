/**
 * Created by Fental on 15/5/16.
 */
//使用localStorage存储数据
function Task(name, date, content, state, subName) {
    subName = subName || '';
    this.name = name;
    this.date = date;
    this.content = content;
    this.state = state;
    this.subName = subName;
}

function SubClassify(name) {
    this.allTasks = [];
    this.name = name;
}

function Classify(name, allSubClassifies, allTasks) {
    this.allSubClassifies = allSubClassifies || [];
    this.allTasks = allTasks || [];
        this.name = name;
}

//Gtd：M，实现增删查改
function Gtd() {

}
//Gtd.allClassifies = [];
Gtd.prototype = {
    //init
    init: function() {
        //增加默认分类
        if (this.findClassify('默认分类') === null) {
            var newClassify = new Classify('默认分类');
            var allClassifies = [];
            allClassifies.unshift('默认分类');
            localStorage.setItem(newClassify.name, JSON.stringify(newClassify));
            localStorage.setItem('allClassifies', JSON.stringify(allClassifies));
        }
    },
    //find
    findAllClassifies: function() {
        return JSON.parse(localStorage.getItem('allClassifies'));
    },
    findClassify: function(cName) {
        return JSON.parse(localStorage.getItem(cName));
    },
    findAllSubClassifies: function(cName) {
        return this.findClassify(cName).allSubClassifies;
    },
    findSubClassify: function(cName, csName) {
        var currentClassify = this.findClassify(cName);
        for (var i = 0; i < currentClassify.allSubClassifies.length; i++) {
            if (currentClassify.allSubClassifies[i].name === csName) {
                console.log(currentClassify.allSubClassifies[i].name === csName);
                return {
                    currentClassify: currentClassify,
                    currentSubClassify: currentClassify.allSubClassifies[i]
                };
            }
        }
        return {
            currentClassify: currentClassify,
            currentSubClassify: null
        };
    },
    findAllTasksInSub: function(cName, csName) {
        return this.findSubClassify(cName, csName).currentSubClassify.allTasks;
    },
    findTaskInSub: function(cName, csName, tName, tDate) {
        var findResult = this.findSubClassify(cName, csName);
        var currentClassify = findResult.currentClassify;
        var currentSubClassify = findResult.currentSubClassify;
        console.log(findResult);
        //if (findResult.currentSubClassify.allTasks.length !== 0) {
        for (var i = 0; i < currentSubClassify.allTasks.length; i++) {
            if (tName === currentSubClassify.allTasks[i].name
                && tDate === currentSubClassify.allTasks[i].date) {
                return {
                    currentClassify: currentClassify,
                    currentSubClassify: currentSubClassify,
                    currentTask: currentSubClassify.allTasks[i]
                };
            }
        }
        return {
            currentClassify: currentClassify,
            currentSubClassify: currentSubClassify,
            currentTask: null
        };
    },
    findAllTasksOutOfSub: function(cName) {
        var allTasks = [];
        var findResult = this.findClassify(cName);
        //console.log(findResult);
        for (var i = 0; i < findResult.allSubClassifies.length; i++) {
            for (var j = 0; j < findResult.allSubClassifies[i].allTasks.length; j++) {
                allTasks.push(findResult.allSubClassifies[i].allTasks[j]);
            }
        }
        for (var k = 0; k < findResult.allTasks.length; k++) {
            allTasks.push(findResult.allTasks[k]);
        }
        return allTasks;
    },
    findTaskOutOfSub: function(cName, tName, tDate) {
        var currentClassify = this.findClassify(cName);
        console.log(currentClassify);
        for (var i = 0; i < currentClassify.allTasks.length; i++) {
            if (tName === currentClassify.allTasks[i].name
                && tDate === currentClassify.allTasks[i].date) {
                return {
                    currentClassify: currentClassify,
                    currentTask: currentClassify.allTasks[i]
                };
            }
        }
        return {
            currentClassify: currentClassify,
            currentTask: null
        };
    },

    //add
    addClassify: function(cName) {
        var allClassifies = JSON.parse(localStorage.getItem('allClassifies'));
        var flag = (function() {
            for (var i = 0;i < allClassifies.length; i++) {
                if (allClassifies[i] === cName) {
                    return 1;
                }
            }
            return -1;
        })();
        if (flag !== -1) {
            alert('该类别已存在！');
        }
        else {
            allClassifies.unshift(cName);
            var newClassify = new Classify(cName);
            localStorage.setItem(newClassify.name, JSON.stringify(newClassify));
            localStorage.setItem('allClassifies', JSON.stringify(allClassifies));
        }
    },
    addSubClassify: function(cName, csName) {
        var findResult = this.findSubClassify(cName, csName);
        if (findResult.currentSubClassify !== null) {
            alert('该子类别已存在！');
        }
        else {
            var currentClassify = findResult.currentClassify;
            console.log(currentClassify);
            console.log(findResult);
            var newSubClassify = new SubClassify(csName);
            currentClassify.allSubClassifies.push(newSubClassify);
            localStorage.setItem(currentClassify.name, JSON.stringify(currentClassify));
        }
    },
    addTaskInSub: function(cName, csName, tName, tDate, tContent) {
        var findResult = this.findTaskInSub(cName, csName, tName, tDate);
        console.log(findResult);
        if (findResult.currentTask !== null) {
            alert('该任务已存在！');
        }
        else {
            var currentSubClassify = findResult.currentSubClassify;
            var newTask = new Task(tName, tDate, tContent, false, currentSubClassify.name);
            currentSubClassify.allTasks.push(newTask);
            localStorage.setItem(findResult.currentClassify.name, JSON.stringify(findResult.currentClassify));
        }
    },
    addTaskOutOfSub: function(cName, tName, tDate, tContent) {
        var findResult = this.findTaskOutOfSub(cName, tName, tDate);
        if (findResult.currentTask !== null) {
            alert('该任务已存在！');
        }
        else {
            var newTask = new Task(tName, tDate, tContent, false);
            var currentClassify = findResult.currentClassify;
            currentClassify.allTasks.push(newTask);
            localStorage.setItem(currentClassify.name, JSON.stringify(currentClassify));
        }
    },

    //update
    editTaskInSub: function (cName, csName, oName, oDate, tName, tDate, tContent) {
        var findResult = this.findTaskInSub(cName, csName, oName, oDate);
        var currentTask = findResult.currentTask;
        var task = new Task(tName, tDate, tContent, currentTask.state);
        currentTask.name = task.name;
        currentTask.date = task.date;
        currentTask.content = task.content;
        localStorage.setItem(findResult.currentClassify.name, JSON.stringify(findResult.currentClassify));
    },
    editTaskOutOfSub: function(cName, oName, oDate, tName, tDate, tContent) {

        var findResult = this.findTaskOutOfSub(cName, oName, oDate);
        var currentTask = findResult.currentTask;
        console.log('in editTaskOUtofsub: ');
        console.log(currentTask);
        var task = new Task(tName, tDate, tContent, currentTask.state);
        currentTask.name = task.name;
        currentTask.date = task.date;
        currentTask.content = task.content;
        localStorage.setItem(findResult.currentClassify.name, JSON.stringify(findResult.currentClassify));
    },
    completeTaskInSub: function (cName, csName, tName, tDate) {
        var findResult = this.findTaskInSub(cName, csName, tName, tDate);
        var currentTask = findResult.currentTask;
        currentTask.state = true;
        localStorage.setItem(findResult.currentClassify.name, JSON.stringify(findResult.currentClassify));
    },
    completeTaskOutOfSub: function(cName, tName, tDate) {
        var findResult = this.findTaskOutOfSub(cName, tName, tDate);
        //console.log(findResult);
        var currentTask = findResult.currentTask;
        currentTask.state = true;
        console.log(findResult.currentClassify);
        localStorage.setItem(findResult.currentClassify.name, JSON.stringify(findResult.currentClassify));
    },

    //统计未完成的任务
    countInSub: function(subClassify) {
        var cnt = 0;
        for (var i = 0; i < subClassify.allTasks.length; i++) {
            if (subClassify.allTasks[i].state === false) {
                cnt++;
            }
        }
        return cnt;
    },
    countOutOfSub: function(classify) {
        var cnt = 0;
        for (var i = 0; i < classify.allSubClassifies.length; i++) {
            cnt += this.countInSub(classify.allSubClassifies[i]);
        }
        cnt += this.countInSub(classify);

        return cnt;
    },
    countAll: function() {
        var cnt = 0;
        var allClassifies = this.findAllClassifies();
        for (var i = 0; i < allClassifies.length; i++) {
            cnt += this.countOutOfSub(this.findClassify(allClassifies[i]));
        }
        return cnt;
    },

    //remove
    removeClassify: function(cName) {
        localStorage.removeItem(cName);
        var allClassifies = this.findAllClassifies();
        var tmp = [];
        for (var i = 0; i < allClassifies.length; i++) {
            if (allClassifies[i] !== cName) {
                tmp.push(allClassifies[i]);
            }
        }
        localStorage.setItem('allClassifies', JSON.stringify(tmp));
    },
    removeSubClassify: function(cName, csName) {
        var classify = this.findClassify(cName);
        var tmp = [];
        for (var i = 0; i < classify.allSubClassifies.length; i++) {
            if (classify.allSubClassifies[i].name !== csName) {
                tmp.push(classify.allSubClassifies[i]);
            }
        }
        classify.allSubClassifies = tmp;
        localStorage.setItem(classify.name, JSON.stringify(classify));
    },
    removeTaskInSub: function(cName, csName, tName, tDate) {
        var findResult = this.findSubClassify(cName, csName);
        var tmp = [];
        for (var i = 0; i < findResult.currentSubClassify.allTasks.length; i ++) {
            if (findResult.currentSubClassify.allTasks[i].name !== tName || findResult.currentSubClassify.allTasks[i].date !== tDate) {
                tmp.push(findResult.currentSubClassify.allTasks[i]);
            }
        }
        findResult.currentSubClassify.allTasks = tmp;
        localStorage.setItem(findResult.currentClassify.name, JSON.stringify(findResult.currentClassify));
    },
    removeTaskOutOfSub: function(cName, tName, tDate) {
        var classify = this.findClassify(cName);
        var tmp = [];
        for (var i = 0; i < classify.allTasks.length; i++) {
            if (classify.allTasks[i].name !== tName || classify.allTasks[i].date !== tDate) {
                tmp.push(classify.allTasks[i]);
            }
        }
        classify.allTasks = tmp;
        localStorage.setItem(classify.name, JSON.stringify(classify));
    }
};