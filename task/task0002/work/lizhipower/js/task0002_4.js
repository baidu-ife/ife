/**
 * Created by Zhi_LI on 2015/4/19.
 */
var sgInput = $('#sg-input');
var sgBtn = $('#sg-btn');

sgBtn.click(doCheck);

function doCheck(){
    var sgInputContent = sgInput[0].value;
    console.log(sgInputContent);

    var url = 'http://localhost:63342/in-1/task/task0002/work/lizhipower/testdata.txt';
    ajax(
        url,
        {
            data: {
                name: 'simon',
                password: '123456'
            },
            onsuccess: function (responseText, xhr) {
                console.log(responseText);
                console.log(typeof(responseText));
                doShow(
                    daMatch(sgInputContent,responseText)
                );
            }
        }

    )
}
function daMatch(content,dataDB){
    //console.log(dataDB);
    dataDB = dataDB.replace(/['\[\]]/g , '');
    dataDB = dataDB.split(',');
    var dataRst = [];
    //console.log(dataDB);
    //console.log(content);
    dataDB.forEach(function(ele){
            console.log(ele);
            var reg = new RegExp(content,'g');

            if (ele.match(reg)){
                dataRst.push(ele);
            }
        }


    );
    console.log(dataRst);
    return dataRst;
}
function doShow(data){
    data.forEach(
        function (ele){
            $('#sg-sg')[0].innerHTML = $('#sg-sg')[0].innerHTML + ele + ' ';

        }
    )
}
