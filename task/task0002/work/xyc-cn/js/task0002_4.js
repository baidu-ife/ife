/**
 * Created by xieyicheng on 2015/4/19.
 */
(function () {
    var search = $("#search_ul");
    $.on('#text','keyup', function (e) {
           var active_li,
            prev_li,
            next_li,
            search_li;
        e = e?e:window.event;
        var target = getTarget(e);
        var value = target.value;
        switch(e.keyCode){
            case 38: //向上键
                cancelEvent(e);
                active_li = $(".search_li_active");
                if(active_li){
                    prev_li = active_li.previousSibling;
                    if(prev_li!=null){
                        removeClass(active_li,'search_li_active');
                        addClass(prev_li,"search_li_active")
                    }
                }
                return;
                break;
            case 40: //向下键
                cancelEvent(e);
                active_li = $(".search_li_active");
                if(active_li){
                    next_li = active_li.nextSibling;
                    if(next_li!=null){
                        removeClass(active_li,'search_li_active');
                        addClass(next_li,"search_li_active")
                    }
                }
                else{
                    search_li = $("#search_ul li");
                    if(search_li.length){
                        addClass(search_li[0],'search_li_active');
                    }
                    else{
                        addClass(search_li,'search_li_active');
                    }
                }
                return;
                break;
            case 13: //回车
                active_li = $(".search_li_active");
                if(active_li){
                    var text = active_li.innerText;
                    $('#text').value = text;
                    search.innerHTML="";
                }
                return;
                break;
            default:
                break;
        }
        if(value!=""){
            ajax('http://localhost:3000',{
                data:{text:value},
                onsuccess: function (data) {
                    search.innerHTML = "";
                    removeClass(search,"hidden");
                    var str ="";
                    data = JSON.parse(data);
                    each(data,function(item,index){
                        str = str + "<li><span>"+ value + "</span>"+
                        item.substring(value.length,item.length)+
                        "</li>";
                    });
                    search.innerHTML = str;
                }
            })
        }
        else{
            addClass(search,"hidden");
            search.innerHTML = "";
        }

    });
    //点击出现的选择框
    $.delegate("#search_ul",'li','click', function (e) {
        e = e?e:window.event;
        var target = getTarget(e);
        var text = target.innerText;
        $('#text').value = text;
        search.innerHTML="";
    });
    //输入框失去焦点
    $.on('#text','blur',function(){
        setTimeout(function () {
            search.innerHTML="";
        },100);
    })
})();