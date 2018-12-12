var preOrders = new Array();
const INDEX_MIN = 0;
const INDEX_MAX = 9;
var preOrders = db.clients.find().limit(2).toArray();
			print("preOrders: ");
		    print(JSON.stringify(preOrders));
			
			print("0-st item: ");
			var zeroItem = preOrders[0];
			print(JSON.stringify(zeroItem));
			
			print("0-st item Latitude:");
			print(zeroItem.Latitude);
				
var orders = new Array();	
var tracks = new Array();	
	
var job_id = arg2;
 
var documentNumber = arg1;
var batchNumber = 1;
 
var job_name = 'Job#' + job_id
var start = new Date();
 
var batchDocuments = new Array();
var index = 0;

while(index < documentNumber) {
	var randomIndex1 = Math.random() * (INDEX_MAX - INDEX_MIN) + INDEX_MIN;
    var randomIndex2 = Math.random() * (INDEX_MAX - INDEX_MIN) + INDEX_MIN;
	
	var from_point = [ preOrders, randomIndex1];
	var to_point = [ preOrders, randomIndex2];
	
	var preOrder = {fromPoint: {latitude: from_point.Latitude, longitude: from_point.Longitude}, 
					toPoint: {latitude: to_point.Latitude, longitude: to_point.Longitude}}
					
        print(JSON.stringify(preOrder));
    
	var document = {        
        taxiID : index,
        preOrder : preOrder
    };
    batchDocuments[index % batchNumber] = document;
    if((index + 1) % batchNumber == 0) {
        db.randomData.insert(batchDocuments);
		batchDocuments = new Array();
    }
    index++;
    if(index % 100000 == 0) {   
        print(job_name + ' inserted ' + index + ' documents.');
    }
}
print(job_name + ' inserted ' + documentNumber + ' in ' + (new Date() - start)/1000.0 + 's');
				
	
