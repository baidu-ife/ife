(function () {
    var suggestion = $("#suggestion_ul");

    $.on('#input','keyup', function (e) {
        var active_li,
            prev_li,
            next_li,
            suggestion_li;
        e = e || window.event;
        var target = e.srcElement ? e.srcElement : e.target;
        var value = target.value;
        switch(e.keyCode){
            case 38: //向上键
                active_li = $(".suggestion_li_active");
                if(active_li){
                    prev_li = active_li.previousSibling;
                    if(prev_li != null){
                        removeClass(active_li,'suggestion_li_active');
                        addClass(prev_li,"suggestion_li_active")
                    }
                }
                return;
                break;
            case 40: //向下键
                active_li = $(".suggestion_li_active");
                if (active_li) {
                    next_li = active_li.nextSibling;
                    if (next_li != null) {
                        removeClass(active_li,'suggestion_li_active');
                        addClass(next_li,"suggestion_li_active")
                    }
                }
                else{
                    suggestion_li = $("#suggestion_ul li")
                    if(suggestion_li){
                        addClass(suggestion_li,'suggestion_li_active');
                    }
                }
                return;
                break;
            case 13: //回车
                active_li = $(".suggestion_li_active");
                if(active_li){
                    var text = active_li.innerText;
                    $('#input').value = text;
                    suggestion.innerHTML = "";
                }
                return;
                break;
            default:
                break;
        }
        
        if(value != ""){
            suggestion.innerHTML = "";
            var str = "";
            for (var i = 0; i < suggestions_test.length; ++i) {
                if (suggestions_test[i].indexOf(value) === 0) {
                    str = str + "<li>" + suggestions_test[i] + "</li>";
                }
            }
            suggestion.innerHTML = str;
        }
        else{
            suggestion.innerHTML = "";
        }

    });
    //点击出现的选择框
    $.delegate("#suggestion_ul",'li','click', function (e) {
        e = e || window.event;
        var target = e.srcElement ? e.srcElement : e.target;
        var text = target.innerText;
        $('#input').value = text;
        suggestion.innerHTML="";
    });
    //输入框失去焦点
    $.on('#input','blur',function(){
        setTimeout(function () {
            suggestion.innerHTML="";
        },100);
    })
})();

// 测试用的数据
var suggestions_test = [];
suggestions_test.push("apple");
suggestions_test.push("banana");
suggestions_test.push("orange");
suggestions_test.push("bread");
suggestions_test.push("air");
suggestions_test.push("dark");
suggestions_test.push("fish");
suggestions_test.push("grape");
suggestions_test.push("hello");
suggestions_test.push("ice");
suggestions_test.push("jacaranda");
suggestions_test.push("kinross");
suggestions_test.push("light");
suggestions_test.push("moon");
suggestions_test.push("nice");
suggestions_test.push("ok");
suggestions_test.push("peach");
suggestions_test.push("quora");
