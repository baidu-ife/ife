/*
*   页面加载时初始化数据
*   并对页面视图渲染
*   
*/

define(["min$", "localStorage", "util"], function($, store, _) {
    var Catalog = $('#catalog');
    var json = store.get('root');
    if (!json) {  
        var root = {
                id: 'root',
                chiId: ['defaultId'],
                unDoneNum: 1
            },
            defaultCatalog = {
                id: 'defaultId',
                title: '默认分类',
                chiId: [],
                parId: 'root',            
                unDoneNum: 1,
                taskId: [1111111]
            },
            task = {
                id: 1111111,
                title: '测试数据',
                date: '2015-6-10',
                taskContent: '测试数据',
                parId: 'defaultCatalog',
                done: false
            };
        store.save(root);
        store.save(defaultCatalog); 
        store.save(task);
    } 
    json = store.get('root');
    $('.catalog-all span').innerHTML = "("+json.unDoneNum+")";
    var str = '';
    for (var i = 0, len = json.chiId.length; i < len; i++) {
        var chiIdData =store.get(json.chiId[i]);
        str += '<li class=\"catalog1\" data-id='+chiIdData.id+'>'
            + '<div class=\"list-item\">'
            + '<i class=\"iconfont\">&#xe603;</i>'
            + '<span class=\"title\">'+chiIdData.title+'</span>'
            + '<span class=\"unDoneNum\">('+chiIdData.unDoneNum+')</span>'
            + '<i class=\"arrow\"></i>'
            + '</div></li>';
     }
    Catalog.innerHTML = str;
});