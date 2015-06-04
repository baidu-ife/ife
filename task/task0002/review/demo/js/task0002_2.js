/**
 * @file task0002_2
 * @author junmer
 */


// util


/**
 * 对目标字符串进行格式化
 *
 * @param {string} source 目标字符串
 * @param {Object|string...} opts 提供相应数据的对象或多个字符串
 * @remark
 *
opts参数为“Object”时，替换目标字符串中的#{property name}部分。<br>
opts为“string...”时，替换目标字符串中的#{0}、#{1}...部分。

 *
 * @returns {string} 格式化后的字符串
 */
function format(source, opts) {
    source = String(source);
    var data = Array.prototype.slice.call(arguments,1), toString = Object.prototype.toString;
    if(data.length){
        data = data.length == 1 ?
            /* ie 下 Object.prototype.toString.call(null) == '[object Object]' */
            (opts !== null && (/\[object Array\]|\[object Object\]/.test(toString.call(opts))) ? opts : data)
            : data;
        return source.replace(/#\{(.+?)\}/g, function (match, key){
            var replacer = data[key];
            // chrome 下 typeof /a/ == 'function'
            if('[object Function]' == toString.call(replacer)){
                replacer = replacer(key);
            }
            return ('undefined' == typeof replacer ? '' : replacer);
        });
    }
    return source;
}


/**
 * 将目标字符串转换成日期对象
 *
 * @param {string} source 目标字符串
 *
对于目标字符串，下面这些规则决定了 parse 方法能够成功地解析： <br>
<ol>
<li>短日期可以使用“/”或“-”作为日期分隔符，但是必须用月/日/年的格式来表示，例如"7/20/96"。</li>
<li>以 "July 10 1995" 形式表示的长日期中的年、月、日可以按任何顺序排列，年份值可以用 2 位数字表示也可以用 4 位数字表示。如果使用 2 位数字来表示年份，那么该年份必须大于或等于 70。 </li>
<li>括号中的任何文本都被视为注释。这些括号可以嵌套使用。 </li>
<li>逗号和空格被视为分隔符。允许使用多个分隔符。 </li>
<li>月和日的名称必须具有两个或两个以上的字符。如果两个字符所组成的名称不是独一无二的，那么该名称就被解析成最后一个符合条件的月或日。例如，"Ju" 被解释为七月而不是六月。 </li>
<li>在所提供的日期中，如果所指定的星期几的值与按照该日期中剩余部分所确定的星期几的值不符合，那么该指定值就会被忽略。例如，尽管 1996 年 11 月 9 日实际上是星期五，"Tuesday November 9 1996" 也还是可以被接受并进行解析的。但是结果 date 对象中包含的是 "Friday November 9 1996"。 </li>
<li>JScript 处理所有的标准时区，以及全球标准时间 (UTC) 和格林威治标准时间 (GMT)。</li>
<li>小时、分钟、和秒钟之间用冒号分隔，尽管不是这三项都需要指明。"10:"、"10:11"、和 "10:11:12" 都是有效的。 </li>
<li>如果使用 24 小时计时的时钟，那么为中午 12 点之后的时间指定 "PM" 是错误的。例如 "23:15 PM" 就是错误的。</li>
<li>包含无效日期的字符串是错误的。例如，一个包含有两个年份或两个月份的字符串就是错误的。</li>
</ol>

 *
 * @returns {Date} 转换后的日期对象
 */
function dateParse(source) {
    var reg = new RegExp("^\\d+(\\-|\\/)\\d+(\\-|\\/)\\d+\x24");
    if ('string' == typeof source) {
        if (reg.test(source) || isNaN(Date.parse(source))) {
            var d = source.split(/ |T/),
                d1 = d.length > 1
                        ? d[1].split(/[^\d]/)
                        : [0, 0, 0],
                d0 = d[0].split(/[^\d]/);
            return new Date(d0[0] - 0,
                            d0[1] - 1,
                            d0[2] - 0,
                            d1[0] - 0,
                            d1[1] - 0,
                            d1[2] - 0);
        } else {
            return new Date(source);
        }
    }

    return new Date();
}

