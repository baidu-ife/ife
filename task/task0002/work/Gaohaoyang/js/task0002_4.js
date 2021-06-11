/*实现一个类似百度搜索框的输入提示的功能。

要求如下：

允许使用鼠标点击选中提示栏中的某个选项
允许使用键盘上下键来选中提示栏中的某个选项，回车确认选中
选中后，提示内容变更到输入框中*/
var suggestData = ['a', 'abandon', 'abdomen', 'abide', 'ability', 'able', 'abnormal', 'aboard', 'abolish', 'abound', 'about', 'above', 'fiction', 'field', 'fierce', 'fight', 'test2', 'test3'];

// 给input加监听
var inputArea = $("input");
var ulArea = $("ul");

addInputListener();//监听input
clickLi(); //鼠标点击li
keydownLi(); //键盘事件

function addInputListener() {
    if (inputArea.addEventListener) { // all browsers except IE before version 9
        inputArea.addEventListener("input", OnInput);
    }
    if (inputArea.attachEvent) { // Internet Explorer and Opera
        inputArea.attachEvent("onpropertychange", OnPropChanged); // Internet Explorer
    }
}

// Firefox, Google Chrome, Opera, Safari from version 5, Internet Explorer from version 9
function OnInput(event) {
    var inputValue = event.target.value;
    handleInput(inputValue);
}
// Internet Explorer
function OnPropChanged(event) {
    var inputValue = "";
    if (event.propertyName.toLowerCase() == "value") {
        inputValue = event.srcElement.value;
        handleInput(inputValue);
    }
}

/**
 * 处理input数据
 * @param  {String} inputValue 实时输入的字符串
 */
function handleInput(inputValue) {
    console.log(inputValue);
    var liString = "";
    var pattern = new RegExp("^" + inputValue, "i"); //获取开头相同的字符串

    if (inputValue === "") {
        ulArea.style.display = "none";
    } else {
        for (var i = 0; i < suggestData.length; i++) {
            if (suggestData[i].match(pattern)) {
                console.log(suggestData[i]);
                liString += "<li><span>" + inputValue + "</span>" + suggestData[i].substr(inputValue.length) + "</li>";
            }
        }
        ulArea.innerHTML = liString;
        ulArea.style.display = "block";
    }
}

/**
 * 鼠标点击li
 */
function clickLi() {
    console.log("clickLi");
    delegateEvent(ulArea, "li", "mouseover", function() {
        addClass(this, "active");
    });
    delegateEvent(ulArea, "li", "mouseout", function() {
        removeClass(this, "active");
    });
    delegateEvent(ulArea, "li", "click", function() {
        inputArea.value = deleteSpan(this.innerHTML);
        ulArea.style.display = "none";
    });
}

function keydownLi() {
    addEvent(inputArea, "keydown", function(event) {

        var highLightLi = $(".active");
        console.log(highLightLi);
        //down
        if (event.keyCode == 40) {
            if (highLightLi) {
                var nextLi = highLightLi.nextSibling;
                if (nextLi) {
                    removeClass(highLightLi, "active");
                    addClass(nextLi, "active");
                }
            } else {
                addClass($("li"), "active");
            }
        }
        //up
        if (event.keyCode == 38) {
            if (highLightLi) {
                var preLi = highLightLi.previousSibling;
                if (preLi) {
                    removeClass(highLightLi, "active");
                    addClass(preLi, "active");
                }
            } else {
                addClass($("li"), "active");
            }
        }
        //enter
        if (event.keyCode == 13) {
            if (highLightLi) {
                inputArea.value = deleteSpan(highLightLi.innerHTML);
                ulArea.style.display = "none";
            }
        }
    });
}

/**
 * 删除span标签，获取字符串
 * @param  {String} string 带有span标签的字符串
 * @return {String}        去掉span标签的字符串
 */
function deleteSpan(string) {
    var pattern = /^<span>(\w+)<\/span>(\w+)$/;
    var stringArr = string.match(pattern);
    return stringArr[1] + stringArr[2];
}