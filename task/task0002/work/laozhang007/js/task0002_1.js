//数组去空
function removespace(arr){
    for(var i=0;i<arr.length;i++){
        if (arr[i] == '') {
            arr.splice(i,1);
            i--;
        }
    }
}
//第一阶段处理
$.click($('#btn1'),function(){
    var hobby = $('#hobby1').value;
    var content = hobby.split(',');
    content = uniqArray(content);
    removespace(content);
    $('#display1').innerHTML = content;
});
//第二阶段处理
$.click($('#btn2'),function(){
    var re = /[,\s，、；;\n]/;
    var hobby = $('#hobby2').value;
    var content = hobby.split(re);//spilt与正则表达式结合实现多种分隔符的分割
    content = uniqArray(content);
    removespace(content);
    $('#display2').innerHTML = content;
});
//第三阶段处理
var dispaly3 = $('#display3');
var tip;
var content = [];
$.on($('#hobby3'),"keyup",function() {
    var re = /[,\s，、；;\n]/;
    //对输入框值进行处理，返回的数组去重并且除去空格
    content = $('#hobby3').value.split(re);
    content = uniqArray(content);
    removespace(content);

    if(content.length > 10){
        tip = 0;
    }
    else if (content.length < 1){
        tip = 1;
    }
    //用户全部输入正确情况
    else {
        tip = 2;
    }

    //针对用户输入 作出相应提示文字
    switch (tip) {
        case 0:
            dispaly3.innerHTML = "兴趣爱好大于十个，请重新输入!";
            break;
        case 1:
            dispaly3.innerHTML = '您没有输入有效的兴趣爱好，请重新输入！';
            break;
        case 2:
            dispaly3.innerHTML = '';
            break;
    }
});
//只有当建议值为2时才能显示输入的信息
$.click($('#btn3'),function() {
    if (tip == 2) {
        var checkbox="";
        for(var i=0;i<content.length;i++){
            checkbox = "<label for="+i+">"+content[i]+"</label><input type='checkbox' name='hobby' id="+i+"/>"+checkbox;
        }
        var form = document.createElement("form");
        form.innerHTML = checkbox;
        //console.log(checkbox);
        $("#display3").appendChild(form);
    }
});


