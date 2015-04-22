window.onload = init;

function init() {
    var button = $('#getBtn');
    var input = $('#interestInput');
    addEvent(input, 'keyup', checkUserInput);
    addEvent(button, 'click', getBtnHandler);

}

function getBtnHandler() {
    var textInput = $('#interestInput');
    var interestString = textInput.value;
    var arr = splitUserInput(interestString);

    if (arr.length < 1 || arr.length > 10) {
        checkUserInput();
    } else {
        var output = uniqueArray(arr);
        updateDom(output);
    }
}

function checkUserInput() {
    var tipLabel = $('#errorTip');
    var inputText = $('#interestInput').value;

    var length = splitUserInput(inputText).length;

    if (length > 10) {
        tipLabel.innerHTML = "Please input less than 10 items!";
    } else if (0 < length < 11) {
        tipLabel.innerHTML = "";
    }
}

function splitUserInput(inputString) {

    var re = /[\s,，]/,  // todo 允许用户用换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号来作为不同爱好的分隔
        arr = inputString.split(re),
        i,
        n = arr.length,
        result = [];

    for (i = 0; i < n; i++) {
        if (trim(arr[i]) != '') {
            result.push(arr[i]);
        }
    }

    return result;
}

function updateDom(array) {
    var checkboxList = $('#checkboxList');
    checkboxList.innerHTML = ''; // init with a empty content
    for (var i = 0; i < array.length; i++) {
        var label = document.createElement('label');
        var checkbox = document.createElement('input');
        checkbox.type = 'checkbox';
        checkbox.value = array[i];
        label.appendChild(document.createTextNode(array[i]));
        label.appendChild(checkbox);
        checkboxList.appendChild(label);
    }
}