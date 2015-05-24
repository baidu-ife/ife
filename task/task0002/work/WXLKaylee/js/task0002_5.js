var oContainer = document.getElementById('container');
var oLeft = document.getElementById('left');
var oRight = document.getElementById('right');
var ooLeft = oLeft.getElementsByTagName('div');
var ooRight = oRight.getElementsByTagName('div');
var disX = disY = 0;
for(var i=0; i<ooLeft.length; i++){
     ooLeft[i].index = i;
   ooLeft[i].onmousedown = function(e){
        
        var _this = this;    
        
        e = e || window.event;
        disX = e.clientX - oLeft.offsetLeft;
        disY = e.clientY - oLeft.offsetTop;
        document.onmousemove = function(e){
            e = e || window.event;
            // ooLeft[_this.index].style.filter = 'alpha(opacity:'+alpha')';
            // ooLeft[_this.index].style.alpha = alpha /100;
            var tt = _this.index * 60;
            ooLeft[_this.index].style.left = e.clientX - disX - 200 + 'px';
            ooLeft[_this.index].style.top = e.clientY - disY + tt - 50 + 'px';
        }
        document.onmouseup = function(){
            document.onmousemove = null;
            oLeft.removeChild(_this);
            oRight.appendChild(_this);
            _this.style.top = 60*(ooRight.length-1) + 'px';
            _this.style.left = 0+'px';
            for(var j=0;j<ooLeft.length;j++){
                ooLeft[j].style.top = 60*j + 'px';
            }
        }
    }
}
for(var i=0; i<ooRight.length; i++){
    ooRight[i].index = i;
    ooRight[i].onmousedown = function(e){
        var _this = this;
        
        e = e || window.event;
        disX = e.clientX - oRight.offsetLeft;
        disY = e.clientY - oRight.offsetTop;
        // alert(disX +", "+disY);
        document.onmousemove = function(e){
            e = e || window.event;
            var tt = _this.index * 60;
            ooRight[_this.index].style.left = e.clientX - disX - 800  + 'px';
            ooRight[_this.index].style.top = e.clientY - disY   + tt - 50 + 'px';
        }
        document.onmouseup = function(){
            document.onmousemove = null;
            oRight.removeChild(_this);
            oLeft.appendChild(_this);
            _this.style.top = 60*(ooLeft.length-1) + 'px';
            _this.style.left = 0+'px';
            for(var j=0;j<ooRight.length;j++){
                ooRight[j].style.top = 60*j + 'px';
            }
        }
    }
}