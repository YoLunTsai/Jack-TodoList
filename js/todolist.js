var todolist = []; //存放待辦清單
var id = 1; //待辦項目ID


//新增待辦項目
function addList() {
    var _title = $("#title").val();
    var _message = $("#message").val();

    if (_title == "" || _message == "") {
        $("#title").attr("placeholder", "請輸入標題！");
        $("#message").attr("placeholder", "請輸入內容！");
    } else {
        var newtodo = {
            '_id': id,
            'title': _title,
            'content': _message,
            'status': false
        };
        todolist.push(newtodo);
        newList(newtodo);
        id++;

        $("#title").val(""); //清空標題
        $("#message").val(""); //清空內容
    }
}
//將待辦項目顯示到頁面上
function newList(data) {
    var status = (data.status) ? "checked" : "";
    var titleClass = (data.status) ? "title2" : "title";
    var messageClass = (data.status) ? "message2" : "message";
    var editClass = (data.status) ? "none" : "inline";

    var content =
        `<div class="content "id="${data._id}">
            <div class="${titleClass}">
                <input type="checkbox" onclick="changeStatus( '${data._id}', this)" />
                <text id="title${data._id}">${data.title}</text>
                <button onclick="removeList('${data._id}')">刪除</button>
                <button id="edit${data._id}" style="display:${editClass}" onclick="editList('${data._id}')">修改</button>
                <button id="update${data._id}" style="display:none" onclick="updateList('${data._id}')">確認</button>
            </div>
            <div class="${messageClass}">
            <text id="message${data._id}">${data.content}</text>
            </div>
        </div>`;
    $(".col-lg-8").append(content);
}
//修改待辦項目
function editList(id) {
    $('#edit' + id).css("display", "none");
    $('#update' + id).css("display", "inline");

    var input = document.createElement("input");
    input.type = "text";
    input.id = "edit_title" + id;
    input.value = $('#title' + id).text();

    $('#title' + id).css("display", "none");
    $('#title' + id).parent().append(input);

    var message_input = document.createElement("input");
    message_input.type = "text";
    message_input.id = "edit_message" + id;
    message_input.value = $('#message' + id).text();

    $('#message' + id).css("display", "none");
    $('#message' + id).parent().append(message_input);
}