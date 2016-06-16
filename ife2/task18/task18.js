window.onload = function () {
    var list = document.getElementById("list");
    var text = document.getElementById("text");
    var left_in = document.getElementById("left-in");
    var left_out = document.getElementById("left-out");
    var right_in = document.getElementById("right-in");
    var right_out = document.getElementById("right-out");

function addEvent(element, type, handler) {
    if(element.addEventListener){
        element.addEventListener(type, handler, false);
    }else if(element.attachEvent) {
        element.attachEvent('on' + type, handler);
    }else{
        element['on'+type] = handler; 
    }
};

addEvent(left_in, "click", function () {
    var li = document.createElement("li");
    li.innerHTML = text.value;
    list.insertBefore(li, list.firstChild);
});

addEvent(left_out, "click", function () {
    if(list.firstChild !== null){
        list.removeChild(list.firstChild);
    }else{
        alert("没有可以删除的元素了");
    }
});

addEvent(right_in, "click", function () {
    var li = document.createElement("li");
    li.innerHTML = text.value;
    list.appendChild(li);
});

addEvent(right_out,"click",function () {
    if(list.lastChild !== null){
        list.removeChild(list.lastChild)
    }else{
        alert("没有可以删除的元素了");
    }
});

addEvent(text, "focus", function () {
       text.value = "";
});
};
