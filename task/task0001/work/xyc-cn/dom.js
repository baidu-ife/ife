/**
 * Created by xieyicheng on 2015/4/16.
 */
Array.prototype.each = function (fun) {
   if((typeof fun) !="function"){
       throw new Error()
   }
    for (var i = 0; i < this.length; i++) {
        var obj = this[i];
        fun.call(this,this[i],i,this)
    }
};
var a = ['a','b','c'];
a.each(function (value,index,array) {
    console.log(value);
    console.log(array)
});

