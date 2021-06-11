$.delegate('#container-left', 'p', 'mousedown', clickDrag);
$.delegate('#container-left', 'p', 'mouseup', relPlace);
$.delegate('#container-right', 'p', 'mousedown', clickDrag);
$.delegate('#container-right', 'p', 'mouseup', relPlace);


function clickDrag (element, e) {
    var mouseDisX, mouseDisY,posx,posy;
        //鼠标距离移动元素边界的距离
        if (e.pageX || e.pageY) {
            mouseDisY = e.pageY - element.offsetTop,
            mouseDisX = e.pageX - element.offsetLeft;
        } else {
            mouseDisX = e.offsetX;
            mouseDisY = e.offsetY;
        }

    $('body').onmousemove = function (e) {
        e = e || window.event;
        if (e.pageX || e.pageY) {
            posy = e.pageY
            posx = e.pageX
        } else {
            //IE没有pagex y 兼容
            posx = e.clientX + document.body.scrollLeft + document.documentElement.scrollLeft;
            posy = e.clientY + document.body.scrollTop + document.documentElement.scrollTop;
        }
        element.style['position'] = 'absolute';
        element.style['top'] = posy - mouseDisY + 'px';
        element.style['left'] = posx - mouseDisX +'px' ;
        element.style['z-index'] = '10000';
        element.style['opacity'] = 0.5;
        element.style['cursor'] = 'crosshair'
    }

}

function relPlace (element, e) {
    var placeContainer = element.parentNode == $('#container-left') ? $('#container-right') : $('#container-left')
    //条件可能得分别写
    if (placeContainer.offsetLeft - element.offsetLeft < 200) {
        //将元素变为目的容器的子元素
        placeContainer.appendChild(element);
    }
    element.style['position'] = 'relative';
    element.style['top'] = 0;
    element.style['left'] = 0;
    element.style['z-index'] = 1;
    element.style['opacity'] = 1;
    element.style['cursor'] = 'auto'
    $('body').onmousemove = null; //移除事件绑定
}
