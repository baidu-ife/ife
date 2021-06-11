$(function () {

    $.get('js/demo.json', {}, function (res) {

        var ul = $('<ul class="suggest"></ul>');

        var list = res.info;

        $.each(list, function (_, str) {
            ul.append('<li>' + str + '</li>');
        });

        var children = ul.children();

        ul.appendTo(document.body);

        var selected = 0;

        var countable = false;

        var input = $('input').on('keyup', function (e) {

            if (e.keyCode === 13) {
                input.val(children.eq(selected).text().trim());
                ul.hide();
                countable = false;
            }

            if (e.keyCode === 38) {
                selected = --selected % children.length;
            }
            else if (e.keyCode === 40) {
                selected = ++selected % children.length;
            }

            children.removeClass('selected').eq(selected).addClass('selected');

        }).on('focus', function () {

            if (!children.length) {
                return;
            }
            children.removeClass('selected').eq(0).addClass('selected');
            selected = 0;
            countable = true;
            ul.show();
        });

        $(document).on('click', function (e) {
            if (e.target !== input[0]) {
                ul.hide();
                countable = false;
            }
        });

        var offset = input.offset();

        ul.css({
            top: offset.top + input.outerHeight() - 1,
            left: offset.left,
            width: input.outerWidth() - 2
        }).delegate('li', 'click', function (e) {
            e.stopPropagation();
            input.val($(this).text().trim());
            ul.hide();
            countable = false;
        });
    }, 'json')

});