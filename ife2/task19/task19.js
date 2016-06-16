window.onload = function () {
    var text = document.getElementById("text"),
        leftin = document.getElementById("left-in"),
        leftout = document.getElementById("left-out"),
        rightin = document.getElementById("right-in"),
        rightout = document.getElementById("right-out"),
        reset = document.getElementById("reset"),
        sort = document.getElementById("sort"),
        random = document.getElementById("random"),
        display = document.getElementById("display");


    var num = [];
    var count = 0;
    var tf = false;
    var arrli = display.getElementsByTagName("li");

    function addEvent(elementt, type, handler) {
        if(elementt.addEventListener){
            elementt.addEventListener(type, handler, false);
        }else if(elementt.attachEvent){
            elementt.attachEvent("on" + type, handler);
        }else{
            elementt["on"+type] = handler;
        }
    };

    addEvent(leftin, "click", function() {
        if(text.value !== ""){
            if(!/^[0-9]{1,}$/.test(text.value)||parseInt(text.value)>100||parseInt(text.value)<10){
                alert("请输入10-100之内的数字");
                text.value = "";
            }else {
                if(count<60){
                    num.unshift(parseInt(text.value));
                    var li = document.createElement("li");
                    li.style.height = parseInt(text.value)+"%";
                    li.innerHTML = text.value;
                    count++;
                    display.insertBefore(li,display.firstChild);
                }else{
                    alert("输入个数超过60个");
                }
            }
        }else{
            alert("输入的数字不能为空");
        }
    });
    addEvent(leftout, "click", function(){
        if(display.firstChild !== null){
            num.shift();
            display.removeChild(display.firsrChild);
            count--;
        }else{
            alert("没有可以删除的元素了");
        }
    });

    addEvent(rightin, "click", function() {
        if(text.value !== ""){
            if(!/^[0-9]{1,}$/.test(text.value)||parseInt(text.value)>100||parseInt(text.value)<10){
                alert("请输入10-100之内的数字");
                text.value = "";
            }else {
                if(count<60){
                    num.push(text.value);
                    var li = document.createElement("li");
                    li.innerHTML = text.value;
                    li.style.height = parseInt(text.value)+"%";
                    count++;
                    display.appendChild(li);
                }else{
                    alert("输入个数超过60个");
                }
            }
        }else{
                alert("输入的数字不能为空");
        }
    });

    addEvent(rightout, "click", function(){
        if(display.lastChild !== null){
            num.pop();
            display.removeChild(display.lastChild);
            count--;
        }else{
            alert("没有可以删除的元素了");
        }
    });
    
    addEvent(reset,"click",function(){
        text.value="";
        num=[];
        display.innerHTML = "";
        tf = false;
        count=0;
    });

    addEvent(sort, "click", function () {
        if(!tf){
            if(arrli[0]){
                startSort(num);
                tf = true;
            }else{
            alert("数组为空");
            }
        }else{
        alert("请重置");
        }
    });
        
    addEvent(random, "click", function () {
        randomNum();
    });
    
    
    function randomColor(){
        var color = Math.floor(Math.random() * 0xFFFFFF).toString(16);
        if(color.length === 6){
            return "#"+color;
        }else{
            return randomColor();
        }
    };

    
    function randomNum(){
        num = [];
        for(var i=0; i<60; i++){
            num.push(parseInt(Math.random()*90+10))
        }
        count = 60;
        flashDOM(num);
    };
        
    function flashDOM(array) {
        var str = "";
        for(var i=0; i<array.length; i++){
            str += "<li style='height: " + array[i] + "%; background: " + randomColor() + ";'>" + array[i] + "</li>";
        }
        display.innerHTML = str;
    };
        
    function startSort(array) {
        var j = 0,
            t,
            i = array.length;
        (function run() {
            while (i>0) {
                for(j=0; j<i-1; j++){
                    if (array[j]<array[j+1]){
                        t = array[j];
                        array[j] = array[j+1];
                        array[j+1] = t;
                        arrli[j].style.height = array[j] + "%";
                        arrli[j].innerHTML = array[j];
                        arrli[j+1].style.height = array[j+1] + "%";
                        arrli[j+1].innerHTML = array[j+1];
                    }
                }
                i--;
            }
            return array;
        })();
    };
};