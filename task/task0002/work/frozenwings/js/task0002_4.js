//(function(){
  var input = $('#search-box input');
  function SearchTips(target,dataUrl){
    this.target = target;
    this.url = dataUrl;
    this.list = null;
    this.items = [];
    this.current = -1;
    this.data = [];
    this.size = 0;
    this.active = false;
  }
  SearchTips.prototype.init = function(){
    //console.log('init SearchTips');
    var self = this;
    var htmlStr = '<ul></ul>';
    this.target.insertAdjacentHTML('afterend',htmlStr);
    this.list = $('ul',this.target.parentNode);
    $.delegate(this.list,'li','click',function(e){
        typeof e.stopPropagation === 'undefined' ? e.cancelBubble = true : e.stopPropagation();
        var value = this.innerHTML;
        self.target.value = value;
        self.hide();
    });
    $.on(this.list,'mouseenter',function(e){
      for(var i = 0; i < self.size; i++){
          removeClass(self.items[i],'active');
        }
    });
    
    $.on($('html'),'click',function(e){
        if(this !== self.target){
          self.hide();
        }
    });
    this.items = this.list.getElementsByTagName('li');  //NodeList 动态更新
  }
  SearchTips.prototype.onGetData = function(data){
    this.data = JSON.parse(data);
    this.size = this.data.length;
    this.render();
  }
  SearchTips.prototype.getData = function(){
    ajax('getNames',{
        method:'get',
        onsuccess:bind(this,this.onGetData)
    });
  }
  SearchTips.prototype.render = function(){
    //console.log('render SearchTips');
    var htmlStr = '';
    each(this.data,function(item,index){
      htmlStr += '<li>' + item + '</li>';
    });
    this.list.innerHTML = htmlStr;
    
    this.show();
  };
  SearchTips.prototype.show = function(){
    this.active = true;
    addClass(this.list,'active');
    this.list.style.display = 'block';
  }
  SearchTips.prototype.hide = function(){
    //console.log('hide SearchTips');
    this.active = false;
    removeClass(this.list,'active');
    this.clearActive();
    this.list.style.display = 'none';
    this.current = -1;
  }
  SearchTips.prototype.up = function(){
    if(this.current < 0){
      this.current = this.size - 1;
    }else{
      this.current = (this.size + this.current - 1) % this.size;
    }
    this.clearActive();
    addClass(this.items[this.current],'active');
  }
  SearchTips.prototype.down = function(){
    if(this.current < 0){
      this.current = 0;
    }else{
      this.current = (this.current + 1) % this.size;
    }
    this.clearActive();    
    addClass(this.items[this.current],'active');
  }
  SearchTips.prototype.confirm = function(){
    if(this.current !== -1){
      var value = this.items[this.current].innerHTML;
      this.target.value = value;
      this.hide();
    }
  }
  SearchTips.prototype.clearActive = function(){
    for(var i = 0; i < this.size; i++){
      removeClass(this.items[i],'active');
    }    
  }

  var searchTips = new SearchTips(input);

  $.on(input,'focus',function(e){
    addClass(this,'active');
    if(this.value !== ''){
        searchTips.show();
    }
  });
  $.on(input,'keydown',function(e){
    var keyCode = e.keyCode;
    switch(keyCode){
      case 38:
        searchTips.up();
        break;
      case 40:
        searchTips.down();
        break;
      case 13:
        searchTips.confirm();
        break;
      default:
        searchTips.getData();
        break;
    }
  });
  searchTips.init();
//})();