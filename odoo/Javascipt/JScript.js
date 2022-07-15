
/// <reference path="jquery-1.7.1.min.js" />


function CheckAll(pField, pValue, pObjName) {
    var lStr = "";
    var obj;
    for (var i = 0; i < pField.length; i++) {
        obj = pField[i];
        if (obj.type == "checkbox")
            if (obj.name.lastIndexOf(pObjName) >= 0) {
                obj.checked = pValue;
            }
    }
}
function CheckAll_Enable(parentID, pValue, pObjName) {
    var lStr = "";
    var obj;
    $(parentID).find('input:checkbox:enabled').each(function () {
        $(this).attr('checked', 'checked');
    });
}
function checkSelection(pObjName) {
    var obj;
    var flag = false;
    var lFormObj;
    lFormObj = document.forms[0]
    for (var i = 0; i < lFormObj.elements.length && !flag; i++) {
        obj = lFormObj.elements[i];
        if (obj.type == "checkbox")
            if (obj.name.lastIndexOf(pObjName) >= 0 && obj.checked)
                flag = true;

    }
    return flag;
}
function deleteObj(pObjName, pMessage) {
    if (pObjName == "") {
        if (pMessage)
            return confirm(pMessage);
        else
            return true;
    }
    else {
        if (checkSelection(pObjName))
            if (pMessage)
                return confirm(pMessage);
            else
                return true;
        else {
            alert('Bạn chưa chọn dòng cần xóa!');
            return false;
        }
    }
}