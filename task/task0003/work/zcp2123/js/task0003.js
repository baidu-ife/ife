/**
 * Created by zcp2123 on 2015/5/10.
 */
window.onload = function() {
//    localStorage.clear();
    makeCategoryList();
    $.click(".addTaskClassification", function(){
        var dialog = new Dialog("haha", task.categoryList, addNewCategory, cancleAddNewCategory);

    });

    $.click(".addTask", addNewTask);
    $.click(".taskCont .contCancle", cancleAddNewTask);
    $.click(".operates .iconDone", finishTask);
    $.click(".operates .iconEdit", editTask);
}