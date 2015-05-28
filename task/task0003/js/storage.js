/**
 * Created by Dottie on 2015/5/14.
 */
if(window.localStorage){
    var mystorage = window.localStorage;
/*------------------------------------------------------本地taskClass处理----------------------------------------------------*/
    var taskClass = function(){
        this.init();
    }
    taskClass.prototype = {
        init: function(){
            if(mystorage.getItem("taskClass") == null){
                var defaultClass = this.encodeTaskClass("默认分类", 0, -1);
                var tClassArr = [defaultClass];
                mystorage.setItem("taskClass", tClassArr);
            }
            this.taskClasses = mystorage.getItem("taskClass").split(",");
            this.classArr = this.decodeAll();
        },
        addTaskClass: function(className, parent){
            if(parent == null){
               var parent = -1;
            }else if(!this.isTop(parent)){
                alert("只能为顶级分类添加子分类！");
                return;
            }
            if(this.getByName(className) == -1){
                var lastOne = this.classArr[this.classArr.length-1];
                var newOne = this.encodeTaskClass(className, parseInt(lastOne.id )+ 1, parent);
                this.taskClasses.push(newOne);
                mystorage.setItem("taskClass", this.taskClasses);
                newOne = this.decodeTaskClass(newOne);
                this.classArr.push(newOne);
            }else {
                alert("'"+ className + "'" + " 已经存在！请重新输入分类名称");
                return -1;
            }
        },
        deleteTaskClass: function(className){
            var index = this.getByName(className);
            if(index === -1){
                alert("找不到您要删除的分类 '" + className +"'！");
                return;
            }
            this.taskClasses.splice(index,1);
            this.classArr.splice(index,1);
            mystorage.setItem("taskClass", this.taskClasses);
        },
        //根据分类名称获取分类，如果再给定数组中查找，则返回满足条件的数组项，若没有给定数组则在所有分类中查找，返回index
        getByName: function(className, arr){
            if(arr == null){
                var index = -1;
                for(var i in this.taskClasses){
                    var name = this.decodeTaskClass(this.taskClasses[i]).name;
                    if(name == className){
                        index = i;
                    }
                }
                return index;
            }else{
                for(var i in arr){
                    if(arr[i].name == className){
                        return arr[i];
                    }
                }
                return -1;
            }
        },
        getSubClass: function(classid){
            var children = [];
            for(var i in this.taskClasses){
                var now = this.decodeTaskClass(this.taskClasses[i]);
                if(now.parent == classid){
                    children.push(now);
                }
            }
            return children;
        },
        encodeTaskClass: function(tClassName, id, parent){
            if(parent == null){
                parent = -1;
            }
            var result = [tClassName, id, parent];
            result = result.join(";");
            return result;
        },
        decodeTaskClass: function(item){
            var temp = item.split(";");
            var result = [];
            result["name"] = temp[0];
            result["id"] = temp[1];
            result["parent"] = temp[2];
            return result;
        },
        decodeAll: function(){
            var result = [];
            for(var i in this.taskClasses){
                var now = this.decodeTaskClass(this.taskClasses[i]);
                result.push(now);
            }
            return result;
        },
        getById: function(id){
            var index = -1;
            for(var i in  this.taskClasses){
                var now = this.decodeTaskClass(this.taskClasses[i]);
                if(now.id == id){
                    index = i;
                    break;
                }
            }
            return index;
        },
        isTop: function(item){
            if(typeof  item == "string"){
                item = this.getByName(item);
            }else if(typeof  item == "number"){
                item = this.getById(item);
            }
            if(this.classArr[item].parent == -1){
                return  true;
            }else{
                return false;
            }
        },
        countClasses: function(){

        },
        getTop: function(){
            var result = [];
            for(var i in this.classArr){
                if(this.isTop(this.classArr[i].name)){
                    result.push(this.classArr[i]);
                }
            }
            return result;
        }
    };


/*------------------------------------------------------本地task处理----------------------------------------------------*/
    var tasks = function(){
        this.init();
    }
    tasks.prototype = {
        init: function(){
            this.myTasks = [];
            this.myTaskArr = [];
            if(mystorage.getItem("tasks") == null){
                mystorage.setItem("tasks","");
            }
            if(mystorage.getItem("tasks") != ""){
                this.myTasks = mystorage.getItem("tasks").split(",");
                this.myTaskArr = this.decodeAll();
            }
        },
        addTask: function(taskName, date, content,classId, status){
            var lastId = -1;
            if(status == null){
                status = -1; //status表示任务状态，-1表示未完成， 1表示已完成
            }
            if(this.getByName(taskName) != -1){
                alert("'" + taskName + "' 已经存在，请重新输入任务名称！");
                return;
            }
            if(this.getByName(taskName) == ""){
                alert("任务名称不能为空，请输入任务名称！");
                return;
            }

            if(this.myTaskArr.length > 0){
//                console.log(this.myTaskArr);
                lastId = this.myTaskArr[this.myTaskArr.length-1].id;
                lastId = parseInt(lastId);
            }
            var newOne = this.encodeTask(taskName,lastId+1, date, content, classId, status);
            this.myTasks.push(newOne);
            newOne = this.decodeTask(newOne);
            this.myTaskArr.push(newOne);
            mystorage.setItem("tasks", this.myTasks);
        },
        editTask: function(taskId, taskName, date, content){
//            var classId, status;
            var now = this.getById(taskId);
            var temp = this.myTaskArr[now];
            temp = this.encodeTask(taskName, temp.id, date, content, temp.classId, temp.status);
            this.myTasks[now] = temp;
            mystorage.setItem("tasks", this.myTasks);
            this.myTaskArr[now].name = taskName;
            this.myTaskArr[now].date= date;
            this.myTaskArr[now].content = content;
        },
        completeTask: function(taskId){
            var now = this.getById(taskId);
            var temp  = this.myTaskArr[now];
            temp = this.encodeTask(temp.name, temp.id, temp.date, temp.content, temp.classId, 1);
            this.myTasks[now] = temp;
            mystorage.setItem("tasks", this.myTasks);
            this.myTaskArr[now].status = 1;
        },
        delTask: function(taskName){
            var index = this.getByName(taskName);
            if(index == -1){
                alert("找不到要删除的任务 ‘" + taskName + "’！");
                return;
            }
            this.myTaskArr.splice(index, 1);
            this.myTasks.splice(index, 1);
            mystorage.setItem("tasks", this.myTasks);
        },
        getByName: function(name, arr){
            if(arr == null){
                for(var i in this.myTaskArr){
                    if(this.myTaskArr[i].name == name){
                        return i;
                    }
                }
                return -1;
            }else{
                for(var  i in arr){
                    if(arr[i].name == name){
                        return arr[i];
                    }
                }
            }
        },
        getById: function(id){
            for(var i in this.myTaskArr){
                if(this.myTaskArr[i].id == id){
                    return i;
                }
            }
            return -1;
        },
        getByClass: function(classId){
            var result = [];
            for(var i in this.myTaskArr){
                if(this.myTaskArr[i].classId == classId){
                    result.push(this.myTaskArr[i]);
                }
            }
            if(result.length > 0){
                return result;
            }
            return -1;
        },
        clusterByDate: function(param){
            var arr = [];
            var dateArr = [];
            var result = [];
            if(isArray(param)){
                arr = param;
            }else{
                arr = this.getByClass(param);
            }
            for(var i in arr){
                var curDate = arr[i].date;
                if(dateArr.indexOf(curDate) == -1){
                    dateArr.push(curDate);
                    result[curDate] = [];
                }
                result[curDate].push(arr[i]);
            }
            return result;
        },
        decodeAll: function(){
            if(mystorage.getItem("task") == ""){
                return;
            }
            var result = [];
            for(var i in this.myTasks){
                var now = this.decodeTask(this.myTasks[i]);
                result.push(now);
            }
            return result;
        },
        encodeTask: function(name, id, date, content, classId, status){  //status表示任务状态，-1表示未完成， 1表示已完成
            var task = [name, id, date, content, classId, status];
            task = task.join(";");
            return task;
        },
        decodeTask: function(task){
            var temp = task.split(";");
            var result = [];
            result["name"] = temp[0];
            result["id"] = temp[1]
            result["date"] = temp[2];
            result["content"] = temp[3];
            result["classId"] = temp[4];
            result["status"] = temp[5];
            return result;
        }
    };



/*------------------------------------------------------本地taskToClass处理----------------------------------------------------*/
//    var taskToClass = function(){
//        this.init();
//    };
//    taskToClass.prototype = {
//        init: function(){
////            if(mystorage.getItem("taskToClass") == null){}
//        this.taskToClass = [];
//        },
//        addItem: function(task,){
//
//        }
//    };

/*------------------------------------------------------本地存储数据声明----------------------------------------------------*/
    var myStorage = function(){
        this.init();
    };

    myStorage.prototype = {
        init: function(){
            this.setNewItem("tasks");
            this.setNewItem("taskToClass");
        },
        setNewItem: function(item){
            if(mystorage.getItem(item) == null){
                mystorage.setItem(item, "");
            }
        }
    }


}else {
    alert("您的浏览器不支持本地存储");
}






