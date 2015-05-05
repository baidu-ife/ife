/**
 * Created by wsk on 15/4/30.
 */
var slides = [];

function Slide(dir, isCircle, interval){
    this.dir = dir;
    this.isCircle = isCircle;
    this.FPS = 1/interval;
    this.interval = interval;
    this.index = 0;
    this.left = 0;
    this.right = 0;
}
function play(){

}
function getSlide(mySlide){
    mySlide.parentSlide = $('#slides');
    mySlide.slideNum =  mySlide.parentSlide.childElementCount;
    mySlide.slides = mySlide.parentSlide.children;
    mySlide.parentSlide.style.width= mySlide.slides[0].offsetWidth + 'px';
    mySlide.parentSlide.style.height= mySlide.slides[0].offsetHeight + 'px';
    mySlide.slideLength = mySlide.slides[0].offsetWidth;
    mySlide.velocity = mySlide.slideLength/mySlide.interval;
}
function move(){
    mySlide.left =(mySlide.left - mySlide.velocity + mySlide.slideLength)%mySlide.slideLength;
    console.log(mySlide.left);
    mySlide.slides[mySlide.index].style.left = mySlide.left + 'px';
}
function initSlide(){
    mySlide = new Slide('l', true, 3000);
    getSlide(mySlide);
    timerId = setInterval(move, mySlide.FPS);

}
var timerId;
var mySlide;
initSlide();
function createDots(){

}

