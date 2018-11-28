function placeOrder(order, callback) {
    const TAXIS_ID = [0, 1, 2];
    // generate random taxiID:
    var taxiID = TAXIS_ID[Math.floor(Math.random() * TAXIS_ID.length)];
    // data to send to main-server
    var data = {
        taxiID: taxiID,
        order: order
    };
    callback(data);
}

module.exports = placeOrder;