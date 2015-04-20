
window.onload = init;

function init() {
    var button = document.getElementById('getBtn');
    button.onclick = getBtnHandler;
}

function getBtnHandler() {
    var textInput = document.getElementById('interestInput');
    var interestString = textInput.value;

    // todo 允许用户用换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号来作为不同爱好的分隔
    var re = /[\s,，]/;
    var interestsArr = interestString.split(re);

    var output = uniqueArray(interestsArr);
    updateDom(output);
}

function checkUserInput(array) {
    if (array.length > 10) {
        // todo: you cannot input too much
    } else if (array.length < 1) {
        // todo: you should input some of your interests
        // todo: add a red alert text in front of the button
    }
}

function updateDom(array) {
    var ul = document.getElementById('interestList');

    ul.innerHTML = ''; // init with a empty ul element

    for (var i=0; i<array.length; i++) {
        var li = document.createElement('li');
        li.innerHTML = array[i];
        ul.appendChild(li);
    }
}