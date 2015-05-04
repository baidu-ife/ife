/**
 * Created by zcp2123 on 2015/4/22.
 */
function insertAfter(target, newElement) {
    if (target.nextSibling === null) {
        target.parentNode.appendChild(newElement);
    } else {
        target.parentNode.insertBefore(newElement, target.nextSibling)
    }
}

function showFavourite() {
//    阶段一
//    var input = $("#favourite").value.replace(/,\s*(?=,|$)/g,"");
//    var arr = input.split(",");
//    阶段二
    var input = $("#favourite").value.replace(/[\n 　,，、;；]\s*(?=[\n 　,，、;；]|$)/g,"");
    var arr = input.split(/[\n 　,，、;；]/);
    arr = uniqArray(arr);
    var p = document.createElement("p");
    p.innerHTML = arr.join(",");
    insertAfter($("button"),p);
}

function showFavorInCheckBox() {
    var input = $("#favourite").value.replace(/[\n 　,，、;；]\s*(?=[\n 　,，、;；]|$)/g,"");
    var arr = input.split(/[\n 　,，、;；]/);
    arr = uniqArray(arr);
    var checkBoxes = "";
    for (var i = 0; i < arr.length; i++) {
        checkBoxes += "<label><input type='checkbox' name='favor" + (i + 1) + "'>" + arr[i] + "</label>";
    }
    var div = document.createElement("div");
    div.innerHTML = checkBoxes;
    insertAfter($("button"),div);
}

function limitInput() {
    var input = $("#favourite").value.replace(/[\n 　,，、;；]\s*(?=[\n 　,，、;；]|$)/g,"");
    var strongText = $("p");
    var arr = input.split(/[\n 　,，、;；]/);
    if (arr && arr.length > 10) {
        $("#favourite").value = $("#favourite").value.replace(/[\n 　,，、;；][^\n 　,，、;；]*?$/,"");

        strongText.innerHTML = "最多输入10个爱好";
    } else {
        strongText.innerHTML = "";
    }
}
window.onload = function() {
    $.click("button",showFavorInCheckBox);
    $.on("#favourite", "keyup", limitInput);
}
