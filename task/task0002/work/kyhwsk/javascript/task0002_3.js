/**
 * Created by wsk on 15/4/30.
 * css:http://learn.shayhowe.com/advanced-html-css/transitions-animations/
 * my code lack coherence between Index and next Index
*/
var slides = [];
var mySlide = new Slide('l', true, '4000');
var stopDuring = 3500;
var interval = 4000;
var timerId;

function Slide(dir, isCycle, interval){
    this.dir = dir;
    this.isCycle = isCycle;
    this.interval = interval;

    this.next = 0;
}

function getSlide(){
    mySlide.dots =  $('#caroucel-indicaters').children;
    mySlide.parentSlide = $('#slides');
    mySlide.slideNum =  mySlide.parentSlide.childElementCount;
    mySlide.index = mySlide.slideNum - 1;

    mySlide.slides = mySlide.parentSlide.children;
    for(var i = 0; i < mySlide.slideNum; i++){
        mySlide.slides[i].style.transitionDuration = (mySlide.interval - stopDuring)/1000 + 's';
    }

}

function generateDots(){
    var li = [];
    for(var i = 0; i < mySlide.slideNum; i++){
        li.push('<li no =' + i + '></li>');
    }
    $('#caroucel-indicaters').innerHTML = li.join('\n');

}

function getNext(){
    //next and index can't have dependency
    if(mySlide.dir === 'l'){
        mySlide.index =  (mySlide.index + 1) % mySlide.slideNum;
        mySlide.next =  (mySlide.next + 1) % mySlide.slideNum;
    }
    else{
        mySlide.index  = (mySlide.index - 1 + mySlide.slideNum) % mySlide.slideNum;
        mySlide.next  = (mySlide.next - 1 + mySlide.slideNum) % mySlide.slideNum;
    }
}

function showSlide(){//click event could trigger
    //clear all state ,make item clean
    removeClass(mySlide.slides[mySlide.index], 'left');
    removeClass(mySlide.dots[mySlide.index],'active');


    getNext();
    addClass(mySlide.slides[mySlide.index], 'active');
    addClass(mySlide.slides[mySlide.next], 'next');
    addClass(mySlide.dots[mySlide.index],'active');//
}

function moveSlide(){
    //move current
    removeClass(mySlide.slides[mySlide.index], 'active');
    addClass(mySlide.slides[mySlide.index], 'left');

    //move next
    removeClass(mySlide.slides[mySlide.next], 'next');
    addClass(mySlide.slides[mySlide.next], 'active');
}

function play() {
    //playing before the first Interval
    showSlide();

    setTimeout(moveSlide,  stopDuring);
    while(mySlide.slides[mySlide.index]){

    }
}

//------init slide---

getSlide();
generateDots();

//-----play--------

//play normally
//play();

$.click('#caroucel-indicaters li', function() {

    clearInterval(timerId);
//---reset index of next----
    removeClass(mySlide.slides[mySlide.next], 'next');  //clear originally slide

    //reset next slide
    mySlide.next = -this.getAttribute('no');
    addClass(mySlide.slides[mySlide.next], 'next');

    moveSlide();

    //reset CurIndex to previous slide (it will increase when play();)
    removeClass(mySlide.slides[mySlide.index], 'left');  //clear originally slide
    mySlide.index = (mySlide.dir == 'l' ? mySlide.next - 1 + mySlide.slideNum : mySlide.next + 1) % mySlide.slideNum;

    //after having moved thd slide, play nomally again
    setTimeout(play, interval - stopDuring);
});

