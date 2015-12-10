define(function(){
    return {
        init : function () {
            /*start with here
            初始化创建dom/tasknumber/一些说明/弹窗说明*/
            window.classArray = JSON.parse(window.localStorage.getItem('class')) || [];
            window.taskArray = JSON.parse(window.localStorage.getItem('task')) || [] ;

            if (window.classArray.length == 0) {// 如果初次访问应用
               // alert('666')
                var index = {
                belong : 'MainItem',
                id : Date.parse(new Date),
                name : '默认分类',
                tasknumber : 0,
                canDelete : 'false',
                type : 'main'
                };
                window.classArray.push(index);
                window.localStorage.setItem('class',JSON.stringify(window.classArray));
                this.domHandler.creatClass(index);
                $('.main-item')[0].className = 'main-item active';
                var alertBtn = $('#alert-btn');
                var self = this;
                var option = {
                        class : 'alert',
                        inner : '<p class="first-line">欢迎来到Todu,在这里，你可以制定自己的计划，还在担心没有地方方便的记录下你的plan吗？开始你的Todu吧~</p>'
                        };
                alertBtn.innerHTML = "下一步" ;
                self.maskHandler(option);
                alertBtn.onclick = function () {
                    alertBtn.innerHTML = "确定";
                       option = {
                        class : 'alert',
                        inner : '<p class="first-tips"><span class="tips-1">新建任务</span><span class="tips-2"> 主分类</span></p><p class="first-tips"><span class="tips-3"> 子分类</span><span class="tips-4">删除分类</span></p><p class="first-tips"><span class="tips-5">修改任务</span><span class="tips-6">完成任务</span></p>'
                        };
                        self.maskHandler(option); 
                        alertBtn.onclick = function () {
                            $('.window')[0].style.display = 'none'; 
                        }  
                }
            } else {
                var i,len;
                var array = window.classArray;
                //console.log(classArray[0]);
                $('.class-cont')[0].innerHTML = '';
                for(i = 0, len = array.length ; i < len ; i++ ) {
                    this.domHandler.creatClass(array[i]);
                }
                if($('.main-item')[0]) {
                    $('.main-item')[0].className = 'main-item active';
                    var id = $('.active')[0].getAttribute('data-id');
                    this.updataTask(id,'all');
                }
                var number = this.storageOprate.getAllTaskNumber();
                $('.number')[0].innerHTML = number;
            }
            
        },
        eventUtil : {
        on:function(element, event, listener){
            if (element.addEventListener){
                  element.addEventListener(event,listener,false);
                } else if (element.attachEvent) {
                  element.attachEvent("on"+event,listener);
                }
                else { 
                  element["on"+event] = listener;
                }
        },
        un:function(element, event, listener){
            if(element.removeEventListener){
                  element.removeEventListener(event,listener,false);
                }else if (element.detach){
                  element.detach("on" + event,listener);

                }else{
                  element["on" + event] = null;
                }
        },
        getTarget:function (event) {
            var event = event ? event : window.event;
            return event.target ? event.target : event.srcElement;
        }
    },
    delegateEvent : function (main,className,type,handler){
        this.eventUtil.on(main,type,function (event) {
             event = event ? event : window.event;
             var target = event.target ? event.target : event.srcElement;
             if (target.className.split(' ')[0] == className) {
                var This = target;
                handler(This);
             }
        });
    },
    /* function(opreate,options) {
        if (!operate || !options) return false;
        if (operate === 'creatClass') {
            /*dosmthinghere
        }
        if (operate === 'deleteClass') {
            dosomething here
        }
        if (operate === 'creatTask') {
            dosomething
            tasknumber 数量要变化
        }
        if (operate === 'handler') {
            /*dosomething
        }
        if (operate === 'taskModification') {
            hey dosomethinghere
        }
     } */
    domHandler : {
        creatClass : function (options) {// options 配置参数
            var type = options.type; // main 主分类 child 子分类
            var belong = options.belong;// 属于？
            var name = options.name;
            var number = options.tasknumber;
            var id = options.id;
            if (type === 'main') {
                var Doc = document;
                var dele = Doc.createElement('span');
                var div = Doc.createElement('div');
                var divText = Doc.createTextNode(name + ' ( ' + number +' ) ');
                var box = Doc.createElement('div');
                dele.setAttribute('class','delete-icon icon');
                dele.setAttribute('title','删除该分类');
                dele.innerHTML = '&#xe9ac;'
                div.setAttribute('class','main-item');
                div.setAttribute('data-id',id);
                div.appendChild(divText);
                div.appendChild(dele);
                box.setAttribute('class','class-box');
                box.appendChild(div);
                $('.class-cont')[0].appendChild(box);
              //  var deleText = 
            } else if (type === 'child') {
                var mainItem = $('.main-item'),i,len;
                var Doc = document;
                var dele = Doc.createElement('span');
                var div = Doc.createElement('div');
                var divText = Doc.createTextNode(name + ' ( ' + number +' ) ');
                dele.setAttribute('class','delete-icon icon');
                dele.setAttribute('title','删除该分类');
                dele.innerHTML = '&#xe9ac;'
                div.setAttribute('class','child-item');
                div.setAttribute('data-id',id);
                div.appendChild(divText);
                div.appendChild(dele);
                for (i = 0 ,len = mainItem.length; i < len ; i++) {
                    if (mainItem[i].getAttribute('data-id') == belong){
                        mainItem[i].parentNode.appendChild(div);
                        return;
                    }
                }
            }
        },
        deleteClass: function ( ) {

        },
        handler : function () {

        }
    },
    creatTimestamp : function () {// 获取时间戳
       return Date.parse(new Date);
    },
    storageOprate : {
        This : this,
        creatMainItem : function(options){
        var a = {
            name : options.name,
            belong : options.belong,
            tasknumber : 0,
            id : options.id,
            canDelete : 'true',
            type : 'main'
        }
        window.classArray.push(a);
        window.localStorage.setItem('class',JSON.stringify(window.classArray));// 存储class
        },
        creatChildItem : function(options) {
          var b = {
            name : options.name,
            belong : options.belong,
            tasknumber : 0,
            id : options.id,
            canDelete : 'true',
            type : 'child'
        }
        window.classArray.push(b);
        window.localStorage.setItem('class',JSON.stringify(window.classArray));// 存储class
        },
        creatTaskItem : function (options) {// options 传入的参数
            var b = {
            belong : options.belong,// id
            id : options.id,// 此id为时间戳
            finished : options.finished,
            title : options.title,
            date:options.date,
            cont: options.cont
        }
        window.taskArray.push(b);
        function a() {// 根据tasK日期重排序数组
        function compare (value1,value2) {
            var value1 = new Date(value1.date).getTime()/3600/1000;
            var value2 = new Date(value2.date).getTime()/3600/1000;
            if (value1 > value2) {
                return -1;
            } else if (value1 < value2) {
                return 1;
            } else {
                return 0;
            }
        }
        window.taskArray.sort(compare);
        }   
        a();
        window.localStorage.setItem('task',JSON.stringify(window.taskArray));// 存储task
        },
        setStorage: function (id,obj) {// options修改的参数
           var array = window.taskArray,i,len;
            for ( i = 0,len = array.length; i < len ; i++ ) {
                if(array[i].id == id ) {
                    if (obj.title) {
                        array[i].title = obj.title; 
                    }
                    if (obj.date) {
                        array[i].date = obj.date;// 把新的任务对象赋值
                    }
                    if (obj.cont) {
                        array[i].cont = obj.cont;// 把新的任务对象赋值
                    }
                    if (obj.finished) {
                        array[i].finished = obj.finished;
                    }
                    break ;// 返回
                }
            }
            window.localStorage.setItem('task',JSON.stringify(window.taskArray)); 
        },
        getClassById: function(id) {// 返回id在classArray的索引
            var array = [],i,len;
            array = window.classArray;
            for (i = 0, len = array.length; i < len ; i++) {
                if (array[i].id == id) {
                    return i;
                }
            }
        },
        getTaskById : function (id) {
            var array = window.taskArray,i,len;
            for ( i = 0,len = array.length; i < len ; i++ ) {
                if(array[i].id == id ) {
                    return array[i];// 返回找到的obj
                }
            }
        },
        getMainClass : function ( ) {//获得所有的主分类 返回数组
            var array = [],i,len;
            var returnArray = [];
            array = window.classArray;
            for (i = 0, len = array.length; i < len ; i++) {
                if (array[i].belong === 'MainItem') {
                    returnArray.push(array[i]);
                }
            }
            return returnArray;
        },
        getAllTaskById : function (id) {// 
            var array = [],i,len;
            var returnArray = [];
            array = window.taskArray;
            for( i = 0, len = array.length; i < len ; i++) {
                if (array[i].belong === id) {// 任务属于某个id的分类
                    returnArray.push(array[i]);
                }
            }
            return returnArray;
        },
        deleteClass : function (id) {
            var newTask = window.taskArray;
            var newClass = window.classArray;
            var newClassArray = [];
            var newTaskArray = [];
            var i,j,len,leng;
            for (i =0,len = newClass.length; i < len ; i++ ) {
                if (newClass[i].id == id || newClass[i].belong == id) {  
                } 
                else {
                  newClassArray.push(newClass[i]);
                }
            }
            window.classArray = newClassArray;// 更新classArray
            newClass = window.classArray;
            for ( i =0,len = newTask.length; i < len ; i++) {
                for (j = 0,leng = newClass.length; j < leng ; j++ ) {
                     if ( newTask[i].belong == newClass[j].id) {// 如果这个任务属于某个分类
                        newTaskArray.push(newTask[i]);
                     }
                }
            }
            window.taskArray = newTaskArray;
            window.localStorage.setItem('class',JSON.stringify(window.classArray));
            window.localStorage.setItem('task',JSON.stringify(window.taskArray));
        },
        getAllTaskNumber : function () {
            var array = window.classArray;
            var i,len,returnNumber = 0;
            for ( i = 0, len = array.length ; i < len ; i++) {
                if (array[i].tasknumber && array[i].type == 'main') {
                    returnNumber += array[i].tasknumber;  
                }
            }
            return returnNumber;
        }
    },
    deleteNumberHandler: function(id) {// id为子分类的id
       var newclassArray = window.classArray;
       var task = {};
       var i,len;
       for ( i =0, len = newclassArray.length; i < len ; i++ ) {
            if (newclassArray[i].id == id) {
               task = newclassArray[i];
               break;
            }
       };
       for ( i =0, len = newclassArray.length; i < len ; i++ ) {
            if (newclassArray[i].id == task.belong) {
                newclassArray[i].tasknumber -= task.tasknumber;
            }
       };
       window.classArray = newclassArray;
       window.localStorage.setItem('class',JSON.stringify(window.classArray));
    },
    updataTask : function (id,type) {
       var returnArray = this.storageOprate.getAllTaskById(id); 
       var taskA = window.taskArray;
       var array = [];
       var self = this;
       var Box = $('.task-list-cont')[0];
       var leng ,len,j = 0,i=0,tag;
       if (type == 'all') {
            for (i in classArray) {
            if (classArray[i].id == id || classArray[i].belong == id) {
                for (j = 0 ,len = taskA.length; j < len ; j++ ) {
                    if (taskA[j].belong == classArray[i].id) {
                        array.push(taskA[j]);
                    }
                }
            }
       }
       } 
       else if (type == 'doing') {
            for (i in classArray) {
            if (classArray[i].id ==id || classArray[i].belong == id) {
                for (j = 0 ,len = taskA.length; j < len ; j++ ) {
                    if (taskA[j].belong == classArray[i].id && taskA[j].finished == 'false') {
                        array.push(taskA[j]);
                    }
                }
            }
       }
       } 
       else if (type == 'done') {
            for (i in classArray) {
            if (classArray[i].id ==id || classArray[i].belong == id) {
                for (j = 0 ,len = taskA.length; j < len ; j++ ) {
                    if (taskA[j].belong == classArray[i].id && taskA[j].finished == 'true') {
                        array.push(taskA[j]);
                    }
                }
            }
       }
       }
       
       // 清空task-list
       Box.innerHTML = '';
       len = array.length;
       for (i = 0 ;i < len ; i++) {
        var dateBox = $('.task-date');
        tag = true;// 标志位
        for (leng = dateBox.length,j = 0; j < leng ; j++) {
            if (dateBox[j] && dateBox[j].innerHTML == array[i].date) {// 有这个日期
                var Doc = document;
                var parent = dateBox[j].parentNode;
                var itemElement = Doc.createElement('div');
                if(array[i].finished === 'false') {
                   itemElement.setAttribute('class','item task-doing'); 
                } else {
                    itemElement.setAttribute('class','item task-done');
                }
                itemElement.setAttribute('data-id',array[i].id);
                itemElement.innerHTML = array[i].title;
                parent.appendChild(itemElement);
                tag = false;
            }
        }
        //否则
        if(tag) {
            var Doc = document;
            var dateElement = Doc.createElement('div');
            var itemElement = Doc.createElement('div');
            var taskBoxElement = Doc.createElement('div');
            dateElement.innerHTML = array[i].date;
            dateElement.setAttribute('class','task-date');
            itemElement.innerHTML = array[i].title;
            if(array[i].finished === 'false') {
                itemElement.setAttribute('class','item task-doing'); 
            } else {
                itemElement.setAttribute('class','item task-done');
            }
            itemElement.setAttribute('data-id',array[i].id);
            taskBoxElement.setAttribute('class','task-box');
            taskBoxElement.appendChild(dateElement);
            taskBoxElement.appendChild(itemElement);
            Box.appendChild(taskBoxElement);
        }
       }
    },
    maskHandler : function (options) {// 遮罩操作 options是参数
        /*
        options:{};

        addclass: 显示添加分类遮罩
        alert： 显示弹窗警告
        cont属性：弹窗警告内容
        */
        var win = $('.window')[0];
        if (options.class == 'addclass') {
            var className = $('#class-name');
            className.value = '';// 清空
            $('.window-tips')[0].innerHTML = '请输入在10个字符以内哦~';
            win.style.display = 'block';
            win.getElementsByClassName('window-contend-addclass')[0].style.display = 'block';
            win.getElementsByClassName('window-contend-alert')[0].style.display = 'none';
        } else if(options.class == 'alert') {
            if (options.inner) {
                $('.alert-tips')[0].innerHTML = options.inner;
            }
            win.style.display = 'block';
             win.getElementsByClassName('window-contend-addclass')[0].style.display = 'none';
            win.getElementsByClassName('window-contend-alert')[0].style.display = 'block';
        }
    },
    updataSele : function () {//更新options
        var selec = $('#class-select');
        var items = this.storageOprate.getMainClass();
        var i,len;
        for (i = 0,len = items.length ; i < len ; i++) {
           selec.options[i+1] = new Option(items[i].name, items[i].id);
        }
    },
    updataTaskNumber : function (id) {
        var index = this.storageOprate.getClassById(id);
        var array = window.classArray;
        if (array[index].type == 'main') {
            array[index].tasknumber = array[index].tasknumber + 1;
        } else {
            array[index].tasknumber = array[index].tasknumber + 1;
            var i,len;
            id = array[index].belong;
            for (i = 0, len = array.length; i < len ; i++) {
                if (array[i].id == id) {
                    array[i].tasknumber = array[i].tasknumber + 1;
                    break ;
                }
            }
        }
        window.classArray = array;
        window.localStorage.setItem('class',JSON.stringify(window.classArray));
        this.init();
    },
     getStyle : function (obj,attr){
            if(obj.currentStyle){
                  return obj.currentStyle[attr];
            }
            else{
                return getComputedStyle(obj,false)[attr];
            }
    },
    makeSureCancel : function () {
    var type = this.getStyle($('.edit')[0],'display');
        if(type === 'block') {
            var options = {
            class : 'alert',
            inner : '任务还未保存，确认现在退出吗？'
            };
        this.maskHandler(options);
        $('#alert-btn').onclick = function () {
            $('.edit')[0].style.display = 'none';
            $('.detail')[0].style.display = 'block';
            $('.window')[0].style.display = 'none';
            }
        }
    },
    uniqArray : function (source) {
    var len = source.length,
        result = source.slice(0),
        i, datum;
    // 从后往前双重循环比较
    // 如果两个元素相同，删除后一个
    while (--len > 0) {
        datum = result[len];
        i = len;
        while (i--) {
            if (datum === result[i]) {
                result.splice(len, 1);
                break;
            }
        }
    }
    return result;
    },
    arraySort : function () {// 根据tasK日期重排序数组
        function compare (value1,value2) {
            var value1 = new Date(value1.date).getTime()/3600/1000;
            var value2 = new Date(value2.date).getTime()/3600/1000;
            if (value1 > value2) {
                return -1;
            } else if (value1 < value2) {
                return 1;
            } else {
                return 0;
            }
        }
        //console.log(window.taskArray.sort(compare));
    },
    returnIndex : function () {// 返回引导介绍页面
        var detailElement = $('.detail')[0];
        detailElement.className = 'detail done';
        detailElement.style.display = 'block';
        $('.edit')[0].style.display = 'none';
        $('.detail-title')[0].innerHTML = '开始你的Todo';
        $('.detail-date')[0].innerHTML = '2015-07-01';
        $('.detail-cont')[0].innerHTML = '如果不能改变别人，何不先改变自己？';
    }
    }
});