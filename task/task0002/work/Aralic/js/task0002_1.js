window.onload = function() {

    //新建三个开关
    var  onOff1 = true;
    var  onOff2 = true;
    var  onOff3 = true;

    //第一阶段
    var oInput1 = $('#input1');
    var oBtn1 = $('#btn1');

    oBtn1.onclick = function() {
        if (oInput1.value != '') {

            //对输入框值进行处理，返回的数组去重并且去首位空格
            var arr1 = uniqueArray(oInput1.value.split(/,/),true);
            
            //新创建p标签 添加到父级下面
            if (onOff1) {
                var oP = document.createElement('p');
                oP.id = 'info1';
                oP.innerHTML = arr1.join(',');
                oBtn1.parentNode.appendChild(oP);
                onOff1 = false;
             } else {
                //直接渲染创建好的p标签
                 $('#info1').innerHTML = arr1.join(',');
            }
            oInput1.value = '';
        }
    };

    //第二阶段
    var oInput2 = $('#input2');
    var oBtn2 = $('#btn2');
    oBtn2.onclick = function() {
        var re = /[,\s，、；;\n]/;
        
        //对输入框值进行处理，返回的数组去重并且去首位空格
        var arr = uniqueArray(oInput2.value.split(re),true);

        //创建p标签 添加到body
        if (onOff2) {   
            var oP = document.createElement('p');
            oP.id = 'info2';
            oP.innerHTML = arr.join(',');
            oBtn2.parentNode.appendChild(oP);
            onOff2 = false;
        } else {
            $('#info2').innerHTML = arr.join(',');
        }
        oInput2.value = '';
    };

// 用户输入的爱好数量不能超过10个，也不能什么都不输入。
// 当发生异常时，在按钮上方显示一段红色的错误提示文字，
// 并且不继续执行后面的行为；当输入正确时，提示文字消失。
// 同时，当点击按钮时，不再是输出到一个段落，而是每一个爱好输出成为一个checkbox，
// 爱好内容作为checkbox的label。
    var oInput3 = $('#input3');
    var oBtn3 = $('#btn3');
    var oInfo = $('#error-info');
    var tip = -1;
    var iNow = -1;
    var arr3 = [];
    oInput3.onkeyup = function() {

        var re = /[,\s，、；;\n]/;
        
       //对输入框值进行处理，返回的数组去重并且去首位空格
        arr3 = oInput3.value.split(re);
        for (var i = 0; i<arr3.length; i++) {
            //对得到每项数组元素去首位空格
            arr3[i] = trim(arr3[i]);
            //用户输入存在重复项
            if (!isRepectArray(arr3)) {
                tip = 0;
                break;
                //用户输入有空内容项
            } else if (arr3[i] == '' && i != arr3.length-1) {
                tip = 1;
                break;
                //用户输入超过10个内容项
            } else if (arr3.length > 10 && tip != 1) {
                tip = 2;
                break;
            } 
        }
        //用户全部输入正确情况
        if (i == arr3.length) {
            tip = 3;
        }

        //针对用户输入 作出相应提示文字
        if (tip != iNow) {
            switch (tip) {
                case 0:
                    oInfo.innerHTML = "您输入的爱好重复,请删除重新输入!";
                    break;
                case 1: 
                    oInfo.innerHTML = '输入为空，请删除重新输入！';
                    break;
                case 2:
                    oInfo.innerHTML = '您输入超出10个爱好！！';
                    break;
                case 3:
                    oInfo.innerHTML = '';
                    break;
            }
        }
        iNow = tip;
    }

    oBtn3.onclick = function() {
        if (tip == 3) {
            var str = '';
            for (var i = 0; i<arr3.length; i++) {
                str += '<label for="#"><input type="checkbox">'+arr3[i]+'</label>';
            }

            if (onOff3) {
                var oForm = document.createElement('form');
                oForm.innerHTML = str;
                oForm.id = "form1";
                this.parentNode.appendChild(oForm);
                onOff3 = false;
            } else {
                $('#form1').innerHTML = str;
            }
            
        }
    }

    //判断数组是否有重复项 返回boolean 有重复项 返回false;
    function isRepectArray(arr) {
        var obj = {};
        for (var i = 0; i<arr.length; i++) {
            arr[i] = trim(arr[i]);
            if (!obj[arr[i]]) {
                obj[arr[i]] = arr[i];
            } else {
                return false;
            }
        }
        return true;
    }
};