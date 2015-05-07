/**
 * Created by jp on 2015/5/7.
 */
function showtime()
{
    var dateset=document.getElementById("inputbox").value.split("-");
    console.log(dateset);
    var myDate=new Date();
    myDate.setFullYear(dateset[0],dateset[1],dateset[2]);
    console.log( myDate);
    var today=new Date();
    if (myDate<today)
    {
        alert("必须大于今日");
    }
    else
    {
        var y=myDate.getFullYear();
        var m=myDate.getMonth();
        var d=myDate.getDay();
        console.log( d);

        var yn=today.getFullYear();
        var mn=today.getMonth();
        var dn=today.getDay();
        var h=today.getHours();
        var m1=today.getMinutes()
        var s=today.getSeconds();

        var yc=y-yn;
        var mc1=m-mn;
        var dc=d-1-dn;

        var hc=23-h;
        var mc=59-m1;
        var sc=60-s;
        var run=0;
        if(yc)
        {
            for(var i=2015;i<=y;i++)
            if(i%4==0)
             run++;
        }
         dc+=yc*365+run+mc1*30-1;

        if(hc<=0)
        {
            if(dc==0)
            hc==0;
            else
            {
            dc--;
            hc+=24;
            }
        }
        if(mc<=0)
        {
            if(hc==0)
                mc==0;
            else
            {
                hc--;
                mc+=60;
            }
        }
        if(sc<=0)
        {
            if(mc==0)
                sc==0;
            else
            {
                mc--;
                sc+=60;
            }
        }


        var p = document.getElementById("pp");
        p.innerHTML= "距离"+y+"年"+m+"月"+d+"日"+"还有"+dc+"天"+hc+"小时"+mc+"分"+sc+"秒";

    }
    setInterval(showtime(), 1000);
}

