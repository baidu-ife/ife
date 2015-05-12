/**
 * @file task0002_3.js
 * @author AlisonZhang(zhangxuejing_62@126.com)
 * learnfrom zchen9(zxcvbnm.pop@qq.com)
 */

window.onload = function() {
    var item = $(".item");

    /**
     * @param {Object} options 参数：
     *                 order 为轮播顺序，next为正序，prev为倒序，默认next，
     *                 isLoop 是否循环，默认是，
     *                 time 循环时间，默认5000，
     *                 index 开始序号，默认0。
     */
    var options = {
        order: "next",
        isLoop: true,
        time: 5000,
        index: 0
    };

    //获得当前循环图片个数，动态添加小圆点导航
    for (var i = 0; i < item.length; i++ ) {
        var list = $(".c-list")[0];
        var listControl = document.createElement("li");
        listControl.setAttribute( "data-target", "#myCarousel" );
        listControl.setAttribute( "data-slide-to", i );
        list.appendChild( listControl );
    }
    //给小圆点导航添加点击事件
    var archor = $("li");
    for(var j = 0; j < archor.length; j++) {
        addEvent(archor[j], "click", toPic);
    }

    //初始化图片转换
    picActive(options);

    //定义图片轮播规则

    var scroll = picScroll(options);
    function picScroll(options) {
        var order = options.order || "next";
        var isLoop = options.isLoop || true;
        var time = options.time || 6000;
        var curIndex = options.index;

        if (isLoop) {
            //当顺序为正序时
            if (order === "next") {
                return setInterval(function() {
                        picActive(options);
                        options.index++;
                        if (options.index > item.length-1) {
                            options.index = 0;
                        }
                    },
                    time
                );
            }
            //当顺序为倒序时
            else {
                return setInterval( function() {
                        picActive(options);
                        options.index--;
                        if(options.index < 0) {
                            options.index = item.length-1;
                        }
                    },
                    time
                );
            }
        }
        //循环为否时，停止循环
        else {
            clearInterval(scroll);
        }
    }

    // 定义轮播图样式

    function picActive(options) {
        var order = options.order || "next";
        var curIndex = options.index;
        var item = $(".item");
        //获取当前图片序号
        for(var i = 0; i < item.length; i++) {
            if (order == "next") {
                //当前序号之前的图片样式为prev
                if (i < curIndex) {
                    item[i].setAttribute( "class", "item prev" );
                    removeClass($("[data-slide-to=" + i + "]"), "active" );
                }
                //当前序号的图片样式为active
                if (i === curIndex) {
                    item[i].setAttribute("class", "item active");
                    addClass($("[data-slide-to=" + curIndex + "]"), "active");
                }
                //当前序号之后的图片样式为next
                if (i > curIndex) {
                    item[i].setAttribute("class", "item next");
                    removeClass($("[data-slide-to=" + i + "]" ), "active");
                }
            }
        }
    }

    //定义轮播图显示next图片事件

    function nextPicShow(options) {

        var item = $(".item");
        for(var i=0; i<item.length; i++) {
            if (item[i].getAttribute("class").indexOf("active") != -1) {
                var curIndex = i;
            }
        }
        if (curIndex === item.length-1) {
            curIndex = 0;
            options.index = curIndex;
            picActive(options);
        }
        else {
            options.index = curIndex+1;
            picActive(options);
        }
    }

    // 定义轮播图显示prev图片事件

    function prevPicShow(options) {

        var item = $(".item");

        for (var i = 0; i < item.length; i++) {
            if (item[i].getAttribute("class").indexOf("active") != -1) {
                var curIndex = i;
            }
        }
        if (curIndex === 0) {
            curIndex = item.length-1;
            options.index = curIndex;
            picActive(options);
        }
        else {
            options.index = curIndex-1;
            picActive(options);
        }
    }

    //定义小圆点导航事件

    function toPic(options) {
        options.index = parseInt( this.getAttribute("data-slide-to") );
        picActive(options);
    }
};