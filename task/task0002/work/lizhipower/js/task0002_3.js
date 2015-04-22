/**
 * Created by Zhi_LI on 2015/4/19.
 */
var slideLists = $('#slide-main .slide-ele');
var slideNum = slideLists.length;
var leftBtn = $('#left-btn');
var rightBtn = $('#right-btn');

var timerId, startTime, frameTime = 13, dur = 0.5 * 1000;
var tLStart = 0;
var tpLStart = -100;

var tRStart = 0;
var tpRStart = 100;

var modeGlobal = 'left';

var slideGuide = $('#slider-guide');

var timeoutId;
var slideId = 0;
var autoflowMode = 'left';


for (i = 0; i < slideNum; i++) {
    slideGuide[0].innerHTML = slideGuide[0].innerHTML + "<li class='carousel' id='carousel" + i + "'>" + "</li>";
}
slideGuide[0].innerHTML = "<ol>" + slideGuide[0].innerHTML + "</ol>";
var slideGuides = $('.carousel');

slideGuides[0].style.backgroundColor = 'black';


autoFlow();

slideGuides.click(
    function(evt){
        if (timeoutId) {
            clearTimeout(timeoutId);
        }
        choose(evt);
        $.stopDefault(evt);

        timeoutId = setTimeout(autoFlow, 1000*1);

    });

leftBtn.click(function(){
    if (timeoutId) {
        clearTimeout(timeoutId);
    }

    //leftBtn[0].disabled = '';
    slideId = slideId + 1;
    if (slideId == slideNum){
        slideId = 0;
        //leftBtn[0].disabled = 'disabled';

    }
    for (i = 0; i < slideNum; i++) {
        if (i < slideId) {
            slideLists[i].style.left = 100 + '%';
        } else if (i > slideId) {
            slideLists[i].style.left = -100 + '%';

        } else {
            slideLists[i].style.left = 0 + '%';
        }
    }
    timeoutId = setTimeout(autoFlow, 1000*1);

});
rightBtn.click(function(){
    if (timeoutId) {
        clearTimeout(timeoutId);
    }
    //rightBtn[0].disabled = '';

    slideId = slideId - 1;
    if (slideId == -1){
        slideId = slideNum - 1;
        //rightBtn[0].disabled = 'disabled';

    }
    for (i = 0; i < slideNum; i++) {
        if (i < slideId) {
            slideLists[i].style.left = 100 + '%';
        } else if (i > slideId) {
            slideLists[i].style.left = -100 + '%';

        } else {
            slideLists[i].style.left = 0 + '%';
        }
    }
    timeoutId = setTimeout(autoFlow, 1000*1);
});


function autoFlow () {

    var target = slideLists[slideId];
    timeoutId = setTimeout(autoFlow, 1000*1);

    start(target);

    if (modeGlobal == 'left'){
        slideId = slideId + 1;

    } else if (modeGlobal == 'right'){
        slideId = slideId - 1;

    }
    if (slideId == slideNum) {
        modeGlobal = 'right';
        slideId = slideId - 2;
    }else if (slideId == -1) {
        modeGlobal = 'left';
        slideId = slideId + 2;

    }
}

function start(target) {
    startTime = new Date();
    timerId = setInterval(function () {
        animFun(target, modeGlobal)
    }, frameTime);
}

function choose(evt) {
    console.log('choose');
    //console.log(e.target.id);
    var target = window.event? evt.srcElement:  evt.target;

    slideGuides.each(function () {
        this.style.backgroundColor = '';
    });
    var str = target.id;
    target.style.backgroundColor = 'black';
    var carouselNum = parseInt(str.charAt(str.length - 1));
    slideId = carouselNum;

    console.log(carouselNum);
    for (i = 0; i < slideNum; i++) {
        if (i < carouselNum) {
            slideLists[i].style.left = 100 + '%';
        } else if (i > carouselNum) {
            slideLists[i].style.left = -100 + '%';

        } else {
            slideLists[i].style.left = 0 + '%';
        }
    }


}
function animFun(t, mode) {
    //console.log(mode);

    if (mode == 'left') {
        //console.log('1');
        slideLeft();

    } else if (mode == 'right') {
        //console.log('2');

        slideRight();

    }

    function slideLeft() {
        var per = Math.min(1.0, (new Date() - startTime) / dur);
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
                slideGuides.each(function () {
                    this.style.backgroundColor = '';
                });
                slideGuides[carouselNum - 1].style.backgroundColor = 'black';

            } else {
                t.style.left = 100 + "%";
                slideRight();
            }

        } else {
            //var tLStart =
            var spd = Math.round(per * 100);
            //console.log(spd);

            if (t.nextSibling.nextSibling) {
                t.style.left = spd + tLStart + "%";

                t.nextSibling.nextSibling.style.left = spd + tpLStart + "%";
                //console.log(t.nextSibling.nextSibling.id + 'a1');
                str = t.nextSibling.nextSibling.id;
                carouselNum = parseInt(str.charAt(str.length - 1));
                slideGuides.each(function () {
                    this.style.backgroundColor = '';
                });
                slideGuides[carouselNum - 1].style.backgroundColor = 'black';

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
                slideGuides.each(function () {
                    this.style.backgroundColor = '';
                });
                slideGuides[carouselNum - 1].style.backgroundColor = 'black';

            } else {
                t.style.left = -100 + "%";

                slideLeft();
            }

        } else {
            //var tLStart =
            var spd = Math.round(per * 100);
            //console.log(spd);

            if (t.previousSibling.previousSibling) {
                t.style.left = -spd + tRStart + "%";

                t.previousSibling.previousSibling.style.left = -spd + tpRStart + "%";
                //console.log(t.previousSibling.previousSibling.id + 'a');
                str = t.previousSibling.previousSibling.id;
                carouselNum = parseInt(str.charAt(str.length - 1));
                slideGuides.each(function () {
                    this.style.backgroundColor = '';
                });
                slideGuides[carouselNum - 1].style.backgroundColor = 'black';

            } else {
                console.log('left');

                modeGlobal = 'left';
            }
        }
    }

}

