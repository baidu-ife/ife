(function() {
    //几个html元素的模板，后面会用Reg.replace()来替换其中的特定数据
    var picture_template = "<div class=\"gallery-picture\" order=\"{{order}}\" style=\"background:url({{url}});\"></div>";
    var buttonbox = "<div id=\"gallery-buttonbox\"><table><tbody><tr></tr></tbody></table></div>"; 
    var button_template = "<th><div class=\"gallery-button\" button-order=\"{{order}}\"></div></th>";
    
    var _options = {};//保存options，提升查找性能
    var _width,_height,total;//记录gallery的宽度、高度、图片总数
    var now_picture = 0;//当前显示的图片序列
    
    function init(options) {
        //初始化
        _options = options; 
        _width = parseInt(options.width.replace(/px/,""));
        _height = parseInt(options.height.replace(/px/,""));
        total = options.picture.length;
        $("#gallery").style.width = options.width;
        $("#gallery").style.height = options.height;
        $("#gallery").innerHTML = "";
        for(var i = 0; i < total ; i++){
            $("#gallery").innerHTML = $("#gallery").innerHTML + picture_template.replace(/{{url}}/,options.picture[i]).replace(/{{order}}/,i.toString());
            $("[order=" + i.toString() +"]").style.left = (i*_width).toString() + "px";
        }
        $("#gallery").innerHTML = $("#gallery").innerHTML + buttonbox;
        for(var i = 0; i < total ; i++){
            $("#gallery-buttonbox tr").innerHTML = $("#gallery-buttonbox tr").innerHTML + button_template.replace(/{{order}}/,i.toString());
        }

         for(var i = 0 ; i < $(".gallery-button").length ; i++){
            addEvent($(".gallery-button")[i],"click",function(){
                var od = parseInt(this.getAttribute("button-order"));
                gallery.go(od);
            })
        }
        flashButton();
    }

    function gotoFirst(){
        //前往第一张图
        for(var i = 0; i <total ; i++){
                $("[order=" + i.toString() +"]").style.left = (i*_width).toString() + "px";
        }
        now_picture = 0;
        flashButton();
    }

    function gotoLast(){
        //前往最后一张图
        for(var i = 0; i <total ; i++){
                $("[order=" + i.toString() +"]").style.left = ((i-total+1)*_width).toString() + "px";
        }
        now_picture = total - 1;
        flashButton();
    }



    function turnLeft(){
        //左移
        now_picture++;
        if(now_picture<total){
            for(var i = 0; i <total ; i++){
                $("[order=" + i.toString() +"]").style.left = (parseInt($("[order=" + i.toString() +"]").style.left.replace(/px/,"")) - _width).toString() + "px";
            }
        }
        if(now_picture == total && _options.loop){
            gotoFirst();
        }
        flashButton();
    }

    function turnRight(){
        //右移
        now_picture--;
        if(now_picture>=0){
            for(var i = 0; i < _options.picture.length ; i++){
                $("[order=" + i.toString() +"]").style.left = (parseInt($("[order=" + i.toString() +"]").style.left.replace(/px/,"")) + _width).toString() + "px";
            }
        }
        if(now_picture == -1 && _options.loop){
            gotoLast();
        }
        flashButton();
    }


    function go(x){
        //前往第X张图片
        var step = now_picture - x;
        console.log(step);
        if(step<0){
            for(var i = 0 ; i < Math.abs(step) ; i++){
                gallery.turnLeft();
            }
        }else{
            for(var i = 0 ; i < step ; i++){
                gallery.turnRight();
            }
        }
        flashButton();
    }

    function flashButton(){
        //刷新按钮状态
        for(var i = 0 ; i < $(".gallery-button").length ; i++){
            $(".gallery-button")[i].style.background = "#ffffff";
        }
        $("[button-order=" + now_picture.toString() +"]").style.background = "#707070";
    }

    function auto(){
        //设置自动播放
        if(_options.backwards){
            setInterval(function(){
                turnRight();
            },_options.timeout)
        }else{
            setInterval(function(){
                turnLeft();
            },_options.timeout)
        }
    }

    gallery = {
        init : init,
        turnRight : turnRight,
        turnLeft : turnLeft,
        auto : auto,
        go : go
    }
    window.gallery = gallery;
})()






