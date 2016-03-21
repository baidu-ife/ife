(function() {
    // 获得dom
    let dom_list = document.querySelector(".list");

    let number_node = document.querySelectorAll(".number");

    let left_in = document.querySelector(".L-in");
    let right_in = document.querySelector(".R-in");
    let left_out = document.querySelector(".L-out");
    let right_out = document.querySelector(".R-out");

    // 初始化数字列表
    let number_list = [];

    // 获取初始数字列表
    (function getNumberList() {
        for (let i = 0, length = number_node.length; i < length; i++) {
            number_list.push(number_node[i].innerText);
        }
    }())

    // 渲染数字列表
    let renderNumberList = function() {
        dom_list.innerHTML = "";
        for (let i = 0, length = number_list.length; i < length; i++) {
            let node = document.createElement("div");
            node.className = "number";
            node.innerText = number_list[i];
            dom_list.appendChild(node);
        }
        // 绑定点击事件
        for (let index = 0, length = dom_list.children.length; index < length; index++) {
            dom_list.children[index].addEventListener("click", function() {
                number_list.splice(index, 1);
                renderNumberList();
            })
        }
    }

    // 初始渲染
    renderNumberList();

    // 获取输入值
    let getNumberInput = function() {
        let number_input = document.querySelector(".number-input").value;
        return number_input;
    }

    // 事件绑定
    left_in.addEventListener("click", function() {
        if (!isNaN(parseInt(getNumberInput()))) {
            number_list.unshift(getNumberInput());
            document.querySelector(".number-input").value = null;
            renderNumberList();
        } else {
            alert("请输入数字");
        }
    })

    right_in.addEventListener("click", function() {
        if (!isNaN(parseInt(getNumberInput()))) {
            number_list.push(getNumberInput());
            document.querySelector(".number-input").value = null;
            renderNumberList();
        } else {
            alert("请输入数字");
        }
    })

    left_out.addEventListener("click", function() {
        alert(number_list.shift() || "列表已空");
        renderNumberList();
    })

    right_out.addEventListener("click", function() {
        alert(number_list.pop() || "列表已空");
        renderNumberList();
    })

}())
