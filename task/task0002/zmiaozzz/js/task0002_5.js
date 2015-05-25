/**
 * @file task0002_5
 * @author zhangmiao
 */
//左边容器相对于浏览器的位置
var leftPosition = getPosition($('.left'));
//右边容器相对于浏览器的位置
var rightPosition = getPosition($('.right'));
//右边容器与左边容器的相对距离
var leftRightX = rightPosition.offleft - leftPosition.offleft;
//移动的元素
var target;
//移动元素的初始位置相对于浏览器的位置
var targetPosition;
//光标按下时的初始位置与target之间的相对距离
var disX;
var disY;
//移动的target位置（相对于target原位置的距离）
var targetMoveX;
var targetMoveY;
window.onload  = function() {
    document.oncontextmenu=new Function("event.returnValue=false;");
    document.onselectstart=new Function("event.returnValue=false;");
    $.on('#left-list', 'mousedown', fDown);
    $.on('#right-list', 'mousedown', fDown);
}
function fDown(event) {
    var e = event || window.event;
    target = e.target || e.srcElement;
    //target的初始位置相对于浏览器窗口的位置
    targetPosition = getPosition($('#' + target.id));
    //光标的初始位置与target之间的相对距离
    disX = e.clientX - targetPosition.offleft;
    disY = e.clientY - targetPosition.offtop;
    addClass($('#' + target.id), 'moving');
    addClass($('#' + target.id).parentNode.parentNode, 'zclass');
    document.onmousemove = fMove;
    document.onmouseup = fUp;
}
function fMove(event) {
    var e = event || window.event;
    //光标的位置
    var mouseX = e.clientX;
    var mouseY = e.clientY;
    //target未移动时相对于容器的距离
    var targetX = targetPosition.offleft - leftPosition.offleft;
    var targetY = targetPosition.offtop - leftPosition.offtop;
    //移动的target
    targetMoveX = mouseX - leftPosition.offleft - targetX - disX;
    targetMoveY = mouseY - leftPosition.offtop - targetY - disY;
    //窗口的大小
    var winWidth = document.body.clientWidth || document.documentElement.clientWidth;
    var minHeight = document.body.clientHeight || document.documentElement.clientHeight;
    if($('#' + target.id).parentNode === $('#left-list')) {
        if(targetMoveX <= -leftPosition.offleft) {
            targetMoveX = -leftPosition.offleft;
        }
        var leftMaxX = winWidth - leftPosition.offleft - $('#' + target.id).offsetWidth;
        if(targetMoveX >= leftMaxX) {
            targetMoveX = leftMaxX;
        }

    }
    if($('#' + target.id).parentNode === $('#right-list')) {
        if(targetMoveX <= -rightPosition.offleft) {
            targetMoveX = -rightPosition.offleft;
        }
        var rightMaxX = winWidth - rightPosition.offleft - $('#' + target.id).offsetWidth;
        if(targetMoveX >= rightMaxX) {
            targetMoveX = rightMaxX;
        }
    }

    if(targetMoveY <= -targetPosition.offtop) {
        targetMoveY = -targetPosition.offtop;
    }
    var maxY = minHeight - targetPosition.offtop - $('#' + target.id).offsetHeight;
    if(targetMoveY >= maxY) {
        targetMoveY = maxY;
    }
    $('#' + target.id).style.left = targetMoveX + 'px';
    $('#' + target.id).style.top = targetMoveY + 'px';
    //return false;
}

function fUp(event) {
    var e = event || window.event;
    document.onmousemove = null;
    document.onmouseup = null;
    var top = e.clientY - rightPosition.offtop;
    var index = parseInt(top / $('#' + target.id).offsetHeight);
    var com = 248 * .5;
    //console.log(leftRightX - targetMoveX);
    if ($('#' + target.id).parentNode === $('#left-list')) {
        if (Math.abs(leftRightX - targetMoveX) < com) {
            var childElements = $('#right-list').children;
            if(index >= childElements.length) {
                $('#right-list').appendChild($('#' + target.id));
            }
            else if(index < 0 ) {
                $('#right-list').insertBefore($('#' + target.id),childElements[0]);
            }
            else {
                $('#right-list').insertBefore($('#' + target.id),childElements[index]);
            }
        }
    }
    else {
        if (Math.abs(leftRightX + targetMoveX) < com) {
            var childElements = $('#left-list').children;
            if(index >= childElements.length) {
                $('#left-list').appendChild($('#' + target.id));
            }
            else if(index < 0 ) {
                $('#left-list').insertBefore($('#' + target.id),childElements[0]);
            }
            else {
                $('#left-list').insertBefore($('#' + target.id),childElements[index]);
            }
        }
    }
    removeClass($('.left'), 'zclass');
    removeClass($('.right'), 'zclass');
    $('#' + target.id).style.left = 0;
    $('#' + target.id).style.top = 0;
    targetMoveX = 0;
    removeClass($('#' + target.id), 'moving');
}


