window.onload = function () {
    var plant = document.getElementById("plant");
    var contro = document.getElementById("contro");
    
    var commander = {};
    commander.shipObrit = [false,false,false,false];
    commander.createSpaceship = function (obritId) {
        if (this.shipObrit[obritId]) {
            //messageshow
            return;
        };
        this.shipObrit[obritId] = true;
        god.createSpaceship(obritId);
    };
    commander.startShip = function (obritId) {
        if (!this.shipObrit[obritId]) {
            //messageshow
            return;
        };
        //messageshow
        god.Mediator.sendMessage({
            id:obritId,
            command:"start"
        })     
    };
    
    commander.stopShip = function (obritId) {
        if (!this.shipObrit[obritId]) {
            //messageshow
            return;
        };
        //messageshow
        god.Mediator.sendMessage({
            id:obritId,
            command:"stop"
        })
    };
    
    commander.destroyShip = function (obritId) {
        if (!this.shipObrit[obritId]) {
            //messageshow
            return;
        };
        //messageshow
        god.Mediator.sendMessage({
            id:obritId,
            command:"destroy"
        })
    };
    
    
    

    var ship = function (shipId) {
        this.shipId = shipId;
        this.state = 1;
        this.destroyed = false;
        this.deg = 0;
        var that = this;
        this.energy = 100;
        this.removed = false;
        
        this.shipSystem = {
            start: function () {
                if (that.energy > 0) {
                    that.state = 1;
                }
            },
            stop : function () {
                that.state = 0;
            },
            changeDeg : function () {
                if (that.state === 1) {
                    that.deg += 1;
                }
                that.deg = that.deg % 360;
            }
        };
        
        this.energySystem = {
            add : function () {
                that.energy += 2;
                if (that.energy > 100) {
                    that.energy = 100;
                }
            },
            cost : function () {
                that.energy -= 5;
                if (that.energy < 0) {
                    that.energy = 0;
                    that.state = 0;
                }
            },
            getEnergy : function () {
                return that.energy;
            }
        };
        
        this.radioSystem = {
            reviceMessage: function (message) {
                if (message.id !== that.shipId) {
                    return;
                }
                switch (message.command) {
                    case 'start':
                        that.shipSystem.start();
                        break;
                    case 'stop':
                        that.shipSystem.stop();
                        break;
                    default:
                        that.destroySystem.destroy();
                        break;
                }
            }
        };
        
        this.destroyeSystem= {
            destroy: function () {
                that.destoryed = true;
            }
        };
    }//ship;
   

    var basicFunction = {};
    
    basicFunction.buttonClick = function () {
        var orbit = parseInt(this.parentNode.dataset.id);
        var message = this.dataset.type;
        switch(message) {
            case 'create':
                if(this.dataset.status === 'create') {
                    commander.createSpaceship(orbit);
                    this.dataset.status = 'created';
                    this.innerHTML = '自爆销毁';
                    this.nextElementSibling.disabled = false;
                } else {
                    commander.destroyShip(orbit);
                    this.dataset.status = 'create';
                    this.innerHTML = '创建飞船';
                    this.nextElementSibling.disabled = true;
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
}