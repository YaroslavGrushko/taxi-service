var findClosest = function (order, taxis) {
    var closestTaxi = {};
    var distances = [];
    var latitude_o = order.latitude;
    var longitude_o = order.longitude;
        for (var i = 0; i < taxis.length; i++) {		
            var taxiID = taxis[i].taxiID;
            var latitude_t = taxis[i].coord.latitude;
            var longitude_t = taxis[i].coord.longitude;
			load("/scripts/service/calcDistance.js");
            var distance = calcDistance(latitude_o, longitude_o, latitude_t, longitude_t, "K");
            distances.push({
                taxiID: taxiID,
                distance: distance
            });
        }
        var min = distances[0].distance;
        var taxi = distances[0].taxiID;
        distances.forEach(function (item, i, distances) {
            if (min > item.distance) {
                min = item.distance;
                taxi = item.taxiID;
            }
        });
        closestTdist = {
            taxiID: taxi,
            distance: min
        };
        taxis.forEach((element) => {
			
            if (element.taxiID == taxi) {
                closestTaxi.taxiID = element.taxiID;
                closestTaxi.coord = element.coord;
            }
        });
	return closestTaxi;
}