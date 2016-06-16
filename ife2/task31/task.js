var addEvent = function (element, type, handler) {
    if (element.addEventListener) {
        element.addEventListener(type, handler, false);
    } else if (element.attachEvent) {
        element.attachEvent("on"+type, handler);
    } else {
        element["on"+type] = handler;
    }
} 
var CreateBackground = function (tb, rows, cols) {
    var bg_tr = [];
    for (var i=0; i<rows; i++) {
        bg_tr[i] = document.createElement("tr");
        tb.appendChild(bg_tr[i]);
        var bg_td = [];
        for (var j=0 ;j<cols; j++) {
            bg_td[j] = document.createElement("td");
            if (i === 0 && j>0) {
                bg_td[j].innerHTML = j;
            }
            if (j ===0 && i>0) {
                bg_td[j].innerHTML = i;
            }
            bg_tr[i].appendChild(bg_td[j]);
        }
    }
}
var bg = document.getElementById("background");
CreateBackground (bg, 11, 11);
var Block = function (x,y,f) {
    this.x = x;
    this.y = y;
    this.f = f;
    this.square = this.getSquare(this.x, this.y);
}
Block.prototype = {
    getSquare : function (x, y) {
        return bg.rows[x].cells[y];
    },
    direction : ["Top", "Right", "Bottom", "Left"],
    change : function () {
        var temp = this.getSquare(this.x, this.y);
        var div = document.createElement("div");
        temp.className = this.direction[this.f];
        temp.appendChild(div);    
    },
    go : function () {
        switch (command.value.slice(4)) {
            case "TOP":
                if (this.x > 1)
                    this.x--;
                    var temp = this.getSquare(this.x, this.y);
                    this.change();
                    this.reset();
                    this.square = temp;
                    
                    break;
            case "RIGHT":
                if (this.y <11)
                    this.y++;
                    this.change();
                    this.reset();
                    this.square = temp;
                    break;
            case "BOTTOM":
                if (this.x <11)
                    this.x++;
                    this.change();
                    this.reset();
                    this.square = temp;
                    break;
                break;
            case "LEFT":
                if (this.y >1)
                    this.y--;
                    this.change();
                    this.reset();
                    this.square = temp;
                    break;
                break;
        }
    },
    mov : function () {
        switch (command.value.slice(4)) {
            case "TOP":
                this.changeDirection(0);
                this.go();
                break;
            case "RIGHT":
                this.changeDirection(1);
                this.go();
                break;
            case "BOTTOM":
                this.changeDirection(2);
                this.go();
                break;
            case "LEFT":
                this.changeDirection(3);
                this.go();
                break;
        }  
    },
    changeDirection : function (p) {
        if (this.f !== p) {
            this.f = p;
            this.square.className = this.direction[this.f];
        }    
},
    reset : function () {
        this.square.className = "";
        this.square.innerHTML = "";
    }
}
var StratX = document.getElementById("StartX"),
    StratY = document.getElementById("StartY"),
    StartF = document.getElementById("StartF"),
    ok1 = document.getElementById("ok1"),
    ok2 = document.getElementById("ok2"),
    command = document.getElementById("ChangeF"),
    block = null;

var createBlock = function () {
    if (block) {
        block.reset();
        block = null;    
    }
    var x = parseInt(StratX.value),
        y = parseInt(StratY.value),
        f = parseInt(StartF.value);
    block = new Block (x, y, f);
    var sq = block.getSquare(x, y);
    sq.className = block.direction[f];
    var div = document.createElement("div");
    sq.appendChild(div);
};
var moveBlock = function () {
    switch (command.value.slice(0, 3)) {
        case "TRA" :
            block.go();
            break;
        case "MOV":
            block.mov();
            break;
    }
};
addEvent (ok1, "click", createBlock);
addEvent (ok2, "click", moveBlock);