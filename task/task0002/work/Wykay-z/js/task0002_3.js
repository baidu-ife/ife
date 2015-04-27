//修改自 http://jingyan.baidu.com/article/d5a880eb4a245213f147cc06.html

function runImg() {}
runImg.prototype = {
    bigbox: null, //最外层容器
    boxul: null, //子容器ul
    imglist: null, //子容器img
    numlist: null, //子容器countNum
    prev: 0, //上次显示项
    index: 0, //当前显示项
    timer: null, //控制图片转变效果
    play: null, //控制自动播放
    imgurl: [], //存放图片
    count: 0, //存放的个数
    $: function(obj) {
        if (typeof(obj) == "string") {
            if (obj.indexOf("#") >= 0) {
                obj = obj.replace("#", "");
                if (document.getElementById(obj)) {
                    return document.getElementById(obj);
                } else {
                    alert("不存在" + obj);
                    return null;
                }
            } else {
                return document.createElement(obj);
            }
        } else {
            return obj;
        }
    },
    //初始化
    info: function(id) {
        this.count = this.count <= 3 ? this.count : 3;
        this.bigbox = this.$(id);
        for (var i = 0; i < 2; i++) {
            var ul = this.$("ul");
            for (var j = 1; j <= this.count; j++) {
                var li = this.$("li");
                li.innerHTML = i == 0 ? this.imgurl[j - 1] : j;
                ul.appendChild(li);
            }
            this.bigbox.appendChild(ul);
        }
        this.boxul = this.bigbox.getElementsByTagName("ul");
        this.boxul[0].className = "imgList";
        this.boxul[1].className = "countNum";
        this.imglist = this.boxul[0].getElementsByTagName("li");
        this.numlist = this.boxul[1].getElementsByTagName("li");
        for (var j = 0; j < this.imglist.length; j++) {
            this.alpha(j, 0);
        }
        this.alpha(0, 100);
        this.numlist[0].className = "current";
    },
    //封装程序入口
    action: function(id,timeGap,reorder) {
        this.autoplay(timeGap, reorder);
        this.mouseoverout(this.bigbox, this.numlist,timeGap,reorder);
    },
    //图片切换效果
    imgshow: function(num, numlist, imglist) {
        this.index = num;
        var pralpha = 100;
        var inalpha = 0;
        for (var i = 0; i < numlist.length; i++) {
            numlist[i].className = "";
        }
        numlist[this.index].className = "current";
        clearInterval(this.timer);
        for (var j = 0; j < this.imglist.length; j++) {
            this.alpha(j, 0);
        }
        this.alpha(this.prev, 100);
        this.alpha(this.index, 0);
        var $this = this;
        //利用透明度来实现切换图片
        this.timer = setInterval(function() {
                inalpha += 2;
                pralpha -= 2;
                if (inalpha > 100) {
                    inalpha = 100
                }; //不能大于100
                if (pralpha < 0) {
                    pralpha = 100
                };
                //为兼容性赋样式
                $this.alpha($this.prev, pralpha);
                $this.alpha($this.index, inalpha);
                if (inalpha == 100 && pralpha == 0) {
                    clearInterval($this.timer)
                }; //当等于100的时候就切换完成了
            }, 20) //经测试20是最合适的值

    },
    //设置透明度
    alpha: function(i, opacity) {
        this.imglist[i].style.opacity = opacity / 100;
        this.imglist[i].style.filter = "alpha(opacity=" + opacity + ")";
    },
    //自动播放
    autoplay: function(timeGap, reorder) {
        var $this = this;
        clearInterval(this.play);
        this.play = setInterval(function() {
            $this.prev = $this.index;
            if(reorder){
                $this.index++;
                if ($this.index > $this.imglist.length - 1) {
                    $this.index = 0;
                };
            } else {
                $this.index--;
                if ($this.index < 0) {
                    $this.index = 2;
                };
            }
            $this.imgshow($this.index, $this.numlist, $this.imglist);
        }, timeGap);
    },
    //处理鼠标事件
    mouseoverout: function(box, numlist, timeGap, reorder) {
        var $this = this;
        box.onmouseover = function() {
            clearInterval($this.play);
        }
        box.onmouseout = function() {
            $this.autoplay( timeGap, reorder);
        }
        for (var i = 0; i < numlist.length; i++) {
            numlist[i].index = i;
            numlist[i].onmouseover = function() {
                $this.prev = $this.index;
                $this.imgshow(this.index, $this.numlist, $this.imglist);
            }
        }
    }
}
window.onload = function() {
    var timeGap = 2000;
    var reorder = false;

    var runimg = new runImg();
        runimg.count = 3;
        runimg.imgurl = [
            "<img src=images/slider1.jpg>",
            "<img src=images/slider2.jpg>",
            "<img src=images/slider3.jpg>"
        ];
    $.click($("#btn"),function(){
        $("#select p").innerHTML = "";
        if($("#selSpeed").value == "1"){
            timeGap = 500;
        } else if($("#selSpeed").value == "3") {
            timeGap = 4000;
        } else {
            timeGap = 2000;
        }
        

        runimg.info("#sliderBox");
        
        runimg.action("#sliderBox", timeGap, false);
        
    });

}