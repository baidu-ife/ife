/*
* task0002_4.js
*/

(function (exprots, $) {
    var queue={};

    function InputTip (opt) {
        this.inputTxtDom=$(opt.inputTxt);
        this.tipDom=null;
        this.url=opt.url;

        this.init();
    }

    InputTip.prototype={
        constructor:InputTip,
        init:function () {
            this.tipDom=document.createElement("div");
            this.tipDom.id="tip";
            this.tipDom.className="tip";
            this.inputTxtDom.parentNode.appendChild(this.tipDom);
            this.id="ipt_"+Math.floor(Math.random()*1000);

            this.createEvent();
        },
        createEvent:function () {
            var that=this;
            var oridinalVal,
                curIndex=-1;

            var clickOrEnterHandler=function (e) {
                var tar=e.target||e.srcElement;
                oridinalVal=that.inputTxtDom.value=tar.getAttribute("data-value");
                removeClass(that.tipDom,"z-show");
                that.clearTipHtml();
            };

            $.on(that.inputTxtDom, "keyup", function (e) {
                e=e||window.event;
                if((e.keyCode>=37 && e.keyCode<=40) || e.keyCode===13) return;
                var val;
                if(!(val=this.value)){
                    removeClass(that.tipDom,"z-show");
                    that.clearTipHtml();
                    return;
                }
                that.filterData(val);
                oridinalVal=val;
                curIndex=-1;
            });
            $.delegate(that.tipDom, ".item", "click", function (e) {
                e=e||window.event;
                clickOrEnterHandler(e);
            });
            $.on(document, "keydown", function (e) {
                e=e||window.event;
                var tar=e.target||e.srcElement,
                    childs,
                    len;

                if(e.keyCode===40){
                    childs=that.tipDom.children;
                    len=childs.length;
                    if(len<1) return;
                    curIndex!==len&&curIndex!==-1 ? removeClass(childs[curIndex],"z-active") : void 0;
                    curIndex++;
                    if(curIndex>=len){
                        curIndex=-1;
                        that.inputTxtDom.value=oridinalVal;
                    }else{
                        addClass(childs[curIndex],"z-active");
                        that.inputTxtDom.value=childs[curIndex].getAttribute("data-value");
                    }
                }else if(e.keyCode===38){
                    childs=that.tipDom.children;
                    len=childs.length;
                    if(len<1) return;
                    curIndex!==len&&curIndex!==-1 ? removeClass(childs[curIndex],"z-active") : void 0;
                    curIndex--;
                    if(curIndex<0){
                        curIndex=len;
                        that.inputTxtDom.value=oridinalVal;
                    }else{
                        addClass(childs[curIndex],"z-active");
                        that.inputTxtDom.value=childs[curIndex].getAttribute("data-value");
                    }
                }else if(e.keyCode===13){
                    childs=that.tipDom.children;
                    len=childs.length;
                    if(len<1) return;
                    clickOrEnterHandler({target:childs[curIndex]});
                }
            })
        },
        clearTipHtml:function () {
            this.tipDom.innerHTML="";
        },
        filterData:function (val) {
            var that=this;
            ajax(this.url,{
                type:"get",
                data:val,
                onsuccess:function (data) {
                    if(!data) return;
                    try{
                        data=JSON.parse(data);
                        if(isArray(data)){
                            // 传过来的数据一定是在服务器事先筛选好的
                            that.addTip(data,val);
                            addClass(that.tipDom,"z-show");
                        }else{
                            removeClass(that.tipDom,"z-show");
                            that.clearTipHtml();
                        }
                    }catch(err){
                        console.log("数据有误");
                    }
                },
                onfail:function () {
                    console.log("something wrong occur");
                }
            })
        },
        addTip:function (data, matchTxt) {
            var replacer=function (str) {
                var res='<span class="match">'+str+'</span>';
                return res;
            };

            this.clearTipHtml();

            var str="",
                arr=[],
                regex=new RegExp(matchTxt,"g");

            for(var i=0,len=data.length; i<len; i++){
                str=data[i].replace(regex, replacer);
                str='<div class="item" data-value="'+data[i]+'">'+str+'</div>';
                arr.push(str);
            }
            this.tipDom.innerHTML=arr.join("");
        }
    }
    
    $.enableInputTip=function (opt) {
        if(!opt.inputTxt||!opt.url){
            return;
        }
        var temp=new InputTip(opt);
        queue[temp.id]=temp;
        return temp.id;
    }
})(window, $);


$.enableInputTip({
    inputTxt:"#inputTxt",
    url:"./js/data.json"
});


