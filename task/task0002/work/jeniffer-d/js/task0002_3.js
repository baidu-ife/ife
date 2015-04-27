(function(){

    var container = $("#container"); //外部容器
    var list = $("#list");           //图片容器 
    var buttons = $("#buttons").getElementsByTagName("span"); //圆点容器
    var index = 1;                   //当前图片序号,全局变量,在animateDot函数中改变

   //根据当前图片序号，决定触发哪个圆点为on，给那个圆点添加类on
    function showButtons() {
        for (var i = 0; i<buttons.length; i++){
            removeClass(buttons[i],"on");
        }
        addClass(buttons[index-1],"on");
    }

    //圆点动画，输入参数：图片个数，轮播方向
    function animateDot(num, direction) {
        if (direction == "left") {
            if (index == 1) {
            index = num + 1;
            }
            index--;
            showButtons();            
        } else if (direction == "right") {
            if (index == num) {
                index = 0;
            }
            index++;
            showButtons();
        }
    }

    //图片轮播动画，输入为图片宽度，图片个数，轮播方向
    function animateImg(imgWidth, num, direction) {
        var offset = direction == "left" ? imgWidth : -imgWidth;

        //设置图片容器的位置为当前位置+偏移量
        list.style.left = parseInt(list.style.left) + offset + "px";
        if(parseInt(list.style.left) == 0) {
            list.style.left = -imgWidth*num + "px";
        }
        if(parseInt(list.style.left) == -imgWidth*(num+1)) {
            list.style.left = -imgWidth + "px";
        }
    }
    
    function animate(imgWidth, num, direction) {
        //小圆点动画 
        animateDot(num, direction);
        // 图片轮播动画
        animateImg (imgWidth, num, direction);
    }

    //自动播放
    setInterval(function(){
        animate(480, 5, "right");
    }, 10000);

    //方向左键
    $.click("#right", function(e){
        animate(480, 5, "right");
    });

    //方向右键
    $.click("#left", function(e){
        animate(480, 5, "left");

    });

    //点击小圆点，跳转到对应的图片
    $.delegate("#buttons", "span", "click", function(event){
        var e = event || window.event;
        var target = e.target || e.srcElement;
        index = target.getAttribute("data-index");
        showButtons();
        list.style.left = (-480*index) + "px";
    });


})();


