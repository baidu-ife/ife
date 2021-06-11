//返回所有的class。。还是不明白为什么util.js文件里不做queryall。。
/*function getByClass(selector){
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
var index = 0;
var items = getByClass('item');
var timer = setInterval(autoPlay, 5000)


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
    index = event.type
    clearInterval(timer)
    items[index].style['left'] = '100%'
    timer = setInterval(autoPlay, 5000)
    //changeImg(event.value)
})

*/


//将图片全部float来做的 没办法循环
(function  () {
    var timer2 = setInterval(autoPlay2, 3000)
    var left,indexFloat = 0;
    function autoPlay2 () {
        if (indexFloat == 4) {
            $('#gallery-float').style.left = 0;
            indexFloat=0;
        } else {
            $('#gallery-float').style.left = -indexFloat*100+'%';
            indexFloat++
        }
    }

    $.delegate('#btn-float', 'li' , 'click', function (event) {
        indexFloat = event.type;
        $('#gallery-float').style.left = -indexFloat*100+'%';
        addClass(event,'li-active')
    })
})();