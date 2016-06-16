var addEvent = function (element, type, handler) {
    if(element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent ("on"+type, handler);
    } else {
        element["on"+type] = handler;
    }
};
(function () {
    var container = document.getElementById("container");
    var div = "";
    var casual = document.createDocumentFragment();
    for (var i = 0; i < 100; i++){
        div = document.createElement("div");
        div.className = "box";
        casual.appendChild(div);
    }
    container.appendChild(casual);
    div = document.createElement("div");
    div.id = "mover";
    container.appendChild(div);
})();
function createMover(obj) {
    var container = document.getElementById("container");
    var ox = Math.floor(Math.random()*obj);
    var oy = Math.floor(Math.random()*obj);
    var mover = document.createElement("div");
    mover.className = "mover";
    mover.style.top = (ox * 40) + "px";
    mover.style.left = (oy * 40) + "px";
    container.appendChild(mover);
    return new Block(ox, oy, 0, 4, mover);
}
var Block = function (x, y, deg, direction, movers) {
    this.x = x;
    this.y = y;
    this.deg = deg;
    this.direction = direction;
    this.movers = movers;
}

var box = createMover(10);
Block.prototype = {
    go : function () {
        if (this.deg === 4){
            this.x = this.x - 1;
            this.mover.style.left = this.x * 40 + "px";  
        }
    },
}
function start() {
    box.go();
}
addEvent (document.getElementById("btn"), "click", start);