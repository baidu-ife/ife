/**
 * Created by Zhi_LI on 2015/4/19.
 */
var sliderLists = $('#slider-main .slider-ele');
var sliderNum = sliderLists.length;

var timerId, startTime, frameTime = 13, dur = 0.5 * 1000;
var tLStart = 0;
var tpLStart = -100;

var tRStart = 0;
var tpRStart = 100;

var modeGlobal = 'left';

var sliderGuide = $('#slider-guide');

for (i = 0; i < sliderNum; i++) {
    sliderGuide[0].innerHTML = sliderGuide[0].innerHTML + "<li class='carousel' id='carousel" + i + "'>" + "</li>";
}
sliderGuide[0].innerHTML = "<ol>" + sliderGuide[0].innerHTML + "</ol>";

var sliderGuides = $('.carousel');
sliderGuides[0].style.backgroundColor = 'black';

sliderGuides.click(choose);
sliderLists.click(start);

function animFun(t, mode) {
    console.log(mode);

    if (mode == 'left') {
        console.log('1')
        slideLeft();
    } else if (mode == 'right') {
        console.log('2')

        slideRight();
    }

    function slideLeft() {
        var per = Math.min(1.0, (new Date - startTime) / dur);
        var str,carouselNum;
        if (per >= 1) {
            clearTimeout(timerId);
            //t.style.visibility = 'hidden';
            if (t.nextSibling.nextSibling) {
                t.style.left = 100 + "%";

                t.nextSibling.nextSibling.style.left = 0 + "%";
                //console.log(t.nextSibling.nextSibling.id + 'b1');
                str = t.nextSibling.nextSibling.id;
                carouselNum = parseInt(str.charAt(str.length - 1));
                sliderGuides.each(function () {
                    this.style.backgroundColor = '';
                });
                sliderGuides[carouselNum - 1].style.backgroundColor = 'black';

            } else {
                t.style.left = 100 + "%";
                slideRight();
            }

        } else {
            //var tLStart =
            var spd = Math.round(per * 100);
            console.log(spd)

            if (t.nextSibling.nextSibling) {
                t.style.left = spd + tLStart + "%";

                t.nextSibling.nextSibling.style.left = spd + tpLStart + "%";
                //console.log(t.nextSibling.nextSibling.id + 'a1');
                str = t.nextSibling.nextSibling.id;
                carouselNum = parseInt(str.charAt(str.length - 1));
                sliderGuides.each(function () {
                    this.style.backgroundColor = '';
                });
                sliderGuides[carouselNum - 1].style.backgroundColor = 'black';

            } else {
                console.log('right');
                //slideRight();
                modeGlobal = 'right';
            }
        }
    }

    function slideRight() {
        var per = Math.min(1.0, (new Date - startTime) / dur);
        var str,carouselNum;
        if (per >= 1) {
            clearTimeout(timerId);
            //t.style.visibility = 'hidden';
            if (t.previousSibling.previousSibling) {
                t.style.left = -100 + "%";

                t.previousSibling.previousSibling.style.left = 0 + "%";
                //console.log(t.previousSibling.previousSibling.id + 'b');
                str = t.previousSibling.previousSibling.id;
                carouselNum = parseInt(str.charAt(str.length - 1));
                sliderGuides.each(function () {
                    this.style.backgroundColor = '';
                });
                sliderGuides[carouselNum - 1].style.backgroundColor = 'black';

            } else {
                t.style.left = -100 + "%";

                slideLeft();
            }

        } else {
            //var tLStart =
            var spd = Math.round(per * 100);
            console.log(spd);

            if (t.previousSibling.previousSibling) {
                t.style.left = -spd + tRStart + "%";

                t.previousSibling.previousSibling.style.left = -spd + tpRStart + "%";
                //console.log(t.previousSibling.previousSibling.id + 'a');
                str = t.previousSibling.previousSibling.id;
                carouselNum = parseInt(str.charAt(str.length - 1));
                sliderGuides.each(function () {
                    this.style.backgroundColor = '';
                });
                sliderGuides[carouselNum - 1].style.backgroundColor = 'black';

            } else {
                console.log('left');

                modeGlobal = 'left';
            }
        }
    }

}

function start(e) {
    console.log('start');
    startTime = new Date;
    console.log(e.target);
    console.log(e.target.style.left);

    //tLStart = 0;
    //tpLStart = -100;
    //console.log(tLStart);
    //console.log(tpLStart);
    timerId = setInterval(function () {
        animFun(e.target, modeGlobal)
    }, frameTime);
}

function choose(e) {
    console.log('choose');
    //console.log(e.target.id);
    sliderGuides.each(function () {
        this.style.backgroundColor = '';
    });
    var str = e.target.id;
    e.target.style.backgroundColor = 'black';
    var carouselNum = parseInt(str.charAt(str.length - 1));
    //console.log(carouselNum);
    for (i = 0; i < sliderNum; i++) {
        if (i < carouselNum) {
            sliderLists[i].style.left = 100 + '%';
        } else if (i > carouselNum) {
            sliderLists[i].style.left = -100 + '%';

        } else {
            sliderLists[i].style.left = 0 + '%';
        }
    }


}