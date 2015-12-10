define(function(){
        function $ (selector) {
        var i,arr,length,element,selec;
        element = document;//element默认为document对象
        arr = selector.split(' ');//将选择字符串用空格分开
        length = arr.length;//获取选择器的层级数
        i = 0;
        while( i < length) {
            if(arr[i].charAt(0) == "#"){
                selec = /[^#].*/.exec(arr[i]);//使用正则提取id选择器
                element = element.getElementById(selec);
                //alert("ID selector!")
            }else if(arr[i].charAt(0) == "."){
                selec = /[^\.].*/.exec(arr[i]);//使用正则提取class选择器
                //alert(selec);
                if ( element.getElementsByClassName ) {
                    element = element.getElementsByClassName(selec);
                }
                else {// 兼容IE8及以下
                    var j,len;
                    var a = element.getElementsByTagName('*');
                    element = [];
                    for (j = 0, len = a.length ; j < len ; j++) {
                        if (hasClassName(a[j],selec)) {
                            element.push(a[j]);
                        }
                    }
                }
                //alert("class selector!")
            }else if(arr[i].charAt(0) == "["){
                selec =  /[^[].*[]$]/.exec(arr[i]);//使用正则提取id选择器
                var j,len;
                var a = element.getElementsByTagName('*');
                for (j = 0,len = a.length ;j < len ; j++) {
                    //if (a[j].getAttribute())
                }
               // alert("attr selector!")
            }else {
                element = element.getElementsByTagName(arr[i])[0];
                //alert("Tag selector!")
            }
            i++;
        }
        return element;

        function hasClassName (element,className) {
            var array = [];
            if (!element.className) return false;
            array = element.className.split(' '); // 将obj的classname以空格隔开存进数组
            //alert(array[0]);
            for (var i = 0, len = array.length; i < len; i++) {
                if (array[i] == className) {// ''==' 与 '===' 的故事
                    return true;
                }
            }
            return false;
        }
    }
    window.$ = $;// 暴露为window下的全局对象
});