var timerStart = false;
var timer = 0;
var target = {
  year:0,
  month:0,
  date:0,
  time:0
}

function addPrefixZero(num){
  if(num < 10){
    return '0' + num;
  }
  return '' + num;
}
function computeTime(){
    var interval= target.time - (new Date());
    if(interval <= 0){
      clearInterval(timer);
        $('.timer .interval').innerHTML = '0年0月0日0小时0分0秒';
      return;
    }
    var interval = Math.floor(interval/1000); //时间间隔（秒）    
    var year = Math.floor(interval/60/60/24/365);    
    var monthLeft = Math.floor(interval - year*365*24*60*60);
    var month = Math.floor(monthLeft/60/60/24/30);    
    var dateLeft = Math.floor(monthLeft - month*30*24*60*60);
    var date = Math.floor(dateLeft/60/60/24);    
    var hourLeft = Math.floor(dateLeft - date*60*60*24);
    var hour = Math.floor(hourLeft/3600);    
    var minuteLeft = Math.floor(hourLeft - hour*3600);
    var minute = Math.floor(minuteLeft/60);    
    var second = interval % 60;

    year = addPrefixZero(year);
    month = addPrefixZero(month);
    date = addPrefixZero(date);
    hour = addPrefixZero(hour);
    minute = addPrefixZero(minute);
    second = addPrefixZero(second);

    $('.timer .interval').innerHTML = year + '年'+month+'月'+date+'日'+hour+'小时'+minute+'分'+second+'秒';
}
function startTimer(){
  computeTime();
  timer = setInterval(computeTime,1000);  
}
function showTips(){
    $('.tips').innerHTML = '日期格式必须为yyyy-mm-dd,并且大于当前日期';
}
function clearTips(){
    $('.tips').innerHTML = '';
}
$.on($('.timer button'),'click',function(e){
  if(timerStart && timer > 0){
    clearInterval(timer);
    $('.timer button').innerHTML = 'Start';
    timerStart = false;
  }else{
    clearTips();
    var inputDate = $('.timer input').value;
    //YYYY-MM-DD -> mm/dd/yyyy
    var arr = inputDate.split('-');
    target.year = arr[0];
    target.month = arr[1];
    target.date = arr[2];
    target.time = new Date([target.month,target.date,target.year].join('/'));
    if(typeof target.time === 'undefined' || target.time.toString() === 'Invalid Date' || +target.time < +(new Date())){
        showTips();
    }else{
        $('.timer .target').innerHTML = '距离'+target.year+'年'+target.month+'月'+target.date+'日还有';
        startTimer(target);
        $('.timer button').innerHTML = 'Stop';
        timerStart = true;
    }
  }
})