/**
 * Created by Zhi_LI on 2015/4/19.
 */
var sgInput = $('#sg-input');
var highlightFlag = -1;
var liDateList = [];
sgInput.on('keyup', inputChanged);
sgInput.on('keydown', doHighlight);
//sgInput.on('keydown',$.stopDefault);
function inputChanged(evt) {
    var keynum;
    keynum = window.event ? evt.keyCode : evt.which;
    if (keynum != 40 && keynum !=38 && keynum !=13){
        doCheck();
    }
}

function doHighlight(evt) {
    var keynum;
    var sgList = $('.sg-li');

    //var keychar;
    keynum = window.event ? evt.keyCode : evt.which;
    //keychar = String.fromCharCode(keynum);
    //alert(keynum+':'+keychar);
    if (keynum == 40) {
        $.stopDefault(evt);

        sgInput.un('keyup', inputChanged);

        if (highlightFlag + 1 == sgList.length) {
            highlightFlag = 0;
        }else {
            highlightFlag = highlightFlag + 1;

        }

        //console.log('highlight');
        //console.log(highlightFlag);
        for (i = 0; i < sgList.length; i++) {
            //console.log(sgList[i]);
            removeClass(sgList[i], 'sg-li-highlight')
        }

        addClass(sgList[highlightFlag], 'sg-li-highlight');

    } else if (keynum == 38) {
        $.stopDefault(evt);

        sgInput.un('keyup', inputChanged);

        if (highlightFlag - 1 == -1) {
            highlightFlag = sgList.length - 1;
        }else {
            highlightFlag = highlightFlag - 1;
        }
        //console.log('highlight');

        for (i = 0; i < sgList.length; i++) {
            console.log(sgList[i]);
            removeClass(sgList[i], 'sg-li-highlight')
        }

        addClass(sgList[highlightFlag], 'sg-li-highlight');

    } else if (keynum == 13) {
        $.stopDefault(evt);
        console.log(liDateList[highlightFlag]);
        if (liDateList[highlightFlag]) {
            sgInput[0].value = liDateList[highlightFlag];

        }
        $('#sg-sg')[0].innerHTML = '';

    }
    else {
        sgInput.on('keyup', inputChanged);
    }
}

function doCheck() {
    highlightFlag = -1;
    var sgInputContent = sgInput[0].value;
    //console.log(sgInputContent);

    var url = 'http://localhost:63342/in-1/task/task0002/work/lizhipower/testdata.txt';
    $.ajax(
        url,
        {
            data: {
                name: 'simon',
                password: '123456'
            },
            onsuccess: function (responseText, xhr) {
                //console.log(responseText);
                //console.log(typeof(responseText));
                liDateList = daMatch(sgInputContent, responseText);
                doShow(liDateList);
            }
        }
    )
}
function daMatch(content, dataDB) {
    //console.log(dataDB);
    var dataRst = [];

    if (content.length) {
        dataDB = dataDB.replace(/['\[\]]/g, '');
        dataDB = dataDB.split(',');
        //console.log(dataDB);
        //console.log(content);
        dataDB.forEach(function (ele) {
                //console.log(ele);
                var reg = new RegExp(content, 'g');

                if (ele.match(reg)) {
                    dataRst.push(ele);
                }
            }
        );
    }
    //console.log(dataRst);
    return dataRst;
}
function doShow(data) {
    $('#sg-sg')[0].innerHTML = '';
    if (data.length > 0) {
        data.forEach(
            function (ele) {
                //console.log(ele);
                $('#sg-sg')[0].innerHTML = $('#sg-sg')[0].innerHTML + '<li class="sg-li">' + ele + '</li>';

            }
        );
        $('#sg-sg')[0].innerHTML = '<ul>' + $('#sg-sg')[0].innerHTML + '</ul>';
    }

}
