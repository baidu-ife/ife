/**
 * Created by Zhi_LI on 2015/4/19.
 */

var childDivList = $('.child-div');
var rightDiv = $('#right-div');
var divNew;
//console.log(childDivList);

childDivList.on('mousedown', selectElement);
childDivList.on('mousedown', stopDefault);
childDivList.on('mouseup', deselectElement);
childDivList.on('mouseout', deselectElement);
childDivList.on('mousemove', moveElement);


childDivList.click(function (e) {

});

var selectFlag = 0;
var createFlag = 1;

var deleteFlag = 0;
var diffX = 0;
var diffY = 0;


function selectElement(evt) {
//    console.log('down');
    var targetPstObj;
    var targetLeft, targetTop;
    var mouseLeft, mouseTop;
    var target = evt.target;

    targetPstObj = getPosition(target);

    targetLeft = targetPstObj['viewLeft'];
    targetTop = targetPstObj['viewTop'];

    mouseLeft = evt.clientX;
    mouseTop = evt.clientY;

    selectFlag = 1;
    console.log(selectFlag);
    diffX = mouseLeft - targetLeft;
    diffY = mouseTop - targetTop;
}


function moveElement(evt) {
//    console.log('move');
    var target = evt.target;

    var targetPstObj;
    var targetLeft, targetTop;

    var mouseLeft, mouseTop;

    var divNPstObj;
    var divNLeft, divNTop;

    var divRPstObj;
    var divRLeft, divRTop;

    targetPstObj = getPosition(target);

    targetLeft = targetPstObj['viewLeft'];
    targetTop = targetPstObj['viewTop'];

    mouseLeft = evt.clientX;
    mouseTop = evt.clientY;

    if (selectFlag == 1) {

        target.style.position = 'absolute';
        target.style.left = (mouseLeft - diffX) + 'px';
        target.style.top = (mouseTop - diffY) + 'px';

        if ((target.offsetWidth / 2 + targetLeft) > rightDiv[0].offsetLeft
            && (target.offsetWidth / 2 + targetLeft) < (rightDiv[0].offsetLeft + rightDiv[0].offsetWidth)) {
            console.log('in-right');
            if (createFlag == 1) {
                console.log('create');
                divNew = doCreate(rightDiv[0]);
                divNew.style.backgroundColor = 'grey';


                createFlag = 0;
            }

        }
    }
    if (deleteFlag == 0) {
        //console.log(deleteFlag + 'deleteFlag');
        //console.log(divNew);
        if (divNew) {
            //console.log(evt.target.offsetHeight);
            //console.log(evt.target.offsetTop);
            //console.log(divNew.offsetTop);
            //console.log(divNew.offsetHeight);
            //
            //console.log(deleteFlag + 'del')
            divNPstObj = getPosition(divNew);

            divNLeft = divNPstObj['viewLeft'];
            divNTop = divNPstObj['viewTop'];


            divRPstObj = getPosition(rightDiv[0]);

            divRLeft = divRPstObj['viewLeft'];
            divRTop = divRPstObj['viewTop'];

            if (
                (target.offsetHeight / 2 + targetTop) > divNTop
                &&
                (target.offsetHeight / 2 + targetTop) < (divNTop + divNew.offsetHeight)
                &&
                (target.offsetWidth / 2 + targetLeft) > divRLeft
                &&
                (target.offsetWidth / 2 + targetLeft) < (divRLeft + rightDiv[0].offsetWidth)
            ) {
                console.log('delete');
                target.parentNode.removeChild(target);
                divNew.style.backgroundColor = '';

                addClass(divNew, 'child-div');
                deleteFlag = 1;
            }
        }

    }


}

function doCreate(eleTarget) {
    //console.log('add');
    var divNew = document.createElement('div');
    addClass(divNew, 'child-div');
    eleTarget.appendChild(divNew);
    return divNew;
}

function deselectElement(evt) {
    //console.log('up');
    selectFlag = 0;
    createFlag = 1;
    deleteFlag = 0;
    diffX = 0;
    diffY = 0;
}