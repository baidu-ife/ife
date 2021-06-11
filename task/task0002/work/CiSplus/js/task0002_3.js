/**
 * 代码是抄别人的，自己真是没写出来。。。
 * 原版只是实现了正序，逆序没有实现好，没有自定义方式
 * 我改了改，逆序也行了，自定义也好了。
 * 不过自定义方面，偶尔会出bug，这个坑没填平。。。
 * 
 */
window.onload = function() {
    $.on("#check", "click", carousel);
    carousel();
}
var t;
function carousel() {
    
    if (t) {
        clearInterval(t);
    }
    //正序是true，逆序是false
    var loopOrder = ($("#looporder").value == 1) ? true : false;
    //循环是true，不循环是false
    var loop = ($("#isloop").value == 1) ? true : false;
    //间隔时长默认3秒
    var inter = $("#interval").value;
    var interval;
    if (!inter || trim(inter).length == 0) {
        interval = 1100;
    } else {
        var pratn = /^\d{1,}$/;
        if (!pratn.exec(inter) || inter == 0) {
            alert("请输入正整数");
            interval = 3000;
        } else {
            interval = parseInt(inter)*1000;
        }
    }
    console.log("loopOrder:" + loopOrder);
    console.log("loop:" + loop);
    console.log("interval:" + interval);
    var imgInfo = $("ul");
    var items = imgInfo.getElementsByTagName("li");
    var imgs = imgInfo.getElementsByTagName("img");

    var nodes = $("#slide").getElementsByTagName("a");
    //获取的图片宽度是轮播图中的图片宽度，后面的计算中，轮播图中每个图片都是等大的。
    //直接取.style.width是带有单位px的，就是500px
    var imgWidth = $("img").style.width.substring(0, $("img").style.width.length - 2);
    // console.log(imgWidth);
    var scroll = 0;
    var autoLoop = 0;
    imgInfo.style.width = (imgs.length * imgWidth + "px");
    //初始化各个元素属性，全都设置成默认值
    imgInfo.style.left = "auto";
    imgInfo.style.right = "auto";
    for (var key = 0; key < items.length; key ++) {
        if (items[key].style.cssFloat) {
            items[key].style.cssFloat = "none";
        } else if (items[key].style.styleFloat) {
            items[key].style.styleFloat = "none";
        } else {
            items[key].style.float = "none";
        }
        items[key].style.position = "static";
        items[key].style.left = "auto";
        items[key].style.right = "auto";
    }
    for (var key = 0; key < imgs.length; key ++) {
        imgs[key].style.left = "auto";
        imgs[key].style.right = "auto";
    }
    nodes[0].className = "active";
    for (var key = 1; key < nodes.length; key ++) {
        nodes[key].className = "";
    }
    //这个direction做浮动布局用
    //如果正序轮播，应该向左浮动，left
    //如果逆序轮播，应该向右浮动，right
    var direction;
    if (loopOrder) {
        direction = "left";
        imgInfo.style.left = 0;
        for (var i = 0; i < items.length; i ++) {
            if (items[i].style.float) {
                items[i].style.float = "left";
            } else if (items[i].style.styleFloat) {
                items[i].style.styleFloat = "left";
            } else {
                items[i].style.cssFloat = "left";
            }
        }
        for (var i = 0; i < imgs.length; i ++) {
            imgs[i].style.left = 0;
        }
    } else {    //逆序
        imgInfo.style.right = 0;
        for (var i = 0; i < items.length; i ++) {
            if (items[i].style.float) {
                items[i].style.float = "right";
            } else if (items[i].style.styleFloat) {
                items[i].style.styleFloat = "right";
            } else {
                items[i].style.cssFloat = "right";
            }
        }
        for (var i = 0; i < imgs.length; i ++) {
            imgs[i].style.right = 0;
        }
    }
    //白点点击
    for (var i = 0; i < nodes.length; i ++) {
        nodes[i].index = i;
        nodes[i].onclick = function() {
            for (var i = 0; i < nodes.length; i ++) {
                nodes[i].className = "";
            }
            this.className = "active";
            (direction == "left") ? startMove(imgInfo, {left: -this.index * imgWidth}) : startMove(imgInfo, {right: -this.index * imgWidth});
        };
    }
    t = setInterval(run, interval);
    function run() {
        if (loop) {
            if (loopOrder) {
                if (scroll == nodes.length - 1) {
                    items[0].style.position = "relative";
                    items[0].style.left = ( items.length * imgWidth + "px"); 
                    scroll = 0;
                } else {
                    scroll ++;
                }
                console.log(scroll);
                autoLoop ++;
                console.log(autoLoop);
            } else {
                if (scroll == 0) {
                    items[nodes.length-1].style.position = "relative";
                    items[0].style.right = (items.length * imgWidth + "px"); 
                    scroll = nodes.length - 1;
                } else {
                    scroll --;
                }
                console.log(scroll);
                autoLoop --;
                console.log(autoLoop);
            }
            for (var i = 0; i < nodes.length; i ++) {
                nodes[i].className = "";
            }
            nodes[scroll].className = "active";

            (direction == "left") ? startMove(imgInfo, {left: -autoLoop * imgWidth}, function() {
                if (scroll == 0) {
                    autoLoop = 0;
                    items[0].style.position = "static";
                    imgInfo.style.left = 0;
                }
            }) : startMove(imgInfo, {right: -scroll * imgWidth}, function() {
                if (scroll == 0) {
                    items[0].style.position = "static";
                    imgInfo.style.right = 0;
                    autoLoop = 0;
                }
            });
        } else {
            if (loopOrder) {
                if (scroll != nodes.length - 1) {
                    scroll ++;
                    for (var i = 0; i < nodes.length; i ++) {
                        nodes[i].className = "";
                    }
                    nodes[scroll].className = "active";
                    (direction == "left") ? startMove(imgInfo, {left: -scroll * imgWidth}) : startMove(imgInfo, {right: -scroll * imgWidth});
                } else {
                    clearInterval(t);
                }
            } else {
                if (scroll == 0) {
                    items[nodes.length-1].style.position = "relative";
                    items[0].style.right = (items.length * imgWidth + "px"); 
                    scroll = nodes.length - 1;
                } else {
                    scroll --;
                }
                for (var i = 0; i < nodes.length; i ++) {
                    nodes[i].className = "";
                }
                nodes[scroll].className = "active";
                startMove(imgInfo, {right: -scroll * imgWidth}, function() {
                    if (scroll == 0) {
                        items[0].style.position = "static";
                        imgInfo.style.right = 0;
                        autoLoop = 0;
                    }
                });
                //放在最后是为了能循环一圈。。。
                //免得一开始就停了。。。
                //是因为，逆序第一个就是第一张图片，并且逆序一圈的末尾也设定为了第一张。
                if (scroll == 0) {
                    clearInterval(t);
                }
            }
        }
    }
}
function startMove(obj, json, endFn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bBtn = true;
        for (var attr in json) {
            var iCur = 0;
            iCur = parseInt(getStyle(obj, attr)) || 0;
            // alert(iCur);
            // console.log(iCur);
            //下面的那个除数7很重要，抄的程序里原本是8，但是当设置时间差较小，比如1.1秒，甚至更小的时候，会出现bug
            //bug是承载img的ul的left值一直增加，不会回到初值0了，造成：轮播到第二个循环后，没有图片显示在ul里面了，都出去了，出去远了。
            //这个除数更大，图片过度更加细腻，反之，除数更小，图片过度更加突兀
            //这个除数或大或小都会出bug。。。
            var iSpeed = (json[attr] - iCur) / 7;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            // console.log(iSpeed);
            // console.log(json[attr]);
            if (iCur != json[attr]) {
                // console.log(json[attr]);
                bBtn = false;
            }
            obj.style[attr] = iCur + iSpeed + 'px';
        }
        if (bBtn) {
            clearInterval(obj.timer);
            // alert("enter");
            if (endFn) {
                endFn.call(obj);
            }
        }
    }, 30);
}
function getStyle(obj, attr) {
    if (obj.currentStyle) {
        return obj.currentStyle[attr];
    } else {
        return getComputedStyle(obj, false)[attr];
    }
}