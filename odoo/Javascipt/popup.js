// JScript File
function popupSize2(page, width, height)
{
    vHeight = height;
    vWidth = width;
    winDef = 'status=no, resizable=no, scrollbars=yes, toolbar=no, location=no, fullscreen=no, titlebar=yes, height='.concat(vHeight).concat(',').concat('width=').concat(vWidth).concat(',');
    winDef = winDef.concat('top=').concat((screen.height - vHeight)/2).concat(',');
    winDef = winDef.concat('left=').concat((screen.width - vWidth)/2);
    newwin = open(page, '_blank', winDef);
}

function popup(popuplink, key) {
    var i = getPopupForm(key);
    if (key == 'password' && i == null) {
        var w = 350, h = 120;
        var left = (screen.width / 2) - (w / 2);
        var top = (screen.height / 2) - (h / 2);
        this.setPopupForm(window.open(popuplink, "", 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left), key);
        return false;
    }
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
  

function clearLookup(strNameControl,strIDControl)
{  
    for(var i=0; i<window.document.forms[0].length;i++)
    {
        if(window.document.forms[0].elements[i].id.lastIndexOf(strNameControl)>=0)
          window.document.forms[0].elements[i].value="";
        if(window.document.forms[0].elements[i].id.lastIndexOf(strIDControl)>=0)
          window.document.forms[0].elements[i].value="";
    }
}

function runScriptInSelect(senderName)
{
   
    for(var i=0; i<window.document.forms[0].length;i++)
    {
        if(window.document.forms[0].elements[i].id.lastIndexOf(senderName)>=0)
          eval(window.document.forms[0].elements[i].value);
              
    }

}


//quynt
function popWindow(link) {
    var w = 800, h = 500;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    window.open(link, 'popup', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    return false;
}

function popWindow_Custom(link,width,height) {
    var w = width, h = height;
    var left = (screen.width / 2) - (w / 2);
    var top = (screen.height / 2) - (h / 2);
    window.open(link, 'popup', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    return false;
}
function popWindow_ImageAudit(link, width, height) {
    var w = width, h = height;
    var left = (screen.width / 2) - (w / 2);
    var top = 10;
    window.open(link, 'popup', 'toolbar=no, location=no, directories=no, status=no, menubar=no, scrollbars=yes, resizable=no, copyhistory=no, width=' + w + ', height=' + h + ', top=' + top + ', left=' + left);
    return false;
}

