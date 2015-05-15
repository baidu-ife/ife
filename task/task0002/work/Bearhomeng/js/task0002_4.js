/**
 * Created by jiawen on 2015/4/26.
 */
window.onload = function () {
    $.on($('#name'), 'keyup', function (e) {
        if(e.keyCode == 38 || e.keyCode == 40){
            $('.tip').focus();
            $('#name').blur();
            return;
        }
        var inputEle = $('#name');
        var tipDiv = $('.tip');
        var str = trim(inputEle.value);
        tipDiv.style.top = inputEle.style.top + inputEle.clientHeight;
        tipDiv.style.left = inputEle.style.left + inputEle.clientWidth;
        tipDiv.style.display = "none";
        tipDiv.innerHTML = "";
        if (str == "") {
            return;
        }
        //以下这段改成ajax就可以了
        var suggestData = ['Simon', 'Erik', 'Kener'];
        var suggestResult = [];
        for (var i in suggestData) {
            if (suggestData[i].toLowerCase().indexOf(str.toLowerCase()) > -1) {
                suggestResult.push(suggestData[i]);
                console.log(suggestData[i]);
            }
        }
        for (var i in suggestResult) {
            var item = document.createElement('div');
            item.innerHTML = suggestResult[i];
            tipDiv.appendChild(item);
        }
        if (tipDiv.innerHTML != "") {
            tipDiv.style.display = "block";
        }
        //ajax('http://locahost:8080/test.php?r=' + str + '&t='+ (new Date().getTime()),{
        //    onsuccess: function (responseText,xhr) {
        //        var responseText = [];
        //        if(responseText == ""){
        //            return;
        //        }
        //        responseText = responseText.split(",");
        //        for (var i in suggestResult) {
        //            var item = document.createElement('div');
        //            item.style.textAlign = 'center';
        //            item.style.lineHeight = '18px';
        //            item.innerHTML = suggestResult[i];
        //            tipDiv.appendChild(item);
        //        }
        //        if (tipDiv.innerHTML != "") {
        //            tipDiv.style.display = "block";
        //        }
        //    }
        //});
    });
    $.delegate($('.tip'), 'div', 'click', function (e) {
        var srcEle = getSrcElement(e);
        $('#name').value = srcEle.innerHTML;
        //恢复焦点
        $('#name').focus();
        $('.tip').style.display = "none";
    });

    $.delegate($('.tip'), 'div', 'mouseover', function (e) {
        //其他的失去
        var srcEle = getSrcElement(e);
        var active = $('.tip-active');
        if(active != undefined){
            removeClass(active,'tip-active');
        }
        addClass(srcEle,'tip-active');

    });

    document.onkeyup = function (e) {
        if ($('.tip').style.display == "none") {
            return;
        }
        if (e.keyCode == 38) {
            var active = $('.tip-active');
            if (active == undefined) {
                addClass($('.tip').lastChild,'tip-active');
            } else {
                removeClass(active,'tip-active');
                if (active.previousSibling == undefined) {
                    $('#name').focus();
                    $('.tip').blur();
                } else {
                    addClass(active.previousSibling,'tip-active');
                }
            }
        }
        else if (e.keyCode == 40) {
            var active = $('.tip-active');
            if (active == undefined) {
                addClass($('.tip').firstChild,'tip-active');
            } else {
                removeClass(active,'tip-active');
                if (active.nextSibling == undefined) {
                    $('#name').focus();
                    $('.tip').blur();
                } else {
                    addClass(active.nextSibling,'tip-active');
                }
            }
        }
        if(e.keyCode == 13) {
            var active = $('.tip-active');
            if(active != undefined) {
                $('#name').value = active.innerHTML;
                removeClass(active,"tip-active");
                $('.tip').style.display = "none";
                //恢复焦点
                $('#name').focus();
            }
        }
    }
};