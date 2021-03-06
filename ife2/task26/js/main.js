(function (window, undefined) {
    var basicFunction = {};
    var display = document.getElementById("display-text");
    var stytemType = {
        powerType : [
            {speed : 3, cost : 5},
            {speed : 5, cost : 7},
            {speed : 8, cost : 9}
        ],
        energyType : [
            {add : 2},
            {add : 3},
            {add : 4}
        ]
    };
    
    basicFunction.showMessage = function (message, color) {
        var p = document.createElement("p");
        p.innerHTML = message;
        p.style.color = color;
        if (display.firstChild) {
            display.insertBefore(p, display.firstChild);
        }else {
            display.appendChild(p);
        }
    }
    
    basicFunction.buttonClick = function () {
        var orbit = parseInt(this.parentNode.dataset.id);
        var message = this.dataset.type;
        switch(message) {
            case 'create':
                var powerStytem = this.parentNode.firstElementChild.nextElementSibling;
                var energyStytem = this.parentNode.firstElementChild.nextElementSibling.nextElementSibling;
                if(this.dataset.status === 'create') {
                    commander.createSpaceship(orbit, powerStytem.value, energyStytem.value);
                    this.dataset.status = 'created';
                    this.innerHTML = '自爆销毁';
                    this.nextElementSibling.disabled = false;
                    powerStytem.disabled = true;
                    energyStytem.disabled = true;
                } else {
                    commander.destroyShip(orbit);
                    this.dataset.status = 'create';
                    this.innerHTML = '创建飞船';
                    this.nextElementSibling.disabled = true;
                    powerStytem.disabled = false;
                    energyStytem.disabled = false;
                    this.nextElementSibling.dataset.status = 'start';
                    this.nextElementSibling.innerHTML = '飞行';
                }
                break;
            default:
                if(this.dataset.status === 'start') {
                    commander.startShip(orbit);
                    this.dataset.status = 'stop';
                    this.innerHTML = '停止';
                } else {
                    commander.stopShip(orbit);
                    this.dataset.status = 'start';
                    this.innerHTML = '飞行';
                }
                break;
        }
    };

    basicFunction.addEvent = function (element, event, listener) {
        if (element.addEventListener) { 
            element.addEventListener(event, listener, false);
        } else if (element.attachEvent) { 
            element.attachEvent("on" + event, listener);
        } else { 
            element["on" + event] = listener;
        }
    };

    basicFunction.delegateEvent = function (element, tag, eventName, listener) {
        basicFunction.addEvent(element, eventName, function () {
            var event = arguments[0] || window.event,
                target = event.target || event.srcElement;
            if (target && target.tagName === tag.toUpperCase()) {
                listener.call(target, event);
            }
        });
    };


    basicFunction.delegateEvent(contro, "button", "click", basicFunction.buttonClick);
    
    window.basicFunction = basicFunction;
}
)(window)