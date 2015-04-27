/**
 * Created by feizq on 15-4-22.
 */
var unit = {
    isArray:function(arr){
//         return(arr instanceof Array);
        return Object.prototype.toString.call(obj) === '[object Array]';
    },
    isFun:function(fn){
        return typeof fn == "function";
    },
    cloneObject:function(src){
        var target = {};
        var attr;
        var attrValue;
        for(attr in src){
            if(src.hasOwnProperty(attr)){
                if(attr instanceof Object){
                    attrValue = cloneObject(attr);
                }
                else{
                    attrValue = src[attr];
                }
                target[attr]=attrValue;
            }
        }
        return target;
    },
    uniqArray:function(arr){
        var len=arr.length;
        var j;
        for(i=0;i<len;i++){
           if(typeof arr[i] == "number"||typeof arr[i] == "string"){
              for(j=i+1;j<len;j++){
                  if(arr[i]==arr[j]){arr.splice(j,1)}
              }
           }
        }
        return arr;
    },
    trim:function(str){
          var head = 0;
          var foot = str.length;
          if(str == ""){return str}
          var i = 0;
          while(str.charAt(i) == " "){
            head = i;
            i = i+1;
          }
          i = str.length-1;
          while(str.charAt(i) == " "){
                foot = i+1;
                i = i-1;
          }
          str = str.substring(head,foot);
        return str;
    },
    each:function(arr,fn){
        var len = arr.length;
        for(var i =0 ;i<len;i++){
            fn(arr[i],i);
        }
    },
    getObjectLength:function(obj){
        var len = 0;
        for(var index in obj){
            if(obj.hasOwnProperty(index)){
                len = len+1;
            }
        }
        return len;
    },
    isEmail:function(emailStr){
        var re = new  RegExp("^\w+([-+.]\w+)*@\w+([-.]\w+)*\.\w+([-.]\w+)*$");
        return re.test(emailStr);
    },
    isMobilePhone:function(phone){
        var re = new  RegExp("^(\(\d{3,4}-)|\d{3.4}-)?\d{7,8}$");
        return re.test(phone);
    }
    ,
    addClass:function(element,newClassname){
        var className = element.getAttribute("class");
        className = className+" "+newClassname;
        element.setAttribute("class",className);
    },
    removeClass:function(element,oldName){
        var arr;
        var className = element.getAttribute("class");
        arr = className.split(" ");
        for(var i =0;i<arr.length;i++){
           if(arr[i] == oldName){arr.splice(i,1)}
        }
        className = arr.join(" ");
        element.setAttribute("class",className)
    },
    isSiblingNode:function(element, siblingNode){
        var elePar = element.parentNode;
        var sibPar = siblingNode.parantNode;
        if(elePar == sibPar){return true}
        else{return false}
    },
    // 获取element相对于浏览器窗口的位置，返回一个对象{x, y}
    //循环的时候，
    getPosition:function(element) {
        var position = {};
        var index  = element;
        position.x = 0;
        position.y = 0;

        while(index != null ){
            position.x = index.offsetLeft+position.x;
            position.y = index.offsetTop+position.y;
            index =   index.offsetParent;
        }
        return position;
    },
    // 实现一个简单的jQuery
    $:function(selector,parentNode){
        var dom =parentNode || document;
        var first = selector.charAt(0);
//找到的对象
        var target;
        var domAll;
        var i;
        var attr;
        var attrValue;
        if(selector.indexOf(" ")!= -1){
            var arrClass = selector.split(" ");
            var pNode = this.$(arrClass[0]);
            for(i=1;i<arrClass.length;i++){
                target = this.$(arrClass[i],pNode);
                pNode = target;
            }
            return target;
        }
            switch (first){
            case "#": target = dom.getElementById(selector.substring(1));break;
            case ".": domAll = dom.getElementsByTagName("*");
                     for( i =0;i<domAll.length;i++){
                         if(domAll[i].getAttribute("class") == selector.substring(1)){
                             target = domAll[i];
                             break;
                         }
                     }break;
            case "[" :
                      var flags = selector.indexOf("=");
                      domAll = dom.getElementsByTagName("*");
                      if( flags== -1){
                          attr = selector.substring(1,selector.length-1);
                          for( i =0;i<domAll.length;i++){
                              if(domAll[i].getAttribute(attr)){
                                  target = domAll[i];
                                  break;
                              }
                          }

                      }
                      else{
                          attr = selector.substring(1,flags);
                          attrValue = selector.substring(flags+1,selector.length-1);
                          for( i =0;i<domAll.length;i++){
                              if(domAll[i].getAttribute(attr) == attrValue){
                                  target = domAll[i];
                                  break;
                              }
                          }
                      }break;
            //通过标签返回的是第一个匹配的tag值
            default:target = dom.getElementsByTagName(selector)[0];

        }
        return target;

    },
    // 给一个element绑定一个针对event事件的响应，响应函数为listener
    //由于ie6 7 8，attach中this,指针的指向window，所以考虑在事件处理函数中弃用this
     addEvent:function(ele,event,listener){
        if(ele.addEventListener){ele.addEventListener(event,listener,false)}
        else if(ele.attachEvent){
            ele.attachEvent(ele,"on"+event,listener);
        }
        else{ele["on"+event] = listener}
    },
    removeEvent:function(element, event, listener) {
        if(ele.removeEventListener){
                ele.removeEventListener(event,listener)
        }
        else{ele.removeEvent("on"+event,listener)}

},
    addClickEvent:function(element,listener){
       this.addEvent(element,"click",listener)
    }
    ,
    addEnterEvent:function(element,listener){
        this.addEvent(element,"keyDown",function(event){

        })
    },
    //事件代理函数?有一个问题哦，不能移除哦。还有一个问题，event和target都是当做参数传进去的
    delegateEvent:
        function(element, tag, eventName, listener) {
         this.addEvent(element,eventName,function(event){
             var e = event||window.event;
             var target = e.target  || e.srcElement;
             var rg = new  RegExp(tag,"i");
             if(rg.test(target.tagName)){
                 listener(e,target)
             }
         })
    },

//5.bom
//判断是否是ie浏览器
    isIe:function(){
        if(!+[1,]){
         //ie浏览器

        }
        else{
            return -1;
        }
    },
// 设置cookie
    setCookie:function(cookieName, cookieValue, expiredays) {
    // your implement
},
// 获取cookie值
    getCookie:function(cookieName) {
    // your implement
}

};
