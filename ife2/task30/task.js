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
CreateBackground (bg, 20, 20);
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
    change : ["Top", "Right", "Bottom", "Left"],
    goStraight : function () {
        switch (this.square.className) {
            case "Top":
                if (this.x > 1) {
                this.x--;
                var temp = this.getSquare(this.x, this.y);
                var div = document.createElement("div");
                temp.className = this.change[this.f];
                temp.appendChild(div);    
                this.reset();
                this.square = temp;
                };
                break;
            case "Right":
                if (this.y < 11) {
                    this.y++;
                    var temp = this.getSquare(this.x, this.y);
                    var div = document.createElement("div");
                    temp.className = this.change[this.f];
                    temp.appendChild(div);
                    this.reset();
                    this.square = temp;
                };
                break;
            case "Bottom":
                if (this.x < 11) {
                    this.x++;
                    var temp = this.getSquare(this.x, this.y);
                    var div = document.createElement("div");
                    temp.className = this.change[this.f];
                    temp.appendChild(div);    
                    this.reset();
                    this.square = temp;
                };
                break;
            case "Left":
                if (this.y > 1) {
                    this.y--;
                    var temp = this.getSquare(this.x, this.y);
                    var div = document.createElement("div");
                    temp.className = this.change[this.f];
                    temp.appendChild(div);    
                    this.reset();
                    this.square = temp;
                };
                break;
        }
    },
    changeDirection : function (p) {
        if (this.f !== p) {
            this.f = p;
            this.square.className = this.change[this.f];
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
    sq.className = block.change[f];
    var div = document.createElement("div");
    sq.appendChild(div);
};
var moveBlock = function () {
    switch (command.value) {
        case "GO" :
            block.goStraight();
            break;
        case "TURN TOP":
            block.changeDirection(0);
            break;
        case "TURN RIGHT":
            block.changeDirection(1);
            break;
        case "TURN BOTTOM":
            block.changeDirection(2);
            break;
        case "TURN LEFT":
            block.changeDirection(3);
            break;
    }
}



addEvent (ok1, "click", createBlock);
addEvent (ok2, "click", moveBlock);