
window.onload = function() {
    var oText = $('#text');
    var suggestData = ['Simon', 'Erik', 'Kener', 'font property (Windows)'];
    var oUl = $('#form1 ul');
    var aLi = oUl.getElementsByTagName('li');

    $.on(oText, 'focus', function(e) {
        stopDefault(e);
        $('#search_list').style.display = 'block';
        var index = -1;
        document.onkeydown = function(e) {
            if(index < -1) {
                index = -1;
            } else if (index > aLi.length-1) {
                index = aLi.length;
            }
            var event = e || window.event;
            if(event.keyCode == 38) {
                index--;
            } else if(event.keyCode == 40) {
                index++;
            }
            for(var i = 0; i < aLi.length; i++) {
                removeClass(aLi[i], 'active');
            }
            addClass(aLi[index], 'active');
            if(event.keyCode == 13 && index>-1) {
                oText.value = aLi[index].innerHTML;
                index = -1;
                stopDefault(e);
                $('#search_list').style.display = 'none';
            }

        }
    });
    for(var i = 0, len = suggestData.length; i < len; i++) {
       var oli = document.createElement('li');
        oli.innerHTML = suggestData[i];
        oUl.appendChild(oli);
    }

    $.delegate('#search_list', "li", "click", function(e){
        e = e || window.event;
        var target = e.target || e.srcElement;
        oText.value = target.innerHTML;
        $('#search_list').style.display = 'none';
    });
    $.delegate('#search_list', "li", "mouseover", function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        addClass(target, 'active');
    });
    $.delegate('#search_list', "li", "mouseout", function(e){
        var e = e || window.event;
        var target = e.target || e.srcElement;
        removeClass(target, 'active');
    });


};