/**
 * 对目标数字进行0补齐处理
 *
 * @param {number} source 需要处理的数字
 * @param {number} length 需要输出的长度
 *
 * @returns {string} 对目标数字进行0补齐处理后的结果
 */
function pad(source, length) {
    var pre = "",
        negative = (source < 0),
        string = String(Math.abs(source));

    if (string.length < length) {
        pre = (new Array(length - string.length + 1)).join('0');
    }

    return (negative ?  "-" : "") + pre + string;
}

/**
 * 对目标日期对象进行格式化
 *
 *
 * @param {Date} source 目标日期对象
 * @param {string} pattern 日期格式化规则
 *
<b>格式表达式，变量含义：</b><br><br>
hh: 带 0 补齐的两位 12 进制时表示<br>
h: 不带 0 补齐的 12 进制时表示<br>
HH: 带 0 补齐的两位 24 进制时表示<br>
H: 不带 0 补齐的 24 进制时表示<br>
mm: 带 0 补齐两位分表示<br>
m: 不带 0 补齐分表示<br>
ss: 带 0 补齐两位秒表示<br>
s: 不带 0 补齐秒表示<br>
yyyy: 带 0 补齐的四位年表示<br>
yy: 带 0 补齐的两位年表示<br>
MM: 带 0 补齐的两位月表示<br>
M: 不带 0 补齐的月表示<br>
dd: 带 0 补齐的两位日表示<br>
d: 不带 0 补齐的日表示

 *
 * @returns {string} 格式化后的字符串
 */
function dateFormat(source, pattern) {
    if ('string' != typeof pattern) {
        return source.toString();
    }

    function replacer(patternPart, result) {
        pattern = pattern.replace(patternPart, result);
    }

    var year    = source.getFullYear(),
        month   = source.getMonth() + 1,
        date2   = source.getDate(),
        hours   = source.getHours(),
        minutes = source.getMinutes(),
        seconds = source.getSeconds();

    replacer(/yyyy/g, pad(year, 4));
    replacer(/yy/g, pad(parseInt(year.toString().slice(2), 10), 2));
    replacer(/MM/g, pad(month, 2));
    replacer(/M/g, month);
    replacer(/dd/g, pad(date2, 2));
    replacer(/d/g, date2);

    replacer(/HH/g, pad(hours, 2));
    replacer(/H/g, hours);
    replacer(/hh/g, pad(hours % 12, 2));
    replacer(/h/g, hours % 12);
    replacer(/mm/g, pad(minutes, 2));
    replacer(/m/g, minutes);
    replacer(/ss/g, pad(seconds, 2));
    replacer(/s/g, seconds);

    return pattern;
};

// 2_2

var targetTime;

var timer;

function printTime(leftTime) {

    var leftDate = {
        dd: parseInt(leftTime / 1000 / 60 / 60 / 24, 10),
        hh: parseInt(leftTime / 1000 / 60 / 60 % 24, 10),
        mm: parseInt(leftTime / 1000 / 60 % 60, 10),
        ss: parseInt(leftTime / 1000 % 60, 10)
    };

    $('#output').innerHTML = ''
        + dateFormat(targetTime, '距离yyyy年MM月dd日')
        + format('还有#{dd}天#{hh}小时#{mm}分#{ss}秒', leftDate);
}

function runTimer(first) {

    var nowTime = new Date();

    var leftTime = targetTime - nowTime;

    if (first && leftTime < 0) {
        alert('目标时间 小于当前时间');
        return;
    }

    printTime(leftTime);

    if (leftTime / 1000  == 0) {
        return;
    }

    timer = setTimeout(runTimer, 1000);

}


function startTimer() {

    var input = $('#ife-input').value;
    if (!input) {
        alert('input time yyyy-mm-dd');
        return;
    }
    clearTimeout(timer);
    targetTime = dateParse(input);

    runTimer(true);
}

$.on('#ife-btn', 'click', startTimer);
