var oPut = document.getElementById('put');
var oSuggest = document.getElementById('search-suggest') ;
var oLi = document.getElementsByTagName('li');
var count = -1;
oPut.onkeyup = function(){
    oSuggest.style.position ='absolute';
    oSuggest.style.display = 'block';
    oSuggest.style.top = '115px';
    oSuggest.style.left = '200px';
}
for(var i=0; i<oLi.length; i++){
    oLi[i].onclick = function(){
        oPut.value = this.innerHTML;
    }
}
document.onkeydown = function(){
    if(event.keyCode == 38){//下键
        count--;
        if(count < 0){
            count = oLi.length-1;
        }
        for(var i=0;i<oLi.length;i++){
            oLi[i].style.background = '#fff';
        }
        oLi[count].style.background = '#e5e5e5';
        oLi[count].style.text = 'underline'; 
       
    }
    else if(event.keyCode == 40){
        count++;
        if(count > oLi.length-1){//上键
            count = 0;
        }
         for(var i=0;i<oLi.length;i++){
            oLi[i].style.background = '#fff';
        }
        oLi[count].style.background = '#e5e5e5';
        // oLi[count].style.text-decoration = 'underline'; 
    }
    else if(event.keyCode == 13){
        oPut.value = oLi[count].innerHTML;
    }
}

