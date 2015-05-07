/**
 * Created by Lenovo on 2015/5/5.
 */
window.onload = function() {
    var index = 1;//默认z轴坐标
    var container = $('#container');
    var arrUl = container.getElementsByTagName('ul');
    var arrLi1 = arrUl[0].getElementsByTagName('li');
    var arrLi2 = arrUl[1].getElementsByTagName('li');
    //改变布局
    changePos(arrLi1);
    changePos(arrLi2);
    //绑定目标容器
    bindTarget(arrUl[0],arrUl[1]);
    bindTarget(arrUl[1],arrUl[0]);
    function bindTarget(currentParent, targetParent) {
        currentParent.onmousedown = function(ev){
            var ev = ev || window.event;
            var target = ev.target || ev.srcElement;
            if (target.nodeName.toLowerCase() == "li") {
                //当前选中的li元素
                var nowLi = target;
                //curstr记录被选中小块的元素文本内容
                var curstr = nowLi.innerHTML;
                nowLi.innerHTML = '按住鼠标左键拖动';
                //鼠标按下 记录鼠标位置
                var mouseX = ev.clientX;
                var mouseY = ev.clientY;
                //记录小块初始位置
                var blockX = nowLi.offsetLeft;
                var blockY = nowLi.offsetTop;
                //使当前li层级提升
                nowLi.style.zIndex = index++;
                //鼠标移动
                document.onmousemove = function(ev) {
                    var ev = ev || window.event;
                    //当前鼠标位置减去初始鼠标按下时鼠标位置即为位移
                    nowLi.style.left = blockX + ev.clientX - mouseX + 'px';
                    nowLi.style.top = blockY + ev.clientY - mouseY + 'px';
                    addClass(nowLi,'onmove');
                    if (crashCheck(targetParent, nowLi)) {
                        nowLi.innerHTML = "松开鼠标左键完成";
                    }
                    else{
                        nowLi.innerHTML = "按住鼠标左键拖动";
                    }
                };
                //鼠标抬起
                document.onmouseup = function() {
                    //当前拖拽的li在对面ul范围内
                    removeClass(nowLi,'onmove');
                    if (crashCheck(targetParent, nowLi)) {
                        targetParent.appendChild(nowLi);
                    } else {
                        currentParent.appendChild(nowLi);
                    }
                    //重新浮动布局在转为绝对布局
                    fixPos(targetParent);
                    fixPos(currentParent);
                    //还原默认
                    nowLi.innerHTML = curstr;
                    document.onmousemove = null;
                    document.onmouseup = null;
                };
                //阻止默认事件
                return false;
            }
        };
    }
    //把布局转成浮动来自动确定位置，然后重新转成绝对定位为下次拖动做准备
    function fixPos(ulParent) {
        var arrLi = ulParent.getElementsByTagName('li');
        for (var i = 0; i<arrLi.length; i++) {
            arrLi[i].style.position = '';
            arrLi[i].style.float = 'left';
        }
        changePos(arrLi);
    }
    //布局转换，使用绝对定位的方式实现拖动的效果，浮动布会自动确定位置，无法拖动
    function changePos(arrLi) {
        var arr = [];
        for (var i = 0; i<arrLi.length; i++) {
            arr.push([arrLi[i].offsetLeft, arrLi[i].offsetTop]);
        }
        for (var i = 0; i<arrLi.length; i++) {
            arrLi[i].style.position = 'absolute';
            arrLi[i].style.left = arr[i][0] + 'px';
            arrLi[i].style.top = arr[i][1] + 'px';
        }
    }
    //碰撞检测
    function crashCheck(obj1, obj2) {
        var dis1 = getPosition(obj1);
        var dis2 = getPosition(obj2);
        //L、R、T、B分别代表小红块左右上下的边到与其平行的坐标轴的距离
        var L1 = dis1.x;
        var R1 = dis1.x + obj1.offsetWidth;
        var T1 = dis1.y;
        var B1 = dis1.y + obj1.offsetHeight;
        var L2 = dis2.x;
        var R2 = dis2.x + obj2.offsetWidth;
        var T2 = dis2.y;
        var B2 = dis2.y + obj2.offsetHeight;
        //四种相撞的情况
        if (L1 > R2 || R1 < L2 || T1 > B2 || B1 < T2) {
            return false;
        } else {
            return true;
        }
    }
};