$.on($('#part1 button'),'click',function(e){
  var interests = $('#part1 input').value;
  var interestArr = uniqArray(interests.split(','));
  filterArray(interestArr,function(item){
    return +item === 0 && item !== '0';
  });
  var htmlStr = '';
  each(interestArr,function(item,index){    
      htmlStr += '<p>' + item + '</p>';      
  });
  $('#part1 .result').innerHTML = htmlStr;
});

$.on($('#part2 button'),'click',function(e){
  var interests = $('#part2 textarea').value;
  //换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号
  var splitReg = /[\s,， 、;；]/;
  var interestArr = uniqArray(interests.split(splitReg));
  filterArray(interestArr,function(item){
    return +item === 0 && item !== '0';
  });
  var htmlStr = '';
  each(interestArr,function(item,index){    
      htmlStr += '<p>' + item + '</p>';    
  });
  $('#part2 .result').innerHTML = htmlStr;
});

function showTips(str){
  $('.tips').innerHTML = '<p>' + str + '</p>';
  //removeClass($('.tips'),'hide');
}
function hideTips(){
   $('.tips').innerHTML = '';
  addClass($('.tips'),'hide');
}

$.on($('#part3 button'),'click',function(e){
  var interests = $('#part3 textarea').value;
  //换行、空格（全角/半角）、逗号（全角/半角）、顿号、分号
  var splitReg = /[\s,， 、;；]/;
  var interestArr = uniqArray(interests.split(splitReg));
  filterArray(interestArr,function(item){
    return +item === 0 && item !== '0';
  });
  if(interestArr.length > 10){
    showTips('输入的兴趣不能超过10个');
  }else if(interestArr.length === 0){
    showTips('输入的兴趣不能为空');
  }else{
    hideTips();
    var htmlStr = '';
    each(interestArr,function(item,index){
        htmlStr += '<label><input type="checkbox" name="interest" value="' + item + ' ">' + item + '</label>';  
    });
    $('#part3 .result').innerHTML = htmlStr;
  }
  
})
