$(function () {
    // 第一阶段
    $('#button1').click(function () {
        var value = $('#input1').val();
        var arr = value.split(',');

        // 去重复方法1（桶排序）
        var map = {};

        $.each(arr, function (i, str) {
            str = $.trim(str);
            if (str && !map[str]) {
                map[str] = true;
            }
        });

        arr = [];
        $.each(map, function (str) {
            arr.push(str);
        });

        $(this).after('<p>爱好：' + arr.join(',') + '</p>');
    });

    // 第二阶段
    $('#button2').click(function () {
        var value = $('#input2').val();
        var arr = value.split(/[,， 　\n\t\f\r]+/g);

        // 去重复方法1（桶排序）
        var map = {};

        $.each(arr, function (i, str) {
            str = $.trim(str);
            if (str && !map[str]) {
                map[str] = true;
            }
        });

        arr = [];

        $.each(map, function (str) {
            arr.push(str);
        });

        $(this).after('<p>爱好：' + arr.join(',') + '</p>');
    });

    // 第二阶段
    $('#button3').click(function () {
        var value = $('#input3').val();
        var arr = value.split(/[,， 　\n\t\f\r]+/g);

        // 去重复方法1（桶排序）
        var map = {};

        $.each(arr, function (i, str) {
            str = $.trim(str);
            if (str && !map[str]) {
                map[str] = true;
            }
        });

        arr = [];

        $.each(map, function (str) {
            arr.push('<label><input type="checkbox">' + str + '</label>');
        });

        var error = $('#error');

        if (arr.length > 0 && arr.length < 11) {
            $(this).after('<p>爱好：' + arr.join(',') + '</p>');
            error.text('');
        }
        else {
            error.text('只允许输入1-10个爱好，您输入了' + arr.length + '个');
        }

    });
});