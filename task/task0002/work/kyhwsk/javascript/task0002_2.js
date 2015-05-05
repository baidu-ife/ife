/**
 * Created by wsk on 15/4/30.
 */
var offset = {};
var InputDate;
var timerId;
function isInvalide(){
    var timeInputString = $("#timeInput").value;
    if(/\d{4}(-\d{1,2}){2}/.test(timeInputString)) {
        InputDate = new Date(timeInputString);
        return true;
    }
    else
        return false;
}

function showTips(){
    $('#hint').style.display = isInvalide()? 'none' : 'block';
}
function caculateOffset(inputDate , clickDate){

    var offsetSecond = Math.floor((clickDate - inputDate)/1000);
    offset.subtracSecond = Math.floor(offsetSecond % 60);
    offset.subtracMinute = Math.floor((offsetSecond/60) % 60);
    offset.subtracHour = Math.floor((offsetSecond/3600) % 60);
    offset.subtracDay = Math.floor((offsetSecond/86400));
}
function countDown(){
    offset.subtracSecond  = (offset.subtracSecond - 1 + 60)%60;
    if(offset.subtracSecond == 0)
    offset.subtracMinute = (offset.subtracMinute - 1 + 60)%60;
    if(offset.subtracMinute == 0)
        offset.subtracHour = (offset.subtracMinute - 1 + 12)%12;
    if(offset.subtracHour == 0)
        offset.subtracDay--;
    if(offset.subtracDay == 0)
        clearInterval(timerId);
}
function showOffset(){
    $("#offset").innerHTML = "away from now :" + offset.subtracDay + " d "
    + offset.subtracHour + " h "
    + offset.subtracMinute + " m "
    +offset.subtracSecond + " s ";
}

$.on('#submit-btn', 'click', function() {
    if (isInvalide()) {
        caculateOffset(InputDate,  new Date());
        timerId = setInterval(function(){
            countDown();
            showOffset();
        } ,1000);
    }
    else{
        clearInterval(timerId);
        $("#offset").innerHTML = "";
    }
});


$.on('#timeInput', 'textInput', showTips);
