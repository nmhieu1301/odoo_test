
/* check number */
var myNumbers = "0123456789";
function chkInt_number(mytextbox) {
    var w = "";
    for (i = 0; i < mytextbox.value.length; i++) {
        x = mytextbox.value.charAt(i);
        if (myNumbers.indexOf(x, 0) != -1) {
            w += x;
        }
    }
    mytextbox.value = w;
}
var myVarchar = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_./\| ";
function chkVarchar_Code(mytextbox) {
    var w = "";
    for (i = 0; i < mytextbox.value.length; i++) {
        x = mytextbox.value.charAt(i);
        if (myVarchar.indexOf(x, 0) != -1) {
            w += x;
        }
    }
    mytextbox.value = w;
}
var myDecimal = "0123456789.,";
function chkDecimal_number(mytextbox) {
    var w = "";
    for (i = 0; i < mytextbox.value.length; i++) {
        x = mytextbox.value.charAt(i);
        if (myDecimal.indexOf(x, 0) != -1) {
            w += x;
        }
    }
    mytextbox.value = w;
}
var myPass = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_.,!@#$%^&*()-+/?><[]{}\|~";
function chkPass_word(mytextbox) {
    var w = "";
    for (i = 0; i < mytextbox.value.length; i++) {
        x = mytextbox.value.charAt(i);
        if (myPass.indexOf(x, 0) != -1) {
            w += x;
        }
    }
    mytextbox.value = w;
}
var myLogin = "0123456789qwertyuiopasdfghjklzxcvbnmQWERTYUIOPASDFGHJKLZXCVBNM_.,- ";
function chkLogin_name(mytextbox) {
    var w = "";
    for (i = 0; i < mytextbox.value.length; i++) {
        x = mytextbox.value.charAt(i);
        if (myLogin.indexOf(x, 0) != -1) {
            w += x;
        }
    }
    mytextbox.value = w;
}
function popup(popuplink, key) {
    var i = getPopupForm(key);
    if (key == 'password' && i == null)
        this.setPopupForm(window.open(popuplink, "", "location=0,scrollbars=1, width=400px,height=200px,toolbar=0,menubar=0,titlebar=0"), key);
    else if (i == null)
        this.setPopupForm(window.open(popuplink, "", "location=1,scrollbars=1, width=800px,height=600px"), key);
    else {
        i.focus();
        if (i.getKey() != key) {
            i.location.href = popuplink;
            this.setPopupForm(i, key);
        }
    }
}
/*date picker*/
function onCalendarShown() {
    var cal = $find("calendar_months");
    //Setting default mode to month
    cal._switchMode("months", true);
    //Attach click event
    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", change);
            }
        }
    }
}
function onCalendarHidden() {
    var cal = $find("calendar_months");
    //Remove click event from every Month
    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.removeHandler(row.cells[j].firstChild, "click", change);
            }
        }
    }
}
function change(eventElement) {
    var target = eventElement.target;
    switch (target.mode) {
        case "month":
            var cal = $find("calendar_months");
            cal._visibleDate = target.date;
            cal.set_selectedDate(target.date);
            cal._switchMonth(target.date);
            cal._blur.post(true);
            cal.raiseDateSelectionChanged();
            break;
    }
}
function onCalendarShown_2() {
    var cal = $find("calendar_months_2");
    //Setting default mode to month
    cal._switchMode("months", true);
    //Attach click event
    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.addHandler(row.cells[j].firstChild, "click", change_2);
            }
        }
    }
}
function onCalendarHidden_2() {
    var cal = $find("calendar_months_2");
    //Remove click event from every Month
    if (cal._monthsBody) {
        for (var i = 0; i < cal._monthsBody.rows.length; i++) {
            var row = cal._monthsBody.rows[i];
            for (var j = 0; j < row.cells.length; j++) {
                Sys.UI.DomEvent.removeHandler(row.cells[j].firstChild, "click", change_2);
            }
        }
    }
}
function change_2(eventElement) {
    var target = eventElement.target;
    switch (target.mode) {
        case "month":
            var cal = $find("calendar_months_2");
            cal._visibleDate = target.date;
            cal.set_selectedDate(target.date);
            cal._switchMonth(target.date);
            cal._blur.post(true);
            cal.raiseDateSelectionChanged();
            break;
    }
}