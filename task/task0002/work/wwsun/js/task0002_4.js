(function() {
    /**
     * get input suggestions from server
     * @param input
     * @param url
     */
    function getSuggestions(input, url) {
        ajax(url, {
            type: 'GET',
            data: {name: input},
            onsuccess: function (data) {
                // data: ["value1","value2","value3"]
                var result = JSON.parse(data);
                each(result, function (item) {
                    displaySuggestions(item, '#suggestions')
                });
            },
            onfail: function (error) {
                console.log(error);
            }
        });
    }

    /**
     *
     * @param item
     * @param targetId '#ID'
     */
    function displaySuggestions(item, targetId) {
        var target = $(targetId);
        var li = document.createElement('li');
        li.innerHTML = item;
        target.appendChild(li);
    }


    $.on('#search-input', 'keyup', function (e) {

        $('#suggestions').innerHTML = '';

        var inputValue = $('#search-input').value;
        getSuggestions(inputValue, 'http://localhost:8080/api/');
    });

    $.delegate('#suggestions', 'li', 'click', function (event) {
        var target = getTarget(event);
        $('#search-input').value = target.innerText;
        $('#suggestions').innerHTML = '';
    });
})();