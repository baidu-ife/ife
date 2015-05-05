/**
 * Created by wsk on 15/4/28.
 */
var InputElement  = $('#elemInput');
function validateInput(){
    var InputStr = InputElement.value;
    InputStr = normolizeInput(InputStr);
    var items =InputStr.length? InputStr.split(' '):[];

    items = uniqArray(items);
    var isValid = items.length <= 10 && items.length > 0;

    $('#hint').style.display = isValid?'none' :'block';
    $('#submit-btn').disabled = !isValid;
    return items;
}

function normolizeInput(InputStr){//normolize InputStr to  a series of substrs partitioned by a space
    return InputStr.replace(/[\s\uFEFF\xA0]+$/,'').replace(/(\W)+/g, ' ');
}

$.on('#elemInput', 'textInput', validateInput);
$.on('#submit-btn', 'click', function(e){
    var items = validateInput();
    var html = [];
    each(items, function(item){
        html.push( tmpl('template', { myItem : item}));
    });
    $('#check-group').innerHTML = html.join('\n');
});