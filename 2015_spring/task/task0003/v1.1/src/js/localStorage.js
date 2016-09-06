/*
* 本地存储方法
*/ 
define({
    /*
    * 获取本地存储
    * @param {string} 
    * @return {object} 
    */ 
    get: function(name) {
        return JSON.parse(window.localStorage.getItem(name));
    },

    /*
    * 把一个对象保存到本地存储
    * @param {object} 对象
    */ 
    save: function(obj) {
        var str = JSON.stringify(obj);
        window.localStorage.setItem(obj.id, str);
        
    },

    /*
    * 删除自己和自己子级的数据
    * @param {object} 对象
    */ 
    remove: function (obj) { 
        if (obj.chiId.length) {
            for (var i = 0, len = obj.chiId.length; i < len; i++) {
                arguments.callee(this.get(obj.chiId[i]));
            }
        }
        window.localStorage.removeItem(obj.id);
    },

    /*
    * 更新父级数据
    * @param {string} 本地存储索引值key
    * @param {string} 类型 比如chiId,task
    * @param {string} 增加的索引值key
    */ 
    updateParent: function (parId, datatype, dataId) { 
        var json = this.get(parId);
        json[datatype].push(dataId);
        this.save(json);
    },
    
    /*
    * 删除父级指向自己的指针
    * @param {object} 
    */ 
    removeChild: function(obj) { 
        var json = this.get(obj.parId);
        for (var i = 0,len = json.chiId.length; i < len; i++) {
            if (json.chiId[i] == obj.id) {
                json.chiId.splice(i,1);
                this.save(json);
            }
        }
    }
});