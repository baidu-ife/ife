window.onload = function() {
    var hobby1 = $('#hobby1');
    var hobbyBtn1 = $('#hobby_btn1');
    var hobby2 = $('#hobby2');
    var hobbyBtn2 = $('#hobby_btn2');
    //第一阶段
    $.on(hobbyBtn1, 'click', function () {
        var hobbyVal1 = hobby1.value;
        var hobbys1 = uniqArray(hobbyVal1.split(','));

        hobbyAdd(hobbys1, 'p', '#hobbyList1', hobby1);
    });

    //第二阶段
    $.on(hobbyBtn2, 'click', function() {
        var hobbyVal2 = hobby2.value;
        var hobbys2 = uniqArray(hobbyVal2.split(/[,，\s、；;]/));
        hobbyAdd(hobbys2, 'p', '#hobbyList2', hobby2);

    });



    function hobbyAdd(hbArr, tag, id, hbinput) {
        var p = document.createElement(tag);
        for (var i = 0, len = hbArr.length; i < len; i++) {
            p.innerHTML += hbArr[i] + '  ';
            p.id = id.substring(1);
        }
        if($(id)) {
            $(id).innerHTML = p.innerHTML;
        } else {
            hbinput.parentNode.appendChild(p);
        }
    }



    //第三阶段
    var hobby3 = $('#hobby3');
    var hobbyBtn3 = $('#hobby_btn3');
    var hb3 = $('#hb3');
    var hbInfo = $('#hb3_info');
    addEvent(hobby3, 'focus', function(e) {
        var e = e || window.event;
        hobby3.onkeyup = function(e){
            //alert(e.keyCode);
            var hobbyVal3 = hobby3.value;
            var hobbys3 = uniqArray(hobbyVal3.split(/[,，\s、；;]/));
            if(hobbys3.length<10) {
                if(hobbys3[0] == '') hobbys3.length = 0;
                hbInfo.className = 'info-yes';
                hbInfo.innerHTML = '提示：爱好数量不能超过10个，你还可以输入' + (10-hobbys3.length) + '个爱好';
            }
            if(hobbys3.length>=10) {
                //alert(hobbys3[9].length);
                //alert(hobbyVal3.length);
                hbInfo.className = 'info-no';
                hbInfo.innerHTML = '提示：你的输入已达到10个';
                //alert(hobbys3[9]);
                hobby3.value = hobbyVal3.substring(0, hobbyVal3.indexOf(hobbys3[9])+hobbys3[9].length);

            }
            if(hobbys3.length == 0) {
                hobbyBtn3.disabled = true;
            } else {
                hobbyBtn3.disabled = false;
            }
        }
    })
    addEvent(hobbyBtn3, 'click', function() {
        var hobbyVal3 = hobby3.value;
        var hobbys3 = uniqArray(hobbyVal3.split(/[,，\s、；;]/));
        if($('#hb3_list')) {
            hb3.removeChild($('#hb3_list'));
        }
        var hbDiv = document.createElement('div');
        hbDiv.id = 'hb3_list';
        hb3.appendChild(hbDiv);
        if(hobbys3[0] == '') hobbys3.length = 0;
        for(var i = 0, len=hobbys3.length; i < len; i++) {
            var checkbox = document.createElement('input');
            checkbox['type'] = 'checkbox';
            checkbox.name = 'hb3_checkbox';
            checkbox.checked = 'checked';
            hbDiv.appendChild(checkbox);
            var p = document.createElement('p');
            p.className = 'hb3-checkbox-p';
            p.innerHTML = (i+1) + ' ' + hobbys3[i];
            hbDiv.appendChild(p);

        }
    })

}

