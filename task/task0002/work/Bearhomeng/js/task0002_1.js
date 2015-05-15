window.onload = function () {
    $.click($('#btnHobby1'), function () {
        var str = trim($("#hobby1").value);
        var hobbies = str.split(/[\,\uff0c\u3001\;\uff1b\u0020\s ]+/);
        hobbies = uniqArray(hobbies);
        $('#pHobby1').innerHTML = '';
        each(hobbies, function (e, i) {
            $('#pHobby1').innerHTML += "<div>" + e + "</div>";
        });
    });
    /*22222222222222222222222222222222222222222222222222222222*/
    $.click($('#btnHobby2'), function () {
        var str = trim($("#hobby2").value);
        var hobbies = str.split(/[\,\uff0c\u3001\;\uff1b\u0020\s ]+/);
        hobbies = uniqArray(hobbies);
        $('#pHobby2').innerHTML = '';
        each(hobbies, function (e, i) {
            $('#pHobby2').innerHTML += "<div>" + e + "</div>";
        });
    });

    /*3333333333333333333333333333333333333333333333333333333333333333333333333333333333333333*/
    function checkHobbies(hobbies) {
        if (hobbies.length > 10) {
            $.showErrorTip($('#btnHobby3'), "不能超过10个");
        } else if (hobbies == undefined || hobbies.length == 0) {
            $.showErrorTip($('#btnHobby3'), "不能为空");
        } else {
            $.hiddenErrorTip($('#btnHobby3'));
        }
    }

    $.on($('#hobby3'), "keypress", function () {
        var hobbies = $("#hobby3").value.split(/[\,\uff0c\u3001\;\uff1b\u0020\s ]+/);
        checkHobbies(hobbies);
    });

    $.click($('#btnHobby3'), function () {
        var str = trim($("#hobby3").value);
        console.log(str);
        var hobbies = [];
        if (str != "") {
            hobbies = str.split(/[\,\uff0c\u3001\;\uff1b\u0020\s ]+/);
        }
        checkHobbies(hobbies);
        hobbies = uniqArray(hobbies);
        $('#pHobby3').innerHTML = '';
        each(hobbies, function (e, i) {
            $('#pHobby3').innerHTML += "<div>" + e + "</div>";
        });
    });
};
