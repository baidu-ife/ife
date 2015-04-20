/**
 * Created by Zhi_LI on 2015/4/19.
 */
var sgInput = $('#sg-input');
var highlightFlag = -1;
var liDateList = [];
sgInput.on('keyup',doCheck);
sgInput.on('keydown',doHighlight);
//sgInput.on('keydown',stopDefault);


function doHighlight(e){
    var keynum;
    var sgList = $('.sg-li');

    //var keychar;
    keynum = window.event ? e.keyCode : e.which;//TODO: 重构所有的事件兼容
    //keychar = String.fromCharCode(keynum);
    //alert(keynum+':'+keychar);
    if (keynum == 40){
        highlightFlag = highlightFlag + 1;

        //console.log('highlight');
        sgInput.un('keyup',doCheck);

        for (i=0; i< sgList.length; i++){
            //console.log(sgList[i]);
            removeClass(sgList[i],'sg-li-highlight')
        }
        addClass(sgList[highlightFlag],'sg-li-highlight');
    }else if(keynum == 38){
        highlightFlag = highlightFlag - 1;
        //console.log('highlight');
        sgInput.un('keyup',doCheck);

        for (i=0; i< sgList.length; i++){
            console.log(sgList[i]);
            removeClass(sgList[i],'sg-li-highlight')
        }
        addClass(sgList[highlightFlag],'sg-li-highlight');
    }else if (keynum == 13){
        stopDefault(e);
        if (highlightFlag >= 0 && highlightFlag <= sgList.length){
            console.log(liDateList[highlightFlag]);
            sgInput[0].value = liDateList[highlightFlag];
        }
    }
    else {
        sgInput.on('keyup',doCheck);
    }
}

function doCheck(){
    highlightFlag = -1;
    var sgInputContent = sgInput[0].value;
    //console.log(sgInputContent);

    var url = 'http://localhost:63342/in-1/task/task0002/work/lizhipower/testdata.txt';
    ajax(
        url,
        {
            data: {
                name: 'simon',
                password: '123456'
            },
            onsuccess: function (responseText, xhr) {
                //console.log(responseText);
                //console.log(typeof(responseText));
                liDateList = daMatch(sgInputContent,responseText);
                doShow(liDateList);
            }
        }

    )
}
function daMatch(content,dataDB){
    //console.log(dataDB);
    var dataRst = [];

    if (content.length){
        dataDB = dataDB.replace(/['\[\]]/g , '');
        dataDB = dataDB.split(',');
        //console.log(dataDB);
        //console.log(content);
        dataDB.forEach(function(ele){
                //console.log(ele);
                var reg = new RegExp(content,'g');

                if (ele.match(reg)){
                    dataRst.push(ele);
                }
            }
        );
    }
    //console.log(dataRst);
    return dataRst;
}
function doShow(data){
    $('#sg-sg')[0].innerHTML = '';
    if (data.length > 0){
        data.forEach(
            function (ele){
                //console.log(ele);
                $('#sg-sg')[0].innerHTML =$('#sg-sg')[0].innerHTML +'<li class="sg-li">'  + ele +'</li>';

            }
        );
        $('#sg-sg')[0].innerHTML = '<ul>' + $('#sg-sg')[0].innerHTML + '</ul>';
    }

}
