/**
 * Created by xieyicheng on 2015/4/20.
 */
(function () {
    //判断是不是支持html5拖放api
    if('draggable' in document.createElement('span')) {
        //li拖放开始的时候，把id存起来
        $.on("#first_wrap li",'dragstart', function (e) {
            e.dataTransfer.setData("Text", e.target.id);
        });
        $.on("#second_wrap li",'dragstart', function (e) {
            e.dataTransfer.setData("Text", e.target.id);
        });

        //去除默认的dragover事件，激活拖放
        $.on("#second_wrap",'dragover', function (e) {
            e.preventDefault();
        });
        $.on("#first_wrap",'dragover', function (e) {
            e.preventDefault();
        });

        //li放置的时候做处理
        $.on("#second_wrap",'drop', function (e) {
            e.stopPropagation();
            var id = e.dataTransfer.getData("Text");
            $("#second_wrap").appendChild(document.getElementById(id));
        });

        //li放置的时候做处理
        $.on("#first_wrap",'drop', function (e) {
            e.stopPropagation();
            var id = e.dataTransfer.getData("Text");
            $("#first_wrap").appendChild(document.getElementById(id));
        });


    }
    else{
        var marginLeft = $('.wrap').getBoundingClientRect().left;
        var second_ul = $("#second_wrap");
        var first_ul = $("#first_wrap");
        var mousedown = false;//判断是不是选择了li
        var active_li;
        $.on("li","mousedown", function (e) {
            e = e?e:window.event;
            var target = getTarget(e);
            addClass(target,"active");
            active_li = target;
            mousedown = true;
        });
        $.on("body","mousemove", function (e) {
            cancelEvent(e);
            if(mousedown){
                if(active_li){
                    active_li.style.left = e.clientX-marginLeft-200+ "px";
                    active_li.style.top = e.clientY-110 + "px";
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
            if(left>300&&left<580&&top<560&&top>0){
                return true
            }
            return false;
        }
        function checkInFirst(left,top) {
            if(left>-200&&left<200&&top<560&&top>0){
                return true
            }
            return false;
        }

    }


})();