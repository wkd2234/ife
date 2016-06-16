window.onload = function () {
    var display = document.getElementById("display");
    var text = document.getElementById("text");
    var leftin = document.getElementById("left-in");
    var leftout = document.getElementById("left-out");
    var rightin = document.getElementById("right-in");
    var rightout = document.getElementById("right-out");
    var searchtext = document.getElementById("search");
    var search = document.getElementById("search-button");
    var reset = document.getElementById("reset");
    
    function addEvent(element, type, handler) {
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent) {
            element.attachEvent('on' + type, handler);
        }else{
            element['on'+type] = handler; 
        }
    };
    
    function getStr(str){
        return str.replace(/[^\d\u4e00-\u9fa5a-zA-Z]+/g, " ").split(" ");
    };
    
    addEvent (leftin, "click", function () {
       if (text.value !== ""){
           var result = getStr(text.value);
           for (var i=result.length-1; i>=0; i--){
               var li = document.createElement("li");
               li.innerHTML = result[i];
               display.insertBefore(li,display.firstChild);
           }
       } 
    });
    
    addEvent (leftout, "click", function () {
        if (display.firstChild !== null){
            display.removeChild(display.firstChild);
        }else {
            alert ("没有可以删除的元素了");
        }
    });
    
    addEvent (rightin, "click", function () {
        if (text.value !== ""){
            var result = getStr(text.value);
            for (var i=0; i<result.length; i++) {
                var li = document.createElement("li");
                li.innerHTML = result[i];
                display.appendChild(li);
            }
        };
    });
    
    addEvent (rightout, "click", function () {
        if(display.lastChild !== null) {
            display.removeChild(display.lastChild);
        }else {
            alert ("没有可以删除的元素了");
        }
    });
    
    addEvent (search, "click", function () {
        if (searchtext.value !== "") {
            var t = searchtext.value.trim();
            var arrLi = display.getElementsByTagName("li");
            for (var i=0; i<num.length; i++) {
                if (arrLi[i].innerHTML.indexOf(t) >= 0) {
                    return arrLi[i].style.background = "#ff0000";
                };
            }
        }else {
            alert ("输入内容为空");
        }
    });
    
    addEvent (reset, "click", function () {
        text.value = "";
        searchtext.value = "";
        display.innerHTML="";
    });

};