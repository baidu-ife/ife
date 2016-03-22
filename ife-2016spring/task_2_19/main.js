(function() {
    // 获得dom
    let dom_list = document.querySelector(".list");

    let number_node = document.querySelectorAll(".number");

    let left_in = document.querySelector(".L-in");
    let right_in = document.querySelector(".R-in");
    let left_out = document.querySelector(".L-out");
    let right_out = document.querySelector(".R-out");
    let btn_sort = document.querySelector(".btn-sort");

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
        for (let i in number_list) {
            let node = document.createElement("div");
            node.className = "number";
            node.innerText = number_list[i];
            // 绑定点击事件
            node.addEventListener("click", function() {
                number_list.splice(i, 1);
                renderNumberList();
            });
            // 渲染高度
            node.style.height = node.innerText * 2 + "px";
            dom_list.appendChild(node);
        }
    }

    // 初始渲染
    renderNumberList();

    // 事件绑定
    left_in.addEventListener("click", function() {
        // 获取输入值
        let number_input = document.querySelector(".number-input").value;
        if (dom_list.children.length < 60) {
            if ((!isNaN(parseInt(number_input, 10))) && (parseInt(number_input, 10) >= 10) && (parseInt(number_input, 10) <= 100)) {
                number_list.unshift(number_input);
                document.querySelector(".number-input").value = null;
                renderNumberList();
            } else {
                alert("请输入数字10-100");
            }
        } else {
            alert("列表数量已到达上限60");
        }
    })

    right_in.addEventListener("click", function() {
        // 获取输入值
        let number_input = document.querySelector(".number-input").value;
        if (dom_list.children.length < 60) {
            if ((!isNaN(parseInt(number_input, 10))) && (parseInt(number_input, 10) >= 10) && (parseInt(number_input, 10) <= 100)) {
                number_list.push(number_input);
                document.querySelector(".number-input").value = null;
                renderNumberList();
            } else {
                alert("请输入数字10-100");
            }
        } else {
            alert("列表数量已到达上限60");
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

    // 插入排序算法
    let selectSort = function*(arr) {
        for (let index = 0, length = arr.length; index < length; index++) {
            let min = arr[index];

            for (let i = index; i < length; i++) {
                if (arr[i] < min) {
                    [min, arr[i]] = [arr[i], min];

                    let number_i = dom_list.children[i];
                    let number_index = dom_list.children[index];

                    number_i.style.backgroundColor = "green";
                    number_index.style.backgroundColor = "green";

                    // 元素交换
                    [number_i.innerText, number_index.innerText] = [number_index.innerText, number_i.innerText];
                    [number_i.style.height, number_index.style.height] = [number_index.style.height, number_i.style.height];

                    yield sleep(350);
                    number_i.style.backgroundColor = "red";
                    number_index.style.backgroundColor = "blue";

                }
            }

            arr[index] = min;
            dom_list.children[index].innerText = arr[index];
            dom_list.children[index].style.height = arr[index] * 2 + "px";

            dom_list.children[index].style.backgroundColor = "blue";
        }
        return arr;
    }

    // co简单实现
    let co = function(fn) {
        let gen = fn;
        next();

        function next(res) {
            let ret;
            ret = gen.next(res);
            // 全部结束
            if (ret.done) {
                return;
            }
            // 执行回调
            if (typeof ret.value == 'function') {
                ret.value(function() {
                    next.apply(this, arguments);
                });
                return;
            }
            throw 'yield target no supported!';
        }
    }

    // 模拟sleep
    let sleep = function(ms) {
        return function(cb) {
            setTimeout(cb, ms);
        };
    }

    btn_sort.addEventListener("click", function() {
        co(selectSort(number_list));
    })
}())
