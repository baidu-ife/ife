$.click("button", function() {

    var content = $("input").value;
    content = trim(content); //去掉首位的空格
    var contentArr = content.split("，");
    // contentArr = uniqArray(contentArr); //去重
    var contentArr2 = deleteBlank(uniqArray(contentArr));//去重，去空白
    console.log(contentArr2);

   

});