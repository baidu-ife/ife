/*
*   全局命名空间
*   方法和变量
*   主要分为
*       本地存储数据处理：Data模块
*       用户输入验证：    Validator模块
*/ 
var g = {
    Data: {
        getItem: function(name) {
            return JSON.parse(window.localStorage.getItem(name));
        },
        saveStroage: function(obj) { //设置本地存储
            var str = JSON.stringify(obj);
            window.localStorage.setItem(obj.name,str);
        },
        addParentLocalStorage: function (parentName, datatype, dataName) { //给本地存储 增加一个新子元素
            var obj = g.Data.getItem(parentName);
            obj[datatype].push(dataName);
            g.Data.saveStroage(obj);
        },
        removeStrong: function (data) { //删除自己和自己子级的数据
            if (data.child.length) {
                for (var i = 0; i<data.child.length; i++) {
                    arguments.callee(g.Data.getItem(data.child[i]));
                }
            }
            window.localStorage.removeItem(data.name);
        },
        updateParent: function(data) { //删除父级指向自己的指针
            var JSON = g.Data.getItem(data.parent);
            for (var i = 0; i<JSON.child.length; i++) {
                if (JSON.child[i] == data.name) {
                    JSON.child.splice(i,1);
                    g.Data.saveStroage(JSON);
                }
            }
        },
        updateUnFinishNum: function(data,type) {     
            while (data) {
                if (type == 'add') {
                    data.unFinishNum ++;    
                } else if (type == 'sub') {
                    data.unFinishNum --;
                }
                g.Data.saveStroage(data);
                data = g.Data.getItem(data.parent);
            }
        }
    },
    Validator: {
        addMenu: function(name) {                
            var value = $('#input-kind').value;
            if (value == '') {
                alert('输入值不能为空!');
                return false;
            }
            var JSON = g.Data.getItem(name);
            for (var i = 0, len = JSON.child.length; i<len; i++) {
                var title = g.Data.getItem(JSON.child[i]).title;
                if (title == value) {
                    alert('输入值和当前目录存在重复，请重新输入！');
                    return false;
                }
            }
            // console.log(JSON)
            return true;
        },
        isParent: function (parent, child) { //判断一个元素是不是一个元素的子项
            if (parent == child) {
                return false;
            }
            while (child) {
                child = child.parentNode; 
                if (parent == child) {
                    return true;
                }
            }
            return false;
        },
        title: function(value) {
            if (value.length <2 || value.length >15) {
                return false;
            } else {
                return true;
            }
        },
        date: function(value) {
            var str = trim(value);
            var arr = str.split('-');
            if (arr.length == 3) {
                var date = new Date(arr[0], arr[1],arr[2]);
                var Y = date.getFullYear();
                var M = date.getMonth();
                var D = date.getDate()
                if(D==arr[2] && Y==arr[0] && M==(arr[1])) {
                    return true;
                } else {
                    return false;
                }
            } else {
                return false;
            }
        },
        task: function(value) {
            if (value == '') {
                return 1;
            } else if (value.length > 100) {
                return 2;
            } else {
                return 3;
            }
        },
        isDateEqual: function(date) { //判断日期是否相等
            var aDt = $('#allTaskList').getElementsByTagName('dt');
            for (var i = 0; i<aDt.length; i++) {
                if (aDt[i].innerHTML == date) {
                    return aDt[i].parentNode;
                }
            } 
            return false;
        }
        },
    getFormatDate: function (){   //获取当前时间 格式 2015-05-06
        var oDate = new Date();
        var str = '';
        str = oDate.getFullYear();
        str += '-' + g.addZero(oDate.getMonth()+1) + '-' + g.addZero(oDate.getDate());
        return str;
    },
    addZero: function (sum) {   //补零 9 --> 09
        if (sum<10) {
            return '0' + sum;
        } else {
            return sum;
        }
    },
    onOff: true,
    iCurentDd: []
};