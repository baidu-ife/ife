$.on('#search-input','focus', function () {
    $.on('#search-input','keydown',function () {
        var searchinput = $('#search-input').value;
        ajax(
            'http://localhost/ife/text.php', 
            {
                type: 'POST',
                data: "searchinput="+searchinput,
                onsuccess: function (responseText, xhr) {
                    $('#search-result').innerHTML = responseText;
                }
            }
        )
    })
})


