// 之前做util.js的时候还不懂怎么判断写的对不对
// 到了开始做小练习这一步才发现，问题真的好多！！
// 还是要多多向大家学习~
/***************************
  Melanie-BUPT  2015/5/3
***************************/

function uniqArray(arr) {
    var array = new Array();
    var obj = new Object();
    for (var i = 0; i < arr.length; i++) {
        //判断输入数组元素是否为空以及是否重复
        if (!obj[arr[i]] && arr[i]!="") {
            array.push(arr[i]);
            obj[arr[i]] = true;
        }
    }
    return array;
}

//第一阶段
function dealwithit() {
    var input = document.getElementById("single-input").value;
    console.log(input);
    var hobby = uniqArray(input.split(","));
    console.log(hobby);
    var result = document.createElement("p");
    result.innerHTML = hobby;
    document.getElementById("hobby-phase1").appendChild(result);
}

//第二阶段
function dealwiththem() {
    var input = document.getElementById("multi-input").value;
    console.log(input);
    //正则表达式真的好好用啊哈哈哈哈
    var hobby = uniqArray(input.split(/[\n\s\t,;，；、]*/));
    console.log(hobby);
    var result = document.createElement("p");
    result.innerHTML = hobby;
    document.getElementById("hobby-phase2").appendChild(result);
}

//第三阶段
function dealwithall() {
    var input = document.getElementById("final-input").value.split(/[\n\s\t,;，；、]*/);
    console.log(input);
    if (input.length<=10 && input.length>0) {
        document.getElementById("warning").textContent = "";
        // document.getElementById("warning").innerHTML = "";
        var hobby = uniqArray(input);
        console.log(hobby);
        for (var i = 0; i < hobby.length; i++) {
            var box = document.createElement("input");
            box.type = "checkbox";
            box.id = "box" + i;
            var label = document.createElement("label");
            label.for = box.id;
            label.innerHTML = hobby[i]+"<br>";
            document.getElementById("hobby-phase3").appendChild(box);
            document.getElementById("hobby-phase3").appendChild(label);
        }
    }
    else if (input.length==0) {
        document.getElementById("warning").textContent = 
        "You need to input at least one hobby!";
        //下面的这种实现办法有点儿笨，不过还是先留着
        // document.getElementById("warning").style.display = "block";
        // document.getElementById("warning").innerHTML = 
        // "You need to input at least one hobby!";
    }
    else {
        document.getElementById("warning").textContent = 
        "You can input up to 10 hobbies!";
        // document.getElementById("warning").style.display = "block";
        // document.getElementById("warning").innerHTML = 
        //"You can input up to 10 hobbies!";
    }
}

/***************************
总结一下下：
    实现方式总体来说还是略笨。
    对于JavaScript的很多属性方法还是不够熟，所以用的时候很费劲。
    总算是明白了console.log是干嘛用的了。之前写util.js的时候还不知道怎么测试。
    估计util里面还有很多错，等到后面的小练习再一一纠正吧。
    所以每个HTML文档里就不引用util.js了~
***************************/