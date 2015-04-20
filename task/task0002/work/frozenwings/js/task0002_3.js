function Carouse(element,options){
  this.ele = element;
  this.ops = options || {}; 

  this.ops = extend(options,{
    direction:'forward',
    interval:2000,
    repeat:true
  });

  this._timer = 0;
  this._timerStop = true;
  this.current = 0;
  this.next = 0;
  this.transition = 500;
  this.cursor = null;
  this.transitionTimer = [];
}
Carouse.prototype.startTransition = function(){
  var self = this;
  var cur = this.items[this.current];
  var next = this.items[this.next];
  var direction;

  if(this._timerStop){
    if(this.current > this.next){
      direction = 'right';
    }else{
      direction = 'left';
    }
  }else{
    direction = 'left';
  }
  direction === 'right' ? addClass(next,'left') : addClass(next,'right');

  var start = new Date();
  this.transitionTimer.push(setInterval(
      function(){        
        var now = new Date();
        var p = (now - start) / self.transition;
        if(p < 1){
          if(direction === 'right'){            
            cur.style.left =  p * 100 + '%';          
            next.style.left = '-' + (1 - p) * 100 + '%';
          }else{           
            cur.style.left =  '-' + p * 100 + '%';          
            next.style.left = (1 - p) * 100 + '%';
          }        
        }else{
          bind(self,self.endTransition)();
        }
      }
    ,30));
}
Carouse.prototype.endTransition = function(){
  var cur = this.items[this.current];
  var next = this.items[this.next];
  cur.style.left = '';
  next.style.left = '';
  cur.setAttribute('class','item');
  next.setAttribute('class','item active');
  clearInterval(this.transitionTimer.pop());
  this.current = this.next;
  if(this.ops.repeat){
    if(this._timerStop){
      //console.log('restart');
      this.startTimer();
    }
  }else{
    if((this.ops.direction === 'forward' && this.current === (this.size-1) || this.ops.direction === 'backward' && this.current === 0)){
      //console.log('stop sliding');
      this.stopTimer();
    } 
  }
}
Carouse.prototype.sliding = function(curIndex,nextIndex){    
    if(this.transitionTimer.length < 1){
      this.updateCursor();  //更新游标
      this.startTransition(curIndex,nextIndex);  
    }      
}
Carouse.prototype.updateCursor = function(){
  for(var i = 0; i < this.size; i++){
    if(i === this.next){
      this.cursors[i].setAttribute('class','active');
    }else{
      this.cursors[i].setAttribute('class','');
    }
  }
}
Carouse.prototype.timerFn = function(){
  if(this.ops.direction === 'forward'){  
    this.next = (this.current + 1) % this.size;               //正序   
  }else{  
      this.next = (this.size + this.current - 1) % this.size; //逆序
  }
  //console.log(this.current,this.next);  
  this.sliding.call(this,this.current,this.next);
}
Carouse.prototype.startTimer = function(){
  this._timer = setInterval(bind(this,this.timerFn),this.ops.interval);
  this._timerStop = false;
}
Carouse.prototype.stopTimer = function(){
  clearInterval(this._timer);
  this._timerStop = true;
}
Carouse.prototype.addCursorHandler = function(){
  var self = this;
  $.delegate(this.ele,'li','click',function(e){
    var event = e || window.event;
    var target = event.target || event.srcElement;
    var index = +target.getAttribute('data-index');
    if(index === self.current){
      return false;
    }
    self.stopTimer();
    self.next = index;
    self.sliding.call(self,self.current,self.next);
  });
}
Carouse.prototype.addCursor = function(){
  var cursorHtml = '<ol class="cursor">';
  for(var i = 0; i < this.size; i++){
    cursorHtml += '<li data-index="' + i + '""></li>';
  }
  cursorHtml += '</ol>';
  this.ele.insertAdjacentHTML('afterbegin',cursorHtml);
  this.cursors = $('.cursor',this.ele).getElementsByTagName('li');
  this.addCursorHandler();
}
Carouse.prototype.init = function(){    
    this.items = getElementsByClassName(this.ele,'item');
    this.size = this.items.length; 

    if(this.ops.direction === 'forward'){  
        this.current = 0; 
    }else{  
        this.current = this.size-1;
    }

    this.addCursor();

    addClass(this.items[this.current],'active');
    addClass(this.cursors[this.current],'active');
    
    this.startTimer();
}
var carouse = new Carouse($('#slide'),{'direction':'forward','repeat':true,'interval':1500});
carouse.init();