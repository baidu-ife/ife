$.click("button", function() {

    var content = $("textarea").value;
    content = trim(content); //去掉首位的空格

    //分割，去除空格、重复
    var contentArr = [];
    contentArr = deleteBlank(uniqArray(content.split(/\n|\s+|\,|\，|\、|\;|\；/)));

    var showDiv = $(".show");
    var warnDiv = $(".warn");

    if (contentArr.length >10 || contentArr.length === 0) {
        warnDiv.style.display = "block";
        showDiv.style.display = "none";
    } else {
        warnDiv.style.display = "none";

        var checkBoxStr = "";
        for (var i in contentArr) {
            checkBoxStr += '<br><input type="checkbox"><label>' + contentArr[i] + '</label>';
            console.log(checkBoxStr);
            
            showDiv.innerHTML = checkBoxStr.substr(4);
            showDiv.style.display = "block";
        }
    }

});

function deleteBlank (arr) {
    // body...
    var newArr= [];
    for (var i in arr) {
        if (arr[i] === "") {
            continue;
        } else {
            newArr.push(arr[i]);
        }
    }
    return newArr;
}