/**
 * Created by wsk on 15/5/6.
 */
function Suggest(num, data){
    this.num = 10;
    this.data = ['abcd', 'abcd', 'abcd', 'abcd'];
    this.input = $('#input');
    this.output = $('#output');

    var self = this;
    $.on('#input', 'input', function(e){
         //console.log(this.value);
         self.getSearchResult(this.value);
    });
    $.on('#input', 'blur', function(e){
        self.tipDisplay(false);
    })
    $.on('#input', 'focus', function(e){
        self.tipDisplay(true);
    })
    $.delegate('#output','a','mouseover',function(e){
        self.setFocusedTip(e.target);
    });
    $.delegate('#output','a','click',function(e){
        self.setInputContent();
    });
    $.on('body', 'keydown', function(e){
        switch (e.keyCode){
            case 38: //up
                self.moveCursor(-1);
                break;
            case 40://down
                self.moveCursor(1);
                break;
            case 13: //enter
                self.setInputContent();
                break;
            default:
                break;
        }
    })
}
Suggest.prototype.sendWord = function(){
    var searchKey = this.input.value;
    var url = 'http://localhost:8888/' ;
    url = addURLParam(url, 'searchKey', searchKey);
    ajax(url, {type: 'get',
    onsuccess:function(responseText, xhr){
        this.data = responseText;
    },
    onfail:function(responseText){
        console.log(responseText);
    }});
}
Suggest.prototype.getFocusedTip = function(){
    var tips = document.getElementsByTagName('a');
    for(var i = 0; i < tips.length; i++){
        if(hasClass(tips[i], 'active')) return tips[i];
    }
    return null;
}
Suggest.prototype.clearActive = function(tip){
    var removeTip = this.getFocusedTip();
    if(removeTip){
        removeClass(removeTip,'active');
    }
}
Suggest.prototype.setFocusedTip = function(tip){
    this.clearActive();
    console.log(tip);
    addClass(tip, 'active');
}
Suggest.prototype.getSearchResult = function(query){
    this.tipDisplay(/^\s*$/.test(query));
}
Suggest.prototype.tipDisplay = function(state){
    this.output.style.display = state ? 'none' : 'block';
}
Suggest.prototype.moveCursor = function(delta){
    var allElems = $('#output').getElementsByTagName('a');
    var len = allElems.length;
    var index;
    var moveTip = this.getFocusedTip();
    if( moveTip !== null){
        index = (indexOf(allElems, moveTip) + delta + len) % len;
    }
    else index = 0;
    this.setFocusedTip(allElems[index]);
}
Suggest.prototype.setInputContent = function(){
    var searchWord = this.getFocusedTip();
    this.input.value = searchWord.innerHTML;
    this.clearActive();
    this.tipDisplay(false);
}
var sug = new Suggest();