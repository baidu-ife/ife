/**
 * Created by jp on 2015/6/30.
 */
var data = [
    {img:1,h1:'creative',h2:"DUET"},
    {img:2,h1:'creative',h2:"DUET"},
    {img:3,h1:'creative',h2:"DUET"},
    {img:4,h1:'creative',h2:"DUET"},
    {img:5,h1:'creative',h2:"DUET"},
    {img:6,h1:'creative',h2:"DUET"},
    {img:7,h1:'creative',h2:"DUET"}
];
//2.通用函数
var g = function (id) {
    if(id.substr(0,1) == '.'){
        return document.getElementsByClassName(id.substr(1));
    }
    return document.getElementById(id);
}
//3.添加幻灯片的操作
function addSliders() {
   //3.1 获取模板
    var tpl_main = g('template_main').innerHTML.replace(/^\s*|\s*$/g,"");
    var tpl_ctrl = g('template_ctrl').innerHTML.replace(/^\s*|\s*$/g,"");

    var out_main = [];
    var out_ctrl = [];
    var i;
    for(i in data) {
        var _html_main = tpl_main.replace(/\{\{index}}/g,data[i].img)
            .replace(/\{\{h2}}/g,data[i].h1)
            .replace(/\{\{h3}}/g,data[i].h2)
            .replace(/\{\{css}}/g,["","main-i_right"][i%2]);

        var _html_ctrl = tpl_ctrl.replace(/\{\{index}}/g,data[i].img);
        out_main.push(_html_main);
        out_ctrl.push(_html_ctrl);
    }
    g("template_main").innerHTML =  out_main.join('');
    g("template_ctrl").innerHTML =  out_ctrl.join('');

     //7.增加 #main—_backgroud
    g("template_main").innerHTML +=tpl_main.replace(/\{\{index}}/g,"{{index}}").replace(/\{\{h2}}/g,data[i].h1).replace(/\{\{h3}}/g,data[i].h2);
    g("main_{{index}}").id = "main_background";
}
//5.幻灯片切换
function switchSlider(n) {
    var main = g("main_"+n);
    var ctrl = g("ctrl_"+n);
    var clean_main =g(".main-i");
    var clean_ctrl =g(".ctrl-i");
    var i;
    for(i = 0;i<clean_ctrl.length;i++)
    {
        clean_main[i].className = clean_main[i].className.replace(/main-i_active/,"");
        clean_ctrl[i].className = clean_ctrl[i].className.replace(/ctrl-i_active/,"");
    }

    main.className += " main-i_active";
    ctrl.className += " ctrl-i_active";
    //7.2 切换时，复制上一张幻灯片
    setTimeout(function(){
        g("main_background").innerHTML = main.innerHTML;
    },1000);

}
//6.动态调整图片
function movePictures() {
    var pictues = g(".picture");
    for(i=0;i<pictues.length;i++) {
        pictues[i].style.marginTop = -1*pictues[i].clientHeight/2+"px";
        console.log(pictues[i].style.marginTop);
    }

}
window.onload = function() {
    addSliders();
    switchSlider(1);
    movePictures();
    //setTimeout( "movePictures()",10);


}
