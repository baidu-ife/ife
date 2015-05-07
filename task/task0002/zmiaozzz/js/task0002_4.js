/**
 * @file task0002_4
 * @author zhangmiao
 */
//提示信息
var hintArray = ['qtext1','qtext2','qtext1223','add1','add','ad355','baaa','bnnn'];
//提示的个数
var len;
//输入字符串
var inputString;
var num = 0;
window.onload = function() {
    //当输入框里的内容改变时，提示框的内容改变
    $.on('#input','input',displayHint);
    //输入框获得焦点时，出现提示框
    $.on('#input','focus',displayHint);
    //输入框失去焦点时，提示框消失
    $.on('html','click',displayHidden);
    $.on('#input','keydown',enterChangeValue);
    $.on('#hint-list','mouseover',changeClass);
    //键盘按下松开事件
    $.on('#input','keyup',change);
}
function displayHint() {
    inputString = $('#input').value;
    var hint = [];
    for(var i = 0, l = hintArray.length; i < l; i++) {
        if(hintArray[i].substring(0, inputString.length) === inputString) {
            hint.push(hintArray[i]);
        }
    }
    var sb = '';
    len = hint.length;
    if(inputString === '' || len ===0) {
        $('.hint-display').style.display = 'none';
        return;
    }
    for(var i = 0; i < len; i++) {
        sb += '<li id="';
        sb += i;
        sb += '" onclick="clickChangeValue(this);" >';
        sb += '<span id="hint-red">';
        sb += inputString
        sb += '</span>'
        sb += hint[i].replace(inputString,'');
        sb += '</li>';
    }
    $('#hint-list').innerHTML = sb;
    $('.hint-display').style.display = 'block';
    num = 0;
}

function displayHidden(event) {
    var e = event || window.event;
    if(e.target === $('#input'))
        return;
    $('.hint-display').style.display = 'none';
}

function changeClass(event) {
    var e = event || window.event;
    var tar = event.target || event.srcElement;
    //首先清除li的类可能为active的情况
    removeClass($('#' + num), 'active');
    addClass($('#' + tar.id), 'active');
    num = tar.id;
}

function clickChangeValue(element) {
    $('#input').value = element.innerHTML;
}

function enterChangeValue(event,element) {
    var e = event || window.event;
    if(e.keyCode == 13) {
        $('#input').value = $('.active').innerHTML;
        $('.hint-display').style.display = 'none';
    }
}

function change(event) {
    //首先清除li的类可能为active的情况
    for(var i = 0; i < len; i++) {
        removeClass($('#' + i),'active');
    }
    //按向上键
    if(event.keyCode === 38) {
        if(num === 0) {
            $('#input').value = inputString;
            num = len;
        }
        else {
            num--;
            addClass( $('#' + num), 'active');
            //$('#input').value = $('#' + num).innerHTML;

        }
    }
    //按向下键
    if(event.keyCode === 40) {
        if(num < len){
            addClass( $('#' + num), 'active');
            //$('#input').value = $('#' + num).innerHTML;
            num++;
        }
        else {
            $('#input').value = inputString;
            num = 0;
        }
    }
}


