(function (window, undefined) {
    var commander = {};
    commander.shipObrit = [false,false,false,false];
    commander.createSpaceship = function (obritId) {
        if (this.shipObrit[obritId]) {
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
        commander.shipObrit[obritId] = false;
        god.Mediator.sendMessage({
            id:obritId,
            command:"destroy"
        })
    };
    window.commander = commander;
})(window)