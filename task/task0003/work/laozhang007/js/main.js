var Collection = (function(){
    var collection = {};
    var rank = {'all':{}};
    return {
        add:function(category){
            collection[category.uid] = category;
            //level tree
            var stack = [];
            var parentid = category.parentid;
            var level = rank.all;
            var cid = category.uid;
            if(parentid === 'all'){
                level[category.uid] = {'parent':false};
            }else{
                stack = this.getRankStack(cid);
                level = this.getRankLevel(stack);
                level[cid] = {'parent':false};
                level.parent = true;
            }
        },
        setDefaultCategory:function(c){
            collection['default'] = c;
        },
        getDefaultCategory:function(){
            return collection['default'];
        },
        getCategory:function(cid){
            return Category.build(collection[cid]);
        },
        deleteCategory:function(cid){
            var stack = this.getRankStack(cid);
            var level = this.getRankLevel(stack);
            var category = collection[cid];
            var parentid = category.parentid;
            if(parentid !== 'all'){
                var children = collection[parentid].children;
                for(var i = 0,len = children.length; i < len; i++){
                    if(children[i] === cid){
                        children = children.splice(i,1);
                        break;
                    }
                }
            }
            delete level[cid];
            delete collection[cid];
        },
        getRankStack:function(cid){
            var stack = [];
            var category = collection[cid];
            var parentid = category.parentid;
            while(parentid !== 'all'){
                stack.push(parentid);
                _category = collection[parentid];
                parentid = _category.parentid;
            }
            return stack;
        },
        getRankLevel:function(stack){
            var level = rank['all'];
            var cid;
            while(stack.length > 0){
                cid = stack.pop();
                level = level[cid];
            }
            return level;
        },
        all:function(){
            return collection;
        },
        rank:function(){
            return rank;
        },
        getTaskCount:function(){
            var category,count = 0;
            for(var cid in collection){
                if(cid === 'default'){
                    continue;
                }
                category = Collection.getCategory(cid);
                count += category.getTaskCount();
            }
            return count;
        },
        save:function(){
            localStorage.setItem('collection',JSON.stringify(collection));
            localStorage.setItem('rank',JSON.stringify(rank));
        },
        clear:function(){
            localStorage.removeItem('collection');
            localStorage.removeItem('rank');
            localStorage.removeItem('app_index');
        },
        load:function(){
            collection = JSON.parse(localStorage.getItem('collection'));
            rank = JSON.parse(localStorage.getItem('rank'));
        }
    };
})();

function Category(name){
    this.uid = app.uniqueid('category_');
    this.name = name;
    this.parentid = 'all';  //存放父分类
    this.tasks = {};
    this.children = []; //存放子分类
}
Category.build = function(obj){
    function Tmp(){};
    Tmp.prototype = Category.prototype;
    var cagegory = new Tmp();
    cagegory.uid = obj.uid;
    cagegory.name = obj.name;
    cagegory.parentid = obj.parentid;
    cagegory.tasks = obj.tasks;
    cagegory.children = obj.children;
    return cagegory;
}
Category.prototype.setParent = function(parentid){
    this.parentid = parentid;
}
Category.prototype.addCategory = function(category){
    this.children.push(category.uid);
}
Category.prototype.addTask = function(task){
    this.tasks[task.uid] = task;
    task.cid = this.uid;
}
Category.prototype.removeTask = function(taskid){
    var tasks = this.tasks;
    delete tasks[taskid];
}
Category.prototype.updateTask = function(task){
    var tasks = this.tasks;
    tasks[task.uid] = task;
}
Category.prototype.finishTask = function(taskid){
    var task = this.tasks[taskid];
    task.finished = true;
}
Category.prototype.getTaskCount = function(){
    var count = Object.keys(this.tasks).length;
    var children = this.children;
    var childid;
    for(var i = 0,len = children.length; i < len; i++){
        childid = children[i];
        count += Collection.getCategory(childid).getTaskCount();
    }
    return count;
}

function Task(name,date,content,categoryid){
    this.uid = app.uniqueid('task_');
    this.cid = '';
    this.name = name;
    this.date = date;
    this.content = content;
    this.finished = false;
    var arr = date.split('-');
    this.datetime = new Date([arr[1],arr[2],arr[0]].join('/')).getTime();
}

