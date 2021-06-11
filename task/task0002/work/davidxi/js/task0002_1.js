var elInput = $('#input');
var elOutput = $('#output');
var elSubmit = $('#submit');
var elAlert = $('#alert');

function validateInput() {
    var items = normalizeInput(elInput.value);
    items = _.unique(items);
    var valid = items.length <= 10;
    elAlert.style.display = valid ? 'none' : 'block';
    elSubmit.disabled = !valid;
}
/**
 * http://stackoverflow.com/questions/2823733/textarea-onchange-detection
 */
$.on(elInput, 'input', validateInput);
$.on(elInput, 'propertychange', validateInput);
// validate initial payload input value
validateInput();

$.on(elSubmit, 'click', function(event) {
    var items = normalizeInput(elInput.value);
    items = _.unique(items);

    var html = [];
    _.each(items, function(item) {
        html.push(_.tmpl('template', {label: item}));
    });
    elOutput.innerHTML = html.join('\n');
});

function normalizeInput(str) {
    var re = /[\n\s,\uFF0C\u3001;\uFF1B]+/;
    return str.split(re);
}