function getEventTarget(e){
    return e.target || e.srcElement;
}
function Container(el,position){
    this.el = el;
    this.position = position;
}
function Item(el){
    this.el = el;
    this.position = {};
}
function DragManager(draggableClass){
    this._dclass = draggableClass;
    this._containers = [];
    this._items = [];
    this._current = null;
    this._overlaps = [];    //0:overlap above , 1:overlap below
    this._relative = [];
    this.dragging = false;
}
function overlapAbove(cur,item){
    var p1 = cur.position;
    var p2 = item.position;
    if(p1.y1 < p2.y2 && p2.y2 < p1.y2 && ((p2.x1 < p1.x2 && p2.x2 > p1.x2) || (p2.x1 < p1.x1 && p2.x2 > p1.x1))){
        return true;
    }
    return false;
}
function overlapBelow(cur,item){
    var p1 = cur.position;
    var p2 = item.position;
    if(p1.y1 < p2.y1 && p2.y1 < p1.y2 && ((p2.x1 < p1.x2 && p2.x2 > p1.x2) || (p2.x1 < p1.x1 && p2.x2 > p1.x1))){
        return true;
    }
    return false;
}
function getBoxPosition(el){
    var position = {};
    position.x1 = el.offsetLeft;
    position.x2 = el.offsetLeft + el.offsetWidth;
    position.y1 = el.offsetTop;
    position.y2 = el.offsetTop + el.offsetHeight;
    return position;
}
function getNextElementSibling(el){
    var el = el.nextSibling;
    while(el) {
        if(el.nodeType === 1){
            return el;
        }
        el = el.nextSibling;
    };
    return null;
}
DragManager.prototype.addContainer = function(container){
    this._containers.push(new Container(container,getBoxPosition(container)));
    var draggableItems = getElementsByClassName(container,this._dclass);
    for(var i = 0,len = draggableItems.length; i < len; i++){
        this._items.push(new Item(draggableItems[i]));
    }
}
DragManager.prototype.initDragEvents = function(){
    var self = this;
    each(this._containers,function(container,index){
        $.delegate(container.el,'li','mousedown',bind(self,self.onMouseDown));
        $.delegate(container.el,'li','mousemove',bind(self,self.onMouseMove));
        $.delegate(container.el,'li','mouseup',bind(self,self.onMouseUp));
    });
}
DragManager.prototype.onMouseDown = function(e){
    this.dragging = true;
    var target = getEventTarget(e);
    var position = getBoxPosition(target);
    this._current = {
        el:target,
        mouseX: e.clientX,
        mouseY: e.clientY,
        position:position
    };
    this.updateCache();
}
DragManager.prototype.onMouseMove = function(e){
    if(!this.dragging) return;
    this.clearSlide();
    var target = getEventTarget(e);
    if(target !== this._current.el) return;
    var moveX = e.clientX - this._current.mouseX;
    var moveY = e.clientY - this._current.mouseY;
    var threshold = 3;
    if(target.style.position.indexOf('absolute') === -1){
        if(moveX > threshold || moveY > threshold){
            this.doDrag(moveX,moveY);
        }
    }else{
        this.doDrag(moveX,moveY);
    }
    this.startSlide();
}
DragManager.prototype.doDrag = function(moveX,moveY){
    this.updateCurPosition(moveX,moveY);
    this.updateCache();
    this.computeOverlap();
}
DragManager.prototype.onMouseUp = function(e){
    var el = this._current.el;
    var container;
    if(this.dragging) this.dragging = false;
    el.style.position = '';
    el.style.left = '';
    el.style.top = '';
    removeClass(el,'move');
    if(typeof this._overlaps[1] !== 'undefined'){
        this._overlaps[1].parentNode.insertBefore(el,this._overlaps[1]);
    }else if(typeof this._overlaps[0] !== 'undefined') {
        this._overlaps[0].parentNode.appendChild(el);
    }else if((container = this.getOverlapContainer()) != null){
        container.appendChild(el);
    }
    for(var i = 0,len = this._relative.length; i < len; i++){
        el = this._relative[i];
        el.style.position = '';
    }
    this._relative = [];
    this._current = null;
}
DragManager.prototype.updateCache = function(){
    for(var i = 0,len = this._items.length; i < len; i++){
        var el = this._items[i].el;
        var p = getBoxPosition(el);
        this._items[i].position = p;
    }
}
DragManager.prototype.updateCurPosition = function(x,y){
    var cur = this._current,el = cur.el;
    el.style.position = 'absolute';
    addClass(el,'move');
    el.style.left = (cur.position.x1 + x) + 'px';
    el.style.top = (cur.position.y1 + y) + 'px';
    cur.position = getBoxPosition(el);
    cur.mouseX += x;
    cur.mouseY += y;
}
DragManager.prototype.getOverlapContainer = function(){
    var cur = this._current,container;
    var p1 = cur.position,p2;
    for(var i = 0,len = this._containers.length; i < len; i++){
        container = this._containers[i];
        p2 = container.position;
        if((p1.y2 < p2.y2 || p1.y1 < p2.y2 && p2.y2 < p1.y2) && (p1.x1 < p2.x1 && p2.x1 < p1.x2 || p1.x1 < p2.x2 && p2.x2 < p1.x2)){
            return container.el;
        }
    }
    return null;
}
DragManager.prototype.computeOverlap = function(){
    this._overlaps = [];
    this._relative = [];
    var items = this._items,item;
    var cur = this._current;

    for(var i = 0,len = items.length; i < len; i++){
        item = items[i];
        if(cur.el == item.el){}
        else if(overlapAbove(cur,item)){
            this._overlaps[0] = item.el;
        }
        else if(overlapBelow(cur,item)){
            this._overlaps[1] = item.el;
        }
    }
    if(typeof this._overlaps[1] !== 'undefined'){
        var el = this._overlaps[1];
        while(el !== null && el.nodeType === 1){
            this._relative.push(el);
            el = getNextElementSibling(el);
        }
    }
}
DragManager.prototype.startSlide = function(){
    for(var i = 0,len = this._relative.length; i < len; i++){
        var el = this._relative[i];
        el.style.position = 'relative';
        el.style.top = el.offsetHeight + 'px';
    }
}
DragManager.prototype.clearSlide = function(){
    for(var i = 0,len = this._relative.length; i < len; i++){
        var el = this._relative[i];
        el.style.position = '';
        el.style.top = '';
    }
}
var manager = new DragManager('draggable');
manager.addContainer($('.left'));
manager.addContainer($('.right'));
manager.initDragEvents();