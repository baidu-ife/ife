window.onload = function () {
/*
整个思路都是根据自添加的标签属性"data-id"与"task"，其中data-id用来表面分类的信息，主要出现在左侧任务分类栏与中间任务列表栏，ertas则作为当前正在编辑/查看/新建的任务属性，主要出现在右边的任务内容元素中。关键点就在左侧激活分类，任意一个时刻左侧分类栏只有一个主类/分类的classname为"item active"（橙色表示），其他的分类则处于未激活状态。

！注意在存进localstorage中的时候，是以字符串的形式存进去的，通过JSON.parse()与JSON.stringify()方法可以将字符串转为对象/对象转为字符串
*/
    storageInit(); // 首先，装载localstorage数据到全局数组cataArry,与taskarry中
    Init();// 根据加载数据，在左侧任务栏动态的创建相应的元素
    storage.clear();

/*
**********************************************************
 以下是3个事件代理函数。
**********************************************************
 */
    delegateEvent($('.class-box')[0],'name','click',showDraw);// 代理class-box下的类名为name的元素click事件(包括子分类和主分类)

    delegateEvent($('.task-list')[0],'item','click',showTaskContend);// 代理class-box下的类名为name的元素click事件(包括子分类和主分类)

    delegateEvent($('.class-box')[0],'delete','click',deleteClass);// 代理class-box下的类名为delete的元素click事件(包括子分类和主分类)
    
        function deleteClass (This) {
        //alert(This.parentNode.parentNode.className);
        This = This.parentNode.parentNode;
        
        //alert(This.className);
        if (This.className == 'main-item') {
            var data =This.getAttribute('data-id');
            //alert(data);
            if (data == "index") {
                alert("无法删除默认分类！");
                return false;
            }
            if (confirm('确认删除当前主分类？')) {
                This.parentNode.removeChild($('.active')[0].parentNode);
                $('.task-list')[0].innerHTML = '';
                var id = This.getAttribute('data-id');
                deleteMain (id);
            }
            
        } else {
            if (confirm('确认删除当前子分类？')) {
                This.parentNode.removeChild($('.active')[0].parentNode);
                $('.task-list')[0].innerHTML = '';
                var id = This.getAttribute('data-id');
                deleteChild(id);
            }
        }
    } 

/*
***********************************************************

以下是事件处理函数（包括各种按钮，元素的点击事件）

*********************************************************
*/

    var close = $('.closemask')[0];// 浮层右上角的关闭按钮，用来关闭遮罩
    close.onclick = function () {
        $('.mask')[0].style.display = 'none';
    }
    var addClass = $('.add')[0];// 添加分类按钮
    addClass.onclick = function () {
        maskInit();
        $('.creat')[0].style.display = 'block';
    }
    var creatMain = $('.creat')[0].getElementsByClassName('btn')[0];
    creatMain.onclick = function () { // 创建主分类按钮点击事件
        $('.creat')[0].style.display = 'none';
        $('.mainitem')[0].style.display = 'block';
        var value = $('.mainitem')[0].getElementsByTagName('input')[0].value;

    }
    var creatChild = $('.creat')[0].getElementsByClassName('btn')[1];
    creatChild.onclick = function () { // 创建子分类按钮点击事件
        $('.creat')[0].style.display = 'none';
        $('.childitem')[0].style.display = 'block';
        // maskInit();
        // $('.mask')[0].style.display = 'none';
    }

    var creatChildBtn = $('.childitem')[0].getElementsByClassName('btn')[0];
    creatChildBtn.onclick = function () { // 创建子分类函数
        var value = this.parentNode.getElementsByTagName('input')[0].value;
        var index;
        var id;
        var parent;
        var cate;
        var timestamp;
        parent = $('.active')[0].parentNode;// 当前激活的分类下创建分类
        if (!value) {
            this.parentNode.getElementsByTagName('span')[1].innerHTML = '请按照说明输入！';
            return ;
        } else {
            indexInit(); // 初始化index
            if (parent.className == 'child-item') {
                parent = parent.parentNode.parentNode
                index = parent.index;
            } else {
                index = parent.index;
            }
            parent = parent.getAttribute('data-id');// 存储保存子分类的父分类
            //alert(parent);
            if (parent == 'index') {
                alert('无法为默认分类增加分类！');
                return ;
            }
            cate = new Category (value,true,parent);// 新建一个cate子分类对象
            creatChildItem(value,cate.id,index);
            //cate = JSON.stringify(cate);
            cateArry.push(cate);
            storage.setItem('categorories',JSON.stringify(cateArry));// 存储到localstorage
        }
        maskInit();
        $('.mask')[0].style.display = 'none';// 幕罩层关闭
    }


    var creatMainBtn = $('.mainitem')[0].getElementsByClassName('btn')[0];
    creatMainBtn.onclick = function () {
        var value = this.parentNode.getElementsByTagName('input')[0].value;
        var timestamp 
        var id;
        if (!value) {
            this.parentNode.getElementsByTagName('span')[0].innerHTML = '请按照说明输入！';
            return ;
        } else {            
            var cate = new Category (value,true,null);
            creatMainItem (value,cate.id); // 创建主分类
            //cate = JSON.stringify(cate);
            cateArry.push(cate);
            storage.setItem('categorories',JSON.stringify(cateArry));// 存储到localstorage
            //creatChildItem(i,values); // 创建子分类
            //localStorage.setItem('key', JSON.stringify([{a: 1}]))
            //i++;
        }
        maskInit();// 浮层初始化函数
        $('.mask')[0].style.display = 'none';
    }

    var addTask = $('.add')[1];// 添加新任务按钮事件
    addTask.onclick = function () {// 添加新任务按钮
        var edit = $('.edit')[0];
        var id = $('.edit')[0].getAttribute('data-id');
        $('.done')[0].style.display = 'none';
        $('.detail')[0].style.display = 'none';
        edit.style.display = 'block';
        if (id ) {
            if (confirm('任务未保存，要放弃更改吗？')){
                return ;
            } 
        }
        updateEdit('新任务','2015-05-17','开始你的新任务','')
        configurable = 0;// 表名现在是新建事件而不是编辑已经存在的事件
    }
    
    var makeSure = $('.edit')[0].getElementsByClassName('btn')[0];// 保存任务按钮点击事件
    makeSure.onclick = function () {// 确认保存任务按钮点击事件
        var belong;// task belong 哪一个分类
        var task;// task对象
        var edit;// 类名为 edit的元素 
        var makeSure;
        var btn;// 按钮
        var title;// 任务标题
        var time;// 任务时间
        var value;// 任务内容
        var id;
        edit = $('.edit')[0];
        makeSure = $('.makesure')[0];
        maskInit();// 幕罩初始化
        makeSure.style.display = 'block';
        makeSure.getElementsByTagName('span')[0].innerHTML = '保存修改';
        btn = makeSure.getElementsByClassName('btn')[0];
        btn.onclick = function () { // 确认保存任务
            value = edit.getElementsByTagName('textarea')[0].value;
            title= edit.getElementsByTagName('input')[0].value;
            date = edit.getElementsByTagName('input')[1].value;
            belong = $('.active')[0].parentNode.getAttribute('data-id');
            if (/\d{4}-\d{2}-\d{2}/.exec(date) && title && value) {
                if (configurable) {// 如果是在编辑存在的任务
                    var length;
                    id = $('.edit')[0].getAttribute('task');
                    length = taskArry.length;
                    for (var i = 0; i < length; i++) {
                        if (taskArry[i].id == id) {
                            taskArry[i].title = title;
                            taskArry[i].date = date;
                            taskArry[i].contend = value;
                            storage.setItem('task',JSON.stringify(taskArry));
                            $('.task-list')[0].innerHTML = '';// 清空任务列表
                            var active = $('.active')[0];
                            var array = storageHandler(active.parentNode.getAttribute('data-id'),active);
                            if (array) {
                                var lengths = array.length;
                                for ( j =0 ; j < lengths ; j++ ) {// 更新任务列表
                                    creatTaskElement (array[j].date,array[j].id,array[j].title,array[j].finished);
                                }
                            }

                        }

                    }
                } else {// 创建新任务
                    $('.edit')[0].setAttribute('data-id','');
                    task = new Task(title,date,value,belong,false);
                    id = task.id;
                    updateDetail (title,date,value,id);// 更新任务详情Box里面的内容
                    creatTaskElement (date,id,title);// 参数分别是时间/task id/任务标题
                    taskArry.push(task);
                    storage.setItem('task',JSON.stringify(taskArry));// 存储task
                    var ids = $('.active')[0].parentNode.getAttribute('data-id');
                    var length = cateArry.length;
                    for (var i = 0 ; i < length ; i++) {
                        if(cateArry[i].id == ids) {
                           cateArry[i].number += 1; 
                        }
                    }
                    var number = $('.active')[0].getElementsByClassName('number')[0].innerHTML;
                    number ++;
                    $('.active')[0].getElementsByClassName('number')[0].innerHTML = number;// 任务数量+1
                }
                //var number = $('.active')[0].getElementsByClassName('number')[0].innerHTML;
                $('.mask')[0].style.display = 'none';// 关闭    幕罩
                $('.edit')[0].style.display = 'none';
                $('.detail')[0].style.display = 'block';
                //任务日期排序函数
            } else {
                $('.makesure')[0].getElementsByTagName('p')[0].innerHTML = "请输入正确的时间格式，标题不能为空！";
            }
            configurable = 0;// configurable标志位复位为0
            $('.detail')[0].style.display = 'none';// 详情box关闭
        }   
    }


    var makesureCancel = $('.edit')[0].getElementsByClassName('btn')[1];
    makesureCancel.onclick = function () {// 取消保存按钮点击事件
        var makeSure;
        makeSure = $('.makesure')[0];
        maskInit();
        makeSure.style.display = 'block';
        makeSure.getElementsByTagName('span')[0].innerHTML = '取消更改';
        btn = makeSure.getElementsByClassName('btn')[0];
        btn.onclick = function () {
            $('.mask')[0].style.display = 'none';// 关闭浮层
            $('.edit')[0].style.display = 'none';// 编辑块关闭
        }

    }

    var edit = $('.detail')[0].getElementsByClassName('icon')[0];// 任务编辑函数
    edit.onclick = function () {
        var id;
        var length;
        var objTask = [];
        id = $('.detail')[0].getAttribute('task');// 查询当前正在编辑的任务
        configurable = 1;
        if ( finishedTask(id,false) == 'finished' ) {// 第二个参数为false代表是查询任务
            alert('已完成的任务无法再次编辑！');
            return false;
        }
        $('.detail')[0].style.display = 'none';
        $('.edit')[0].style.display = 'block';
        $('.edit')[0].setAttribute('task',id);
        //updateEdit(title,date,contend,id)
        length = taskArry.length;
            for (var i = 0; i < length ; i++) {
                if (taskArry[i].id == id) {
                    console.log('find it');
                    updateEdit(taskArry[i].title,taskArry[i].date,taskArry[i].contend,taskArry[i].id);
                }
            }
        $('.edit')[0].setAttribute('task',id);// 更新当前正在编辑的任务
    }

    var done = $('.detail')[0].getElementsByClassName('icon')[1];// 完成任务按钮
    done.onclick = function () {
        var makeSure;
        var id;
        makeSure = $('.makesure')[0];
        maskInit();
        makeSure.style.display = 'block';
        makeSure.getElementsByTagName('span')[0].innerHTML = '完成任务';
        btn = makeSure.getElementsByClassName('btn')[0];
        btn.onclick = function () {
            var itemArray;
            var length;
            $('.mask')[0].style.display = 'none';// 关闭浮层
            $('.edit')[0].style.display = 'none';// 编辑块关闭
            id = $('.detail')[0].getAttribute('task');
            finishedTask(id,true);  // 完成id任务并存储在localstorage，第二个参数为true代表是操作任务
            itemArray = $('.task-list')[0].getElementsByClassName('item');
            length = itemArray.length;
            for (var i = 0; i < length; i++) {
                 if ( itemArray[i].getAttribute('data-id') == id ) {
                     itemArray[i].className = 'item finished';
                 }
             }; 
             $('.detail')[0].style.display = 'none';   
        }
        
    }

/*
下面是中间任务列表，全部/未完成/已完成 任务的切换点击函数
*/
    $('#all').onclick = function () {// 全部任务
        $('.task-list')[0].innerHTML = '';
        var active = $('.active')[0];
        var array = storageHandler(active.parentNode.getAttribute('data-id'),active);
        if (array) {
            var lengths = array.length;
            for ( j =0 ; j < lengths ; j++ ) {
                creatTaskElement (array[j].date,array[j].id,array[j].title,array[j].finished);
            }
        }
        $('#complete').className = '';
        $('#doing').className = '';
        this.className = 'active';
    }
    $('#doing').onclick = function () {// 正在进行的任务
        $('.task-list')[0].innerHTML = '';
        var active = $('.active')[0];
        var array = storageHandler(active.parentNode.getAttribute('data-id'),active);
        if (array) {
            var lengths = array.length;
            for ( j =0 ; j < lengths ; j++ ) {
                if (array[j].finished == 'false' ) {
                    creatTaskElement (array[j].date,array[j].id,array[j].title,array[j].finished);
                }
            }
        }
        $('#all').className = '';
        $('#complete').className = '';
        this.className = 'active';
    }

    $('#complete').onclick = function () {// 已完成的任务
        $('.task-list')[0].innerHTML = '';
        var active = $('.active')[0];
        var array = storageHandler(active.parentNode.getAttribute('data-id'),active);
        if (array) {
            var lengths = array.length;
            for ( j =0 ; j < lengths ; j++ ) {
                if (array[j].finished == 'true' ) {
                    creatTaskElement (array[j].date,array[j].id,array[j].title,array[j].finished);
                }
            }
        }
        $('#all').className = '';
        $('#doing').className = '';
        this.className = 'active';
    }

}