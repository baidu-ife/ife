/**
 * Created by feizq on 15-4-27.
 */
/*输入提示框的编写：
*1.input,里的文本值变化时，显示输入提示框对应的
*2.允许点击输入提示框的值，
* */

var searchDate = ["text1","text12","text13","text14","apple"];
unit.addEvent(unit.$("input"),"input",function(e){
    var e = e|| window.event;
    var that = e.target|| e.srcElement;
    var searchWordStr = " ";

    var rg = new RegExp("^"+that.value);
    for(var i =0;i<searchDate.length;i++){
        if(rg.test(searchDate[i])){
            searchWordStr = "<p>"+searchDate[i]+"</p>"+searchWordStr;
        }
    }
    unit.$(".remind").innerHTML = searchWordStr;

});

unit.delegateEvent(unit.$(".remind"),"p","click",function(e,target){
   console.log(target.html());
   unit.$("input").innerHTML = target.value;
   unit.$(".remind").innerHTML  = " ";
});