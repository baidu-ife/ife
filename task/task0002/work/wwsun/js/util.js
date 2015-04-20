/**
 * check the target is an array or not
 * @param arr
 * @returns {boolean}
 */
function isArray(arr) {
    return Array.isArray(arr);
}

/**
 * check the target is an function or not
 * @param fn
 * @returns {boolean}
 */
function isFunction(fn) {
    return typeof fn === 'function';
}

/**
 * deep clone
 * @param src
 * @returns {*}
 */
function cloneObject(src) {
    if (src == null || typeof src != 'object') {
        return src;
    } else {
        var temp = src.constructor();

        for (var key in src) {
            if(src.hasOwnProperty(key)) {
                temp[key] = cloneObject(src[key]);
            }
        }
        return temp;
    }
}

/**
 * remove duplicate items, each item only appear one time
 * @param arr
 * @returns {Array} without duplicate items
 */
function uniqueArray(arr) {
    var result = [];

    for (var i=0; i<arr.length; i++) {
        if(result.indexOf(arr[i]) < 0) {
            result.push(arr[i]);
        }
    }

    return result;
}

/**
 * remove all white spaces in the front or end of a string
 * @param str
 * @returns {XML|string|void}
 */
function trim(str) {
    return str.replace(/^\s+|\s+$/g, '');
}

/**
 * execute the function fn for each item in the arr as the parameters
 * @param arr
 * @param fn
 */
function each(arr, fn) {
    arr.forEach(fn);
}

/**
 * count the number of properties of a object
 * @param obj
 * @returns {Number}
 */
function getObjectLength(obj) {
    //var length = 0;
    //for (var key in obj) {
    //    if (obj.hasOwnProperty(key)) {
    //        length++;
    //    }
    //}
    return Object.keys(obj).length; // a better solution, since ES5
}

/**
 * check a string if a valid email address or not
 * @param email
 */
function isEmail (email) {
    var re = /^([\w-]+(?:\.[\w-]+)*)@((?:[\w-]+\.)*\w[\w-]{0,66})\.([a-z]{2,6}(?:\.[a-z]{2})?)$/i;
    return re.test(email);
}

/**
 * check a number sequence if a valid mobile phone number or not
 * @param phone
 */
function isPhoneNumber (phone) {
    var re = /^1[358]\d{9}$/;
    return re.test(phone);
}

/**
 * add a new css class for a specific dom element
 * @param element
 * @param newClassName
 */
function addClass(element, newClassName) {
    element.classList.add(newClassName);
}

/**
 * remove an existed css class for a specific dom element
 * @param element
 * @param oldClassName
 */
function removeClass(element, oldClassName) {
    element.classList.remove(oldClassName);
}

function isSiblingNode(element, siblingNode) {
    // todo

}

/**
 * return the position of the specific element, which is relative to the browser window
 * @param element
 * @returns {{x: Number, y: Number}}
 */
function getPosition(element) {
    var rect = element.getBoundingClientRect();
    return {
        x: rect.top,
        y: rect.right
    };
}

// todo: combine multiple selectors, like $('#adom .classa')
function $(selector) {
    var root = document.body; // set the body element as the root element
    var childNodes = root.childNodes;

    if (childNodes.length > 0) {

        switch(selector.substr(0,1)) {
            case '.':
                // class selector
                return document.getElementsByClassName(selector.substr(1));
            case '#':
                // id selector
                return document.getElementById(selector.substr(1));

            case '[':
                // attribute selector
                if(selector.slice(-1)===']') {

                    var attrString = selector.substr(1, selector.length-2);
                    var attrArr = attrString.split('=');
                    //console.log(attrArr);

                    var allElements = document.getElementsByTagName('*');

                    if (attrArr.length === 1) { // only attribute name

                        for (var i= 0, n=allElements.length; i<n; i++) {
                            if (allElements[i].getAttribute(attrString) !== null) {
                                return allElements[i]; // return the first element that matched
                            }
                        }

                    } else if (attrArr.length === 2) { // attribute name with value
                        for (var j= 0, m=allElements.length; j<m; j++) {
                            if (allElements[j].getAttribute(attrArr[0]) === attrArr[1]) {
                                return allElements[j]; // return the first element that matched
                            }
                        }
                    }
                } else {
                    console.log('attribute selector should end with ]');
                }

            default :
                return root.getElementsByTagName(selector);
        }
    }
}