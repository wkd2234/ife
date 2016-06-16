(function (window, undefined) {
    var Spaceship = function (obritId) {
        this.obritId = obritId;
        this.state = 0;
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
                if (that.state === 1){
                    that.energy -= 5;
                }
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
                if (message.id !== that.obritId) {
                    return;
                }
                switch (message.command) {
                    case 'start':
                        that.shipSystem.start();
                        break;
                    case 'stop':
                        that.shipSystem.stop();
                        break;
                    case 'destroy':
                        that.destroyeSystem.destroy();
                        break;
                }
            }
        };
        
        this.destroyeSystem= {
            destroy: function () {
                that.destroyed= true;
            }
        };
    }//ship;
    window.Spaceship = Spaceship;
})(window)