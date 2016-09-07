/*
*   验证模块
*   用户输入 任务标题，日期，内容验证
*/ 

define(['util'], function(_) {

    return {

        //验证任务title值大于2个字符并且小于15个字符
        title: function(value) {  
            value = _.trim(value);
            if (value.length < 2) {
                return {
                    status: false,
                    msg: '错误！您当前输入的标题小于2个字符'
                }
            } else if ( value.length > 15) {
                return {
                    status: false,
                    msg: '错误！您当前输入的标题大于15个字符'
                }
            } else {
                return {
                    status: true
                }
            }
        },

        //验证一个日期是否是正确日期,并且格式要求YYYY-MM-DD
        date: function(value) {     
            value = _.trim(value).split('-');
            if (value.length == 3) {
                var date = new Date(value[0], value[1],value[2]);
                var Y = date.getFullYear();
                var M = date.getMonth();
                var D = date.getDate()
                if(D==value[2] && Y==value[0] && M==(value[1])) {
                    return {
                        status: true
                    }
                } else {
                    return {
                        status: false,
                        msg: '请输入与正确的年月日'
                    }
                }
            } else {
                return {
                    status: false,
                    msg: '请按正确格式YYYY-MM-DD输入年月日'
                }
            }
        },

        //任务内容验证
        taskContent: function(value) {
            value = _.trim(value);
            if (value.length == 0) {
                return {
                    status: false,
                    msg: '您任务内容输入为空，请重新输入'
                }
            } else if (value.length > 100) {
                return {
                    status: false,
                    msg: '您输入超出最大范围100个字符'
                }
            } else {
                return {
                    status: true
                }
            }
        },
    }
});


       

        
    //     addCatalog: function(uid,value) {   //对添加分类进行判断，值不为空且和当前存在的分类不能相同
    //         if (value == '') { 
    //             alert('输入值不能为空!');
    //             return false;
    //         }
    //         var JSON = g.Data.getItem(uid);
    //         for (var i = 0, len = JSON.child.length; i<len; i++) {
    //             var title = g.Data.getItem(JSON.child[i]).title;
    //             if (title == value) {
    //                 alert('输入值和当前目录存在重复，请重新输入！');
    //                 return false;
    //             }
    //         }
    //         return true;
    //     },
    //     isParent: function (parent, child) { //判断一个元素是不是一个元素的子项
    //         if (parent == child) {
    //             return false;
    //         }
    //         while (child) {
    //             child = child.parentNode; 
    //             if (parent == child) {
    //                 return true;
    //             }
    //         }
    //         return false;
    //     },
    //     title: function(value) {    //验证任务title值大于2个字符并且小于15个字符
    //         if (value.length <2 || value.length >15) {
    //             return false;
    //         } else {
    //             return true;
    //         }
    //     },
    //     date: function(value) {     //验证一个日期是否是正确日期
    //         var str = trim(value);
    //         var arr = str.split('-');
    //         if (arr.length == 3) {
    //             var date = new Date(arr[0], arr[1],arr[2]);
    //             var Y = date.getFullYear();
    //             var M = date.getMonth();
    //             var D = date.getDate()
    //             if(D==arr[2] && Y==arr[0] && M==(arr[1])) {
    //                 return true;
    //             } else {
    //                 return false;
    //             }
    //         } else {
    //             return false;
    //         }
    //     },
    //     task: function(value) {
    //         if (value == '') {
    //             return 1;
    //         } else if (value.length > 100) {
    //             return 2;
    //         } else {
    //             return 3;
    //         }
    //     },
    //     isDateEqual: function(date) { //判断日期是否相等
    //         var aDt = $('#allTaskList').getElementsByTagName('dt');
    //         for (var i = 0; i<aDt.length; i++) {
    //             if (aDt[i].innerHTML == date) {
    //                 return aDt[i].parentNode;
    //             }
    //         } 
    //         return false;
    //     }
    //     },
    // getFormatDate: function (){   //获取当前时间 格式 2015-05-06
    //     var oDate = new Date();
    //     var str = '';
    //     str = oDate.getFullYear();
    //     str += '-' + g.addZero(oDate.getMonth()+1) + '-' + g.addZero(oDate.getDate());
    //     return str;
    // },
    // addZero: function (sum) {   //补零 9 --> 09
    //     if (sum<10) {
    //         return '0' + sum;
    //     } else {
    //         return sum;
    //     }
    // }