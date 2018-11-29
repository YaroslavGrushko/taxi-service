var config = require('./config');
// calculate optimal taxi by it's coordinates an order coordinates:
function calcOptimalTaxi(order) {
    // get taxis coordinates from Db:
    var getTaxisCoord = require("./Db/getTaxisCoord");
    var taxisCoord = getTaxisCoord();
    // console.log("taxisCoord: " + JSON.stringify(taxisCoord));

    var distances = [];
    var latitude_o = order.latitude;
    var longitude_o = order.longitude;
    // calculate distances between taxis and client
    for (var i = 0; i < taxisCoord.length; i++) {
        // current taxiID
        var taxiID = taxisCoord[i].taxiID;
        var latitude_t = taxisCoord[i].coord.latitude;
        var longitude_t = taxisCoord[i].coord.longitude;

        var distance = calcDistance(latitude_o, longitude_o, latitude_t, longitude_t, "K");

        distances.push({ taxiID: taxiID, distance: distance });
    }
    var min = distances[0].distance;
    var taxi = distances[0].taxiID;
    // find the closest taxi:
    distances.forEach(function(item, i, distances) {
        if (min > item.distance) {
            min = item.distance;
            taxi = item.taxiID;
        }
    });
    var closestTaxi = { taxiID: taxi, distance: min };

    // console.log("closestTaxi: " + JSON.stringify(closestTaxi));
    return closestTaxi;
}

// function of calculating distance between coordinates
function calcDistance(lat1, lon1, lat2, lon2, unit) {
    if ((lat1 == lat2) && (lon1 == lon2)) {
        return 0;
    } else {
        var radlat1 = Math.PI * lat1 / 180;
        var radlat2 = Math.PI * lat2 / 180;
        var theta = lon1 - lon2;
        var radtheta = Math.PI * theta / 180;
        var dist = Math.sin(radlat1) * Math.sin(radlat2) + Math.cos(radlat1) * Math.cos(radlat2) * Math.cos(radtheta);
        if (dist > 1) {
            dist = 1;
        }
        dist = Math.acos(dist);
        dist = dist * 180 / Math.PI;
        dist = dist * 60 * 1.1515;
        if (unit == "K") { dist = dist * 1.609344 }
        if (unit == "N") { dist = dist * 0.8684 }
        return dist;
    }
}

module.exports = calcOptimalTaxi;