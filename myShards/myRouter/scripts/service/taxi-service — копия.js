var preOrders = new Array();
const INDEX_MIN = 0;
const INDEX_MAX = 9;
const TAXIS_COUNT = 9;
var preOrders = db.clients.find().limit(INDEX_MAX+1).toArray();			
var orders = new Array();	
var tracks = new Array();	
var job_id = 1;
var documentNumber = 2;
var batchNumber = 1;
var job_name = 'Job#' + job_id;
var start = new Date();
var batchDocuments = new Array();
var bTrackDocuments = new Array();
var index = 0;
while(index < documentNumber) {
	var randomIndex1 = Math.round(Math.random() * (INDEX_MAX - INDEX_MIN) + INDEX_MIN);
    var randomIndex2 = Math.round(Math.random() * (INDEX_MAX - INDEX_MIN) + INDEX_MIN);
	var from_point = preOrders[randomIndex1];
	var to_point = preOrders[randomIndex2];
	var preOrder = {fromPoint: {latitude: from_point.Latitude, longitude: from_point.Longitude}, 
					toPoint: {latitude: to_point.Latitude, longitude: to_point.Longitude}};
		var taxi = getTaxisCoordR();
		var closestTaxi = findClosest(preOrder.fromPoint, taxi);
					
	var document = {        
        taxiID : closestTaxi.taxiID,
        preOrder : preOrder
    };
	var points = gen5Points(preOrder.fromPoint.latitude, preOrder.fromPoint.longitude, preOrder.toPoint.latitude, preOrder.toPoint.longitude);
	var track = {
		p1:points[0],
		p2:points[1],
		p3:points[2],
		p4:points[3],
		p5:points[4]
	};
    batchDocuments[index % batchNumber] = document;
	bTrackDocuments[index % batchNumber] = track;
    if((index + 1) % batchNumber == 0) {
        db.orders.insert(batchDocuments);
		batchDocuments = new Array();
		db.tracks.insert(bTrackDocuments);
		bTrackDocuments = new Array();
    }
    index++;
    if(index % 100000 == 0) {   
        print(job_name + ' inserted ' + index + ' documents.');
    }
}
print(job_name + ' inserted ' + documentNumber + ' in ' + (new Date() - start)/1000.0 + 's');

var gen5Points = function (x1,y1,x2,y2){
	var points = new Array();
	var delta = (x2-x1)/4;
	for(var i=0;i<5;i++){
		var x = x1+i*delta;
		var point = {};
		point.latitude = x;
		point.longitude = y1 + ((x-x1)/(x2-x1))*(y2-y1);
		points.push(point);
	}
	return points;
};

var getTaxisCoordR = function (){
    var taxisCoord = [];
    for (var i = 0; i < TAXIS_COUNT; i++) {
        var coord = {};
        const LONG_MIN = -0.5;
        const LONG_MAX = 0.5;
        const LAT_MIN = 51.4;
        const LAT_MAX = 51.7;
        coord.longitude = Math.random() * (LONG_MAX - LONG_MIN) + LONG_MIN;
        coord.latitude = Math.random() * (LAT_MAX - LAT_MIN) + LAT_MIN;
        taxisCoord.push({ taxiID: i, coord: coord});
    };
    return taxisCoord;
};

var findClosest = function (order, taxis) {
    var closestTaxi = {};
    var distances = [];
    var latitude_o = order.latitude;
    var longitude_o = order.longitude;
        for (var i = 0; i < taxis.length; i++) {		
            var taxiID = taxis[i].taxiID;
            var latitude_t = taxis[i].coord.latitude;
            var longitude_t = taxis[i].coord.longitude;
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

var calcDistance = function (lat1, lon1, lat2, lon2, unit) {
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
        if (unit == "K") {
            dist = dist * 1.609344
        };
        if (unit == "N") {
            dist = dist * 0.8684
        }
        return dist;
    };
}