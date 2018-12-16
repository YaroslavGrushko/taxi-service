db = db.getSiblingDB("taxisService");
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
load("/scripts/service/getTaxisCoordR.js");
load("/scripts/service/findClosest.js");
load("/scripts/service/gen5Points.js");
while(index < documentNumber) {
	var randomIndex1 = Math.round(Math.random() * (INDEX_MAX - INDEX_MIN) + INDEX_MIN);
    var randomIndex2 = Math.round(Math.random() * (INDEX_MAX - INDEX_MIN) + INDEX_MIN);
	var from_point = preOrders[randomIndex1];
	var to_point = preOrders[randomIndex2];
	var preOrder = {fromPoint: {latitude: from_point.Latitude, longitude: from_point.Longitude}, 
					toPoint: {latitude: to_point.Latitude, longitude: to_point.Longitude}};
		var taxi = getTaxisCoordR();
		var closestTaxi = findClosest(preOrder.fromPoint, taxi);
    var r = 0;
	var index_inner = index % batchNumber;
	var frst_barrier = batchNumber/4;
	var scnd_barrier = frst_barrier+frst_barrier;
    if(index_inner < frst_barrier){
    r = 1;
	}
    if(frst_barrier < index_inner < scnd_barrier){
	r = -1;
	}	
	if(index_inner > scnd_barrier){
	r = 0;
	}
	var document = {        
        taxiID : closestTaxi.taxiID,
        preOrder : preOrder,
		r : r
    };
	var points = gen5Points(preOrder.fromPoint.latitude, preOrder.fromPoint.longitude, preOrder.toPoint.latitude, preOrder.toPoint.longitude);
	var track = {
		p1:points[0],
		p2:points[1],
		p3:points[2],
		p4:points[3],
		p5:points[4]
	};
    batchDocuments[index_inner] = document;
	bTrackDocuments[index_inner] = track;
    if((index + 1) % batchNumber == 0) {
        db.orders.insert({ ordersShardingField: 1, batchDocuments});
		batchDocuments = new Array();
		db.tracks.insert({ tracksShardingField: 1, bTrackDocuments});
		bTrackDocuments = new Array();
		print("inserting...");
    }
    index++;
    if(index % 100 == 0) {   
        print(job_name + ' inserted ' + index + ' documents.');
    }
}
print(job_name + ' inserted ' + documentNumber + ' in ' + (new Date() - start)/1000.0 + 's');