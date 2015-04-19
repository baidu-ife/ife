/**
 * Created by Zhi_LI on 2015/4/18.
 */


var hbInput = $('#hobby-input');
var hbBtn = $('#hobby-btn');
var hbDiv = $('#hobby-div')[0];

function doHb() {
    //console.log('HI');
    hbarr = getHb();
    console.log(hbarr)

    //console.log(hbarr);
    hbDiv.innerHTML = "<h1>爱好</h1>"
    for(i=0; i<hbarr.length; i++){
        hbDiv.innerHTML = hbDiv.innerHTML +"<input type='checkbox' label=" +hbarr[i]+"></input>"+hbarr[i];
    }

}
function doHbCheck() {
    //console.log('HI');
    hbarr = getHb();
    console.log(hbarr)
    if (hbarr[0] =='' ||hbarr.length>10 ){
        hbBtn[0].innerHTML = 'error';
        hbBtn[0].setAttribute('disabled','disable');
    }
    else{
        hbBtn[0].innerHTML = '整理爱好';
        hbBtn[0].removeAttribute('disabled');
    }

    hbInput.on('keydown',doHbCheck);
    hbInput.on('keyup',doHbCheck);

    //console.log(hbarr);
    //hbDiv.innerHTML = "<h1>爱好</h1>"
    //for(i=0; i<hbarr.length; i++){
    //    hbDiv.innerHTML = hbDiv.innerHTML +"<li>"+hbarr[i]+"</li>"
    //}

}

function getHb(){
    var hb = hbInput[0].value;
    console.log(hb);

    var reg = /[\s,，、\r\n;；]+/g;
    var hbarr = [];
    hb = hb.replace(reg,' ');
    //console.log(hb);
    hbarr = hb.split(' ');
    hbarr = hbarr.unique();
    return hbarr;
}

hbBtn.click(doHb);

hbInput.on('focus',doHbCheck);



