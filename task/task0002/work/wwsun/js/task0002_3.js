/**
 *
 * start the carousel application
 * @param direction is true when slide from first to last, otherwise from last to left
 * @param interval
 */
function startSlides(direction, interval) {
    setInterval("toggleSlide("+direction+")", interval);
}

/**
 * toggle all slides
 * @param direction is boolean value, true for NEXT, false for PREV
 */
function toggleSlide(direction) {
    var elements = $(".hideable"); // gets all the "slides" in our slideshow
    var visibleID = getVisible(elements);
    elements[visibleID].style.display = "none"; // hide the currently visible LI

    var makeVisible = prev(visibleID, elements.length); // get the prev slide

    if(direction || direction == 'undefined') {
        makeVisible = next(visibleID, elements.length); // get the next sklde
    }
    elements[makeVisible].style.display = "block"; // show the previous or next slide
}

/**
 * Find the <li> element that displayed currently
 * @param elements
 * @returns {number}
 */
function getVisible(elements) {
    var visibleID = -1;
    for(var i = 0; i < elements.length; i++) {
        if(elements[i].style.display == "block") {
            visibleID = i;
        }
    }
    return visibleID;
}

/**
 * get the next index of a picture list
 * @param num
 * @param arrayLength
 * @returns {number}
 */
function prev(num, arrayLength) {
    if(num == 0) return arrayLength-1;
    else return num-1;
}

/**
 * get the previous index of a picture list
 * @param num
 * @param arrayLength
 * @returns {*}
 */
function next(num, arrayLength) {
    if(num == arrayLength-1) return 0;
    else return num+1;
}

function goToIndex(index) {
    var elements = $('.hideable');
    var visId = getVisible(elements);
    elements[visId].style.display = 'none';
    elements[index].style.display = 'block';
}

$.delegate('#slide-nav', 'li', 'click', function(event) {
    var target = getTarget(event);
    var index = target.getAttribute('data-index') - 1;
    goToIndex(index);

});

startSlides(true, true, 2000);