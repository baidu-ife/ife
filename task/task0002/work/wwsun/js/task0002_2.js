//var target_date = new Date("Aug 15, 2019").getTime();

var target_date;
var days, hours, minutes, seconds;
var countdown = $('#countdown');

addEvent($('#countBtn'), 'click', clickHandler);

function clickHandler() {
    var date = $('#targetDate').value;
    target_date = new Date(date).getTime();
    setInterval(getCountDown, 1000);
}

// todo: bug fix, when the date due display all zeros
function getCountDown() {
    var current_date = new Date().getTime();
    var seconds_left = (target_date - current_date) / 1000;

    console.log('hello');

    // do some time calculations
    years = parseInt(seconds_left / (86400 * 365));
    days = parseInt(seconds_left / 86400 - years * 365);
    seconds_left = seconds_left % 86400;

    hours = parseInt(seconds_left / 3600);
    seconds_left = seconds_left % 3600;

    minutes = parseInt(seconds_left / 60);
    seconds = parseInt(seconds_left % 60);

    // format countdown string + set tag value
    countdown.innerHTML = years + "\tyear(s), " + days + "\tday(s), " + hours + "\thour(s), "
        + minutes + "\tmin, " + seconds + "\tseconds";
}