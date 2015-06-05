// 按键则判断
$.on("#search", "keyup", advice)

$.delegate(".advices", "li", "mouseover", function(e){
    var e = e || window.event;
    var target = e.target || e.srcElement;
    for (var i in target.parentNode.children) {
        target.parentNode.children[i].className = "";
    }
    for (var i in target.parentNode.children) {
        if(target.parentNode.children[i] === target) {
            target.className = "selected";
            c = i;
        }
    }
})
$.delegate(".advices", "li", "mouseout", function(e){
    var target = e.target || e.srcElement;
    target.className = "";
})
$.delegate(".advices", "li", "click", function(e){
    var target = e.target || e.srcElement;
    $("#search").value = target.innerHTML.replace("<span>", "").replace("</span>", "");
    ul.style.visibility = "hidden";
})

function escapeRegExp(s) {
    return s.replace(/([.*+?^=!:${}()|[\]\/\\])/g, "\\$1");
}

fakeData = ["text1", "text2", "textabc", "abc", "abs", "asw"];

var ul = $(".advices");
ul.style.visibility = "hidden";
var oldText = null;
var c = null;
var data;
function advice(e) {
    var event = e || window.event;
    var text = escapeRegExp($("#search").value);
    // 如果文字没有变化
    if (text === oldText) {
        if (event.keyCode === 38) {
            if(c !== null) {
                c = (c-1 + data.length) % data.length;
            }
            else {
                c = data.length-1;
            }
        } else if (event.keyCode === 40) {
            if(c !== null) {
                c = (c+1) % data.length;
            }
            else {
                c = 0;
            }
        } else if (event.keyCode === 13) {
            if (data[c] != null) {
                $("#search").value = data[c];
                ul.style.visibility = "hidden";
                return;
            }
        }
    } else {    // 文字变化, 重置位置指针
        c = null;
        oldText = text;
        if (!text) {
            ul.style.visibility = "hidden";
            return;
        }
        var re = new RegExp("^" + text);
        data = fakeData.filter(function(d) {
            return re.test(d);
        })
        if (data.length !== 0) {
            ul.style.visibility = "visible";
        }
    }
    // 无论如何刷新。。。
    ul.innerHTML = "";
    for (var i in data) {
        var li = document.createElement("li");
        ul.appendChild(li);
        if (text){
            li.innerHTML = data[i].replace(new RegExp("(^" + text + ")"), "<span>$1</span>")
        }
    }
    if(c !== null){ //如果第一次
        ul.children[c].className = "selected";
    }// c=0
}
