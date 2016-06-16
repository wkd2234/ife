window.onload = function () {
    var tagText = document.getElementById("tag");
    var tagdisplay = document.getElementById("tagdisplay");
    var hobbyText = document.getElementById("hobby");
    var hobbydisplay = document.getElementById("hobbydisplay");
    var hobbybtn = document.getElementById("btn");
    var reset1 = document.getElementById("reset1");
    var reset2 = document.getElementById("reset2");
    var tagLi = tagdisplay.getElementsByTagName("li");
    var hobbyLi = hobbydisplay.getElementsByTagName("li");
    var tagnum = [];
    var hobbynum = [];
    
    function addEvent(element, type, handler) {
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent) {
            element.attachEvent('on' + type, handler);
        }else{
            element['on'+type] = handler; 
        }
    }
    
    function delegateEvent (element, tag, eventname, listener) {
        addEvent(element, eventname, function () {
            var event = arguments[0];
            var target = event.target;
            if(target && target.tagName == tag.toUpperCase){
                listener.call (target, event);
            }
        });
    }
    
    addEvent (reset1, "click", function () {
        tagdisplay.innerHTML = "";
        tagnum = [];
        tagText.value = "";
    });
    
    addEvent (tagText, "keyup", function (ev) {
        var e = ev ;
        if (tagText.value !== "") {
            if (/^,$/.test(tagText.value) || e.keyCode ===18 ||e.keyCode === 32 || e.keyCode === 188) {
                var str = tagText.value.match(/^[^.,\s]*/)[0];
                if (tagnum.indexOf(str) === -1 && str !== "" ){
                    tagnum.push(str);
                    if (tagnum.length>10) {
                        tagnum.shift();
                        tagdisplay.remove(tagdisplay.firstChild);
                    }
                    var li = document.createElement("li");
                    li.innerHTML = str;
                    tagdisplay.appendChild (li);
                }
                tagText.value = "";
            }
            
        }
    });
    
    delegateEvent (tagdisplay, "li", "mouseover", appeal());
    delegateEvent (tagdisplay, "li", "mouseout", unappeal());

    
    function appeal() {
        this.source = this.innerHTML;
        this.innerHTML += "删除";
        this.className = "mouseover";
    };
    
    function unappeal() {
        this.innerHTML = this.source;
        this.className = "";
    };
    

    
    function getResult(str) {
        return str.replace(/[^\d\u4e00-\u9fa5a-zA-Z]/g, " ").split(" ");
    };
    
    addEvent(hobbybtn, "click", function () {
        var str = hobbyText.value;
        if (str !== "") {
            var result = getResult(str);
            for (var i = 0; i < result.length; i++) {
                if (hobbynum.indexOf(result[i]) === -1 && result[i] !== "") {
                    if (hobbyLi.length >= 10) {
                        hobbynum.shift();
                        hobbydisplay.removeChild(hobbydisplay.firstChild);
                    }
                    hobbynum.push(result[i]);
                    li = document.createElement("li");
                    li.innerHTML = result[i];
                    hobbydisplay.appendChild(li);
                }
            }
            hobbyText.value = "";
        } else {
            alert("输入不能为空！");
        }
    });
    addEvent(reset2, "click", function () {
        hobbyText.value = "";
        hobbydisplay.innerHTML = "";
        hobbynum = [];
    });
}