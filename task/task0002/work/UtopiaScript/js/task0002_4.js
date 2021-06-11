var suggestData = ['Simon', 'Erik', 'Kener'];
var input = $("#s-input");
var resultText = $("#s-result");
var suggestBox = $("#s-suggest");
input.setAttribute( "autocomplete", "off" );

window.onload = function() {
    addEvent( document, "keyup", suggestSelected );
    addEvent( document, "click", suggestHide );
    addEnterEvent( input, suggestEnter );
    addEvent( input, "keyup", suggestShow );
};


function suggestShow() {
    var searchText = input.value;
    var data = suggestData;
    resultText.innerHTML = "";

    for( var i=0; i < data.length; i++ ) {
        var liText = document.createElement("li");
        liText.innerHTML = data[i];
        resultText.appendChild( liText );

        addEvent( liText, "mouseover", addSelected );
        addEvent( liText, "mouseout", removeSelected );
        addEvent( liText, "click", suggestSelected );
    }

    if (searchText != "" ) {
        suggestBox.style.display = "block";
    }
    else {
        suggestBox.style.display = "none";
    }
}

function suggestHide() {
    suggestBox.style.display = "none";
}

function addSelected(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    addClass(target,"selected");
    input.value = target.innerHTML;
}

function removeSelected(e) {
    e = e || window.event;
    var target = e.target || e.srcElement;
    removeClass( target, "selected" );
}

var i = 0 ;
function suggestSelected(e) {

    var list = $("#s-result").childNodes;
    e = e || window.event;
    var target = e.target || e.srcElement;
    
    if (list != null) {
        each ( list, function(item) {
            removeClass(item,"selected");
        });
        if ( e.keyCode == 40) {
            addClass( list[i], "selected" );
            input.value = list[i].innerHTML;
            i++;
            if ( i > list.length-1 ) {
                i = 0;
            }
        }
        else if ( e.keyCode == 38) {
            i--;
            if (i < 0) {
                i = list.length -1;
            }
            addClass( list[i], "selected" );
            input.value = list[i].innerHTML;
        }
    }
}

function suggestEnter(e) {
    e = e || window.event;
    stopDefault(e);
    var list = $("#s-result").childNodes;
    for( var i = 0; i < list.length; i++) {
        if ( list[i].getAttribute("class") == "selected" ) {
            input.value = list[i].innerHTML;
        }
    }
}
