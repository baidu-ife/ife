/**
 * Created by zcp2123 on 2015/4/25.
 */
window.onload = function() {
    $.on("#searchInfo", "keyup", function(e) {
        e = e || window.event;
        var selectedLi = $("#infoList li.selected");
        var infoList = $("#infoList");

        switch(e.keyCode) {
            case 38: //up
                if (selectedLi) {
                    var preLi = selectedLi.previousSibling;
                    if (preLi) {
                        removeClass(selectedLi, "selected");
                        addClass(preLi, "selected");
                    }
                } else {
                    var firstLi = $("#infoList li");
                    firstLi && addClass(firstLi, "selected");
                }
                break;
            case 40: //down
                if (selectedLi) {
                    var nextLi = selectedLi.nextSibling;
                    if (nextLi) {
                        removeClass(selectedLi, "selected");
                        addClass(nextLi, "selected");
                    }
                } else {
                    var firstLi = $("#infoList li");
                    firstLi && addClass(firstLi, "selected");
                }
                break;
            case 13: //enter
                if (selectedLi) {
                    $("#searchInfo").value = selectedLi.innerText;
                } else {
                    $("#searchInfo").value = "";
                }
                infoList.innerHTML = "";
                addClass(infoList, "hide");
                break;
            default :
                var target = e.target || e.srcElement;
                otherCode(target);
                break;
        }

    });

    $.delegate("#infoList", "li", "click", function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        var infoList = $("#infoList");
        $("#searchInfo").value = target.innerText;
        infoList.innerHTML = "";
        addClass(infoList, "hide");
    });

    $.delegate("#infoList", "span", "click", function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        var infoList = $("#infoList");
        $("#searchInfo").value = target.parentNode.innerText;
        infoList.innerHTML = "";
        addClass(infoList, "hide");
    });

    function otherCode(target) {
        var infoList = $("#infoList");
        var value = target.value;
        var suggestData = ['Text1', 'Text12', 'Text13', 'Text123', 'xt13', 'ext13', 'Text143', 'ext153'];

        if (value) {
            var valueList = getValueList(suggestData, value);
            if (valueList.length > 0) {
                removeClass(infoList, "hide");
                var str = "";
                var regExp = new RegExp("^(.*)" + value + "(.*)$");
                for (var i = 0, len = valueList.length; i < len; i++) {
                    var group = regExp.exec(valueList[i]);
                    str += "<li>" + group[1] + "<span>" + value + "</span>" + group[2] + "</li>";
                }
                infoList.innerHTML = str;
            } else {
                addClass(infoList, "hide");
                infoList.innerHTML = "";
            }
        } else {
            addClass(infoList, "hide");
            infoList.innerHTML = "";
        }
    }

    function getValueList(arr, value) {
        if (!arr || !value) {
            return [];
        }
        var result = [];
        var regExp = new RegExp(value);
        for (var i = 0, len = arr.length; i < len; i++) {
            if (regExp.test(arr[i])) {
                result.push(arr[i]);
            }
        }
        return result;
    }
}