var elInput = $('#input');
var elSubmit = $('#submit');
var elOutput = $('#output');

function validateInput() {
    var value = elInput.value;
    if (!/[0-9]{4}-(0[1-9]|1[0-2])-(0[1-9]|[1-2][0-9]|3[0-1])/.test(value)) {
        elSubmit.disabled = true;
        return false;
    }
    elSubmit.disabled = false;
}

$.on(elInput, 'input', validateInput);
// validate initial payload input value
validateInput();

var interval;

$.on(elSubmit, 'click', function(event) {
    window.clearInterval(interval);

    var value = elInput.value;
    var date1 = new Date(_.trim(value));

    function getDelta() {
        var date0 = new Date();

        var delta = Math.floor((+date1 - date0) / 1000);
        if (delta <= 0) {
            elOutput.innerHTML = '倒计时停止';
            return false;
        }
        var cs = delta % 60;
        delta = Math.floor(delta / 60);
        var cf = delta % 60;
        delta = Math.floor(delta / 60);
        var ch = delta % 24;
        delta = Math.floor(delta / 24);
        var cd = delta % 30;
        delta = Math.floor(delta / 30);
        var cm = delta % 12;
        delta = Math.floor(delta / 12);
        var cy = delta;

        return {
            cs: cs,
            cf: cf,
            ch: ch,
            cd: cd,
            cm: cm,
            cy: cy
        };
    }

    var obj = {
        yy: date1.getFullYear(),
        mm: date1.getMonth() + 1,
        dd: date1.getDate() + 1
    };

    function render() {
        var data = getDelta();
        if (data === false) {
            window.clearInterval(interval);
            return;
        }
        obj = Object.assign(obj, data);
        elOutput.innerHTML = _.tmpl('template', obj);
    }

    interval = window.setInterval(render, 1000);

    render();
});