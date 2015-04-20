/**
 * Created by Zhi_LI on 2015/4/19.
 */

var childDivList = $('.child-div');
var rightDiv = $('#right-div');
var divNew;
//console.log(childDivList);

childDivList.on('mousedown',selectElement);
childDivList.on('mousedown',stopDefault);
childDivList.on('mouseup',deselectElement);
childDivList.on('mouseout',deselectElement);
childDivList.on('mousemove',moveElement);


childDivList.click(function(e){

});

var selectFlag = 0;
var createFlag = 1;

var deleteFlag = 0;
var diffX=0;
var diffY=0;


function selectElement(evt) {
//    console.log('down');

    selectFlag = 1;
    console.log(selectFlag);
    diffX=evt.clientX-evt.target.offsetLeft;
    diffY=evt.clientY-evt.target.offsetTop;
}

function moveElement(evt) {
//    console.log('move');
    if (selectFlag == 1) {

        evt.target.style.position = 'absolute';
        evt.target.style.left = (evt.clientX-diffX)+'px';
        evt.target.style.top = (evt.clientY-diffY)+'px';

        if ( (evt.target.offsetWidth/2 + evt.target.offsetLeft) > rightDiv[0].offsetLeft
         && (evt.target.offsetWidth/2 + evt.target.offsetLeft) < (rightDiv[0].offsetLeft + rightDiv[0].offsetWidth)){
            console.log('in-right');
            if (createFlag == 1){
                console.log('create');
                divNew = doCreate(rightDiv[0]);
                divNew.style.backgroundColor = 'grey';


                createFlag = 0;
            }

        }
    }
    if (deleteFlag == 0){
        //console.log(deleteFlag + 'deleteFlag');
        //console.log(divNew);
        if (divNew){
            console.log(evt.target.offsetHeight);
            console.log(evt.target.offsetTop);
            console.log(divNew.offsetTop);
            console.log(divNew.offsetHeight);

            console.log(deleteFlag + 'del')

            if (
                (evt.target.offsetHeight/2 + evt.target.offsetTop) > divNew.offsetTop
                &&
                (evt.target.offsetHeight/2 + evt.target.offsetTop) < (divNew.offsetTop + divNew.offsetHeight)
                &&
                (evt.target.offsetWidth/2 + evt.target.offsetLeft) > rightDiv[0].offsetLeft
                &&
                (evt.target.offsetWidth/2 + evt.target.offsetLeft) < (rightDiv[0].offsetLeft + rightDiv[0].offsetWidth)
            ){
                console.log('delete');
                evt.target.parentNode.removeChild(evt.target);
                divNew.style.backgroundColor = '';

                addClass(divNew,'child-div');
                deleteFlag = 1;
            }
        }

    }


}

function doCreate(eleTarget) {
    //console.log('add');
    var divNew = document.createElement('div');
    addClass(divNew,'child-div');
    eleTarget.appendChild(divNew);
    return divNew;
}

function deselectElement(evt) {
    //console.log('up');
    selectFlag = 0;
    createFlag = 1;
    deleteFlag = 0;
    diffX=0;
    diffY=0;
}