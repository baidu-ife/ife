/**
 * Created by zcp2123 on 2015/5/14.
 */
function Dialog(title, categoryList, sureCallback, cancleCallback) {
    this.html = '<div class="dialogBg"></div>' +
               '<div class="dialog">' +
                   '<h2>' + title + '</h2>' +
                   '<div class="dialogInput">' +
                       '新分类名称：<input type="text" placeholder="请输入任务名称">' +
                   '</div>' +
                   '<div class="dialogSelect">' +
                       '新分类父节点：<select>' +
                           '<option value="-1">无</option>';
    for (var i = 0; i < categoryList.length; i++) {
        this.html += '<option value="'+ i + '">' + categoryList[i].name + '</option>';
    }

    this.html +=       '</select>' +
                   '</div>' +
                   '<p class="error"></p>' +
                   '<div class="dialogAction">' +
                       '<div class="dialogSure">确定</div>' +
                       '<div class="dialogCancle">取消</div>' +
                   '</div>' +
               '</div>';
    this.init(sureCallback, cancleCallback);

}

Dialog.prototype.init = function(sureCallback, cancleCallback) {

    var div = document.createElement("div");
    div.innerHTML = this.html;
    div.className = "addDialog";
    document.body.appendChild(div);
    $.click(".dialogSure", sureCallback);
    $.click(".dialogCancle", cancleCallback);

}