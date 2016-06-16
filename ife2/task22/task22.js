window.onload = function () {

        
        var root = document.getElementsByClassName("circle1")[0],
        travel = [],
        timer = null,
        head = null,
        pre = document.getElementById("pre"),
        inO = document.getElementById("in"),
        post = document.getElementById("post"),
        reset1 = document.getElementById("reset");
        
        function addEvent(element, type, handler) {
            if(element.addEventListener){
                element.addEventListener(type, handler, false);
            }else if(element.attachEvent) {
                element.attachEvent('on' + type, handler);
            }else{
                element['on'+type] = handler; 
            }
        }
      
        function reset() {
            if (travel.length > 0){
                head.style.backgroundColor = "#fff";
                travel = [];
                clearTimeout(timer);
                head = null;
            }
        }
        
        function getPreOrder(node) {
            reset();
            (function preOrder(node) {
                if (node) {
                    travel.push(node);
                    preOrder(node.firstElementChild);
                    preOrder(node.lastElementChild);
                }
            })(node);
            show();
        }
        
        function getInOrder(node) {
            reset();
            (function inOrder(node) {
                if (node){
                    inOrder(node.firstElementChild);
                    travel.push(node);
                    inOrder(node.lastElementChild);
                }
            })(node);
            show();
        }
        
        function getPostOrder(node) {
            reset();
            (function postOrder(node) {
                if(node){
                    postOrder(node.firstElementChild);
                    postOrder(node.lastElementChild);
                    travel.push(node);
                }
            })(node);
            show();
        }
        
        addEvent (reset1, "click", function () {
                head.style.background = "#fff";
                travel = [];
                clearTimeout(timer);
                head = null;
        });
        
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
        
        addEvent (pre, "click", function () {
            getPreOrder(root);
        });
        addEvent (inO, "click", function () {
            getInOrder(root);
        });
        addEvent (post, "click", function () {
            getPostOrder(root);
        });
        
            
        

}