/**
 * @file task0002_1
 * @author zhangmiao
 */

//第一阶段
$.click('#display-button1', display1);
function display1() {
    var originHobbies = $('#first-input').value.split(',');
    //console.log(originHobbies);
    var hobbies = [];
    for(var i= 0, l = originHobbies.length; i < l; i++) {
        if(originHobbies[i] != ' ' && originHobbies[i] != '\u3000'
            && originHobbies[i] != '\t' && originHobbies[i] != '') {
            hobbies.push(originHobbies[i]);
        }
    }
    each(hobbies, trim1);
    var validHobby = uniqArray(hobbies);
    //console.log(validHobby);
    $('#first-display').innerHTML = validHobby;
}
//第二阶段
$.click('#display-button2', display2);
function display2() {
    //分隔符：空格(半角、全角)、逗号(半角、全角)、顿号、分号(半角、全角)、换行
    var originHobbies = $('#second-input').value.split(/[ \u3000,\uFF0C\u3001;\uFF1B\n]/);
    console.log(originHobbies);
    var hobbies = [];
    for(var i= 0, l = originHobbies.length; i < l; i++) {
        if(originHobbies[i] != ' ' && originHobbies[i] != '\u3000'
            && originHobbies[i] != '\t' && originHobbies[i] != '') {
            hobbies.push(originHobbies[i]);
        }
    }
    each(hobbies, trim1);
    var validHobby = uniqArray(hobbies);
    //console.log(validHobby);
    $('#second-display').innerHTML = validHobby;
}
//第三阶段
$.click('#display-button3', display3);
function display3() {
    //分隔符：空格(半角、全角)、逗号(半角、全角)、顿号、分号(半角、全角)、换行
    var originHobbies = $('#third-input').value.split(/[ \u3000,\uFF0C\u3001;\uFF1B\n]/);
    var hobbies = [];
    for(var i= 0, l = originHobbies.length; i < l; i++) {
        if(originHobbies[i] != ' ' && originHobbies[i] != '\u3000'
            && originHobbies[i] != '\t' && originHobbies[i] != '') {
            hobbies.push(originHobbies[i]);
        }
    }
    each(hobbies, trim1);
    var validHobby = uniqArray(hobbies);
    var hobbyDiv = document.createElement('form');
    hobbyDiv.id = 'third-display';
    $('#third').appendChild(hobbyDiv);
    $('#third-display').innerHTML = '';
    //当用户输入的爱好数量超过10个，且没有输入有效爱好时，抛出异常
    try {
        if(validHobby.length >= 10) {
            throw '输入的爱好不能超过十个！';
        }
        if(validHobby.length === 0) {
            throw '请输入爱好！';
        }
    }
    catch(e) {
        $('#warning').style.display = 'block';
        $('#warning').innerHTML = e;
        return;
    }
    $('#warning').style.display = 'none';
    var sb = '';
    for(var i = 0, l = validHobby.length; i < l; i++) {
        var hobbyID = 'hobby' + i;
        sb += '<input id="';
        sb += hobbyID;
        sb += '" type="checkbox">';
        sb += '<label for="';
        sb += hobbyID;
        sb += '">';
        sb += validHobby[i];
        sb += '</label>';
        sb += ' ';
    }
    $('#third-display').innerHTML = sb;
}