var app = (function(){
    var id = 0;
    var currentCid,currentTid;
    var isNew = true;  //新建还是编辑
    function addCategoryListener(e){
        $.stopPropagation(e);
        var name = prompt('请输入分类名称','');
        if(name === null){
            return;
        }
        if(trim(name) === '' || name.length > 12){
            alert('分类名称不能为空且最多为12个字符');
            return;
        }
        var c = new Category(name);
        app.addCategory(c);
    }
    function categoryCancelListener(e){
        var headers = $('#all').getElementsByTagName('h3');
        each(headers,function(header){
            removeClass(header,'active');
        });
        currentCid = undefined;
    }
    function addTaskListener(e){
        isNew = true;
        hide($('.title h3'),$('.date h3'),$('.content p'),$('.oper'));
        $('.title input').value = '';
        $('.date input').value = '';
        $('.content textarea').value = '';
        show($('.detail .bottom'),$('.title input'),$('.date input'),$('.date span'),$('.content textarea'));
    }
    function editTask(){
        var category = Collection.getCategory(currentCid);
        var task = category.tasks[currentTid];
        isNew = false;
        hide($('.title h3'),$('.date h3'),$('.content p'),$('.oper'));
        $('.title input').value = task.name;
        $('.date input').value = task.date;
        $('.content textarea').value = task.content;
        show($('.detail .bottom'),$('.title input'),$('.date input'),$('.date span'),$('.content textarea'));
    }
    function cancelEditListener(e){
        hide($('.detail .bottom'),$('.title input'),$('.date input'),$('.date span'),$('.content textarea'));
        show($('.title h3'),$('.date h3'),$('.content p'),$('.oper'));
    }
    function submitTaskListener(e){
        $.preventDefault(e);
        var name = $('.title input').value;
        var date = $('.date input').value;
        var content = $('.content textarea').value;
        var task;
        if(checkName(name) && checkDate(date) && checkContent(content)){
            if(isNew === true){
                task = new Task(name,date,content,app.getCurrentCid());
                app.addTask(task);
            }else{
                var category = Collection.getCategory(currentCid);
                task = category.tasks[currentTid];
                task.name = name;
                task.date = date;
                task.content = content;
                app.updateTask(task);
            }
        }
    }
    function checkName(name){
        name = trim(name);
        if(name.length < 1 || name.length > 10){
            alert('任务名称不能为空且最多10个字符');
            return false;
        }
        return true;
    }
    function checkDate(date){
        var reg = /^\d{4}-\d{2}-\d{2}/;
        if(!reg.test(date)){
            alert('日期格式不正确');
        }
        return true;
    }
    function checkContent(content){
        content = trim(content);
        if(content.length < 10 || content.length > 100){
            alert('任务内容不能少于10个字符或超过100个字符');
            return false;
        }
        return true;
    }
    function getTaskHtml(tasks,level){
        var html = [];
        for(var taskid in tasks){
            var task = tasks[taskid];
            html.push('<div class="folder file lv'+level+'">');
            html.push('<h3 data-tid="'+task.uid+'" data-cid="'+task.cid+'">'+task.name+'</h3>');
            html.push('</div>');
        }
        return html.join('');
    }
    function getCategoryHtml(cid,rank,level){
        var category = Collection.getCategory(cid);
        var tasks = category.tasks;
        var count = category.getTaskCount();
        var html = [];
        var className = cid === currentCid ? 'active':'';
        html.push('<div class="folder lv'+level+'">');
        if(category.uid === Collection.getDefaultCategory()['uid']){
            html.push('<h3 data-cid="'+category.uid+'" class="'+className+'">'+category.name+'<span>('+count+')</span></h3>');
        }else{
            html.push('<h3 data-cid="'+category.uid+'" class="'+className+'">'+category.name+'<span>('+count+')</span><a href="#"></a></h3>');
        }
        html.push('<div class="container">');
        if(rank.parent === true){
            for(var childid in rank){
                if(childid === 'parent'){
                    continue;
                }
                var childrank = rank[childid];
                html.push(getCategoryHtml(childid,childrank,level+1));
            }
        }
        html.push('</div></div>');
        return html.join('');
    }
    function categorySelectListener(e){
        $.stopPropagation(e);
        var head;
        if(this.nodeName.toLowerCase() === 'span'){
            head = this.parentElement;
        }
        head = head || this;
        if(head.getAttribute('data-tid') !== null){
            //点击任务，右边显示具体任务信息
            var headers = $('#all').getElementsByTagName('h3');
            each(headers,function(header){
                removeClass(header,'active');
            });
            addClass(head,'active');
            currentTid = head.getAttribute('data-tid');
            currentCid = head.getAttribute('data-cid');
            app.showTask();
        }else{
            //点击分类，中间显示任务列表
            var headers = $('#all').getElementsByTagName('h3');
            each(headers,function(header){
                removeClass(header,'active');
            });
            addClass(head,'active');
            currentCid = head.getAttribute('data-cid');
            app.filter('all');
        }
    }
    function taskListListener(e){
        currentCid = this.getAttribute('data-cid');
        currentTid = this.getAttribute('data-tid');
        var tags = $('#alltask').getElementsByTagName('li');
        each(tags,function(tag){
            removeClass(tag,'active');
        });
        addClass(this,'active');
        app.showTask();
    }
    function taskOperListener(e){
        var className = this.className;
        switch(className){
            case 'delete':
                if(window.confirm("确定要删除任务？")){
                    app.deleteTask();
                }
                break;
            case 'edit':
                editTask();
                break;
            case 'finish':
                if(window.confirm("确认完成任务？")){
                    app.finishTask();
                }
                break;
            default:
                break;
        }
    }
    function deleteCagegoryListener(e){
        $.stopPropagation(e);
        if(window.confirm("确定要删除分类？")){
            var parent = this.parentElement;
            var cid = parent.getAttribute('data-cid');
            app.deleteCategory(cid);
        }
    }
    function taskFilterListener(e){
        $.preventDefault(e);
        var opers = $('.task .top').getElementsByTagName('a');
        each(opers,function(element){
            removeClass(element,'active');
        });
        addClass(this,'active');
        var type = this.getAttribute('data-type');
        app.showTasks(type);
    }
    return {
        uniqueid:function(prefix){
            var index = '' + ++id;
            return prefix ? prefix + index : index;
        },
        setId:function(newId){
            id = parseInt(newId);
        },
        getid:function(){
            return id;
        },
        save:function(){
            localStorage.setItem('app_index',''+id);
            Collection.save();
        },
        initData:function(){
            if(localStorage.getItem("collection") !== null && localStorage.getItem('rank') !== null && localStorage.getItem('app_index') !== null){

                Collection.load();
                var newId = parseInt(localStorage.getItem('app_index'));
                this.setId(newId);
            }else{
                var c0 = new Category("默认分类");
                Collection.setDefaultCategory(c0);
                currentCid = undefined;
                Collection.save();
            }
        },
        addCategory:function(c){
            if(currentCid){
                c.setParent(currentCid);
                Collection.getCategory(currentCid).addCategory(c);
            }
            Collection.add(c);
            app.render();
            this.save();
        },
        deleteCategory:function(cid){
            var category = Collection.getCategory(cid);
            if(currentTid && category.tasks[currentTid]){
                currentTid = undefined;
            }
            if(currentCid === cid){
                currentCid = undefined;
            }
            Collection.deleteCategory(cid);
            this.render();
            this.showTasks();
            this.showTask();
            this.save();
        },
        filter:function(type){
            var tags = $('#filter').getElementsByTagName('a');
            var t;
            each(tags,function(tag){
                t = tag.getAttribute('data-type');
                if(t === type){
                    addClass(tag,'active');
                }else{
                    removeClass(tag,'active');
                }
            });
            this.showTasks(type);
        },
        showTasks:function(type){
            if(!currentCid){
                $('#alltask').innerHTML = '';
                return;
            }
            var category = Collection.getCategory(currentCid);
            var tasks = category.tasks;
            var taskarr = [];
            for(var taskid in tasks){
                taskarr.push(tasks[taskid]);
            }
            taskarr.sort(function(a,b){
                return a.datetime > b.datetime;
            });
            var len = taskarr.length;
            var task;
            var html = [];
            var _tmpdate;
            var isTaskActive = false;
            for(var i = 0; i < len; i++){
                task = taskarr[i];
                var status = task.finished ? 'finished':'unfinished';
                if(typeof type !== 'undefined' && status !== type && type !== 'all'){
                    continue;
                }
                if(currentTid && currentTid === task.uid){
                    isTaskActive = true;
                }else{
                    isTaskActive = false;
                }
                if(i === 0){
                    html.push('<h3>'+task.date+'</h3>');
                    html.push('<ul>');
                }else{
                    if(_tmpdate !== task.date){
                        //新的日期
                        html.push('</ul>');
                        html.push('<h3>'+task.date+'</h3>');
                        html.push('<ul>');
                    }
                }
                if(task.finished){
                    html.push('<li class="finished '+(isTaskActive?'active':'')+'" data-tid="'+task.uid+'" data-cid="'+task.cid+'">'+task.name+'</li>');
                }else{
                    html.push('<li class="'+(isTaskActive?'active':'')+'" data-tid="'+task.uid+'" data-cid="'+task.cid+'">'+task.name+'</li>');
                }
                if(i === len-1){
                    html.push('<ul>');
                }
                _tmpdate = task.date;
            }
            $('#alltask').innerHTML = html.join('');
        },
        showTask:function(){
            hide($('.detail .bottom'),$('.title input'),$('.date input'),$('.date span'),$('.content textarea'));
            show($('.title h3'),$('.date h3'),$('.content p'));
            if(!currentTid){
                this.clearTask();
                return;
            }else{
                var category = Collection.getCategory(currentCid);
                var task = category.tasks[currentTid];
                $('.title h3').innerHTML = task.name;
                $('.date h3').innerHTML = task.date;
                $('.content p').innerHTML = task.content;
                show($('.oper'));
            }
        },
        addTask:function(t){
            if(typeof currentCid === 'undefined'){
                currentCid = Collection.getDefaultCategory()['uid'];    //添加到默认分类
            }
            var category = Collection.getCategory(currentCid);
            category.addTask(t);
            currentTid = t.uid;
            this.filter('all');
            this.showTask();
            this.render();
            this.save();
        },
        deleteTask:function(){
            var category = Collection.getCategory(currentCid);
            category.removeTask(currentTid);
            this.clearTask();
            hide($('.oper'));
            this.filter('all');
            this.render();
            this.save();
        },
        clearTask:function(){
            $('.title h3').innerHTML = '';
            $('.date h3').innerHTML = '';
            $('.content p').innerHTML = '';
            hide($('.oper'));
        },
        updateTask:function(task){
            var category = Collection.getCategory(currentCid);
            category.updateTask(task);
            this.filter('all');
            this.showTask();
            this.save();
        },
        finishTask:function(){
            var category = Collection.getCategory(currentCid);
            category.finishTask(currentTid);
            this.filter('all');
        },
        render:function(){
            var all = Collection.all();
            var rank = Collection.rank();
            var html = '';
            for(var cid in rank.all){
                html += getCategoryHtml(cid,rank.all[cid],1);
            }
            $('#all').innerHTML = html;
            $('#total').innerHTML = '('+Collection.getTaskCount()+')';
            //隐藏编辑相关的控件
            hide($('.detail .bottom'),$('.title input'),$('.date input'),$('.date span'),$('.content textarea'),$('.oper'));
        },
        bindEvents:function(){
            $.on($('#addCategory'),'click',addCategoryListener);
            $.on($('#addTask'),'click',addTaskListener);
            $.on($('.cancel'),'click',cancelEditListener);
            $.on($('.submit'),'click',submitTaskListener);
            $.on($('.category'),'click',categoryCancelListener);
            $.delegate($('#alltask'),'li','click',taskListListener);
            $.delegate($('.oper'),'a','click',taskOperListener);
            $.delegate($('#all'),'a','click',deleteCagegoryListener);
            $.delegate($('#all'),'h3','click',categorySelectListener);
            $.delegate($('#all'),'span','click',categorySelectListener);
            $.delegate($('#filter'),'a','click',taskFilterListener);
        },
        getCurrentCid:function() {
            return currentCid;
        },
        getCurrentTid:function(){
            return currentTid;
        }
    }
})();

app.initData();
app.render();
app.bindEvents();
