(function(){
    var container = $("#container"); //最外面的大容器
    var leftList = $("#leftList");   //左边容器
    var rightList = $("#rightList"); //右边容器

    // 当鼠标点击后，点击处和被点击dom左上角的距离
    var mouseOffsetX = 0;            
    var mouseOffsetY = 0;

    // 被移动的元素序号
    var moveIndex = -1;

    // 被移出的元素，设为全局变量
    var rmElement;


    // 点击某个元素并移动鼠标后，产生移动的元素，
    // 输入点击处的相对位移（相对于<body>），点击元素序号
    // 输出该移动元素
    function createFlowElement(offsetLeft, offsetTop, moveIndex){
        var ele = document.createElement("div");

        ele.className = "item moveItem";
        ele.setAttribute("data-index", moveIndex);
        ele.style.position = "absolute";
        ele.style.left = offsetLeft + "px";
        ele.style.top = offsetTop + "px";
        ele.innerText = moveIndex.toString();

        container.appendChild(ele);     
        return ele;
    }

    // 当选中元素移动到目标位置时，在目标容器中添加一个新元素
    // 输入：目标容器，选中元素的序号
    function appendDiv (parent, moveIndex) {
        var div = document.createElement("div");  
        div.className="item";
        div.setAttribute("data-index", moveIndex);
        div.innerText = moveIndex;   
        parent.appendChild(div); 
    }

    // 当选中元素移动到目标位置时，在原容器中删除该元素
    // 输入：原容器，选中元素
    function removeDiv (parent, target) {
        parent.removeChild(target);
    }

    //给左边容器中的div绑定mousedown事件
    $.delegate("#leftList", "div", "mousedown", function(event){
        var e = event || window.event;
        var target = e.target || e.srcElement;
        
        //给移出元素赋值
        rmElement = target;
        moveIndex = target.getAttribute("data-index");

        mouseOffsetX = e.pageX - target.offsetLeft;
        mouseOffsetY = e.pageY - target.offsetTop;

        //生成一个移动元素
        moveEle = createFlowElement(target.offsetLeft, target.offsetTop, moveIndex);

        //为移动元素绑定mousemove事件
        addEvent(moveEle, "mousemove", function(event){
            var e = event || window.event;
            var target = e.target || e.srcElement;

            var mouseX = e.pageX;
            var mouseY = e.pageY;

            var moveX = mouseX - mouseOffsetX;
            var moveY = mouseY - mouseOffsetY;
                
            target.style.left = moveX + "px";
            target.style.top = moveY + "px";            
        });

        //为移动元素绑定mouseup事件
        addEvent(moveEle, "mouseup", function(event){           
            var e = event || window.event;
            var target = e.target || e.srcElement;

            //判断条件
            // 比较[网页可见区域宽的一半]和[移动元素offsetLeft(相对于<body>)+该元素宽度一半]
            var dis = target.offsetLeft + target.offsetWidth/2;
            if(dis < document.body.clientWidth/2) {
                //离原容器近，移动失败，使移动元素消失
                target.style.display = "none";
            } else {
                //离目标容器近，移动成功
                //使移动元素消失
                //在原容器中删除该元素
                //在目标容器最后添加该元素
                target.style.display = "none";
                removeDiv(leftList, rmElement);
                appendDiv(rightList, moveIndex);
            }
        });
        // moveEle.addEventListener("mouseup", function(event){
        // });
    
    });

    ////给右边容器中的div绑定mousedown事件，原理同左，考虑合并
    $.delegate("#rightList", "div", "mousedown", function(event){
        var e = event || window.event;
        var target = e.target || e.srcElement;
        rmElement = target;
        console.log(rmElement);
        moveIndex = target.getAttribute("data-index");
        // console.log(target.offsetParent); //          offsetParent为<body></body>

        mouseOffsetX = e.pageX - target.offsetLeft;
        mouseOffsetY = e.pageY - target.offsetTop;

        moveEle = createFlowElement(target.offsetLeft, target.offsetTop, moveIndex);

        addEvent(moveEle, "mousemove", function(event){            
            var e = event || window.event;
            var target = e.target || e.srcElement;

            var mouseX = e.pageX;
            var mouseY = e.pageY;

            var moveX = mouseX - mouseOffsetX;
            var moveY = mouseY - mouseOffsetY;
                
            target.style.left = moveX + "px";
            target.style.top = moveY + "px";
        });

        addEvent(moveEle, "mouseup", function(event){         
            var e = event || window.event;
            var target = e.target || e.srcElement;

            var dis = target.offsetLeft + target.offsetWidth/2;
            if(dis > document.body.clientWidth/2) {
                console.log("left");
                target.style.display = "none";
            } else {
                console.log('right');
                target.style.display = "none";
                removeDiv(rightList, rmElement);
                appendDiv(leftList, moveIndex);
            }
            // console.log(dis);
        });
    
    });


})();