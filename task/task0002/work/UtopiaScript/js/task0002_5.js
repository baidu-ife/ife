function dragStart(ev) {
    ev.dataTransfer.setData("Text", ev.target.getAttribute('id'));
    ev.dataTransfer.setDragImage(ev.target,0,0);
    return true;
}

function dragEnter(ev) {
    var idelt = ev.dataTransfer.getData("Text");
    return true;
}

function dragOver(ev) {
    var idelt = ev.dataTransfer.getData("Text");
    var id = ev.target.getAttribute('id');
    if( (id =='boxB' || id =='boxA') && (idelt == 'drag1' || idelt=='drag2' || idelt == 'drag3'))
        return false;
    else
        return true;
}

function dragEnd(ev) {
    ev.dataTransfer.clearData("Text");
    return true
}

function dragDrop(ev) {
    var idelt = ev.dataTransfer.getData("Text");
    ev.target.appendChild(document.getElementById(idelt));
    ev.stopPropagation();
    return false;
}