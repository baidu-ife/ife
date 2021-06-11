/**
 * Created by zcp2123 on 2015/4/25.
 */
window.onload = function() {
    //判断是不是支持html5拖放api
    if ('draggable' in document.createElement('span')) {
        //li拖放开始的时候，把id存起来
        $.on("#first_wrap li", 'dragstart', function(e) {
            e.dataTransfer.setData("Text", e.target.id);
        });
        $.on("#second_wrap li", 'dragstart', function(e) {
            e.dataTransfer.setData("Text", e.target.id);//键值对的形式，可任意设置，setData(key,value);
        });

        //去除默认的dragover事件，激活拖放
        $.on("#first_wrap", 'dragover', function(e) {
            e.preventDefault();
        });
        $.on("#second_wrap", 'dragover', function(e) {
            e.preventDefault();
        });

        //li放置的时候做处理
        $.on("#second_wrap", 'drop', function(e) {
            e.preventDefault();
            var id = e.dataTransfer.getData("Text");
            $("#second_wrap").appendChild(document.getElementById(id));
        });

        //li放置的时候做处理
        $.on("#first_wrap", 'drop', function(e) {
            e.preventDefault();
            var id = e.dataTransfer.getData("Text");
            $("#first_wrap").appendChild(document.getElementById(id));
        });

    } else {
        var marginLeft = $('.wrap').offsetLeft;
        var marginTop = $('.wrap').offsetTop;
        var first_ul = $("#first_wrap");
        var second_ul = $("#second_wrap");
        var mousedown = false;//判断是不是选择了li
        var active_li;

        $.on("li", "mousedown", function(e) {
            e = e || window.event;
            var target = e.target || e.srcElement;
            addClass(target, "active");
            active_li = target;
            mousedown = true;
        });

        $.on("body", "mousemove", function(e) {
            var body = $("body");
            var top = document.documentElement.scrollTop || body.scrollTop;
            var left = document.documentElement.scrollLeft || body.scrollLeft;
            if (mousedown) {
                if(active_li){
                    active_li.style.left = e.clientX - marginLeft - active_li.offsetWidth / 2 + left + "px";
                    active_li.style.top = e.clientY - marginTop - active_li.offsetHeight / 2 + top + "px";
                }
            }
        });

        $.on("body", "mouseup", function(e) {
            mousedown = false;
            if (active_li) {
                var left = active_li.offsetLeft;
                var top = active_li.offsetTop;
                active_li.style.left = "";
                active_li.style.top = "";
                removeClass(active_li, "active");
                //li放置的时候做处理
                if (checkInFirst(left, top)) {
                    active_li.parentNode.removeChild(active_li);
                    first_ul.appendChild(active_li);
                }
                //li放置的时候做处理
                if (checkInSecond(left, top)) {
                    active_li.parentNode.removeChild(active_li);
                    second_ul.appendChild(active_li);
                }
            }
        });

        function checkInSecond(left, top) {
            return (left > 200 && left < 600 && top < 560 && top > 0);
        }

        function checkInFirst(left, top) {
            return (left > -200 && left < 200 && top < 560 && top > 0);
        }
    }

};