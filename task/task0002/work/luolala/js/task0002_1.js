var oBtn=$('#hobby-btn');
addClickEvent(oBtn,function(){
    var oInput=$('#hobby-input');
    var oContent=$('#content');
    var oError=$("#error");

    var contentArray=trim(oInput.value);
    var oNew=document.createElement("p");
     addClass(oNew,"errorWarn");
     oError.appendChild(oNew);
    if(contentArray!="")
    {

    //var nContent=trim(contentArray);
        //console.log(nContent);
     if(contentArray[contentArray.length-1].match(/[，\s、；；，]+/g))
        contentArray=contentArray.slice(0,contentArray.length-1);//去掉最后的分隔符；
    var arr=contentArray.split(/[，\s、；；，]+/g);
    var uniq=uniqArray(arr);//去重

        if(uniq.length>10)
        {
         oNew.innerHTML="输入错误！输入的爱好不能多于10个！"
        }
        else{
          for(var i=0;i<uniq.length;i++)
          {
              var oHobby=document.createElement("input");
              oHobby.type="checkbox";
              var oLabel=document.createElement("label");
              oLabel.innerHTML=uniq[i];

               oContent.appendChild(oHobby);
               oContent.appendChild(oLabel);
               oContent.appendChild(document.createElement("br"));
          }
            document.body.removeChild(oError);
        }
  }
   else{

        oNew.innerHTML="错误！内容不能为空！";//目前没有解决的问题，多次点击，相同的错误提示怎样只出现一次！
    }
oInput.value="";//点击后清空输入框中的文字；

});

