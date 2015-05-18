/**
 * Created by xieyicheng on 2015/5/2.
 */


Array.prototype.remove = function(obj){
    for(var i =0;i <this.length;i++){
        var temp = this[i];
        if(!isNaN(obj)){
            temp=i;
        }
        if(temp == obj){
            for(var j = i;j <this.length;j++){
                this[j]=this[j+1];
            }
            this.length = this.length-1;
        }
    }
};


var store = {
    setItem:function (key,value) {
        if(window.localStorage){
            var data = JSON.stringify(value);
            localStorage.setItem(key,data)
        }
    },
    getItem:function(key){
        if(window.localStorage){
            var data = localStorage.getItem(key);
            return JSON.parse(data);
        }
    },
    removeById: function(arr,id){
        var index;
        for (var i = 0; i < arr.length; i++) {
            if(arr[i].id==id){
                index = i;
            }
        }
        if(index){
            arr.remove(index);
        }

    },
    modifyData:function(arr,id,data){
        for(var i =0;i <arr.length;i++){
            var temp = arr[i];
            if(temp.id == id){
                arr[i] = data;
            }

        }

    },
    addToArray:function(arr,item){
        arr.push(item);
    },
    findById:function(array,id){
        for (var i = 0; i < array.length; i++) {
            var obj = array[i];
            if(obj.id == id ){
                return obj;
            }
        }
    },
    dataFilter:function(array,firstType_id,secondType,status){
        //处理默认分类
        if(firstType_id==0){
            secondType = null;
        }
        if(Array.prototype.filter){
            var ret = array.filter(function (value) {
                if(status){
                    if(value.firstType_id == firstType_id && value.secondType == secondType &&value.status == status){
                        return true;
                    }
                }
                else{
                    if(value.firstType_id == firstType_id && value.secondType == secondType){
                        return true;
                    }
                }
                return false;
            });
            return ret.sort(function(first,second){ return first.date>second.date});
        }
    }



};



