(function() {

    //var target_date = new Date("Aug 15, 2019").getTime();

    var target_date;
    var years, days, hours, minutes, seconds;
    var countdown = $('#countdown');

    addEvent($('#countBtn'), 'click', clickHandler);

    function clickHandler() {
        var date = $('#targetDate').value;
        target_date = new Date(date).getTime();
        setInterval(getCountDown, 1000);
    }

    function getCountDown() {
        var current_date = new Date().getTime();
        var seconds_left = (target_date - current_date) / 1000;

        if (seconds_left > 0) {
            // do some time calculations
            if (seconds_left > 86400 * 365) {
                years = parseInt(seconds_left / (86400 * 365));
            } else {
                years = 0;
            }

            days = parseInt(seconds_left / 86400 - years * 365);
            seconds_left = seconds_left % 86400;

            hours = parseInt(seconds_left / 3600);
            seconds_left = seconds_left % 3600;

            minutes = parseInt(seconds_left / 60);
            seconds = parseInt(seconds_left % 60);
        } else {
            days = 0;
            hours = 0;
            minutes = 0;
            seconds = 0;
        }

        // format countdown string + set tag value
        countdown.innerHTML = years + "\tyear(s), " + days + "\tday(s), " + hours + "\thour(s), "
            + minutes + "\tmin, " + seconds + "\tseconds";
    }
})();