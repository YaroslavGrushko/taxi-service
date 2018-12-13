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