window.onload = function () {
    function addEvent(element, type, handler) {
        if(element.addEventListener){
            element.addEventListener(type, handler, false);
        }else if(element.attachEvent) {
            element.attachEvent('on' + type, handler);
        }else{
            element['on'+type] = handler; 
        }
    }
    
    var root = document.getElementsByClassName("one")[0],
        travel = [],
        timer = null,
        head = null,
        pre = document.getElementById("pre"),
        inO = document.getElementById("in"),
        search = document.getElementById("text"),
        found = false;
        post = document.getElementById("post");
    
    function getPreOrder(node) {
        reset();
        (function preOrder(node) {
            if(node) {
                travel.push(node);
                preOrder(node.firstElementChild);
                if (node.firstElementChild) {
                    var t = node.firstElementChild.nextElementSibling;
                    while(t) {
                        var p = t;
                        preOrder(t);
                        t = p.nextElementSibling;
                    }
                }
            }
        })(node)
        print();
    };
    
    function getInOrder(node) {
        reset();
        (function inOrder(node) {
            if(node) {
                inOrder(node.firstElementChild);
                travel.push(node);
                if (node.firstElementChild) {
                    var t = node.firstElementChild.nextElementSibling;
                    while (t) {
                        var p = t; 
                        inOrder(t);
                        t = p.nextElementSibling;
                    }
                }
            }
        })(node)
        print();
    }
    
    function getPostOrder(node) {
        reset();
        (function postOrder(node) {
            if(node) {
                postOrder(node.firstElementChild);
                if (node.firstElementChild) {
                    var t = node.firstElementChild.nextElementSibling;
                    while (t) {
                        var p = t; 
                        postOrder(t);
                        t = p.nextElementSibling;
                    }
                }
                travel.push(node);
            }
        })(node)
        print();
    }
    
    function reset() {
        if(travel.length > 0) {
            travel = [];
            head.style.background = "#fff";
            clearTimeout(timer);
            head = null;
            found = false;
        }
    }
    
    function show() {
        head = travel.shift();
        if (head) {
            head.style.background = "#ff0000";
            timer = setTimeout (function () {
                head.style.background = "#fff";
                show();
            }, 1000);
        }
    };
    
    
    
    function searchshow() {
        if(travel.length === 0 && !found ){
            alert("没有找到");
        }else {
            head = travel.shift();
            if(head){
                var text = head.firstChild.nodeValue;
                if (text === search.value) {
                    head.style.background = "#00ff00";
                    found = true;
                    alert("找到了");
                    return;
                }else {
                    head.style.background = "#ff0000";
                    timer = setTimeout (function () {
                    head.style.background = "#fff";
                    searchshow();
                    }, 1000);
                }
            }
        }
    }
    
    function print() {
        if (search.value !== ""){
            searchshow();
        }else {
            show();
        }
    }
    
    addEvent (pre, "click", function() {
        getPreOrder(root);
    });
    addEvent (inO, "click", function() {
        getInOrder(root);
    });
    addEvent (post, "click", function() {
        getPostOrder(root);
    });
}