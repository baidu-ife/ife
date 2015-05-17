/**
 * Created by wsk on 15/5/7.
 */
function Dragger(){
    bindAll(childLen, $('.box').allElems);
    this.elemHeight = $('.content').offsetHeight;
    var self = this;
    each($('.content').allElems, function(content){         //change specify elements to  dragtargets
        content.draggable = true;
    });

    $.delegate($('.box').allElems,'div','dragstart',function(e){
        self.isDropLocal = false;

        self.dragElem = e.target;
        self.dragElemUpperBrotherNum = getUpperBrotherNum(self.dragElem);
        self.startX = e.clientX;
        self.startY = e.clientY;
        window.setTimeout(function(){
            self.upOtherElem(self.dragElem)
        }, 300);
    });

    $.delegate($('.box').allElems,'div','drag',function(e){
        var deltaX = e.clientX - self.startX;
        var deltaY = e.clientY - self.startY;

        self.dragElem.style.left = deltaX + 'px';
        self.dragElem.style.top = deltaY + 'px';
    });

    $.delegate($('.box').allElems,'div','dragend',function(e){

        if(self.isDropLocal){
            var localOverBlockNum = Math.ceil(parseInt(self.dragElem.style.top)/self.elemHeight);
            var brother = self.dragElem;

            localOverBlockNum > 0 ? (function(){//INSERT ELEM
                while(brother && localOverBlockNum -- ){
                    brother = brother.nextElementSibling;
                }
                if(!brother) brother = self.dragElem.parentNode.lastChild;

                insertAfter(self.dragElem, brother);//util
            })()
                :(function(){
                while(brother && localOverBlockNum ++ ){
                    brother = brother.previousElementSibling;
                }
                if(!brother) brother = self.dragElem.parentNode.firstChild;
                self.dragElem.parentNode.insertBefore(self.dragElem, brother);
            })();
            self.resumeOtherElem();
        }else{
            var foreignOverBlockNum = Math.ceil(parseInt(self.relaOtherContainDis)/self.elemHeight);//跨过的元素数目

             !(foreignOverBlockNum < 0)|| (foreignOverBlockNum = 0);
            foreignOverBlockNum < self.toContainer.children.length || (foreignOverBlockNum = self.toContainer.children.length);//保证在范围内

            self.resumeOtherElem();
            if(self.toContainer.firstElementChild)//对方容器不空
                 self.toContainer.insertBefore(self.dragElem, self.toContainer.children[foreignOverBlockNum]);
            else
                self.toContainer.appendChild(self.dragElem);
        }
    });

    each($('.box').allElems, function(box) {
        $.on(box, 'dragover', function (e) {
            EventUtil.preventDefault(e);
            console.log('over');

        });
        $.on(box, 'dragenter', function (e) {
            EventUtil.preventDefault(e);
            console.log('enter');
            this.style.borderColor = '#000000';

        });

        $.on(box, 'drop', function(e){
            EventUtil.preventDefault(e);
            console.log('drop to');
            console.log(this);

            if(this == self.dragElem.parentNode){ self.isDropLocal = true; return;}
            self.toContainer = this;
            self.relaOtherContainDis = getPosition(self.dragElem).y - getPosition(this).y;      //相对对方父元素Y位轴位移
        });

        $.on(box, 'dragleave', function (e) {
            EventUtil.preventDefault(e);
            console.log('leave');

        });
    });
}
Dragger.prototype.upOtherElem = function(elem){
    while(elem.nextElementSibling){
        elem = elem.nextElementSibling;
        elem.style.top = (elem.style.top.slice(0, -2) - this.elemHeight) + 'px';
    }
}
Dragger.prototype.resumeOtherElem = function(){
    this.dragElem.style.left = '0px';
    each(this.dragElem.parentNode.children,function(elem){
       elem.style.top = '0px';
   });
}
var a = new Dragger();
