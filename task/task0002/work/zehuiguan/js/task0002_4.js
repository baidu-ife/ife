//提示内容
var suggestData = ['d', 'dying', 'abdomen', 'dye', 'dustbin', 'dust','during', 'dumpling', 'draw', 'drink', 'downward', 'drive', 'drown', 'drum','duck', 'due', 'duke', 'dull'];
var ulArea = $("ul");
var inputArea = $("input");

addInputListener();
clickEvent();
keydownEvent();

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
    var liString = "";
    var pattern = new RegExp("^" + inputValue, "i"); //获取开头相同的字符串

    if (inputValue === "") {
        ulArea.style.display = "none";
    } else {
        for (var i = 0; i < suggestData.length; i++) {
            if (suggestData[i].match(pattern)) {
                liString += "<li><span>" + inputValue + "</span>" + suggestData[i].substr(inputValue.length) + "</li>";
            }
        }
        ulArea.innerHTML = liString;
        ulArea.style.display = "block";
    }
}

function clickEvent() {
    delegateEvent(ulArea, "li", "mouseover", function() {
        addClass(this, "tablet-active");
    });
    delegateEvent(ulArea, "li", "mouseout", function() {
        removeClass(this, "tablet-active");
    });
    delegateEvent(ulArea, "li", "click", function() {
        inputArea.value = deleteSpan(this.innerHTML);
        ulArea.style.display = "none";
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


function keydownEvent() {
    addEvent(inputArea, "keydown", function(event) {

        var highLightLi = $(".tablet-active");
        //down
        if (event.keyCode == 40) {
            if (highLightLi) {
                var nextLi = highLightLi.nextSibling;
                if (nextLi) {
                    removeClass(highLightLi, "tablet-active");
                    addClass(nextLi, "tablet-active");
                }
            } else {
                addClass($("li"), "tablet-active");
            }
        }
        //up
        if (event.keyCode == 38) {
            if (highLightLi) {
                var preLi = highLightLi.previousSibling;
                if (preLi) {
                    removeClass(highLightLi, "tablet-active");
                    addClass(preLi, "tablet-active");
                }
            } else {
                addClass($("li"), "tablet-active");
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