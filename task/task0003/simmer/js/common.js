/* 全局变量*/
    var p = 0;
    var storage = window.localStorage;
    var task = window.localStorage.task;
    var cateArry = new Array();
    var taskArry = new Array();
    var configurable = 0;// 用于判断当前编辑的任务是新增任务还是某个正在修改的任务
/*
**********************************************************
 系统初始化函数 

**********************************************************
 */
function Init() {// 初始化函数 创建左侧分类元素
    var length = cateArry.length;
    var i;
    for ( i = 0; i < length ; i++ ) {
        if (cateArry[i].parent == null ) {
            creatMainItem (cateArry[i].name,cateArry[i].id);// 创建主分类
        }
    } 
    indexInit ();// index 初始化函数 
    for ( i = 0; i < length ; i++ ) {
        if (cateArry[i].parent != null ) {
            var mainItem = $('.main-item');
            var lengths = mainItem.length;
            var j;
            for (j = 0 ; j < lengths ; j++ ) {
                if (cateArry[i].parent == mainItem[j].getAttribute('data-id')) {// 如果该子分类是已经创建的这个主分类
                    creatChildItem(cateArry[i].name,cateArry[i].id,mainItem[j].index);// 创建子分类
                }
            }
        }
    }

}
 
function storageInit () { // 初始化装载函数，将localstorage经过parse后保存到全局数组中
    var cateObj = JSON.parse(storage.getItem('categorories'));
    var taskObj = JSON.parse(storage.getItem('task'));
    cateArry = [];
    taskArry = [];
    if (task) {
        var length1 = 0;
        var length2 = 0;
        var i;
        var j;
        for ( i in cateObj) {
            length1++
        }
        for ( i in taskObj) {
            //console.log(taskObj[i]);
            length2++
        }
        for (i = 0; i < length1 ; i++ ) {
            cateArry[i] = cateObj[i];
        }
        for (i = 0; i < length2 ; i++ ) {
            taskArry[i] = taskObj[i];
        }
    }
    if (cateArry.length == 0) {// 如果没有默认分类，创建它
        cateArry.push( {
            id:'index',
            name:'默认分类',
            configurable:false,
            paren:null,
               number:0
        });
        console.dir(cateArry);
        storage.setItem('categorories',JSON.stringify(cateArry));
        }
}

function Category (name,configurable,parent) {// 分类构造函数
        var id;
        id = Date.parse(new Date);// 获取时间戳
        if (parent == null) {
            this.id = "main" + id;
        } else {
            this.id = "child" + id;
        }
        this.name = name;
        this.configurable = configurable;
        this.parent = parent;
        this.number = 0;
    }


    function Task (title,date,contend,belong,finished) {// 任务构造函数
        var id;
        this.title = title;
        this.date = date;
        this.contend = contend;
        id = Date.parse(new Date);// 获取时间戳
        this.id = "task" + id;
        this.belong = belong;
        this.finished = 'false';
    }

    function indexInit () {// 初始化index
        var i;
        var j;
        var index;
        var childItem;
        var length
        var lengths;
        var mainItem
        mainItem = $('.main-item'); // 获取所有的主分类
        length = mainItem.length;
        for (i = 0; i < length ; i++ ) {
             mainItem[i].index = i;
        }
    }
