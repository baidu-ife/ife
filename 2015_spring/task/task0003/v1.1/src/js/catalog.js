/*
* 左侧目录
*/ 
define(["min$", "util", "localStorage"], function($, _, store) {
    function Catalog() {
        this.dialog = $('#dialog');
        this.mask = $('#mask');
        this.confirm = $('#confirm');
        this.type = null;

        this.init();
    }

    Catalog.prototype = {
        constructor: Catalog,
        init: function() {
           
            this.addCatalog1();

            //选中目录
            this.activeCatalog();

            //隐藏弹窗
            this.cancelDialog();

            //点击分类 旁边的小三角形，显示菜单
            this.arrow();

            //增加子分类
            this.addCatalog2();

            //弹窗确定按钮
            this.confirmBtn();
        },

        // 增加一级分类
        addCatalog1: function() {
            var that = this,
                $btn = $('.add-catalog1');
            
            //增加一级分类按钮，弹窗显示
            _.event.addEvent($btn, 'click', function() {
                that.showDialog();
                that.type = 'addCatalog1';
            });
        },

        //弹窗确定按钮
        confirmBtn: function() {
            var that = this;
            //确定按钮，增加分类，隐藏弹窗
            _.event.addEvent(that.confirm, 'click', function() {
                switch (that.type) {
                    case 'addCatalog1':
                        addCatalog1();
                        break;
                    case 'addCatalog2':
                        addCatalog2();
                        break;
                }
            });

            function addCatalog1() {
                var title = $('#input-text').value,
                    oLi = document.createElement('li'),
                    nowTime = (new Date()).getTime();
                oLi.className = 'catalog1';
                oLi.setAttribute('data-id',nowTime);
                var str = '<div class=\"list-item\">'
                        + '<i class=\"iconfont\">&#xe603;</i>'
                        + '<span class=\"title\">'+title+'</span>'
                        + '<span class=\"unDoneNum\">(0)</span>'
                        + '<i class=\"arrow\"></i>'
                        + '</div>';
                oLi.innerHTML = str;
                $('#catalog').appendChild(oLi);

                var selfData = {
                    id: nowTime,          //时间戳，作为键值
                    title: title,         //分类名
                    chiId: [],
                    parId: 'root',
                    unDoneNum: 0,       //未完成任务个数
                    taskId: []
                };

                store.save(selfData);
                store.updateParent('root', 'chiId', selfData.id);
                that.hideDialog();
            }

            function addCatalog2() {
                var title = $('#input-text').value,
                    nowTime = (new Date()).getTime();
                var oUl = window.selected.getElementsByTagName('ul')[0];
                if (!oUl) {
                    oUl = document.createElement('ul');
                    oUl.className = 'show';

                    var str = '<li class=\"catalog2\" data-id=\"'+nowTime+'\">'
                            + '<div class=\"list-item\">'
                            + '<i class=\"iconfont\">&#xe605;</i>'
                            + '<span class=\"title\">'+title+'</span>'
                            + '<span class=\"unDoneNum\">(0)</span>'
                            + '<i class=\"arrow\"></i></div></li>';
                    oUl.innerHTML = str;
                    window.selected.appendChild(oUl);
                } else {
                    var oLi = document.createElement('li');
                    oLi.className = 'catalog2';
                    oLi.setAttribute('data-id',nowTime);
                    var str = '<div class=\"list-item\">'
                            + '<i class=\"iconfont\">&#xe605;</i>'
                            + '<span class=\"title\">'+title+'</span>'
                            + '<span class=\"unDoneNum\">(0)</span>'
                            + '<i class=\"arrow\"></i>'
                            + '</div>';
                    oLi.innerHTML = str;        
                    var oUl = window.selected.getElementsByTagName('ul')[0];
                    oUl.appendChild(oLi);
                }
                var parId = window.selected.getAttribute('data-id');

                var selfData = {
                    id: nowTime,          //时间戳，作为键值
                    title: title,         //分类名
                    chiId: [],
                    parId: parId,
                    unDoneNum: 0,       //未完成任务个数
                    taskId: []
                };

                store.save(selfData);
                store.updateParent(parId, 'chiId', selfData.id);
                that.hideDialog();
            }
        },


        // 增加子分类
        addCatalog2: function() {
            var that = this;
            _.event.addEvent($('.add-catalog2'), 'click', function() {
                that.showDialog();
                that.type = 'addCatalog2';
                _.hide($('.context-menu'));
            });
            
        },

        showDialog: function() {
            _.show(this.mask);
            _.show(this.dialog);
        },

        hideDialog: function() {
            _.hide(this.mask);
            _.hide(this.dialog);
        },

        cancelDialog: function() {
            var that = this;
            _.event.addEvent($('#cancel'), 'click', function() {
                that.hideDialog();
            });
        },

        //点击选中目录
        activeCatalog: function() {
            //初始化选中默认分类
            var defaultActive = $('[data-id=defaultId]');
            _.addClass(defaultActive, 'active');
            window.selected = defaultActive;
            var that = this;
            _.event.addEvent($('#catalog'), 'click', function(ev) {
                var ev = ev || window.event,
                    target = ev.target || ev.srcElement;
                while (!(_.hasClass(target, 'catalog1') || _.hasClass(target, 'catalog2'))) {
                    target = target.parentNode;
                }
                _.removeClass(window.selected, 'active');
                window.selected = target;
                _.addClass(window.selected, 'active');

                //选中当前菜单，相应视图显示
                that.render();
            });
        },

        //选中当前菜单，相应视图显示
        render: function() {
            this.showTaskList();
            var name = window.selected.getAttribute('data-id');
            var json = store.get(name);
            var oUl = window.selected.getElementsByTagName('ul')[0] || null;
            
            if (oUl) {
                if (_.hasClass(oUl, 'show')) {
                    //一次性隐藏所有子级，而子级展开是一级级用户点击展开
                    var aUl = oUl.getElementsByTagName('ul') || null;
                    if (aUl && aUl.length) {
                        for (var i = 0; i<aUl.length; i++) {
                            _.hide(aUl[i]);
                        }
                    }
                    _.hide(oUl);
                } else {
                    _.show(oUl);
                }
                return;
            }

            if (json.chiId.length) {
                var str1 = '';
                for (var i = 0, len = json.chiId.length; i<len; i++) {
                    var childData = store.get(json.chiId[i]);
                    var str2 = '<li class=\"catalog2\" data-id=\"'+childData.id+'\">'
                            + '<div class=\"list-item\">'
                            + '<i class=\"iconfont\">&#xe605;</i>'
                            + '<span class=\"title\">'+childData.title+'</span>'
                            + '<span class=\"unDoneNum\">('+childData.unDoneNum+')</span>'
                            + '<i class=\"arrow\"></i></div></li>';
                    str1 += str2;
                }
                var oUl = document.createElement('ul');
                oUl.className = 'show';
                oUl.innerHTML = str1;
                window.selected.appendChild(oUl);
            }

            if (_.isMobile()) {
                window.location.href = '#task';
            }
        },


        //点击分类 旁边的小三角形，显示菜单
        arrow: function() {
            var $menu = $('.context-menu');
            _.event.addEvent($('#catalog'), 'click', function(ev) {
                var ev = ev || window.event,
                    target = ev.target || ev.srcElement;
                
                if (target.nodeName.toLowerCase() == "i" && _.hasClass(target, 'arrow')) {
                    _.show($menu);         
                    $menu.style.left = ev.pageX + 20 + 'px';
                    $menu.style.top = ev.pageY + 20 + 'px';
                }

            });
        },

        //点击左侧目录，中栏任务列表显示。
        ////////////////////////////////
        //未优化，代码乱。。。。此处要优化
        showTaskList: function() {
            function getHtml(data,type) {
                var str = '';
                var obj = {};
                var arr = [];
                //遍历当前子分类下面的任务
                (function (data,type) {
                    for (var i = 0; i<data.taskId.length; i++) {                
                        var taskData = store.get(data.taskId[i]);
                        if (type == 1 && taskData.done) {
                            continue;
                        } else if (type == 2 && !taskData.done) {
                            continue;
                        }
                        if (taskData.done) { //如果任务完成，那么给一个完成class
                            var html = '<dd class=\"done\" data-id='+taskData.id+'>'+taskData.title+'</dd>';
                        } else {
                            var html = '<dd data-id='+taskData.id+'>'+taskData.title+'</dd>'
                        }
                        if (!obj[taskData.date]) {
                            obj[taskData.date] = html; 
                            arr.push(taskData.date);
                        } else {
                            obj[taskData.date] += html; 
                        }
                    }
                    //获取子分类的任务
                    for (var i = 0; i<data.chiId.length; i++) {
                        var dataChild = store.get(data.chiId[i]);
                        arguments.callee(dataChild,type);
                    }
                })(data,type);
                arr.sort(function(a,b){ // 对日期排序
                    a = new Date(a.split('-').toString()).getTime();
                    b = new Date(b.split('-').toString()).getTime();
                    return a>b?-1:1;
                });
                for (var i = 0; i<arr.length; i++) {
                    str += '<dl><dt>'+arr[i]+'</dt>'+obj[arr[i]]+'</dl>';
                } 
                return str;
            }

            var data = store.get(window.selected.getAttribute('data-id'));
            $('#allTaskList').innerHTML = getHtml(data);
            $('#unDoneTaskList').innerHTML = getHtml(data,1);
            $('#doneTaskList').innerHTML = getHtml(data,2);
        }
    }

    return Catalog;
    // var c = new Catalog();
    // c.init();
});