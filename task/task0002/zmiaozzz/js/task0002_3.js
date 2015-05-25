/**
 * @file task0002_3
 * @author zhangmiao
 */
var currentSlide = 1;
var nextSlide = 1;
var currentEle;
var nextEle;
var imageAmount = 5;
//设置是否循环(true循环、false不循环)
var cycle = true;
//轮播顺序（true正序、false逆序）
var order = true;
//间隔时长（毫秒数）
var time = 2000;
var changeState;
window.onload = function () {
    //正序
    $.click('#pos-order', function () {
        if (order === true)
            return;
        order = true;
        nextSlide = nextSlide % imageAmount + 1;
        nextSlide = nextSlide % imageAmount + 1;
    });
    //逆序
    $.click('#neg-order', function () {
        if (order === false)
            return;
        order = false;
        nextSlide = (nextSlide + 3) % imageAmount + 1;
        nextSlide = (nextSlide + 3) % imageAmount + 1;
    });
    //循环
    $.click('#cycle', function () {
        if (!cycle) {
            cycle = true;
            changeSlide();
        }
    });
    //不循环
    $.click('#non-cycle', function () {
        cycle = false;
    });
    $.enter('#time', function () {
        time = parseInt($('#time').value) * 1000;
    });
    $('#slide' + nextSlide).style.left = '0%';
    addClass($('#indicator' + currentSlide), 'active');
    changeSlide();
}
function hiddenLeft() {
    currentEle.style.left = (parseFloat(currentEle.style.left) - 5) + '%';
    if (parseFloat(currentEle.style.left) > -100)
        setTimeout("hiddenLeft()", 10);
}
function showLeft() {
    nextEle.style.left = (parseFloat(nextEle.style.left) - 5) + '%';
    if (parseFloat(nextEle.style.left) > 0)
        setTimeout("showLeft()", 10);
}

function hiddenRight() {
    currentEle.style.left = (parseFloat(currentEle.style.left) + 5) + '%';
    if (parseFloat(currentEle.style.left) < 100)
        setTimeout("hiddenRight()", 10);
}
function showRight() {
    nextEle.style.left = (parseFloat(nextEle.style.left) + 5) + '%';
    if (parseFloat(nextEle.style.left) < 0)
        setTimeout("showRight()", 10);
}

function changeSlide() {
    if (nextSlide === currentSlide) {
        //正序
        if (order) {
            nextSlide = nextSlide % imageAmount + 1;
        }
        //逆序
        else {
            nextSlide = (nextSlide + 3) % imageAmount + 1;
        }
        changeState = setTimeout('changeSlide()', time);
        return;
    }
    currentEle = $('#slide' + currentSlide);
    nextEle = $('#slide' + nextSlide);

    if (nextSlide > currentSlide) {
        $('#slide' + currentSlide).style.left = '0';
        $('#slide' + nextSlide).style.left = '100%';
        hiddenLeft();
        showLeft();
    }
    else if (nextSlide < currentSlide) {
        $('#slide' + currentSlide).style.left = '0';
        $('#slide' + nextSlide).style.left = '-100%';
        hiddenRight();
        showRight();
    }

    removeClass($('#indicator' + currentSlide), 'active');
    addClass($('#indicator' + nextSlide), 'active');
    //正序
    if (order) {
        currentSlide = nextSlide;
        nextSlide = nextSlide % imageAmount + 1;
        if (currentSlide === imageAmount && !cycle) {
            return;
        }
    }
    //逆序
    else {
        currentSlide = nextSlide;
        nextSlide = (nextSlide + 3) % imageAmount + 1;
        if (currentSlide === 1 && !cycle) {
            return;
        }
    }
    clearTimeout(changeState);
    changeState = setTimeout('changeSlide()', time);
}

$.click('.indicator', change);
function change(event) {
    var e = event || window.event;
    var target = e.target || e.srcElement;
    nextSlide = target.getAttribute('slide-to');
    clearTimeout(changeState);
    changeSlide();
}