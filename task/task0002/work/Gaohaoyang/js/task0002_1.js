$.click("button", function() {

    // var content = $("input").value;
    var content = $("textarea").value;
    console.log($("textarea"));
    console.log(content);
    content = trim(content); //去掉首位的空格
    var contentArr = content.split(/\n|\s+|,|，|;|；|、/);
    var contentArr2 = deleteBlank(uniqArray(contentArr)); // 去重，去空白

    var showDiv = $(".show");
    var warnDiv = $(".warn");

    if (contentArr2.length > 10 || contentArr2.length === 0) {
        warnDiv.style.display = "block";
        showDiv.style.display = "none";
    } else {
        warnDiv.style.display = "none";
        var checkboxStr = "";
        for (var i = 0; i < contentArr2.length; i++) {
            // contentArr2[i] = 0;
            checkboxStr += '<br><input type="checkbox"><label>' + contentArr2[i] + '</label>';
        }
        console.log(checkboxStr.substr(4));
        showDiv.innerHTML = checkboxStr.substr(4);
        showDiv.style.display = "block";
    }

    console.log(contentArr2);
    // $(".show").innerHTML = contentArr2;



});