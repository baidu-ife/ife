/**
 * @file task0002_1
 * @author junmer
 */

// util

function insertAfter(newElement, existElement) {

    var existParent = existElement.parentNode;

    if (existParent) {
        existParent.insertBefore(newElement, existElement.nextSibling);
    }
    return newElement;
}

function filterArray(arr) {
    var result = [];

    each(arr, function (item) {
        if (item) {
            result.push(item);
        }
    });

    return result;
}


// step1

function step1(e) {
    var input = trim($('.step1 .ife-input').value);
    var arr = input.split(',');

    arr = uniqArray(arr);
    arr = filterArray(arr);

    var output = arr.join(',');
    var p = document.createElement('p');
    p.innerHTML = output;

    insertAfter(p, e.target);

}


$.on('.step1 .ife-btn', 'click', step1);


// step2

function step2(e) {
    var input = trim($('.step2 .ife-input').value);
    var arr = input.split(/\n|\s|\ |\，|\,|\、|;/);

    arr = uniqArray(arr);
    arr = filterArray(arr);

    var output = arr.join(',');
    var p = document.createElement('p');
    p.innerHTML = output;

    insertAfter(p, e.target);

}

$.on('.step2 .ife-btn', 'click', step2);


// step3

function showErr(msg) {
    if (msg) {
        $('.ife-err').innerHTML = msg;
    }
    else {
        $('.ife-err').innerHTML = '';
    }
}

function step3(e) {

    showErr();

    var input = trim($('.step3 .ife-input').value);

    if (!input) {
        return showErr('输入不能空');
    }

    var arr = input.split(/[，,、；\s\t\n]/);

    arr = uniqArray(arr);
    arr = filterArray(arr);

    if (arr.length > 10) {
        return showErr('用户输入的爱好数量不能超过10个');
    }

    var p = document.createElement('p');

    each(arr, function (item, i) {

        var checkbox = document.createElement('input');
        checkbox.setAttribute('type', 'checkbox');
        checkbox.setAttribute('id', 'checkboxid' + i);
        var label = document.createElement('label');
        label.setAttribute('for', 'checkboxid' + i);
        label.innerHTML = item;
        p.appendChild(checkbox);
        p.appendChild(label);

    });


    insertAfter(p, e.target);

}


$.on('.step3 .ife-btn', 'click', step3);
