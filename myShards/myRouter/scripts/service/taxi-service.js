db = db.getSiblingDB("taxisService");
var preOrders = new Array();
const INDEX_MIN = 0;
const INDEX_MAX = 5;
const ORD_MIN = 1;
const ORD_MAX = 9;
const TRA_MIN = 10;
const TRA_MAX = 24;
const TAXIS_COUNT = 3;
var preOrders = db.clients.find().limit(INDEX_MAX+1).toArray();	
var first = preOrders[0];
print("latitude: "+first.Latitude);		
var orders = new Array();	
var tracks = new Array();	
var job_id = 1;
var documentNumber = 10000000;
var batchNumber = 2000;
var job_name = 'Job#' + job_id;
var start = new Date();
var batchDocuments = new Array();
var bTrackDocuments = new Array();
var index = 0;
load("/scripts/service/getTaxisCoordR.js");
load("/scripts/service/findClosest.js");
load("/scripts/service/gen5Points.js");
var delta = INDEX_MAX - INDEX_MIN;
var delta_ord = ORD_MAX - ORD_MIN;
var delta_tra = TRA_MAX - TRA_MIN;
while(index < documentNumber) {
	var random_namber = Math.random();
	var randomIndex1 = Math.round(random_namber * delta + INDEX_MIN);
    var randomIndex2 = Math.round(INDEX_MAX - random_namber * delta);
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
		points
	};
    batchDocuments[index_inner] = document;
	bTrackDocuments[index_inner] = track;
	var ord_zip = 0;
	var tra_zip = 0;
	ord_zip = Math.round(random_namber * delta_ord + ORD_MIN);
	tra_zip = Math.round(random_namber * delta_tra + TRA_MIN);
    if((index + 1) % batchNumber == 0) {
        db.orders.insert({ zip: ord_zip, batchDocuments});
		batchDocuments = new Array();
		db.tracks.insert({ zip: tra_zip, bTrackDocuments});
		bTrackDocuments = new Array();
		print("inserting...");
    }
    index++;
    if(index % 2100 == 0) {   
        print(job_name + ' inserted ' + index + ' documents.');
    }
}
print(job_name + ' inserted ' + documentNumber + ' in ' + (new Date() - start)/1000.0 + 's');