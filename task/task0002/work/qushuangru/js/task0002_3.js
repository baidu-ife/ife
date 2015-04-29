function picRound(opt) {
    var opt = opt || {};
    var option = {
        positive: opt.positive && true, // 正序
        loop: opt.loop && true, // 循环
        time: opt.time || 2
    }
    var time = option.time * 1000;
    var iNow = 0;
    var iNow2 = 0;
    //var iNext = 1;
    var pWidth = 425;
    var picUl = document.getElementsByClassName("pics")[0]
    var pics = picUl.getElementsByTagName("li");
    var pLength = pics.length;
    var curPic, nth;
    console.log(pics.length);
    for (var i = 0; i < pLength; i++) {

    };

    function startMove(element, attr, value, callback) {
        var iBtn, value = parseInt(value)
        clearInterval(element.iTimer);
        var iCur = 0;
        var iSpeed = 0;

        element.iTimer = setInterval(function() {
            iBtn = true;
            iCur = parseInt(element.style[attr]) || 0

            iSpeed = (value - iCur) / 8;
            iSpeed = iSpeed > 0 ? Math.ceil(iSpeed) : Math.floor(iSpeed);

            if (iCur != value) {
                iBtn = false;
                element.style[attr] = iCur + iSpeed + 'px';
            }

            if (iBtn) {
                clearInterval(element.iTimer);
                callback && callback.call(element);
            }
        }, 10);

    }


    function showpic(iNext) {

        var loop = option.loop;
        var positive = option.positive;
        startMove(picUl, "left", (-iNext * pWidth + "px"), function() {
                if (loop) {
                    if (positive) {
                        if (iNow == 0) {
                            pics[0].style.positive = "static";
                            pics[0].style.left = 0;
                            picUl.style.left = 0 + "px";
                            iNow2 = 0;
                        }
                    } else {
                        if (iNow == pLength-1) {
                            pics[pLength-1].style.positive = "static";
                            pics[pLength-1].style.left = 0;
                            picUl.style.left = -(pLength - 1) * pWidth + "px";
                            iNow2 = pLength - 1;
                        }
                    }

                }
            })
            //if(nth,iNow)
    }

    function autoRun(loop, positive) {

        if (loop) {
            if (positive) {
                if (++iNow >= pLength) {
                    pics[0].style.position = "relative";
                    pics[0].style.left = pWidth * pLength + "px";
                    iNow = 0;
                }
                iNow2++;
            } else {
                if (--iNow < 0) { 
                    pics[pLength-1].style.position = "relative";
                    pics[pLength-1].style.left = -pWidth * pLength+ "px";
                    iNow = pLength - 1;
                };
                iNow2--;
            }
        } else {
            if (positive) {
                if (++iNow >= pLength) {
                    iNow = iNow2 = 0;
                }else{
                    iNow++;
                }
            } else {
                if (--iNow2 < 0) {
                    iNow = iNow2 = pLength - 1
                }else{
                    iNow--;
                };
            }
        }




        var oOl = document.getElementsByClassName("pic-radio")[0];
        var oLi = oOl.getElementsByTagName("li");
        for (var i = 0; i < pLength; i++) {
            oLi[i].className = "";
        }
        oLi[iNow].className = "active";

        if (positive) {
            showpic(iNow2);
        } else {
            showpic(iNow2);
        }


    }

    function appendRadioEvent(length) {
        var i;
        var oOl = document.createElement("ol");
        oOl.className = "pic-radio";
        var oLi = document.createElement("li");
        for (i = 0; i < length; i++) {
            oLi = oLi.cloneNode(true);
            oOl.appendChild(oLi);
        }
        document.getElementById("pic-round").appendChild(oOl);
        oOl = document.getElementsByClassName("pic-radio")[0];
        oLi = oOl.getElementsByTagName("li");
        for (i = 0; i < length; i++) {
            oLi[i].index = i;
            oLi[i].onclick = function() {

                for (var i = 0; i < length; i++) {
                    oLi[i].className = "";
                    pics[i].style.position = "static";
                    pics[i].style.left = 0 ;
                }

                this.className = "active";
                iNow2 = iNow = this.index;
                showpic(iNow2);
            }
        }
        oLi[0].className = "active";

    }



    appendRadioEvent(pLength);

    var interval = setInterval(function() {
        autoRun(option.loop,option.positive);
    }, time);

}


picRound({
    positive: false, // 正序
    loop: false, // 循环
    time: 2
});
