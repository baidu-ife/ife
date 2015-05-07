(function () {
    //判断是不是支持html5拖放api
    if('draggable' in document.createElement('span')) {
        var first_li = $("#first_wrap").getElementsByTagName("li");
        for (var i = 0; i < first_li.length; ++i) {
            addEvent(first_li[i], "dragstart", function(e) {
                e.dataTransfer.setData("text", e.target.id);
            })
        }
        var second_li = $("#second_wrap").getElementsByTagName("li");
        for (var i = 0; i < second_li.length; ++i) {
            addEvent(second_li[i], "dragstart", function(e) {
                e.dataTransfer.setData("text", e.target.id);
            })
        }
        $.on("#second_wrap",'dragover', function (e) {
            e.preventDefault();
        });
        $.on("#first_wrap",'dragover', function (e) {
            e.preventDefault();
        });

        $.on("#second_wrap",'drop', function (e) {
            e.preventDefault();
            var id = e.dataTransfer.getData("text");
            $("#second_wrap").appendChild(document.getElementById(id));
        });

        $.on("#first_wrap",'drop', function (e) {
            e.preventDefault();
            var id = e.dataTransfer.getData("text");
            $("#first_wrap").appendChild(document.getElementById(id));
        });
    }
    else{
        var marginLeft = $('.wrap').getBoundingClientRect().left;
        var second_ul = $("#second_wrap");
        var first_ul = $("#first_wrap");
        var mousedown = false;//判断是不是选择了li
        var active_li;

        var li_list = document.getElementsByTagName("li");
        for (var i = 0; i < li_list.length; ++i) {
            addEvent(li_list[i], "mousedown", function (e) {
                e = e || window.event;
                var target = e.srcElement ? e.srcElement : e.target;
                addClass(target,"active");
                active_li = target;
                mousedown = true;
            });
        }
        $.on("body","mousemove", function (e) {
            cancelEvent(e);
            if(mousedown){
                if(active_li){
                    console.log(e.clientX);
                    active_li.style.left = e.clientX-marginLeft - 100 + "px";
                    // active_li.style.left = "px";

                    active_li.style.top = e.clientY - 90 - 15+ "px";
                }
            }
        });

        $.on("body","mouseup", function (e) {
            mousedown = false;
            if(active_li){
                var left = parseInt(active_li.style.left);
                var top = parseInt(active_li.style.top);
                active_li.style.left = "";
                active_li.style.top = "";
                removeClass(active_li,"active");
                //li放置的时候做处理
                if(checkInSecond(left,top)){
                    active_li.parentNode.removeChild(active_li);
                    second_ul.appendChild(active_li);
                }
                //li放置的时候做处理
                if(checkInFirst(left,top)){
                    active_li.parentNode.removeChild(active_li);
                    first_ul.appendChild(active_li);
                }
            }
        });

        function checkInSecond(left,top) {
            if(left>100&&left<300&&top<500&&top>0){
                return true
            }
            return false;
        }
        function checkInFirst(left,top) {
            if(left-100&&left<100&&top<500&&top>0){
                return true
            }
            return false;
        }
    }
    function cancelEvent (event) {
    if (event.preventDefault) {
        event.preventDefault();
    } else {
        event.returnValue = false;
    }
}
})();