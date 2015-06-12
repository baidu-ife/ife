/*
*   页面加载时初始化数据
*   并对页面渲染
*   
*/
 (function(){
     var oBox = $('#mainBox');
     var json = g.Data.getItem('mainBox');
     if (json) {  
        $('.all-task').getElementsByTagName('span')[1].innerHTML = json.unFinishNum;
         var str = '';
         for (var i = 0; i<json.child.length; i++) {
             var childData =g.Data.getItem(json.child[i]);
             var arr = [];
             arr.push('<li class='+childData.liClassName+'>');
             arr.push('<div class="'+childData.divClassName+'" data-name='+childData.name+'>');
             arr.push(childData.iconFontHtml);
             arr.push('<strong>'+childData.title+'</strong>');
             arr.push('(<span class=unFinishNum>'+childData.unFinishNum+'</span>)</div></li>');
             arr = arr.join('')
             str += arr;
         }
         oBox.innerHTML = str;

     } else {
        var mainBox = {
             name: 'mainBox',
             child: ['defaultMenu'],
             unFinishNum: 0
        };
        var defaultMenu = {
             name: 'defaultMenu',
             title: '默认分类',
             child: [],
             parent: 'mainBox',
             liClassName: 'menus',
             divClassName: 'menus-title active',
             iconFontHtml: '<span class=iconfont>&#xe622;</span>',
             unFinishNum: 0,
             task: []
        }; 
        g.Data.saveStroage(mainBox);
        g.Data.saveStroage(defaultMenu);
     }
     var oDefaultMenuLi = getQueryAttr('[data-name=defaultMenu]','div', document)[0]
     oDefaultMenuLi.id = 'default-menu';
     g.currentActiveMenu = oDefaultMenuLi;
 })();