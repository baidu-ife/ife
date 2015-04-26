window.onload = function() {
    // 实例化构造函数 参数为整个父级盒子id
    var oMyCarousel = new Carousel("myCarousel");

    //配置参数，可选
    oMyCarousel.init();
};
//轮播图组件
function Carousel(id) {
    //默认配置参数
    this.setting = {
        //轮播图顺序：默认是“right”向右, “left”：向左
        "order": "right",
        //循环：默认循环
        "loop": true,
        //间隔时间：默认3000ms
        "time": 3000
    };
    //整个轮播图父级
    this.oParent = document.getElementById(id);
    //轮播图容器
    this.oContainer = getClass(this.oParent, 'container')[0];
    //图片盒子个数
    this.aBox = getClass(this.oContainer, 'item');
    //整个容器宽度
    this.oParentWidth = this.oParent.offsetWidth;

    this.iNow = 0;
    this.iNow2 = 0;

}

//初始化
Carousel.prototype.init = function(userSetting) {
    userSetting = userSetting || {};
    //合并设置参数
    $.extend(userSetting, this.setting);

    //创建按钮并初始化
    this.createCircle();

    //图片盒子初始化
    this.boxInit();

    //按钮点击事件
    this.cricleClick();

    //图片自动轮播
    this.autoPlay();

    //鼠标移入移出
    this.hover();
};

//创建原点按钮并初始化
Carousel.prototype.createCircle = function() {

    //创建按钮圆点
    var oOl = document.createElement('ol');
    oOl.id = 'carousel-indicators';
    var str = '';
    for (var i = 0; i<this.aBox.length; i++) {
        str += '<li></li>'
    }
    oOl.innerHTML = str;
    this.oParent.appendChild(oOl);
    this.oOl = $('#carousel-indicators');

    //设置按钮位置
    this.oOl.style.marginLeft = -10 * this.aBox.length + 'px';

    //获取每个按钮元素
    this.aLi = this.oOl.getElementsByTagName('li');
    if (this.setting.order == "right") {
        //默认第一个按钮激活
        this.aLi[0].className = 'active';
    } else {
        //设置最后一个按钮激活
        this.iNow = this.aLi.length-1;
        this.aLi[this.aLi.length-1].className = 'active';
    }
};

//内容区 初始化
Carousel.prototype.boxInit = function() {
    //设置图片在可视区外面
    for (var i = 0; i<this.aBox.length; i++) {
        this.aBox[i].index = i;
        this.aBox[i].style.left = this.oParentWidth + 'px';
    }

    if (this.setting.order == "right") {
        //默认显示第一张图片
        this.aBox[0].style.left = 0;
    } else {
        //设置显示最后一张图片
        this.aBox[this.aBox.length-1].style.left = 0;
    }
};

//原点按钮点击事件
Carousel.prototype.cricleClick = function() {
    //保存this指向
    var This = this;

    for (var i = 0; i<this.aLi.length; i++) {
        this.aLi[i].index = i;

        //点击事件          
        this.aLi[i].onclick = function() {
            //当点击按钮在 激活按钮右边
            if (this.index>This.iNow) {
                This.aBox[this.index].style.left = This.oParentWidth + 'px';
            
                animate(This.aBox[This.iNow],{left: -This.oParentWidth});
                
                //当点击按钮在 激活按钮左边
            } else if (this.index < This.iNow) {
                This.aBox[this.index].style.left = -This.oParentWidth + 'px';
                
                animate(This.aBox[This.iNow],{left: This.oParentWidth});
            } 

            //点击按钮 不等于当前激活按钮
            if (this.index != This.iNow) {
                animate(This.aBox[this.index], {left: 0}, function(){
                    for (var i = 0; i<This.aLi.length; i++) {
                        This.aLi[i].className = '';
                    }
                    This.aLi[this.index].className = 'active';
                });
                This.iNow = this.index;
            }
        }
    }
};

//设置自动播放
Carousel.prototype.autoPlay = function() { 
    var This = this;
    //开启定时器
    this.nowTimer = setInterval(change,this.setting.time);
    function change(){
        if (This.setting.order == "left") {
            This.iNow2 = This.iNow - 1;
            if (This.iNow2 == -1) {
                if (!This.setting.loop) {
                    clearInterval(This.nowTimer)
                }
                This.iNow2 = This.aBox.length-1;
            }
        } else {
            This.iNow2 = This.iNow + 1;
            if (This.iNow2 == This.aLi.length) {
                if (!This.setting.loop) {
                    clearInterval(This.nowTimer)
                }
                This.iNow2 = 0;
            }
        }
        
        This.aBox[This.iNow2].style.left = This.oParentWidth + 'px';
        animate(This.aBox[This.iNow2], {left: 0}, function(){
            for (var i = 0; i<This.aLi.length; i++) {
                This.aLi[i].className = '';
            }
            This.aLi[This.iNow].className = 'active';
        });
        animate(This.aBox[This.iNow],{left: -This.oParentWidth});
        This.iNow = This.iNow2;
    }
};

//鼠标输入移出
Carousel.prototype.hover = function() {
    var This = this;
    //鼠标移入到轮播图 停止轮播
    this.oParent.onmouseover = function() {
        clearInterval(This.nowTimer);
    };

    //鼠标移入到轮播图 开始轮播
    this.oParent.onmouseout = function() {
        This.autoPlay();
    };
}

function animate(element,json,callback,easing){
    //默认匀速
    easing = easing || "linear";
    //默认值 每张图片动画时间400ms
    var times = 400;
    //left 的初始值
    var left = parseInt(getStyle(element,'left'));
    //运动开始的时间戳
    var startTime = new Date().getTime();
    //清定时器
    clearInterval(element.timer);
    element.timer = setInterval(function(){
        var changeTime = new Date().getTime();
        //运动时间
        var t = changeTime - startTime;
        //如果运动时间超过或等于默认事件 清除定时器
        if(t >= times){
            element.style.left = json['left'] + 'px';
            clearInterval(element.timer);
            if(callback){
                callback.call(element);
            }
        } else {
            var value = Tween[easing](t, left,json['left'] - left,times);
            
            element.style.left = value + 'px';
        }
    },13);
    
    var Tween = {
        linear: function (t, b, c, d){  //匀速
            return c*t/d + b;
        },
        easeIn: function(t, b, c, d){  //加速曲线
            return c*(t/=d)*t + b;
        }
    }
}



    