// todo: reading http://g-liu.com/blog/2013/08/tutorial-basic-carouselslideshow-with-javascript/

/**
 * todo: complete the two parameters
 * start the carousel application
 * @param direction
 * @param isLoop
 * @param interval
 */
function startSlides(direction, isLoop, interval) {
    setInterval("toggleSlide(true)", interval);
}


/**
 * toggle all slides
 * @param direction is boolean value, true for NEXT, false for PREV
 */
function toggleSlide(direction) {
    var elements = document.getElementsByClassName("hideable"); // gets all the "slides" in our slideshow
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

// start
startSlides(true, true, 2000);