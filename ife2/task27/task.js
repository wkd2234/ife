

addEvent = function (element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) { 
            element.attachEvent("on" + event, listener);
        } else { 
            element["on" + event] = listener;
        }
};

var text = document.getElementById("text");
var display = document.getElementById("display");


addEvent (text, "blur", function () {
    checkText();
});

addEvent (text, "focus", function () {
    display.innerHTML = "";
    text.style.border = "2px" + " " + "solid" + " " +"#000";
    text.innerHTML = "";
    text.value = "";
});


checkText = function () {
    if (text.value.length === 0 ) {
        showMessage (0, "#ff0000");
    } else {
        var value = text.value.replace(/^\s+|\s$/g, "").replace(/[\u0391-\uFFE5]/g, "--");
        if (value.length < 4) {
            showMessage (1, "#ff0000");
        } else if (value.length > 16) {
            showMessage (2, "#ff0000");
        } else {
            showMessage (3, "#00ff00");
        }
    }
}

showMessage = function (num, color) {
    if (num === 0) {
        display.innerHTML = "输入内容不能为空";
        display.style.color = color;
        text.style.border = "2px" + " " + "solid" + " " +color; 
    }
    if (num === 1) {
        display.innerHTML = "输入内容字符数量过低";
        display.style.color = color;
        text.style.border = "2px" + " " + "solid" + " " +color; 
    }
    if (num === 2) {
        display.innerHTML = "输入内容字符数量过多";
        display.style.color = color;
        text.style.border = "2px" + " " + "solid" + " " +color; 
    }
    if (num === 3) {
        display.innerHTML = "输入正确";
        display.style.color = color;
        text.style.border = "2px" + " " + "solid" + " " +color; 
    }
}

