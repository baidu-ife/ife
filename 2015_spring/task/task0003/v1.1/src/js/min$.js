define([], function() {
    /*
    * min $
    */ 
    return function(selector) {
        return (function $(selector) {
            //清除首尾空格
            selector = trim(selector);
            var arr = [];
            //判断selector中间是否有空格需要拆分
            var space = selector.indexOf(' ');

            //有空格的情况 拆分查询
            if (space != -1) {
                //以空格形式分割字符串 从得到的数组最后进行逆向查询
                arr = selector.split(/\s+/);
                for (var i = arr.length; i>1; i++) {
                    return query(arr[i-1],arr[i-2]);
                }
            //无空格情况 直接查询
            } else {
                return query(selector);
            }
            //主要查询器
            function query(selector,oParent) {

                //selector 中间有空格被拆分了
                if (arr[0]) {
                    oParent = $(arr[0]);
                } else {
                    oParent = document;
                }

                //判断首字符
                switch (selector.charAt(0)) {
                    case '#' :
                        return document.getElementById(selector.substring(1));
                        break;
                    case '.' :
                        return getClass(oParent,selector.substring(1));
                        break;
                    case '[' :
                        //返回第一个属性匹配元素
                        return getQueryAttr(selector);
                        break;

                    //默认形式：
                    //1、纯标签形式，例如 p
                    //2、带属性形式，例如 p[data]
                    //3、带.class形式，例如 p.info
                    default :

                        //  第三种情况
                        if (selector.indexOf('.') != -1) {
            
                            var defArr = selector.split('.');
                            return getClass(oParent, defArr[1], defArr[0]);
                        } 
                        //  第二种情况
                        else if (selector.indexOf('[') != -1) {
                            
                            var defArr = selector.split('[');
                            defArr[1] = "["+defArr[1];
                            return getQueryAttr(defArr[1], defArr[0]);

                        }
                        // 第一种情况
                        else {
                            return oParent.getElementsByTagName(selector)[0];
                        }
                    
                        break;
                    }
            }

            //匹配[]选择器
            function getQueryAttr(attr,tagName) {
                tagName = tagName || '*';
                var aElem = document.getElementsByTagName(tagName);
                //去掉首尾[]
                attr = attr.substring(1,attr.length-1);
                //判断是否有=
                if (attr.indexOf('=') != -1) {
                    var arr = attr.split('=');
                    for (var i = 0; i<aElem.length; i++) {
                        if (aElem[i].getAttribute(arr[0]) == arr[1]) {
                            return aElem[i];
                        }
                    }
                } else {
                    for (var i = 0; i<aElem.length; i++) {
                        if (aElem[i].getAttribute(attr) || aElem[i].getAttribute(attr) == "") {
                            return aElem[i];
                        }
                    }
                }
                return '';
            }

            //获取class元素，兼容ie低版本,返回第一个符合条件
            //三个参数，1、父级 2、class名 3、标签名
            function getClass(oParent,oClass,tagName) {
                tagName = tagName || "*";
                var aElem = oParent.getElementsByTagName(tagName);
                var arr = [];

                for (var i = 0; i<aElem.length; i++) {
                    if (aElem[i].className) {
                        //对每个元素的class名进行处理
                        var classNames = trim(aElem[i].className);
                        var arr2 = classNames.split(/\s+/);
                    
                        for (var j = 0; j<arr2.length; j++) {
                            //返回第一个符合条件的元素
                            if (arr2[j] === oClass) {
                                return aElem[i];
                            }
                        }
                    }  
                }
                return '';
            }

            function trim(str) {
                var re = /^\s+|\s+$/g;
                return str.replace(re,'');
            }
        })(selector);
    }
});