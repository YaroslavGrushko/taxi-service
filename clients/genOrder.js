function genOrder() {
    // get random coordinates of client from Db
    var getRandomCoord = require("../Db/getRandomCoord");
    var coord = getRandomCoord();

    var longitude = coord.longitude;
    var latitude = coord.latitude;
    // generate order
    var Order = require("./Order");
    return new Order(longitude, latitude);
}


module.exports = genOrder;