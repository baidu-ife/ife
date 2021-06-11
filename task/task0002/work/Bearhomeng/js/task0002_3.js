/**
 * Created by jiawen on 2015/4/26.
 */
var Carousel = function(selector,options){
    this.carousel = $(selector);
    this.interval = parseInt(options.interval) ? options.interval : 3000;
    this.deny = 500; //ͼƬ�л��ӳ�
    this.direction = options.direction == -1 ? -1 : 1;
    this.ifcycle = options.ifcycle != undefined ? options.ifcycle : true;
    this.imgs = options.imgs;
    this.items = [];        //ͼƬli�б�
    this.count = 0;
    this.indexNow = 0; //��ǰͼƬ����;
    this.timer; //��ʱ��
    var that = this;

    this.init = function () {
        addClass(this.carousel,'carousel');
        var count = this.imgs.length;
        //����ͼ�б�
        var ul = document.createElement('ul');
        addClass(ul, 'carousel-inner');
        this.carousel.appendChild(ul);
        //���ɰ�ť��
        var control = document.createElement('ul');
        addClass(control, 'carousel-control');
        this.carousel.appendChild(control);
        for(var i=0; i<count; i++)
        {
            //���ͼƬ
            var item = document.createElement('li');
            addClass(item,'item');
            var img = document.createElement('img');
            img.setAttribute('src',this.imgs[i].src);
            item.appendChild(img);
            this.items.push(item);
            ul.appendChild(item);
            //��Ӱ�ť��
            var linkBtn = document.createElement('li');
            addClass(linkBtn, 'btnImg');
            var input = document.createElement('input');
            input.setAttribute('type','radio');
            input.setAttribute('name','imgIndex');
            input.setAttribute('value',i);
            linkBtn.appendChild(input);
            control.appendChild(linkBtn);
        }
        this.count = count;
        this.play(this.interval,this.ifcycle,this.direction);
    };
    /*
    * ��ȡ��һ��ͼƬ��������ֹͣ������-1
    * */
    this.getNext = function () {
        if(this.direction === 1){
            if(this.indexNow === (this.count - 1)){
                if(this.ifcycle){
                    return 0;
                }else{
                    return -1;
                }
            }else {
                return this.indexNow + 1;
            }
        }else{
            if(this.indexNow === 0){
                if(this.ifcycle){
                    return this.count - 1;
                }else{
                    return -1;
                }
            }else {
                return this.indexNow - 1;
            }
        }
    };

    function animate(){
        var step = 500/30;
        var width = 1280;
        var indexNext = that.getNext();
        var speed = Math.ceil(width/step);
        var nextStartPoint = width;
        if(that.direction == -1){
            speed = -speed;
            nextStartPoint = - nextStartPoint;
        }
        //console.log(indexNext);
        if(indexNext == -1){
            that.stop();
        }
        var itemNow = that.items[that.indexNow];
        itemNow.style.left = 0 + "px";
        var itemNext = that.items[indexNext];
        itemNext.style.left = nextStartPoint + "px";
        var timer1 = setInterval(move,30);
        function move(){
            var flag = false;
            if(that.direction == 1){
                itemNow.style.left = ( parseInt(itemNow.style.left) - speed) + 'px';
                itemNext.style.left = ( parseInt(itemNow.style.left) + width) + 'px';
                if(parseInt(itemNext.style.left)< 0){
                    flag = true;
                }
            }else{
                itemNow.style.left = ( parseInt(itemNow.style.left) - speed) + 'px';
                itemNext.style.left = ( parseInt(itemNow.style.left) - width) + 'px';
                if(parseInt(itemNext.style.left)> 0){
                    flag = true;
                }
            }
            if(flag){
                clearInterval(timer1);
                itemNext.style.left = 0 + "px";
                itemNow.style.left = - nextStartPoint + "px";
                that.indexNow = indexNext;
            }
        }
    };

    this.play = function (interval,ifcycle,direction) {       // ͼƬ�л�
        if(this.count < 1){
            return;
        }
        this.interval = parseInt(interval) ? interval : this.interval;
        this.direction = direction  == -1 ? -1 : this.direction;
        this.ifcycle = ifcycle ? ifcycle : this.ifcycle;
        this.stop();
        this.timer = setInterval(animate,this.interval);
    };

    this.stop = function (){
        if(this.timer){
            clearInterval(this.timer);
        }
    };
    this.init();
};

window.onload = function () {
    var interval;
    var direction;
    var ifcycle;
    var c = new Carousel('#c1',{
        imgs:[
            {
                'src':'http://echarts.baidu.com/doc/asset/img/bannerStudy.png'
            },
            {
                'src':'http://echarts.baidu.com/doc/asset/img/bannerX.jpg'
            },
            {
                'src':'http://echarts.baidu.com/doc/asset/img/slide-01.png'
            },
        ]
    });
    //c.init();
    //ʱ�����޸�
    $.on($('#interval'),'keyup',function(e){
       var srcObj = getSrcElement(e);
        var time = parseInt(srcObj.value);
        if(time){
            console.log(time);
        }
        interval = time;
        c.play(interval,ifcycle,direction);
    });
    //�Ƿ�ѭ��
    $.click($('#ifcircle'),function(e){
        var srcObj = getSrcElement(e);
        console.log(srcObj.checked);
        ifcycle = srcObj.checked
        c.play(interval,ifcycle,direction);
    });
    //����
    $.click($('#btnForward'),function(e){
        c.play()
        console.log(1);
        direction = 1;
        c.play(interval,ifcycle,direction);
    });
    //����
    $.click($('#btnBackward'),function(e){
        console.log(-1);
        direction = -1;
        c.play(interval,ifcycle,direction);
    });


};