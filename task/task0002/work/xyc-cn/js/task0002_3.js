/**
 * Created by xieyicheng on 2015/4/19.
 */
(function () {
   var xycGallery = {};
    //默认参数
    xycGallery.diretion = "sequence"; //可配置sequence reverse 顺序
    xycGallery.during = "5000";//持续时间
    xycGallery.loop = true;///是否循环
    xycGallery.width = 980;//图片宽度
    xycGallery.size = 4;//图片数量
    xycGallery.index=0;//下标
    xycGallery.ul = document.getElementById('xycGallery');
    var liList = $('#gallery_nav li');
    var interval,//轮播定时
        cancleJsSlide = false;//js动画定时
    var newBowser = false;//判断是不是支持transition
    if(document.documentElement.style.transition == ""){
        newBowser = true;
    }

    //点击小圆点
    $.delegate('#gallery_nav','li','click', function (e) {
        var li = getTarget(e);
        var index = li.getAttribute('data-index');
        e = e?e:window.event;
        each(liList, function (value) {
            removeClass(value,'gallery_nav_active');
        });
        addClass(li,'gallery_nav_active');
        clearInterval(interval);//取消轮播定时
        if(newBowser){
            xycGallery.index = index-1;
            xycGallery.goto(index-1);
        }
        else{
            cancleJsSlide = true; //老式浏览器，取消正在进行的js动画
            xycGallery.jsSlide(index-1,xycGallery.index,true);
            xycGallery.index = index-1;
        }
        xycGallery.start();
    },false);

    //配置信息
    xycGallery.init = function (option) {
        if(option.diretion){
            xycGallery.diretion = option.diretion;
        }
        if(option.during){
            xycGallery.during = option.during;
        }
        if(option.loop){
            xycGallery.loop = option.loop;
        }

    };

    xycGallery.start = function () {
        if(xycGallery.diretion == "reverse"){
            addClass(xycGallery.ul,"direction_right");
        }
        else{
            addClass(xycGallery.ul,"direction_left");
        }
        interval = setInterval(function () {
            if(newBowser){
                xycGallery.goto(xycGallery.index++);
            }
            else{
                var oldIndex;
                if(xycGallery.index>0){
                    oldIndex = xycGallery.index-1;
                }
                else{
                    oldIndex = xycGallery.size-1;
                }
                xycGallery.jsSlide(xycGallery.index++,oldIndex);
            }
            if(xycGallery.index==xycGallery.size){
                if(!xycGallery.loop){
                    clearInterval(interval);
                }
                else{
                    xycGallery.index = 0;
                }
            }
        },this.during);
    };

    xycGallery.goto = function (index) {
        var position = -(index*this.width);
        if(xycGallery.diretion == "reverse"){
            this.ul.style.right = position + 'px';
        }
        else{
            this.ul.style.left = position + 'px';
        }

        //去掉小圆点的激活
        each(liList, function (value) {
            removeClass(value,'gallery_nav_active');
        });
        index++;
        if(index>xycGallery.size){
            index = xycGallery.size;
        }
        var navLi = $("[data-index="+index+"]");
        addClass(navLi,'gallery_nav_active');

    };

    xycGallery.jsSlide = function (index,oldIndex,click) {

        if(index == xycGallery.size){
            index = 0;
        }

        //根据新老的index，算出速率
        var speed = Math.abs(oldIndex-index);
        if(speed == 0){
            speed = 1;
        }

        var position =  -(index*this.width);

        var Jsinterval = setInterval(function () {
            var currentLeft = xycGallery.ul.style.left;
            currentLeft = currentLeft?currentLeft.substring(0,currentLeft.length-2):0;
            currentLeft = parseInt(currentLeft);

            if(currentLeft>position){
                currentLeft = currentLeft -10*speed;
                xycGallery.ul.style.left = currentLeft + 'px';
            }
            if(currentLeft<position){
                currentLeft = currentLeft +10*speed;
                xycGallery.ul.style.left = currentLeft + 'px';
            }

            if(currentLeft == position){
                clearInterval(Jsinterval);
            }
            if(cancleJsSlide&&!click){
                clearInterval(Jsinterval);
                cancleJsSlide = false;
            }

        },10);
        each(liList, function (value) {
            removeClass(value,'gallery_nav_active');
        });
        var nav_index = index+1;
        var navLi = $("[data-index="+nav_index+"]");
        addClass(navLi,'gallery_nav_active');
    };

    window.xycGallery = xycGallery;
})();
xycGallery.start();