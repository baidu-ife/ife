/*实现一个类似百度搜索框的输入提示的功能。

要求如下：

允许使用鼠标点击选中提示栏中的某个选项
允许使用键盘上下键来选中提示栏中的某个选项，回车确认选中
选中后，提示内容变更到输入框中*/
var suggestData = ['a', 'abandon', 'abdomen', 'abide', 'abide', 'ability', 'able', 'abnormal', 'aboard', 'abolish', 'abound', 'about', 'above', 'test2', 'test3'];

// 给input加监听
var inputArea = $("input");

if (inputArea.addEventListener) { // all browsers except IE before version 9
    inputArea.addEventListener("input", OnInput);
}
if (inputArea.attachEvent) { // Internet Explorer and Opera
    inputArea.attachEvent("onpropertychange", OnPropChanged); // Internet Explorer
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
    var pattern = new RegExp("^" + inputValue, "i"); //获取开头相同的字符串
    for (var i = 0; i < suggestData.length; i++) {
        if (inputValue !== "" && suggestData[i].match(pattern)) {
            console.log(suggestData[i]);
        }
    }
}