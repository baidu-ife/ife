$(function () {

    function CarouselCounter(len, options) {

        options = options || {};

        this.timespan = options.speed || 500;

        this.loop = options.loop !== false;

        this.dir = options.dir || 'normal';

        this.length = len;

        this.current = this.dir === 'normal' ? 0 : this.length - 1;

        this.timer = null;
    }

    CarouselCounter.prototype = {

        scrollTo: function () {

        },

        set: function (index) {
            this.current = index % this.length;
            this.stop();
            this.start();
        },

        start: function () {
            var me = this;
            me.scrollTo(me.current);
            me.timer = setInterval(function () {
                me.current = (me.current + (me.dir === 'normal' ? 1 : -1)) % me.length;
                me.scrollTo(me.current);

                if (!me.loop && me.current === (me.dir === 'normal' ? me.length - 1 : 0)) {
                    clearInterval(me.timer);
                    me.timer = null;
                }

            }, me.timespan);
        },

        stop: function () {
            clearInterval(this.timer);
            this.timer = null;
        },
        reset: function () {
            this.current = this.dir === 'normal' ? 0 : this.length - 1;
            this.scrollTo(this.current);
        }
    };

    $.fn.carousel = function (options) {
        var container = $(this[0]);
        if (!container.length) {
            return null;
        }

        var images = container.children();

        var counter = new CarouselCounter(images.length, options);

        var point = $('<div class="carousel-point"></div>');

        $.each(images, function (i) {
            var item = $('<span></span>').appendTo(point);
            item.on('click', function () {
                counter.set(i);
            });
        });
        point.appendTo(container);

        var points = point.children();

        var zIndex = 100;

        counter.scrollTo = function (i) {
            points.removeClass('current').eq(i).addClass('current');
            images.eq(i).css({
                zIndex: zIndex++,
                left: '100%'
            }).animate({
                left: 0
            }, Math.min(options.speed || 500, 500))
        };

        return counter;

    };

    $('.carousel').each(function () {
        $(this).carousel({
            loop: true,
            speed: 3000,
            dir: 'normal'
        }).start();
    });
});