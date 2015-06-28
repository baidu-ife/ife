# 总结


## util.js
    - 判断类型的各种方式（其中Array使用：Object.prototype.toString==="[object Array]"）

    - 空白符：' ','\f','\n','\r','\t','\v'

    - 去重数组的方式

    - 绝对定位的元素的offsetParent为null

    - 匹配选择器要逆向思维,从后往前查找，有两个情况列外：1.第一个选择器是id的时候，他会用byid缩小范围;  2.最后一个是tag的时候会用bytag缩小范围;  其他的情况就是把body里面的东西全拿出来挨个筛选

    - 如何移除一个元素的某个事件下的所有事件处理函数。给元素添加事件管理对象，移除是循环遍历

    - ajax中的错误情况是如何捕获的。readystatechange=4 && (status!=200 || status!=304)

    - 事件委托的原理

    - 正则表达式的语法，使用(split,replace)

    - dom的操作方法：insertBefore,appendChild,replaceChild,cloneNode,removeChild...

    - dom节点的关系：parentNode,childNode,nextElementSibling,nextSibing,previousElementSibling,previousSibling,firstChild,lastChild

    - dom节点的属性：getAttribute,setAttribute,nodeValue


## 练习1
    - 正则表达式居然能识别全角逗号，顿号!!!


## 练习2
    - 时间API


## 练习3
    - ie9不支持transition！加前缀也没有用

    - 如何获取浏览器内核

    - 由于dispaly的原因导致的transition无法应用的问题，如何解决？setTimeout?

    - ie8下获取offsetWidth时值可能为0的问题？这是为什么？ task0002_3.js第75行


## 练习4
    - replace使用。使用正则表达式和函数作为参数


## 练习5
    - 拖动，释放的原理

    - html5的拖放API和使用mousedown,mousemove,mouseup来实现

    - <= ie8和其他浏览器情况下的实现方式。因为ie8不支持添加多个事件处理函数，所以只能利用事件事件冒泡，e.target||e.srcElement来做
