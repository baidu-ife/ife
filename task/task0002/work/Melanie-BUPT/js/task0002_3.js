/**************************
   Melanie-BUPT  2015/5/5
***************************/

//这两个函数...其实是看了其他视频之后直接用的。
//表示现在还是看不太懂，自己更写不出来T^T
function startMove(obj,json,endFn) {
    clearInterval(obj.timer);
    obj.timer = setInterval(function() {
        var bBtn = true;
        for(var attr in json) {
            var iCur = 0;
            iCur = parseInt(getStyle(obj,attr)) || 0;
            var iSpeed = (json[attr] - iCur)/8;
            iSpeed = iSpeed >0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);
            if(iCur!=json[attr]) {
                bBtn = false;
            }
            obj.style[attr] = iCur + iSpeed + 'px';
        }
        if(bBtn) {
            clearInterval(obj.timer);
            if(endFn) {
                endFn.call(obj);
            }
        }
    },30);
}
    
function getStyle(obj,attr) {
    if(obj.currentStyle) {
        return obj.currentStyle[attr];
    }
    else {
        return getComputedStyle(obj,false)[attr];
    }
}

window.onload = function() {
    //轮播的默认配置
    var setup = {
        //轮播顺序为正序（positive）或逆序（negative）
        order: "positive",
        //轮播循环（true）或不循环(false)
        loop: true,
        //间隔时长，默认3秒循环
        interval: 3000
    };

    var container = document.getElementById("carousel-container");
    var content = container.getElementsByTagName("ul")[0];
    var lists = content.getElementsByTagName("li");
    var imgs = content.getElementsByTagName("img");
    
    var btns = document.getElementById("carousel-btn");
    var btn = btns.getElementsByTagName("a");

    var imgWidth = 720;
    var scroll = 0;
    var autoLoop = 0;

    content.style.width = imgs.length * imgWidth + "px";

    //判断并设置正序轮播或逆序轮播
    var direction;
    if (setup.order === "positive") {
        direction = "left";
        content.style.left = 0;
        for (var i = 0; i < lists.length; i++) {
            lists[i].style.float = "left";
        }
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].style.left = 0;
        }
    }
    else {
        content.style.right = 0;
        for (var i = 0; i < lists.length; i++) {
            lists[i].style.float = "right";
        }
        for (var i = 0; i < imgs.length; i++) {
            imgs[i].style.right = 0;
        }
    }
    //对轮播图下方的小点进行设置
    for (var i = 0; i < btn.length; i++) {
        btn[i].index = i;
        btn[i].onclick = function () {
            for (var n = 0; n < btn.length; n++) {
                btn[n].className = "";
            }
            this.className = "active";

            (direction ==  "left") ?
            startMove(content, {left: -this.index * imgWidth}):
            startMove(content, {right: -this.index * imgWidth});
        };
    }

    //设置轮播间隔时间
    var i = setInterval(run, setup.interval);

    function run() {
        //循环播放
        if (setup.loop) {
            if (scroll == btn.length-1) {
                lists[0].style.position = "relative";

                (direction ==  "left") ?
                lists[0].style.left = lists.length * imgWidth + "px":
                lists[0].style.right = lists.length * imgWidth + "px";
                scroll = 0;
            }
            else {
                scroll ++;
            }
            autoLoop ++;
            for (var n = 0; n < btn.length; n++) {
                btn[n].className = "";
            }
            btn[scroll].className = "active";

            (direction ==  "left") ?
            startMove(content, {left: - autoLoop * imgWidth}, function() {
                if (scroll == 0) {
                    lists[0].style.position = "static";
                    content.style.left = 0;
                    autoLoop = 0;
                }
            }):
            startMove(content, {right: - autoLoop * imgWidth}, function() {
                if (scroll == 0) {
                    lists[0].style.position = "static";
                    content.style.right = 0;
                    autoLoop = 0;
                }
            });
        }
        //不循环播放
        else {
            if(scroll != btn.length-1) {
                scroll++;
                for (var n = 0; n < btn.length; n++) {
                    btn[n].className = "";
                }
                btn[scroll].className = "active";

                (direction ==  "left") ?
                startMove(content, {left: - scroll * imgWidth}):
                startMove(content, {right: - scroll * imgWidth});
            }
            //轮播到最后一个时，清空计时器，停止循环轮播
            else {
                clearInterval(i);
            }
        }
    }
}


/************************************************
总结一下下：
    相对于目前自己的水平，轮播图的实现，略复杂。
    特别是图片切换的动画（最上面两个函数）。
    除去这一部分，其余的设置会轻松一些。
    （虽然实现的方法还是很笨）
    比如轮播的顺序，是否循环，间隔时长等。
    这个坑先留着，等做完剩下的再回来补。
*************************************************/