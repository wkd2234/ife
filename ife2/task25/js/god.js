(function (window, undefined) {
    var god = {};
    var plant = document.querySelector("#plant");
    god.shipObject = [];
    god.createSpaceship = function (obritId) {
        setTimeout (function () {
            if (Math.random() < .3) {
                basicFunction.showMessage ("传送消息失败", "#ff0000");
                return;
            }
            //messageshow
            var shipId = god.shipObject.push(new Spaceship(obritId));
            var shipDiv = document.createElement("div");
            shipDiv.id = "ship" + obritId;
            shipDiv.className = "ship";
            shipDiv.innerHTML = "<p>100%</p>";
            plant.appendChild(shipDiv);
        },1000)
    };
    god.Mediator = {
        sendMessage : function (message) {
            setTimeout (function () {
                //random .3
                //messgeshow
                for (var i=0;i<god.shipObject.length;i++) {
                    if (god.shipObject[i].destroyed) {
                        continue;
                    }
                    god.shipObject[i].radioSystem.reviceMessage(message);
                }
            },1000)
        }
    };
    (function () {
        god.shipSystemTimer = setInterval (function () {
            for (var i=0;i<god.shipObject.length;i++) {
                var ship = document.getElementById("ship"+i);
                if (god.shipObject[i].destroyed) {
                    if (!god.shipObject[i].removed) {
                        plant.removeChild(ship);
                        god.shipObject[i].removed = true;
                    }
                    continue;
                };
                god.shipObject[i].shipSystem.changeDeg();
                ship.style.transform = "rotate("+god.shipObject[i].deg+"deg)";
                ship.style.mstransform = "rotate("+god.shipObject[i].deg+"deg)";
                ship.style.moztransform = "rotate("+god.shipObject[i].deg+"deg)";
                ship.style.webkitTransform = "rotate("+god.shipObject[i].deg+"deg)";
                ship.style.otransform = "rotate("+god.shipObject[i].deg+"deg)";
                
                var JITenergy = god.shipObject[i].energySystem.getEnergy();
                ship.lastElementChild.innerHTML = JITenergy+"%";
            }
        },100);
        
        god.energySystemTimer = setInterval (function () {
            for (var i=0;i<god.shipObject.length;i++) {
                if (god.shipObject[i].destroyed) {
                    continue;
                };
                god.shipObject[i].energySystem.add();
                god.shipObject[i].energySystem.cost();
            }
        },1000)
    })();//god
    
    window.god = god;
})(window)