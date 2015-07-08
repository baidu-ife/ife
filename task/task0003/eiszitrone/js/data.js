var Data = {
    removeCategory: function(key) {
        var obj = Data.getItem(key);

        //delete the category from its parent child list
        var parent = Data.getItem(obj.parent);
        var i = 0;
        while (parent.child[i] != key) ++i;
        i += 1;
        while(i < parent.child.lengh) {
            parent.child[i - 1] = parent.child[i];
            i += 1;
        }
        parent.child = parent.child.slice(0, parent.child.length - 1); 

        Data.setItem(parent.key, parent);
        // delete child category
        for (i = 0; i < obj.child.length; ++i) {
            Data.removeTask(obj.child[i]);
        }

        // delete tasks
        for (i = 0; i < obj.task.length; ++i) {
            Data.removeTask(obj.task[i]);
        }
        window.localStorage.removeItem(key);
    },
    removeTask: function(key) {
        window.localStorage.removeItem(key);
    },
    getItem: function(key) {
        return JSON.parse(window.localStorage.getItem(key));
    },
    setItem: function(key, obj) {
        window.localStorage.setItem(key, JSON.stringify(obj));
    },
    addSubCat: function(parent, child) {
        var parentObj = Data.getItem(parent);
        parentObj.child.push(child);
        Data.setItem(parent, parentObj);
    },
    addTask: function(category, task) {
        var catObj = Data.getItem(category);
        catObj.task.push(task);
        Data.setItem(category, catObj);
    }
}