/*
**********************************************************
全局工具函数 选择器 事件代理函数
 
**********************************************************
 */


    function $(selector) { //  选择器
        var i,arr,length,element,selec;
        element = document;//element默认为document对象
        arr = selector.split(' ');//将选择字符串用空格分开
        length = arr.length;//获取选择器的层级数
        i = 0;
        while ( i < length){
            if (arr[i].charAt(0) == "#"){
                selec = /[^#].*/.exec(arr[i])[0];//使用正则提取id选择器
                element = element.getElementById(selec);
                //alert("ID selector!")
            }else if (arr[i].charAt(0) == "."){
                selec = /[^.].*/.exec(arr[i]);//使用正则提取class选择器
                element = element.getElementsByClassName(selec);
                //alert("class selector!")
            }else if (arr[i].charAt(0) == "["){
                alert("attr selector!")
            }else {
                element = element.getElementsByTagName(arr[i]);//返回所有匹配的标签元素
                //alert("Tag selector!")
            }
            i++;
        }
        return element;
    }

    var eventUtil = { // 事件处理单元
    on:function(element, event, listener){
        if (element.addEventListener){
              element.addEventListener(event,listener,false)
            } else if (element.attachEvent) {
              element.attachEvent("on"+event,listener)
            }
            else { 
              element["on"+event] = listener;
            }
    },
    un:function(element, event, listener){
        if(element.removeEventListener){
              element.removeEventListener(event,listener,false)
            }else if (element.detach){
              element.detach("on" + event,listener);

            }else{
              element["on" + event] = null;
            }
    },
    getTarget:function () {
        var event = event ? event : window.event;
        return event.target ? event.target : event.srcElement;
    }  
}
    function delegateEvent(element,tag,eventName,listener) {// 事件代理函数
        eventUtil.on(element,eventName,function () {
            var ele = event ? event : window.event;
            var target = ele.target? ele.target : ele.srcElement;// 兼容IE与标准浏览器
            if (target.className.split(' ')[0] == tag) { // 取第一个类名并判断与目标元素的类名是否相等
                var This = target; // 将target保存到This中并传给事件处理函数
                listener(This);
            }
        });
    }



    function storageHandler (id,This) {// 查询This下的id为id的分类
        var returnArry = [];
        var length;
        length = taskArry.length;
        for ( var j =0 ; j < length ; j++) {
            if (taskArry[j].belong ==  id) {
                returnArry.push(taskArry[j]);// 如果任务属于该id分类 则push进返回数组中
            }
        }
        return returnArry;
}

function finishedTask (id,set) {// 通过id 找到localstorage set代表是查询任务 还是设置完成任务
    var length;
    length = taskArry.length;
    for (var i = 0; i < length; i++) {
        if (taskArry[i].id == id && set == true ) {
                taskArry[i].finished = 'true';
                   storage.setItem('task',JSON.stringify(taskArry));
                return taskArry[i];// 返回1 表示任务已经为标记完成
            }
        if (taskArry[i].id == id && set == false ) {
            if (taskArry[i].finished == true ) {
                return 'finished';
            }
        }
    }
    return ;
}    

function deleteMain (id) {
    var i;
    var j;
    var length = cateArry.length;
    var newArray = [];
    for ( i = 0 ; i < length ; i++ ) {
        if (cateArry[i].id == id || cateArry[i].parent == id) {
            continue;
        } else {
            newArray.push(cateArry[i]);// 不满足条件的push到一个新的数组
        }
    }
    cateArry = [];
    length = newArray.length;
    for ( i = 0 ; i < length ; i++ ) {
        cateArry[i] = newArray[i];
    }
    storage.setItem('categorories',JSON.stringify(cateArry));
}

function deleteChild (id) {
    var i;
    var j;
    var length = cateArry.length;
    var newArray = [];
    for ( i = 0 ; i < length ; i++ ) {
        if (cateArry[i].id == id ) {
            cateArry.splice(i,1);
            storage.setItem('categorories',JSON.stringify(cateArry));
            break;
        } 
    }
}

/*
**********************************************************
 任务更新函数，包括更新任务详情（未完成的任务）/任务详情（已经完成的任务）/任务编辑（未完成的任务）
 
**********************************************************
 */

    function updateDetail (title,date,contend,id) {// 更新未完成任务详情(点击左侧任务列表任务时候调用)
        var detail = $('.detail')[0];
        var titles = detail.getElementsByClassName('title')[0];
        var dates = detail.getElementsByClassName('date')[0];
        var taskContend = detail.getElementsByClassName('task-contend')[0];
        titles.innerHTML = title;
        dates.innerHTML = date;
        taskContend.innerHTML = contend;
        detail.setAttribute('task',id);
    }
    function updateDone (title,date,contend,id) {// 更新已完成任务详情(点击左侧任务列表任务时候调用)
        var done = $('.done')[0];
        var titles = done.getElementsByClassName('title')[0];
        var dates = done.getElementsByClassName('date')[0];
        var taskContend = done.getElementsByClassName('task-contend')[0];
        titles.innerHTML = title;
        dates.innerHTML = date;
        taskContend.innerHTML = contend;
        done.setAttribute('task',id);
    }
    function updateEdit(title,date,contend,id) {// 更新编辑任务框内容(点击编辑任务的时候调用)
        var edit = $('.edit')[0];
        var titles = edit.getElementsByTagName('input')[0];
        var dates =edit.getElementsByTagName('input')[1];
        var taskContend = edit.getElementsByTagName('textarea')[0];
        titles.value = title;
        dates.value = date;
        taskContend.value = contend;
        edit.setAttribute('task',id);

    }

/*
**********************************************************
全局创建dom元素创建函数，包括创建左侧的分类函数，中间任务列表的函数
 
**********************************************************
 */



    function creatChildItem(name,id,mainindex) { // 创建子分类函数。在第几个主分类下添加分类
        var ele = $('.main-item')[mainindex];
        ele = ele.getElementsByClassName('drawdown')[0];
        var div = document.createElement('div');
        var childItem = document.createElement('div');
        var span = document.createElement('span');
        var tex = document.createTextNode(name + '(');
        var texs = document.createTextNode(')');
        var text2 = document.createTextNode(0);
        span.appendChild(text2);
        span.setAttribute('class','number')    
        div.appendChild(tex);
        div.appendChild(span);
        div.appendChild(texs);
        div.setAttribute('class','name');
        childItem.appendChild(div);
        childItem.appendChild(div);
        childItem.setAttribute('class','child-item');
        childItem.setAttribute('data-id',id);
        ele.appendChild(childItem);
    }

    function removeChildItem(mainindex,index) {//删除子分类函数 
        var ele = $('.main-item')[mainindex];
        ele = ele.getElementsByClassName('drawdown')[0];
        ele.removeChild(ele.getElementsByClassName('child-item')[index]);
    }

    function creatMainItem (names,id) {// 创建主分类元素(左侧) 点击创建主分类按钮时候调用 
        var ele = $('.class-box')[0];
        var mainItem = document.createElement('div');// DOM操作
        var drawdown = document.createElement('div');
        var name = document.createElement('div');
        var number = document.createElement('span');
        var tex = document.createTextNode(names + '(');
        var texs = document.createTextNode(')');
        var text2 = document.createTextNode(0);
        number.appendChild(text2); 
        number.setAttribute('class','number')    
        name.appendChild(tex);
        name.appendChild(number);
        name.appendChild(texs);
        name.setAttribute('class','name');
        drawdown.setAttribute('class','drawdown');
        mainItem.appendChild(name);
        mainItem.appendChild(drawdown);
        mainItem.setAttribute('class','main-item');
        mainItem.setAttribute('data-id',id);
        ele.appendChild(mainItem);
    }

    function removeMainItem(mainindex) {//删除主分类函数
            var ele = $('.class-box')[0];
            var  remove= $('.main-item')[mainindex];
            ele.removeChild(remove);
        }    
    function creatDeleteElement () {// 创建删除分类按钮(删除分类函数)
        var ele = $('.active')[0];
        var span = document.createElement('span');
        var text = document.createTextNode('');
        span.setAttribute('class','delete');
        span.setAttribute('title','删除该分类');
        span.appendChild(text);
        ele.appendChild(span);
    }

    function maskInit () {// 浮层初始化函数
        $('.childitem')[0].style.display = 'none';
        $('.mainitem')[0].style.display = 'none';
        $('.makesure')[0].style.display = 'none';
        $('.creat')[0].style.display = 'none';
        $('.mask')[0].style.display = 'block';
        $('.mainitem')[0].getElementsByTagName('input')[0].value = ' ';
        $('.childitem')[0].getElementsByTagName('input')[0].value = ' ';
    }

    function creatTaskElement (date,id,name,finish) {// 点击左侧分类时候调用，动态更新该分类下任务列表
        var div;
        var text;
        var dates;
        var length;
        div = document.createElement('div');
        if ( finish =='true' ) {
            div.setAttribute('class','item finished');
        } else {
            div.setAttribute('class','item do');
        }
        div.setAttribute('data-id',id);
        text = document.createTextNode(name);
        div.appendChild(text);
        dates = $('.task-list')[0].getElementsByClassName('date');
        length = dates.length;// 任务所有的日期个数
        for( var i =0 ;i < length;i++ ) {
            if (dates[i].innerHTML == date) {// 如果任务日期已经存在，则在日期下创建task item
                var dayItem = dates[i].parentNode;
                dayItem.insertBefore(div,dayItem.childNodes[1]);
                return ;// 返回
            }
        }
        var box = $('.task-list')[0];// 如果任务日期不存在，则创建新的日期Dom元素
        var dayItem = document.createElement('div');
        var p = document.createElement('p');
        var pText = document.createTextNode(date);
        p.setAttribute('class','date');
        p.appendChild(pText);
        dayItem.setAttribute('class','day-item');
        dayItem.appendChild(p);
        dayItem.appendChild(div);
        box.appendChild(dayItem);
    }
/*
**********************************************************
处理左侧分类的点击事件（事件代理函数）
 
**********************************************************
 */
    function showDraw (This) {    // 处理左侧分类的点击事件（事件代理函数）
        var j;
        var length;
        var name
        var parent = This.parentNode;// parent为main-item or child-item
        if(parent.className == 'main-item') {
            var drawdown = parent.parentNode.getElementsByClassName('drawdown');// 获取所有的drawdown
            name =  parent.parentNode.getElementsByClassName('name');
            length = name.length;
            for (j = 0;j < length; j++) { // 重置所有类名为name的class name
                    name[j].className = 'name';
            } 
            length = drawdown.length;
            for (j = 0;j < length; j++) {// 关闭所有主分类下的子分类
                drawdown[j].style.display = 'none';
            }
            parent.getElementsByClassName('drawdown')[0].style.display = 'block';// 打开点击的子分类
            This.className = 'name active';    // 点击的class=name的元素类名改为name active    
            if (!This.getElementsByClassName('delete')[0]) { //创建删除分类dom
                creatDeleteElement();
            }    
        } else {
            name = parent.parentNode.parentNode.getElementsByClassName('name');
            length = name.length;
            for (j = 0;j < length; j++) {
                    name[j].className = 'name';// 重置所有类名为name的class name
            } 
            name[0].className = 'name';
            This.className = 'name active'; // 点击的class=name的元素类名改为name active
            if (!This.getElementsByClassName('delete')[0]) {
                creatDeleteElement();// 创建删除分类dom
            }
        }
        $('.detail')[0].style.display = 'none';// 关闭任务详情页
        $('.done')[0].style.display = 'none';// 关闭任务详情页
        $('.task-list')[0].innerHTML = '';
        var array = storageHandler(This.parentNode.getAttribute('data-id'),This);
        if (array) {
            var lengths = array.length;
            This.getElementsByClassName('number')[0].innerHTML = lengths;
            for ( j =0 ; j < lengths ; j++ ) {
                creatTaskElement (array[j].date,array[j].id,array[j].title,array[j].finished);
            }
        }
        $('#complete').className = '';
        $('#doing').className = '';
        $('#all').className = 'active';
    }
/*
**********************************************************
处理左侧分类的点击事件（事件代理函数），显示中间的任务列表
 
**********************************************************
 */
    function showTaskContend (This) {// 展示右侧任务详情 点击左侧任务列表任务的时候调用
        var length;
        var id;
        var name;
        name =This.className;
        id = This.getAttribute('data-id');
        length = taskArry.length;
        for (var i = 0; i < length ; i++) {
            if (taskArry[i].id == id && name == 'item do') {// 如果是正在进行的任务
                updateDetail(taskArry[i].title,taskArry[i].date,taskArry[i].contend,taskArry[i].id);
                $('.done')[0].style.display = 'none';
                 $('.edit')[0].style.display = 'none';
                 $('.detail')[0].style.display = 'block';
            }
            if(taskArry[i].id == id && name == 'item finished') {// 如果是已经完成的任务
                updateDone (taskArry[i].title,taskArry[i].date,taskArry[i].contend,taskArry[i].id);
                $('.edit')[0].style.display = 'none';
                $('.detail')[0].style.display = 'none';
                $('.done')[0].style.display = 'block';
            }
        }
        configurable = 1;
    }



