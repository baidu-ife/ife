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
        var elem = e.target;
        self.startX = e.clientX;
        self.startY = e.clientY;
        window.setTimeout(function(){
            self.upOtherElem(elem)
        }, 300);

    });

    $.delegate($('.box').allElems,'div','drag',function(e){
        var elem = e.target;
        var deltaX = e.clientX - self.startX;
        var deltaY = e.clientY - self.startY;
        elem.style.left = deltaX + 'px';
        elem.style.top = deltaY + 'px';
    });

    $.delegate($('.box').allElems,'div','dragend',function(e){
        var elem = e.target;
        var blockNum = Math.ceil(parseInt(elem.style.top)/self.elemHeight);
        var brother = elem;

        blockNum > 0 ? (function(){
            while(brother && blockNum -- ){
                brother = brother.nextElementSibling;
            }
            if(!brother) brother = elem.parentNode.lastChild;

            insertAfter(elem, brother);
        })()
            :(function(){
            while(brother && blockNum ++ ){
                brother = brother.previousElementSibling;
            }
            if(!brother) brother = elem.parentNode.firstChild;

            elem.parentNode.insertBefore(elem, brother);
        })();

        self.resumeOtherElem(elem);
    });


    each($('.box').allElems, function(box) {
        $.on(box, 'dragover', function (e) {
            EventUtil.preventDefault(e);
        });
        $.on(box, 'dragenter', function (e) {
            EventUtil.preventDefault(e);
        });
        $.on(box, 'drop', function(e){
            EventUtil.preventDefault(e);
            console.log('done');
        })
    });
}

Dragger.prototype.upOtherElem = function (elem){
    while(elem.nextElementSibling){
        elem = elem.nextElementSibling;
        elem.style.top = (elem.style.top.slice(0, -2) - this.elemHeight) + 'px';
    }
}

Dragger.prototype.resumeOtherElem = function (elem){
    elem.style.left = '0px';
   each(elem.parentNode.children,function(elem){
       elem.style.top = '0px';
   });
}
var a = new Dragger();
