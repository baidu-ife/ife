
(function () {
    var slide = {};
    slide.duration      = 3000;     //持续时间
    slide.width         = 1000;     //图片宽度
    slide.size          = 4;        //图片数量
    slide.index         = 0;        //下标
    slide.ul = $('#slide');         //保存轮播图的ul
    slide.navList = $("#slide_nav").getElementsByTagName("li");
    slide.interval,//轮播定时
    slide.intervalTrans; //对于不支持transition的浏览器, 需要手动实现图片移动， 所用的定时器
    slide.supTrans = false;//判断是不是支持transition
    if(document.documentElement.style.transition == ""){
        slide.supTrans = true;
    }

    //点击小圆点
    $.delegate('#slide_nav','li','click', function (e) {
        var li = this;
        var index = li.getAttribute('data-index');
        
        clearInterval(slide.interval);//取消轮播定时
        if(slide.supTrans){
            slide.index = parseInt(index);
        }
        else{
            // 停止当前图片移动
            clearInterval(slide.intervalTrans);
            slide.jsSlide(index,slide.index,true);
            slide.index = parseInt(index);
        }
        slide.start();
    });

    slide.start = function () {
        // 先移动到选中的图片
        if(slide.supTrans) slide.goto(slide.index);
        // 开始轮播
        slide.interval = setInterval(function () {
            if(slide.supTrans){
                slide.index = (slide.index + 1) % slide.size;
                slide.goto(self.index);
            }
            else{
                slide.jsSlide((slide.index + 1) % slide.size, slide.index);
                slide.index = (slide.index + 1) % slide.size;
            }
        },slide.duration);
    };

    // 移动到某一个图片(支持transition)
    slide.goto = function (index) {
        each(slide.navList, function (value) {
            removeClass(value,'slide_nav_active');
        });
        var li = $("[data-index=" + slide.index + "]");
        addClass(li,'slide_nav_active');
        var position = -(slide.index * slide.width);
        slide.ul.style.left = position + 'px';
    };

    // 对于不支持transition的浏览器， 需要手动模拟图片移动， index是新的图片的index, oldIndex是原来图片的index
    slide.jsSlide = function (index,oldIndex,click) {
        // 根据移动的距离， 算出速率
        var speed = Math.abs(oldIndex-index);
        if(speed == 0){
            speed = 1;    
        }
        var position =  -(index * slide.width);

        slide.intervalTrans = setInterval(function () {
            var currentLeft = slide.ul.style.left;
            currentLeft = currentLeft?currentLeft.substring(0,currentLeft.length-2):0;
            currentLeft = parseInt(currentLeft);

            if(currentLeft > position){
                currentLeft = currentLeft -20*speed;
                slide.ul.style.left = currentLeft + 'px';
            }
            if(currentLeft < position){
                currentLeft = currentLeft +20*speed;
                slide.ul.style.left = currentLeft + 'px';
            }

            if(currentLeft == position){
                clearInterval(slide.intervalTrans);
            }
        },10);

        each(slide.navList, function (value) {
            removeClass(value,'slide_nav_active');
        });
        var navLi = $("[data-index=" + index +"]");
        addClass(navLi,'slide_nav_active');
    };
    slide.start();
})();