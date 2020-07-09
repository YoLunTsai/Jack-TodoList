var todolist = []; //存放待辦清單
var id = 1; //待辦項目ID
var order = 2; //元素順序，為了讓元素能夠置頂(order=1)，所以初始值為2(小於1)，


//新增待辦項目
function addList() {
    var _title = $("#title").val();
    var _message = $("#message").val();

    if (_title == "" || _message == "") { //OR
        $("#title").attr("placeholder", "請輸入標題！");
        $("#message").attr("placeholder", "請輸入內容！");
    } else {
        var newtodo = {
            '_id': id,
            '_order': order,
            'title': _title,
            'content': _message,
            'status': false
        };
        todolist.push(newtodo); //將newtodo物件新增至togolist陣列最後方
        newList(newtodo); //並將newtodo物件傳入newList函式中
        id++;
        order++;

        $("#title").val(""); //清空標題
        $("#message").val(""); //清空內容
    }
}

//將待辦項目顯示到頁面上
function newList(data) {
    //使用newtodo的status來判斷是否為已勾選狀態，給予不同的class類別樣式
    var status = (data.status) ? "checked" : "";
    var titleClass = (data.status) ? "title2" : "title";
    var messageClass = (data.status) ? "message2" : "message";
    var editClass = (data.status) ? "none" : "inline"; //依newtodo的status狀態，判斷修改按鈕是否隱藏或顯示

    var content = //使用ES6文字模板，${}可放置變數
        `<div class="content" id="${data._id}" style="order:${data._order};">
            <div class="${titleClass}" id="top${data._id}">
                <input type="checkbox" onclick="changeStatus( '${data._id}', this)" />
                <text id="title${data._id}">${data.title}</text>
                <button onclick="removeList('${data._id}')">刪除</button>
                <button id="edit${data._id}" style="display:${editClass}" onclick="editList('${data._id}')">修改</button>
                <button id="update${data._id}" style="display:none" onclick="updateList('${data._id}')">確認</button>
                <button id="goTop${data._id}" style="display:${editClass}" onclick="gotop('${data._id}')">置頂</button>
            </div>
            <div class="${messageClass}" id="down${data._id}">
            <text id="message${data._id}">${data.content}</text>
            </div>
        </div>`;
    $(".col-lg-8").append(content);
}

//修改待辦項目
function editList(id) {
    $('#edit' + id).css("display", "none"); //將修改按鈕隱藏
    $('#update' + id).css("display", "inline"); //將確認按鈕顯示

    var input = document.createElement("input");
    input.type = "text";
    input.id = "edit_title" + id;
    input.value = $('#title' + id).text();

    $('#title' + id).css("display", "none"); //將原本的標題隱藏
    $('#title' + id).parent().append(input); //將標題修改文字框加入到原本的位置

    var message_input = document.createElement("input");
    message_input.type = "text";
    message_input.id = "edit_message" + id;
    message_input.value = $('#message' + id).text();

    $('#message' + id).css("display", "none"); //將原本的內容隱藏
    $('#message' + id).parent().append(message_input); //將內容修改文字框加入到原本的位置
}

//修改完後保存待辦項目
function updateList(id) {
    var title = $("#edit_title" + id).val(); //標題修改文字框的值
    var message = $("#edit_message" + id).val(); //內容修改文字框的值

    $("#title" + id).text(title); //將修改後的值，重新給予原本的標題
    $("#message" + id).text(message); //將修改後的值，重新給予原本的內容

    todolist[id - 1].title = title; //更改todolist陣列中該筆待辦項目物件的title屬性值為修改後的標題
    todolist[id - 1].content = message; //更改todolist陣列中該筆待辦項目物件的content屬性值為修改後的內容

    $("#edit" + id).css("display", "inline"); //將修改按鈕設為顯示
    $("#update" + id).css("display", "none"); //將確認按鈕設為隱藏

    $("#title" + id).css("display", "inline"); //將標題再次顯示
    $("#message" + id).css("display", "inline"); //將內容再次顯示

    $("#edit_title" + id).remove(); //將標題修改文字框刪除
    $("#edit_message" + id).remove(); //將內容修改文字框刪除
}

//刪除待辦項目
function removeList(id) { //參數id代表newtodo的._id
    var index = todolist.findIndex(element => element._id == id); //參數element代表todolist陣列中的每個待辦項目物件，此方法會把每一個待辦清單項目物件拿出來進行比對，當待辦項目物件的._id屬性值與要刪除的待辦項目的.id屬性值相同時，回傳該筆待辦項目物件的索引值(index)
    todolist.splice(index, 1); //然後從陣列中刪除它
    $("#" + id).remove(); //並把該待辦項目區塊從頁面上移除
}

//改變待辦項目狀態
function changeStatus(id, btnstatus) { //id為勾選的待辦項目索引值 btnstatus為當下待辦項目本身(this)
    var title = btnstatus.parentNode; //input的父元素節點，也就是title區塊
    var message = title.nextElementSibling; //title區塊的下一個兄弟元素節點，也就是message區塊
    if (btnstatus.checked) { //若input為勾選狀態
        title.className = "title2";
        message.className = "message2";
        $("#edit" + id).css("display", "none"); //隱藏修改按鈕
        $("#update" + id).css("display", "none"); //隱藏確認按鈕
        $("#goTop" + id).css("display", "none"); //將置頂按鈕隱藏

        if (document.getElementById("edit_title" + id)) { //如果修改文字輸入框存在時
            $("#title" + id).css("display", "inline"); //將標題區塊顯示出來，因為若修改文字輸入框存在時，它是隱藏的狀態
            $("#message" + id).css("display", "inline"); //將內容區塊顯示出來
            $("#edit_title" + id).remove(); //刪除標題文字輸入框
            $("#edit_message" + id).remove(); //刪除內容文字輸入框
        }
    } else { //若input為未勾選狀態
        title.className = "title";
        message.className = "message";
        $("#edit" + id).css("display", "inline"); //將修改按鈕顯示
        $("#goTop" + id).css("display", "inline"); //將置頂按鈕顯示
    }
}

//代辦項目置頂
function gotop(id) {
    document.getElementById(id).style.order = 1; //將元素的order屬性設為1，讓順序跑到第一個
    $("#goTop" + id).remove(); //將置頂按鈕刪除

    $('#top' + id).css({
        "background-color": "#F87575",
        "color": "white"
    });
    $('#down' + id).css({
        "background-color": "#FFA9A3",
        "color": "white"
    });
}