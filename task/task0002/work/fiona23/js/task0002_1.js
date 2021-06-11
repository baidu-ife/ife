//练习1


function show (result, selector) {
    if($(selector).getElementsByTagName('p').length){
        $(selector).removeChild($(selector).getElementsByTagName('p')[0]);
    }
    var resultP = document.createElement('p');
    var resultStr = "您的爱好是：";
    $(selector).appendChild(resultP);
    result = uniqArray(result);
    for (var i=0; i<result.length; i++){
        if(!/\x20\t\r\n\f/.test(result[i])){
            resultStr += result[i] + " ";
        }
    }
    if (result[0]) {
        resultP.innerHTML = resultStr;
    };
}

//第一阶段
$.on('.level-1-submit', 'click', function () {
    var result = $('.level-1-text').value.split(",");
    show(result, '#level-1');
})

//第二阶段
$.on('.level-2-submit', 'click', function () {
    var re = /[,，\s\n、;；]/
    var result = $('.level-2-text').value.split(re);
    show(result, '#level-2');
})

//第三阶段
$.on('.level-3-submit', 'click', function () {
    var re = /[,，\s\n、;；]/
    var result = $('.level-3-text').value.split(re);
    showL3(result, '#level-3');
})

function showL3 (result, selector) {
    $('.error').style['visibility'] = 'hidden';
    if($(selector).getElementsByTagName('div').length>0){
        $(selector).removeChild($(selector).getElementsByTagName('div')[0]);
    }
    var resultdiv = document.createElement('div');
    var resultStr = "您的爱好是：";
    $(selector).appendChild(resultdiv);
    var resultArr = [];
    result = uniqArray(result);
    if(result.length > 10){
        $('.error').style['visibility'] = 'visible'
    } else {
        for (var i=0; i<result.length; i++){
            if(!/\x20\t\r\n\f/.test(result[i])){
                resultStr +="<input type='checkbox' ><label>"+ result[i]+"</label>";
            }
        }
        if (result.length) {
            resultdiv.innerHTML = resultStr;
        };
    }
}
