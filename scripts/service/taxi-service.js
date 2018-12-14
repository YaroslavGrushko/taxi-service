var preOrders = new Array();
const INDEX_MIN = 0;
const INDEX_MAX = 9;
const TAXIS_COUNT = 9;
var preOrders = db.clients.find().limit(INDEX_MAX+1).toArray();	
var first = preOrders[0];
print("latitude: "+first.Latitude);		
var orders = new Array();	
var tracks = new Array();	
var job_id = 1;
var documentNumber = 100000;
var batchNumber = 100;
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
		load("/scripts/service/getTaxisCoordR.js");
		var taxi = getTaxisCoordR();
		load("/scripts/service/findClosest.js");
		var closestTaxi = findClosest(preOrder.fromPoint, taxi);		
	var document = {        
        taxiID : closestTaxi.taxiID,
        preOrder : preOrder
    };
	load("/scripts/service/gen5Points.js");
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
        db.orders.insert({ ordersShardingField: 1, batchDocuments});
		batchDocuments = new Array();
		db.tracks.insert({ tracksShardingField: 1, bTrackDocuments});
		bTrackDocuments = new Array();
    }
    index++;
    if(index % 100 == 0) {   
        print(job_name + ' inserted ' + index + ' documents.');
    }
}
print(job_name + ' inserted ' + documentNumber + ' in ' + (new Date() - start)/1000.0 + 's');
