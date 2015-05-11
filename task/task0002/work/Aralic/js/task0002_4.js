window.onload = function() {
    
    //给文本输入框绑定按键抬起事件
    addEvent($('#kw'), 'keyup', getData);
};

//按键抬起事件
function getData() {
    //下拉提示列表
    var oDataList = $('#dataList');
    //搜索框
    var sInput = $('#kw');
    var oldValue = null;
    //当前文本框的值不为空 且和之前不相同
    if (sInput.value != '' && sInput.value != oldValue) {
        //创建script标签
        var oScript = document.createElement('script');
        //获取时间戳
        var oTime = new Date().getTime()
        oScript.src = 'https://sp0.baidu.com/5a1Fazu8AA54nxGko9WTAnF6hhy/su?wd='+(sInput.value)+'&json=1&p=3&cb=Aralic&oTime';
        document.body.appendChild(oScript);
    } else if (sInput.value == '') {
        // 如果文本框值为空 清除oDataList的内容并隐藏
        oDataList.style.display = 'none';
        oDataList.innerHTML = "";
    } 
    oldValue = sInput.value;
}

//jsonp的回调函数
function Aralic(data) {
    console.log(data);
    var oDataList = $('#dataList');
    var sInput = $('#kw');
    var str = '';
    var iNow = -1;
   
    //当有数据返回时
    if (data.s.length) {
        //拼接字符串
        for (var i = 0; i<data.s.length; i++) {
            str += '<li><a href="https://www.baidu.com/s?wd='+data.s[i]+'" target=_blank>'+data.s[i]+'</a></li>';
        }
        oDataList.style.display = 'block';
        oDataList.innerHTML = str;

        //↑ ↓ 两个按键事件
        document.onkeydown = function(ev) {

            var ev = ev || window.event;
            var aLi = oDataList.getElementsByTagName('li');
            //↓键
            if (ev.keyCode == 40) {

                for (var i = 0; i<aLi.length; i++) {
                    aLi[i].className = '';
                }

                iNow ++;
                if (iNow == aLi.length) {
                    iNow = 0;
                }
                //移除给文本框的绑定事件
                removeEvent(sInput, 'keyup', getData);
                sInput.value = data.s[iNow];
                aLi[iNow].className = "active";

            } else if (ev.keyCode == 38) {

                for (var i = 0; i<aLi.length; i++) {
                    aLi[i].className = '';
                }
                
                iNow = iNow -1;
                if (iNow == -1) {
                    iNow = aLi.length - 1;
                }

                removeEvent(sInput, 'keyup', getData);
                sInput.value = data.s[iNow];
                aLi[iNow].className = "active";
            }
            
            document.onkeyup = function() {
                //重新绑定事件
                addEvent(sInput, 'keyup', getData);
            }

        }
        //无数据返回时候 ul内容置空并隐藏
    } else {
        oDataList.style.display = 'none';
        oDataList.innerHTML = "";
    }   
}