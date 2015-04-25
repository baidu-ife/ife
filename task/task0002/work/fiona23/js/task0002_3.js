//返回所有的class。。还是不明白为什么util.js文件里不做queryall。。
function getByClass(selector){
    var classResult = []
    oClass = document.getElementsByTagName('*')
    for (var i=0; i<oClass.length; i++){
        var patt = new RegExp(selector)
        if (patt.test(oClass[i].className)) {
            classResult.push(oClass[i])
        }
    }
    return classResult;
}

var items = getByClass('item');
var timer = setInterval(autoPlay, 4000)
var index = 0;

function autoPlay () {
    changeImg(index);
    //items[index].className = 'items'
    index ++;
    if (index > items.length-1) {
        index = 0;
    }
}

function changeImg(index){
    items[index].className = 'item active';
    var indexNext = index + 1;
    var indexPre = index - 1
    if (indexNext > items.length -1){
        indexNext = 0;
    }
    if (indexPre<0) {
        indexPre = items.length-1
    }
    items[indexPre].className = 'item pre'
    items[indexNext].className = 'item next'
}

//给按钮添加代理
$.delegate = delegateEvent;
$.delegate('#btn', 'li' , 'click', function (event) {
    console.log(event.type)
    for (var i=0; i<items.length; i++){
        items[i].className = "items pre"
    }
    console.log(items[event.type])
    items[event.type].className = 'item active';
    items[event.type+1].className = 'item'
    
})
