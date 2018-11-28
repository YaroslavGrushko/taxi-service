function START() {
    const CLIENTS_NUM = 3;
    for (var i = 0; i < CLIENTS_NUM; i++) {
        // set timer (with 1sec deley) that occurce ones
        setTimeout(function() {
            // create client:
            // =================================

            // create order of current client
            var genOrder = require("./genOrder");
            var order = genOrder();
            // send generated order to main server
            var sendOrder = require("./sendOrder");
            sendOrder(order);
            console.log("order sent from c-server to server")
                // ================================================
        }, 1000);
    }
}
module.exports = START;