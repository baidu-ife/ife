/**
 * Created by xieyicheng on 2015/4/18.
 */
(function(){
    //第一阶段
    $.click("#btn", function () {
        var str = $('#input').value,
            list,ret,pTag,btn;
        if(str != ""){
            list = str.split(',');
            pTag = document.createElement('p');
            pTag.setAttribute('id','p_1');
            ret = uniqArray(list);
            pTag.innerText = ret.join(',');
            btn = $("#btn");
            if($('#p_1')){
                $('#p_1').parentNode.removeChild($('#p_1'));
            }
            btn.parentNode.appendChild(pTag);
        }
    });
//第二阶段
    $.click("#btn_2", function () {
        var str = $('#textarea').value,
            list,ret,pTag,btn,p_2;
        if(str != ""){
            str=trim(str);
            list = str.split(/[',','，','、',';','，','\s+']/);
            pTag = document.createElement('p');
            pTag.setAttribute('id','p_2')
            ret = uniqArray(list);
            pTag.innerText = ret.join(',');
            btn = $("#btn_2");
            p_2 = $("#p_2");
            if(p_2!=null){
                p_2.parentNode.removeChild(p_2);
            }
            btn.parentNode.appendChild(pTag);
        }
    });
//第三阶段
    $.click("#btn_3", function () {
        var str = $('#textarea_3').value,
            list,
            ret,
            btn = $("#btn_3"),
            checkboxWrap = document.createElement('div'),
            lastList = [],
            pTag = document.createElement('p');
        pTag.setAttribute('class','err');
        checkboxWrap.setAttribute('id',"checkboxWrap");
        if($("#checkboxWrap")!=null){
            $("#checkboxWrap").parentNode.removeChild($("#checkboxWrap"));
        }
        if(str != ""){
            str=trim(str);
            list = str.split(/[',','，','、',';','，','\s+']/);
            ret = uniqArray(list);
            each(ret, function (value, index) {
                if(value != ""){
                    lastList.push(value)
                }
            });
            if(lastList.length>10){
                pTag.innerText = "爱好数量不能超过10个";
                btn.parentNode.appendChild(pTag);
            }
            else{
                pTag = $(".err");
                if(pTag!=null){
                    pTag.parentNode.removeChild(pTag)
                }
                var innerHtml = "";
                each(lastList, function (value) {
                    innerHtml = innerHtml + value + "<input type='checkbox'>";
                });
                checkboxWrap.innerHTML = innerHtml;
                btn.parentNode.appendChild(checkboxWrap);
            }
        }
        else{
            pTag.innerText="出错了，输入不能为空";
            btn = $("#btn_3");
            btn.parentNode.appendChild(pTag);
        }
    });
})();
