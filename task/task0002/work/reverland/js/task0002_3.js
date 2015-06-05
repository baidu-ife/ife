var imgcontainer = document.createElement("div");
imgcontainer.className = "imgcontainer";
$(".slideshow").appendChild(imgcontainer);

for (var i = 0; i < imgs.n; i++) {
    var img = document.createElement("img");
    img.src = imgs.urls[i];
    img.style.position = "absolute";
    if (!(i === imgs.cur)) {
        img.className = "hide";
    }
    imgcontainer.appendChild(img)
}

var indicators = document.createElement("ul");
indicators.className = "indicators"
for (var i = 0; i < imgs.n; i++) {
    // 这里清除nextclock非常重要
    indicators.innerHTML += ("<li onclick=\"clearTimeout(nextclock);slide(imgs.cur, " + i + ", imgs.dir)\"></li>");
}
$(".slideshow").appendChild(indicators);
indicators.children[imgs.cur].style.backgroundColor = "black";

var imgElement = $(".imgcontainer").children;

var nextclock;

function slide(cur, nxt, dir) {
    if (cur === nxt) {
        return;
    }
    var curimg = imgElement[cur];
    var nextimg = imgElement[nxt];
    for (var i = 0; i < imgs.n; i++) {
        imgElement[i].className = "hide";
    }
    curimg.className = "";
    nextimg.className = "";
    curimg.style.left = "0px";
    if (dir === "toleft") {
        //向左
        nextimg.style.left = curimg.width + "px";
        var clock = setInterval(function(){
            curimg.style.left = parseInt(curimg.style.left) - 10 + "px";
            nextimg.style.left = parseInt(nextimg.style.left) - 10 + "px";
            if (parseInt(nextimg.style.left) < 10) {
                clearInterval(clock);
            }
        }, 1);
    } else if(dir === "toright") {
        nextimg.style.left = -1 * curimg.width + "px";
        var clock = setInterval(function(){
            curimg.style.left = parseInt(curimg.style.left) + 10 + "px";
            nextimg.style.left = parseInt(nextimg.style.left) + 10 + "px";
            if (parseInt(nextimg.style.left) > 0) {
                clearInterval(clock);
            }
        }, 1);
    }
    imgs.cur = nxt;
    indicators.children[imgs.cur].style.backgroundColor = "black";
    indicators.children[cur].style.backgroundColor = "";
    if (!imgs.loop && imgs.cur == 0 && imgs.dir === "toright") {
        return;
    }
    if (!imgs.loop && imgs.cur == imgs.n - 1 && imgs.dir === "toleft") {
        return;
    }
    if (dir === "toleft") {
        nextclock = setTimeout(function(){
            slide(imgs.cur, (imgs.cur + 1) % imgs.n, imgs.dir);
        }, imgs.interval*1000);
    }
    if (dir === "toright") {
        nextclock = setTimeout(function(){
            slide(imgs.cur, (imgs.cur + imgs.n - 1) % imgs.n, imgs.dir);
        }, imgs.interval*1000);
    }
}

function play(){
    setTimeout(function(){
        if(imgs.dir === "toleft")
            slide(0, 1, imgs.dir);
        if(imgs.dir === "toright")
            slide(0, (imgs.cur + imgs.n - 1) % imgs.n , imgs.dir);
    }, imgs.interval * 1000);
}

play();
